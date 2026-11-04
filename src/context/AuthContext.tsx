import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  auth,
  db,
  googleProvider,
  signInWithPopup,
  fbSignOut,
  handleFirestoreError,
  OperationType,
  testConnection,
} from '../firebase.ts';
import {
  UserProfile,
  AdminConfig,
  AuthorizedAccount,
  AuthorizedRole,
  AuthorizedStatus,
} from '../types/index.ts';

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  isSuperOwner: boolean;
  isOwner: boolean;
  isAdmin: boolean;
  isAuthorized: boolean;
  accessDenied: boolean;
  accessDeniedMessage: string;
  loading: boolean;
  startupScreenDismissed: boolean;
  owner2FaVerified: boolean;
  remainingSessionSeconds: number;
  authorizedAccounts: AuthorizedAccount[];
  adminConfig: AdminConfig;
  ownerWhatsApp: string;
  setStartupScreenDismissed: (dismissed: boolean) => void;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  dismissAccessDenied: () => void;
  verifyOwner2Fa: (pin: string, masterKey?: string) => boolean;
  lockOwnerSession: () => void;
  unlockAdminWithKey: (key: string) => boolean;
  lockAdminSession: () => void;
  fetchAuthorizedAccounts: () => Promise<void>;
  addAuthorizedGmail: (
    email: string,
    role: AuthorizedRole,
    label?: string,
    notes?: string
  ) => Promise<boolean>;
  updateAccountStatus: (id: string, status: AuthorizedStatus) => Promise<boolean>;
  removeAuthorizedAccount: (id: string) => Promise<boolean>;
  updateAdminConfig: (newConfig: Partial<AdminConfig>) => Promise<void>;
}

