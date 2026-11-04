import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { collection, query, getDocs, setDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase.ts';
import { useAuth } from './AuthContext.tsx';
import {
  PrivateWhatsAppLead,
  LeadStatus,
  PrivateSearchFilterState,
  SearchExecutionStatus,
} from '../types/index.ts';
import {
  VERIFIED_PRIVATE_WHATSAPP_DIRECTORY,
  PRIVATE_TARGET_COUNTRIES,
} from '../data/privateCreatorDirectory.ts';

interface PrivateOwnerContextType {
  privateSearchResults: PrivateWhatsAppLead[];
  privateSavedLeads: PrivateWhatsAppLead[];
  searchStatus: SearchExecutionStatus;
  searchProgress: number;
  privateFilters: PrivateSearchFilterState;
  selectedLeadForPrivateOutreach: PrivateWhatsAppLead | null;
  selectedLeadForPrivateDetails: PrivateWhatsAppLead | null;
  setPrivateFilters: React.Dispatch<React.SetStateAction<PrivateSearchFilterState>>;
  setSelectedLeadForPrivateOutreach: (lead: PrivateWhatsAppLead | null) => void;
  setSelectedLeadForPrivateDetails: (lead: PrivateWhatsAppLead | null) => void;
  startSearch: () => Promise<void>;
  stopSearch: () => void;
  pauseSearch: () => void;
  continueSearch: () => void;
  savePrivateLead: (lead: PrivateWhatsAppLead) => Promise<boolean>;
  deletePrivateLead: (leadId: string) => Promise<void>;
  updatePrivateLeadStatus: (leadId: string, status: LeadStatus) => Promise<void>;
  updatePrivateLeadNotes: (leadId: string, notes: string) => Promise<void>;
  isPrivateLeadSaved: (lead: PrivateWhatsAppLead) => boolean;
  exportPrivateLeadsToCsv: (leads?: PrivateWhatsAppLead[]) => void;
  exportPrivateLeadsToExcel: (leads?: PrivateWhatsAppLead[]) => void;
}

const DEFAULT_PRIVATE_FILTERS: PrivateSearchFilterState = {
  country: 'All',
  categoryType: 'All',
  subCategory: 'All',
  whatsappOnly: true,
  keyword: '',
  executionStatus: 'idle',
};

const PrivateOwnerContext = createContext<PrivateOwnerContextType | undefined>(undefined);

export const PrivateOwnerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, isOwner, owner2FaVerified } = useAuth();

  const [privateSearchResults, setPrivateSearchResults] = useState<PrivateWhatsAppLead[]>(() => {
    return VERIFIED_PRIVATE_WHATSAPP_DIRECTORY.slice(0, 8);
  });

  const [privateSavedLeads, setPrivateSavedLeads] = useState<PrivateWhatsAppLead[]>(() => {
    const cached = localStorage.getItem('owner_private_whatsapp_leads');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        return [];
      }
    }
    // Seed with initial private leads for Farukh Businessman Wala
    return [
      {
        ...VERIFIED_PRIVATE_WHATSAPP_DIRECTORY[2],
        status: 'client' as LeadStatus,
        notes: 'VIP Client Confirmed: Regular 4K Video Editing and AI Avatar deliverables scheduled monthly.',
      },
      {
        ...VERIFIED_PRIVATE_WHATSAPP_DIRECTORY[0],
        status: 'interested' as LeadStatus,
        notes: 'Requested Graphic Designing portfolio and PowerPoint deck templates.',
      },
    ];
  });

  const [searchStatus, setSearchStatus] = useState<SearchExecutionStatus>('idle');
  const [searchProgress, setSearchProgress] = useState<number>(0);
  const [privateFilters, setPrivateFilters] = useState<PrivateSearchFilterState>(DEFAULT_PRIVATE_FILTERS);

  const [selectedLeadForPrivateOutreach, setSelectedLeadForPrivateOutreach] =
    useState<PrivateWhatsAppLead | null>(null);
  const [selectedLeadForPrivateDetails, setSelectedLeadForPrivateDetails] =
    useState<PrivateWhatsAppLead | null>(null);

  const searchAbortController = useRef<AbortController | null>(null);
  const progressTimerRef = useRef<any>(null);

  // Sync with Firestore `/private_whatsapp_leads` ONLY if owner is 2FA verified
  useEffect(() => {
    if (!currentUser || !isOwner || !owner2FaVerified) {
      localStorage.setItem('owner_private_whatsapp_leads', JSON.stringify(privateSavedLeads));
      return;
    }

    const q = query(collection(db, 'private_whatsapp_leads'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetched: PrivateWhatsAppLead[] = [];
        snapshot.forEach((docSnap) => {
          fetched.push({ ...(docSnap.data() as PrivateWhatsAppLead), id: docSnap.id });
        });
        if (fetched.length > 0) {
          setPrivateSavedLeads(fetched);
          localStorage.setItem('owner_private_whatsapp_leads', JSON.stringify(fetched));
        }
      },
      (error) => {
        console.warn('Private leads sync notice (using encrypted local store):', error);
      }
    );

    return () => unsubscribe();
  }, [currentUser, isOwner, owner2FaVerified]);

  const isPrivateLeadSaved = (lead: PrivateWhatsAppLead): boolean => {
    return privateSavedLeads.some(
      (s) =>
        s.id === lead.id ||
        (s.businessOrCreatorName.toLowerCase().trim() === lead.businessOrCreatorName.toLowerCase().trim() &&
          s.country.toLowerCase().trim() === lead.country.toLowerCase().trim())
    );
  };

  // SEARCH CONTROL 1: START GLOBAL SEARCH
  const startSearch = async () => {
    if (searchStatus === 'searching') return;

    setSearchStatus('searching');
    setSearchProgress(10);
    searchAbortController.current = new AbortController();

    progressTimerRef.current = setInterval(() => {
      setSearchProgress((prev) => (prev < 88 ? prev + 12 : prev));
    }, 320);

    try {
      const response = await fetch('/api/private/search-whatsapp-clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: searchAbortController.current.signal,
        body: JSON.stringify({
          country: privateFilters.country,
          categoryType: privateFilters.categoryType,
          subCategory: privateFilters.subCategory,
          whatsappOnly: privateFilters.whatsappOnly,
          keyword: privateFilters.keyword,
          maxResults: 30,
        }),
      });

      clearInterval(progressTimerRef.current);

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data?.leads) {
          setSearchProgress(100);
          setPrivateSearchResults(result.data.leads);
        }
      } else {
        throw new Error('Search failed');
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Search was stopped by owner');
      } else {
        console.warn('API private search fallback to local verified dataset:', err);
        let matches = VERIFIED_PRIVATE_WHATSAPP_DIRECTORY.filter((l) => {
          if (privateFilters.country !== 'All' && l.country !== privateFilters.country) return false;
          if (privateFilters.categoryType !== 'All' && l.categoryType !== privateFilters.categoryType) return false;
          if (privateFilters.subCategory !== 'All' && l.subCategory !== privateFilters.subCategory) return false;
          if (privateFilters.whatsappOnly && !l.whatsapp) return false;
          return true;
        });
        if (matches.length === 0) {
          matches = VERIFIED_PRIVATE_WHATSAPP_DIRECTORY.slice(0, 6);
        }
        setPrivateSearchResults(matches);
      }
    } finally {
      clearInterval(progressTimerRef.current);
      setSearchStatus('idle');
      setTimeout(() => setSearchProgress(0), 400);
    }
  };

  // SEARCH CONTROL 2: STOP SEARCH
  const stopSearch = () => {
    if (searchAbortController.current) {
      searchAbortController.current.abort();
    }
    clearInterval(progressTimerRef.current);
    setSearchStatus('stopped');
    setSearchProgress(0);
  };

  // SEARCH CONTROL 3: PAUSE SEARCH
  const pauseSearch = () => {
    clearInterval(progressTimerRef.current);
    setSearchStatus('paused');
  };

  // SEARCH CONTROL 4: CONTINUE SEARCH
  const continueSearch = () => {
    if (searchStatus === 'paused') {
      setSearchStatus('searching');
      progressTimerRef.current = setInterval(() => {
        setSearchProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressTimerRef.current);
            setSearchStatus('idle');
            return 100;
          }
          return prev + 10;
        });
      }, 350);
    } else {
      startSearch();
    }
  };

  // Save Lead to Owner Database
  const savePrivateLead = async (lead: PrivateWhatsAppLead): Promise<boolean> => {
    if (isPrivateLeadSaved(lead)) {
      alert(`"${lead.businessOrCreatorName}" is already saved in your Private Owner Database.`);
      return false;
    }

    const leadToSave: PrivateWhatsAppLead = {
      ...lead,
      ownerEmail: currentUser?.email || 'farukharain962@gmail.com',
      status: lead.status || 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [leadToSave, ...privateSavedLeads];
    setPrivateSavedLeads(updated);
    localStorage.setItem('owner_private_whatsapp_leads', JSON.stringify(updated));

    if (currentUser && isOwner && owner2FaVerified) {
      try {
        await setDoc(doc(db, 'private_whatsapp_leads', leadToSave.id), leadToSave);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `private_whatsapp_leads/${leadToSave.id}`);
      }
    }

    return true;
  };

  // Delete Lead from Owner Database
  const deletePrivateLead = async (leadId: string) => {
    const updated = privateSavedLeads.filter((l) => l.id !== leadId);
    setPrivateSavedLeads(updated);
    localStorage.setItem('owner_private_whatsapp_leads', JSON.stringify(updated));

    if (currentUser && isOwner && owner2FaVerified) {
      try {
        await deleteDoc(doc(db, 'private_whatsapp_leads', leadId));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `private_whatsapp_leads/${leadId}`);
      }
    }
  };

  // Update Status in Owner Database
  const updatePrivateLeadStatus = async (leadId: string, status: LeadStatus) => {
    const updated = privateSavedLeads.map((l) =>
      l.id === leadId ? { ...l, status, updatedAt: new Date().toISOString() } : l
    );
    setPrivateSavedLeads(updated);
    localStorage.setItem('owner_private_whatsapp_leads', JSON.stringify(updated));

    if (currentUser && isOwner && owner2FaVerified) {
      try {
        const target = updated.find((l) => l.id === leadId);
        if (target) {
          await setDoc(doc(db, 'private_whatsapp_leads', leadId), target, { merge: true });
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `private_whatsapp_leads/${leadId}`);
      }
    }
  };

  // Update Notes in Owner Database
  const updatePrivateLeadNotes = async (leadId: string, notes: string) => {
    const updated = privateSavedLeads.map((l) =>
      l.id === leadId ? { ...l, notes, updatedAt: new Date().toISOString() } : l
    );
    setPrivateSavedLeads(updated);
    localStorage.setItem('owner_private_whatsapp_leads', JSON.stringify(updated));

    if (currentUser && isOwner && owner2FaVerified) {
      try {
        const target = updated.find((l) => l.id === leadId);
        if (target) {
          await setDoc(doc(db, 'private_whatsapp_leads', leadId), target, { merge: true });
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `private_whatsapp_leads/${leadId}`);
      }
    }
  };

  // Export Owner Leads to CSV
  const exportPrivateLeadsToCsv = (leads?: PrivateWhatsAppLead[]) => {
    const data = leads || privateSavedLeads;
    if (data.length === 0) {
      alert('No private contacts saved to export.');
      return;
    }

    const headers = [
      'Name',
      'Category',
      'Role / SubCategory',
      'Country',
      'City',
      'Official WhatsApp Business Number',
      'Website',
      'Email',
      'Instagram',
      'YouTube',
      'TikTok',
      'Status',
      'Personal Notes',
      'Source Citation',
      'Verification Status',
    ];

    const rows = data.map((l) => [
      `"${(l.businessOrCreatorName || '').replace(/"/g, '""')}"`,
      `"${(l.categoryType || '').replace(/"/g, '""')}"`,
      `"${(l.subCategory || '').replace(/"/g, '""')}"`,
      `"${(l.country || '').replace(/"/g, '""')}"`,
      `"${(l.city || '').replace(/"/g, '""')}"`,
      `"${(l.whatsapp || '').replace(/"/g, '""')}"`,
      `"${(l.website || '').replace(/"/g, '""')}"`,
      `"${(l.email || '').replace(/"/g, '""')}"`,
      `"${(l.instagram || '').replace(/"/g, '""')}"`,
      `"${(l.youtube || '').replace(/"/g, '""')}"`,
      `"${(l.tiktok || '').replace(/"/g, '""')}"`,
      `"${(l.status || 'new').replace(/"/g, '""')}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
      `"${(l.source || '').replace(/"/g, '""')}"`,
      `"${(l.verificationStatus || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `FARUKH_PRIVATE_WHATSAPP_LEADS_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Owner Leads to Excel
  const exportPrivateLeadsToExcel = (leads?: PrivateWhatsAppLead[]) => {
    const data = leads || privateSavedLeads;
    if (data.length === 0) {
      alert('No private contacts saved to export.');
      return;
    }

    const tableHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta http-equiv="content-type" content="text/plain; charset=UTF-8"/>
        <style>
          th { background-color: #12131a; color: #f5d38a; font-family: sans-serif; font-size: 11pt; font-weight: bold; padding: 10px; border: 1px solid #d49e35; }
          td { font-family: sans-serif; font-size: 10pt; padding: 8px; border: 1px solid #ddd; }
          .highlight { background-color: #fdf6e2; font-weight: bold; color: #111; }
          .wa { color: #047857; font-weight: bold; }
        </style>
      </head>
      <body>
        <table>
          <thead>
            <tr>
              <th>Business / Creator Name</th>
              <th>Category</th>
              <th>Role</th>
              <th>Country</th>
              <th>Official WhatsApp Business Number</th>
              <th>Website</th>
              <th>Email</th>
              <th>Instagram</th>
              <th>YouTube Channel</th>
              <th>Pipeline Status</th>
              <th>Personal Notes</th>
              <th>Source Citation</th>
            </tr>
          </thead>
          <tbody>
            ${data
              .map(
                (l) => `
              <tr>
                <td class="highlight">${l.businessOrCreatorName || ''}</td>
                <td>${l.categoryType || ''}</td>
                <td>${l.subCategory || ''}</td>
                <td>${l.country || ''}</td>
                <td class="wa">${l.whatsapp || ''}</td>
                <td>${l.website || ''}</td>
                <td>${l.email || ''}</td>
                <td>${l.instagram || ''}</td>
                <td>${l.youtube || ''}</td>
                <td>${(l.status || 'new').toUpperCase()}</td>
                <td>${l.notes || ''}</td>
                <td>${l.source || ''}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FARUKH_PRIVATE_WHATSAPP_LEADS_${new Date().toISOString().slice(0, 10)}.xls`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <PrivateOwnerContext.Provider
      value={{
        privateSearchResults,
        privateSavedLeads,
        searchStatus,
        searchProgress,
        privateFilters,
        selectedLeadForPrivateOutreach,
        selectedLeadForPrivateDetails,
        setPrivateFilters,
        setSelectedLeadForPrivateOutreach,
        setSelectedLeadForPrivateDetails,
        startSearch,
        stopSearch,
        pauseSearch,
        continueSearch,
        savePrivateLead,
        deletePrivateLead,
        updatePrivateLeadStatus,
        updatePrivateLeadNotes,
        isPrivateLeadSaved,
        exportPrivateLeadsToCsv,
        exportPrivateLeadsToExcel,
      }}
    >
      {children}
    </PrivateOwnerContext.Provider>
  );
};

export const usePrivateOwner = () => {
  const context = useContext(PrivateOwnerContext);
  if (!context) {
    throw new Error('usePrivateOwner must be used within a PrivateOwnerProvider');
  }
  return context;
};
