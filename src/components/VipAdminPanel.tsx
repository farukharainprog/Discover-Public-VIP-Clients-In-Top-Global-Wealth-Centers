import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Unlock,
  Sliders,
  Users,
  Database,
  BarChart3,
  ToggleLeft,
  ToggleRight,
  Save,
  CheckCircle2,
  AlertTriangle,
  KeyRound,
  Radio,
  FileSpreadsheet,
  Globe2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { useLeads } from '../context/LeadContext.tsx';

export const VipAdminPanel: React.FC = () => {
  const {
    currentUser,
    isAdmin,
    adminConfig,
    updateAdminConfig,
    unlockAdminWithKey,
    lockAdminSession,
    signInWithGoogle,
  } = useAuth();

  const { stats, savedLeads } = useLeads();

  const [inputKey, setInputKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [localConfig, setLocalConfig] = useState(adminConfig);
  const [isSaving, setIsSaving] = useState(false);

  // Simulated list of platform subscribers
  const [subscribers, setSubscribers] = useState([
    {
      id: 'sub-1',
      email: 'farukharain962@gmail.com',
      name: 'Farukh Businessman Wala',
      tier: 'Ultra VIP (Owner)',
      status: 'Active',
      leadsCollected: 48,
      lastLogin: 'Today, 01:42 AM',
    },
    {
      id: 'sub-2',
      email: 'agency.dubai@prestige-media.ae',
      name: 'Prestige Media Partner',
      tier: 'VIP Gold',
      status: 'Active',
      leadsCollected: 29,
      lastLogin: 'Yesterday, 04:15 PM',
    },
    {
      id: 'sub-3',
      email: 'creator.london@motionfx.co.uk',
      name: 'London Creative Studio',
      tier: 'VIP Gold',
      status: 'Active',
      leadsCollected: 14,
      lastLogin: '2 days ago',
    },
    {
      id: 'sub-4',
      email: 'investor.riyadh@saudi-capital.com',
      name: 'Riyadh Growth Capital',
      tier: 'Standard',
      status: 'Pending Verification',
      leadsCollected: 3,
      lastLogin: '3 days ago',
    },
  ]);

  const handleUnlockWithKey = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = unlockAdminWithKey(inputKey);
    if (!success) {
      setErrorMsg('Invalid Master Administrator Key. Access Denied.');
    } else {
      setInputKey('');
    }
  };

  const handleSaveConfig = async () => {
    setIsSaving(true);
    try {
      await updateAdminConfig(localConfig);
      setSuccessMsg('VIP System Configurations updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setErrorMsg('Failed to save configuration.');
    } finally {
      setIsSaving(false);
    }
  };

  const toggleUserStatus = (id: string) => {
    setSubscribers((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: s.status === 'Active' ? 'Suspended' : 'Active' } : s
      )
    );
  };

  // If user is not authorized, show the Secure Administrator Gate
  if (!isAdmin) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4 animate-fadeIn">
        <div className="p-8 rounded-2xl dark-card border border-amber-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl gold-gradient-bg flex items-center justify-center mx-auto text-slate-950 shadow-lg shadow-amber-500/20">
            <Lock className="w-8 h-8 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
              Restricted Area
            </span>
            <h2 className="text-2xl font-black text-white font-brand">VIP Administrator Gate</h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              This control center is exclusively reserved for the authorized master administrator.
              Normal users cannot access system settings.
            </p>
          </div>

          {/* Option 1: Google Login with Master Email */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 text-left">
            <p className="text-xs font-bold text-slate-200">
              Method 1: Google Sign-in with Master Email
            </p>
            <p className="text-[11px] text-slate-400">
              Sign in with authorized administrator account: <code className="text-amber-300">farukharain962@gmail.com</code>
            </p>
            <button
              onClick={signInWithGoogle}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-300 font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              Sign In with Master Email
            </button>
          </div>

          {/* Option 2: Passcode Entry */}
          <form onSubmit={handleUnlockWithKey} className="space-y-3 text-left">
            <label className="block text-xs font-bold text-slate-200">
              Method 2: Master Administrator Passkey
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="Enter VIP Master Key..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-xs text-white outline-none"
              />
            </div>
            {errorMsg && <p className="text-xs text-red-400 font-medium">{errorMsg}</p>}
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-md"
            >
              Unlock Master Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authorized Admin View
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono-code">
              Master Session Active
            </span>
          </div>
          <h2 className="text-2xl font-black text-white font-brand mt-1 flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-amber-400" />
            VIP Executive Administrator Console
          </h2>
          <p className="text-xs text-slate-400">
            Authenticated Administrator: <span className="text-amber-300 font-semibold">{currentUser?.email || 'farukharain962@gmail.com (Master Passkey Session)'}</span>
          </p>
        </div>

        <button
          onClick={lockAdminSession}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer self-start sm:self-auto"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>Lock Admin Session</span>
        </button>
      </div>

      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {successMsg}
        </div>
      )}

      {/* Feature Toggles & System Permissions */}
      <div className="p-6 rounded-2xl dark-card border border-amber-500/30 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" /> System Features &amp; Search Permissions
            </h3>
            <p className="text-xs text-slate-400">
              Instantly enable or disable core features, export permissions, and discovery engines.
            </p>
          </div>

          <button
            onClick={handleSaveConfig}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-md disabled:opacity-60"
          >
            <Save className="w-3.5 h-3.5" /> {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Toggle 1: Global Search */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">Global Client Search</span>
              <button
                type="button"
                onClick={() =>
                  setLocalConfig((prev) => ({ ...prev, searchEnabled: !prev.searchEnabled }))
                }
                className="text-amber-400 cursor-pointer"
              >
                {localConfig.searchEnabled ? (
                  <ToggleRight className="w-7 h-7 text-amber-400" />
                ) : (
                  <ToggleLeft className="w-7 h-7 text-slate-600" />
                )}
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Controls whether non-admin members can query public directories and AI search.
            </p>
          </div>

          {/* Toggle 2: CSV Export */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">CSV Leads Export</span>
              <button
                type="button"
                onClick={() =>
                  setLocalConfig((prev) => ({ ...prev, exportCsvEnabled: !prev.exportCsvEnabled }))
                }
                className="text-amber-400 cursor-pointer"
              >
                {localConfig.exportCsvEnabled ? (
                  <ToggleRight className="w-7 h-7 text-amber-400" />
                ) : (
                  <ToggleLeft className="w-7 h-7 text-slate-600" />
                )}
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Allow members to export collected verified contacts to CSV format.
            </p>
          </div>

          {/* Toggle 3: Excel Export */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">Excel Leads Export</span>
              <button
                type="button"
                onClick={() =>
                  setLocalConfig((prev) => ({
                    ...prev,
                    exportExcelEnabled: !prev.exportExcelEnabled,
                  }))
                }
                className="text-amber-400 cursor-pointer"
              >
                {localConfig.exportExcelEnabled ? (
                  <ToggleRight className="w-7 h-7 text-amber-400" />
                ) : (
                  <ToggleLeft className="w-7 h-7 text-slate-600" />
                )}
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Allow members to export collected verified contacts to native Excel spreadsheets.
            </p>
          </div>

          {/* Toggle 4: AI Outreach */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">AI Outreach Generator</span>
              <button
                type="button"
                onClick={() =>
                  setLocalConfig((prev) => ({
                    ...prev,
                    aiOutreachEnabled: !prev.aiOutreachEnabled,
                  }))
                }
                className="text-amber-400 cursor-pointer"
              >
                {localConfig.aiOutreachEnabled ? (
                  <ToggleRight className="w-7 h-7 text-amber-400" />
                ) : (
                  <ToggleLeft className="w-7 h-7 text-slate-600" />
                )}
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Enable the Gemini AI-powered English personalized message generator.
            </p>
          </div>
        </div>

        {/* Search Rate Limits & System Announcement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">
              Maximum Discovered Leads Per Query
            </label>
            <input
              type="number"
              min={5}
              max={100}
              value={localConfig.maxLeadsPerSearch}
              onChange={(e) =>
                setLocalConfig((prev) => ({
                  ...prev,
                  maxLeadsPerSearch: Number(e.target.value) || 25,
                }))
              }
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-amber-400"
            />
            <p className="text-[11px] text-slate-500">
              Prevents server quota exhaustion while delivering rich verified batches.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">
              System VIP Announcement Banner
            </label>
            <input
              type="text"
              value={localConfig.vipAnnouncement}
              onChange={(e) =>
                setLocalConfig((prev) => ({ ...prev, vipAnnouncement: e.target.value }))
              }
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-amber-400"
            />
            <p className="text-[11px] text-slate-500">
              Broadcasted across active member workspaces and header alerts.
            </p>
          </div>
        </div>
      </div>

      {/* User Management & VIP Subscriptions */}
      <div className="p-6 rounded-2xl dark-card border border-slate-800 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-400" /> Member Accounts &amp; VIP Subscriptions
            </h3>
            <p className="text-xs text-slate-400">
              Control user access, assign subscription tiers, and audit discovery activity.
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-mono-code">
            Total Members: {subscribers.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono-code text-[11px]">
                <th className="pb-3 font-semibold">User</th>
                <th className="pb-3 font-semibold">Tier</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Leads Saved</th>
                <th className="pb-3 font-semibold">Last Active</th>
                <th className="pb-3 font-semibold text-right">Access Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-900/40">
                  <td className="py-3.5 pr-2">
                    <p className="font-bold text-white">{sub.name}</p>
                    <p className="text-[11px] text-slate-400">{sub.email}</p>
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        sub.tier.includes('Ultra')
                          ? 'gold-gradient-bg text-slate-950'
                          : sub.tier.includes('VIP')
                          ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {sub.tier}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                        sub.status === 'Active' ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          sub.status === 'Active' ? 'bg-emerald-400' : 'bg-amber-400'
                        }`}
                      ></span>
                      {sub.status}
                    </span>
                  </td>
                  <td className="py-3.5 font-mono-code text-slate-300">{sub.leadsCollected}</td>
                  <td className="py-3.5 text-slate-400">{sub.lastLogin}</td>
                  <td className="py-3.5 text-right">
                    {sub.tier.includes('Owner') ? (
                      <span className="text-[11px] text-amber-400 font-bold">Primary Admin</span>
                    ) : (
                      <button
                        onClick={() => toggleUserStatus(sub.id)}
                        className={`px-2.5 py-1 rounded text-[11px] font-semibold cursor-pointer ${
                          sub.status === 'Active'
                            ? 'bg-red-950/60 text-red-300 hover:bg-red-900'
                            : 'bg-emerald-950/60 text-emerald-300 hover:bg-emerald-900'
                        }`}
                      >
                        {sub.status === 'Active' ? 'Suspend' : 'Activate'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