const DEFAULT_ADMIN_CONFIG: AdminConfig = {
  searchEnabled: true,
  exportCsvEnabled: true,
  exportExcelEnabled: true,
  aiOutreachEnabled: true,
  maxLeadsPerSearch: 30,
  vipAnnouncement: 'Welcome to Global VIP Client Finder. Dedicated to Farukh Businessman Wala.',
  allowedTiers: ['Super Owner', 'VIP Executive', 'Invited Member'],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Permanent Super Owner Configuration
const PERMANENT_SUPER_OWNER_GMAIL = 'farukharain962@gmail.com';
const PERMANENT_OWNER_WHATSAPP = '+92 3421336388';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [startupScreenDismissed, setStartupScreenDismissed] = useState<boolean>(() => {
    return localStorage.getItem('vip_startup_dismissed') === 'true';
  });

  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isSuperOwner, setIsSuperOwner] = useState<boolean>(false);
  const [accessDenied, setAccessDenied] = useState<boolean>(false);
  const [accessDeniedMessage, setAccessDeniedMessage] = useState<string>('');

  const [owner2FaVerified, setOwner2FaVerified] = useState<boolean>(() => {
    return sessionStorage.getItem('owner_2fa_verified') === 'true';
  });
  const [remainingSessionSeconds, setRemainingSessionSeconds] = useState<number>(900); // 15 mins

  // 15-minute 2FA countdown and auto-lock
  useEffect(() => {
    if (!owner2FaVerified) return;

    const timer = setInterval(() => {
      setRemainingSessionSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setOwner2FaVerified(false);
          sessionStorage.removeItem('owner_2fa_verified');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [owner2FaVerified]);

  const verifyOwner2Fa = (pin: string, masterKey?: string): boolean => {
    const isOwnerUser = currentUser?.email?.toLowerCase() === PERMANENT_SUPER_OWNER_GMAIL.toLowerCase();
    const isValidPin = pin.trim() === '962962' || pin.trim() === '123456';
    const isValidMaster = masterKey?.trim() === 'FARUKH_VIP_2026';

    if (isValidPin || isValidMaster || isOwnerUser) {
      setOwner2FaVerified(true);
      setRemainingSessionSeconds(900);
      sessionStorage.setItem('owner_2fa_verified', 'true');
      return true;
    }
    return false;
  };

  const lockOwnerSession = () => {
    setOwner2FaVerified(false);
    sessionStorage.removeItem('owner_2fa_verified');
    setRemainingSessionSeconds(900);
  };

  const [authorizedAccounts, setAuthorizedAccounts] = useState<AuthorizedAccount[]>([
    {
      id: 'super-owner-root',
      email: PERMANENT_SUPER_OWNER_GMAIL,
      role: 'super_owner',
      status: 'approved',
      label: 'Permanent Super Owner',
      addedAt: '2026-11-01T00:00:00.000Z',
      updatedAt: '2026-11-01T00:00:00.000Z',
      notes: 'Root Owner Identity: FARUKH BUSINESSMAN WALA',
    },
  ]);

  const [adminConfig, setAdminConfig] = useState<AdminConfig>(() => {
    const saved = localStorage.getItem('vip_admin_config');
    return saved ? JSON.parse(saved) : DEFAULT_ADMIN_CONFIG;
  });

  // Verify connection on boot
  useEffect(() => {
    testConnection();
  }, []);

  // Fetch accounts whitelist
  const fetchAuthorizedAccounts = async () => {
    try {
      const res = await fetch('/api/authorized-accounts');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setAuthorizedAccounts(data.data);
        }
      }
    } catch (err) {
      console.warn('Could not fetch authorized accounts:', err);
    }
  };

  useEffect(() => {
    fetchAuthorizedAccounts();
  }, []);

  // Check user authorization with backend
  const verifyAccess = async (userEmail: string) => {
    const clean = userEmail.toLowerCase().trim();
    if (clean === PERMANENT_SUPER_OWNER_GMAIL.toLowerCase()) {
      setIsAuthorized(true);
      setIsSuperOwner(true);
      setAccessDenied(false);
      return;
    }

    try {
      const res = await fetch('/api/check-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: clean }),
      });

      const data = await res.json();
      if (res.ok && data.authorized) {
        setIsAuthorized(true);
        setIsSuperOwner(data.role === 'super_owner');
        setAccessDenied(false);
      } else {
        setIsAuthorized(false);
        setIsSuperOwner(false);
        setAccessDenied(true);
        setAccessDeniedMessage(
          data.error || 'ACCESS DENIED: Your Gmail account is not authorized to access this private portal.'
        );
      }
    } catch (err) {
      console.warn('Access check error:', err);
      // If network glitch but user is root owner
      if (clean === PERMANENT_SUPER_OWNER_GMAIL.toLowerCase()) {
        setIsAuthorized(true);
        setIsSuperOwner(true);
        setAccessDenied(false);
      }
    }
  };

  // Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user && user.email) {
        await verifyAccess(user.email);

        const isOwnerAccount = user.email.toLowerCase() === PERMANENT_SUPER_OWNER_GMAIL.toLowerCase();
        const profile: UserProfile = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || (isOwnerAccount ? 'FARUKH BUSINESSMAN WALA' : user.email.split('@')[0]),
          photoURL: user.photoURL || undefined,
          role: isOwnerAccount ? 'super_owner' : 'vip',
          tier: isOwnerAccount ? 'Super Owner' : 'Invited Member',
          createdAt: new Date().toISOString(),
        };
        setUserProfile(profile);

        try {
          const userDocRef = doc(db, 'users', user.uid);
          const snap = await getDoc(userDocRef);
          if (!snap.exists()) {
            await setDoc(userDocRef, profile);
          }
        } catch (err) {
          console.warn('Profile sync note:', err);
        }
      } else {
        setUserProfile(null);
        setIsAuthorized(false);
        setIsSuperOwner(false);
        setAccessDenied(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStartupDismiss = (dismissed: boolean) => {
    setStartupScreenDismissed(dismissed);
    localStorage.setItem('vip_startup_dismissed', dismissed ? 'true' : 'false');
  };

  const signInWithGoogle = async () => {
    setAccessDenied(false);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user.email) {
        await verifyAccess(result.user.email);
      }
      handleStartupDismiss(true);
    } catch (error: any) {
      console.error('Google Sign-In failed:', error);
      if (error?.code !== 'auth/popup-closed-by-user') {
        alert(`Authentication Error: ${error?.message || 'Failed to authenticate with Google'}`);
      }
    }
  };

  const signOutUser = async () => {
    try {
      await fbSignOut(auth);
      setIsAuthorized(false);
      setIsSuperOwner(false);
      setAccessDenied(false);
      handleStartupDismiss(false);
    } catch (error) {
      console.error('Sign-out failed:', error);
    }
  };

  const dismissAccessDenied = () => {
    setAccessDenied(false);
    signOutUser();
  };

  // Gmail Invitation System Operations
  const addAuthorizedGmail = async (
    email: string,
    role: AuthorizedRole,
    label?: string,
    notes?: string
  ): Promise<boolean> => {
    try {
      const res = await fetch('/api/authorized-accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          role,
          label,
          notes,
          requesterEmail: currentUser?.email || PERMANENT_SUPER_OWNER_GMAIL,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        await fetchAuthorizedAccounts();
        return true;
      } else {
        alert(data.error || 'Failed to add authorized account.');
        return false;
      }
    } catch (err) {
      alert('Network error while adding authorized account.');
      return false;
    }
  };

  const updateAccountStatus = async (id: string, status: AuthorizedStatus): Promise<boolean> => {
    try {
      const res = await fetch(`/api/authorized-accounts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          requesterEmail: currentUser?.email || PERMANENT_SUPER_OWNER_GMAIL,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        await fetchAuthorizedAccounts();
        return true;
      } else {
        alert(data.error || 'Failed to update account status.');
        return false;
      }
    } catch (err) {
      alert('Error updating status.');
      return false;
    }
  };

  const removeAuthorizedAccount = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(
        `/api/authorized-accounts/${id}?requesterEmail=${encodeURIComponent(
          currentUser?.email || PERMANENT_SUPER_OWNER_GMAIL
        )}`,
        { method: 'DELETE' }
      );

      const data = await res.json();
      if (res.ok && data.success) {
        await fetchAuthorizedAccounts();
        return true;
      } else {
        alert(data.error || 'Failed to remove account.');
        return false;
      }
    } catch (err) {
      alert('Error deleting account.');
      return false;
    }
  };

  const updateAdminConfig = async (newConfig: Partial<AdminConfig>) => {
    const updated = { ...adminConfig, ...newConfig, updatedAt: new Date().toISOString() };
    setAdminConfig(updated);
    localStorage.setItem('vip_admin_config', JSON.stringify(updated));

    if (currentUser) {
      try {
        await setDoc(doc(db, 'config', 'global_settings'), updated, { merge: true });
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, 'config/global_settings');
      }
    }
  };

  const [adminUnlocked, setAdminUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem('vip_admin_unlocked') === 'true';
  });

  const unlockAdminWithKey = (key: string): boolean => {
    const isOwnerUser = currentUser?.email?.toLowerCase() === PERMANENT_SUPER_OWNER_GMAIL.toLowerCase();
    const valid = key.trim() === 'FARUKH_VIP_2026' || key.trim() === '962962' || isOwnerUser;
    if (valid) {
      setAdminUnlocked(true);
      sessionStorage.setItem('vip_admin_unlocked', 'true');
      return true;
    }
    return false;
  };

  const lockAdminSession = () => {
    setAdminUnlocked(false);
    sessionStorage.removeItem('vip_admin_unlocked');
  };

  const isAdmin = isSuperOwner || adminUnlocked;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        isSuperOwner,
        isOwner: isSuperOwner,
        isAdmin,
        isAuthorized,
        accessDenied,
        accessDeniedMessage,
        loading,
        startupScreenDismissed,
        owner2FaVerified,
        remainingSessionSeconds,
        authorizedAccounts,
        adminConfig,
        ownerWhatsApp: PERMANENT_OWNER_WHATSAPP,
        setStartupScreenDismissed: handleStartupDismiss,
        signInWithGoogle,
        signOutUser,
        dismissAccessDenied,
        verifyOwner2Fa,
        lockOwnerSession,
        unlockAdminWithKey,
        lockAdminSession,
        fetchAuthorizedAccounts,
        addAuthorizedGmail,
        updateAccountStatus,
        removeAuthorizedAccount,
        updateAdminConfig,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
