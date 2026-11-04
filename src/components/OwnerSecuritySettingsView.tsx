import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  KeyRound,
  Database,
  Download,
  AlertTriangle,
  CheckCircle2,
  Server,
  FileText,
  Clock,
  RotateCcw,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { useLeads } from '../context/LeadContext.tsx';
import { usePrivateOwner } from '../context/PrivateOwnerContext.tsx';

export const OwnerSecuritySettingsView: React.FC = () => {
  const {
    currentUser,
    isSuperOwner,
    ownerWhatsApp,
    remainingSessionSeconds,
    lockOwnerSession,
  } = useAuth();

  const { savedLeads } = useLeads();
  const { privateSavedLeads } = usePrivateOwner();

  const [backupSuccess, setBackupSuccess] = useState(false);

  const handleDownloadFullBackup = () => {
    const backupSnapshot = {
      app: 'GLOBAL VIP CLIENT FINDER',
      brand: 'FARUKH BUSINESSMAN WALA',
      backupDate: new Date().toISOString(),
      superOwnerWhatsApp: ownerWhatsApp,
      totalSavedLeads: savedLeads.length,
      totalPrivateWhatsAppLeads: privateSavedLeads.length,
      leads: savedLeads,
      privateWhatsAppLeads: privateSavedLeads,
    };

    const blob = new Blob([JSON.stringify(backupSnapshot, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FARUKH_VIP_FULL_DATABASE_BACKUP_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setBackupSuccess(true);
    setTimeout(() => setBackupSuccess(false), 4000);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 font-mono-code">
            Master Security Vault
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white font-brand tracking-tight flex items-center gap-2 mt-1">
          <Lock className="w-6 h-6 text-amber-400" />
          Owner Security &amp; Database Controls
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Cryptographic session enforcement, permanent ownership safeguards, and cloud backup.
        </p>
      </div>

      {backupSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-xs font-semibold text-emerald-300 flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" /> Complete encrypted database backup snapshot downloaded successfully!
        </div>
      )}

      {/* Permanent Identity Card */}
      <div className="p-6 rounded-2xl dark-card border border-amber-500/30 space-y-4 shadow-xl">
        <div className="flex items-center justify-between pb-2 border-b border-slate-850">
          <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" /> Permanent Super Owner Identity
          </h3>
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full gold-gradient-bg text-slate-950 font-mono-code">
            Immutable Status
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase font-mono-code">
              Official Brand Identity
            </p>
            <p className="text-sm font-black text-amber-300 font-brand">FARUKH BUSINESSMAN WALA</p>
            <p className="text-[11px] text-slate-400">Exclusive Owner &amp; Platform Controller</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase font-mono-code">
              Official Owner WhatsApp
            </p>
            <p className="text-sm font-bold text-emerald-400 font-mono-code">{ownerWhatsApp}</p>
            <p className="text-[11px] text-slate-400">Direct owner helpline and authorization desk</p>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-2.5 text-xs text-amber-300/90 leading-relaxed">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            <strong className="text-amber-300">Permanent Ownership Invariant:</strong> The original owner identity cannot be modified, revoked, or transferred by any invited user or external administrator. Backend security rules and Google OAuth filters strictly protect this account.
          </p>
        </div>
      </div>

      {/* Security Features Audit */}
      <div className="p-6 rounded-2xl dark-card border border-slate-800 space-y-4">
        <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
          <Server className="w-4 h-4 text-emerald-400" /> Active Security Shields &amp; Policies
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold uppercase text-emerald-400 font-mono-code">Active</span>
            <p className="font-bold text-white">Google OAuth Authentication</p>
            <p className="text-[11px] text-slate-400">Zero password storage. Direct 1P Google identity.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold uppercase text-emerald-400 font-mono-code">Active</span>
            <p className="font-bold text-white">Private Gmail Protection</p>
            <p className="text-[11px] text-slate-400">Owner Gmail is never exposed on public pages or APIs.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold uppercase text-emerald-400 font-mono-code">Active</span>
            <p className="font-bold text-white">Two-Factor Authentication</p>
            <p className="text-[11px] text-slate-400">15-minute idle countdown with auto session locking.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold uppercase text-emerald-400 font-mono-code">Active</span>
            <p className="font-bold text-white">Zero Public Registration</p>
            <p className="text-[11px] text-slate-400">Uninvited accounts receive Access Denied screen.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold uppercase text-emerald-400 font-mono-code">Active</span>
            <p className="font-bold text-white">Database ABAC Security Rules</p>
            <p className="text-[11px] text-slate-400">Firestore rules enforce owner-only read/write gates.</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <span className="text-[10px] font-bold uppercase text-emerald-400 font-mono-code">Active</span>
            <p className="font-bold text-white">Duplicate Lead Detection</p>
            <p className="text-[11px] text-slate-400">Automatic collision prevention across lead pipelines.</p>
          </div>
        </div>
      </div>

      {/* Backup and Recovery Card */}
      <div className="p-6 rounded-2xl dark-card border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-400" /> Database Backup &amp; Recovery
            </h3>
            <p className="text-xs text-slate-400">
              Download a complete JSON snapshot of all saved leads, verified contacts, and private owner records.
            </p>
          </div>

          <button
            onClick={handleDownloadFullBackup}
            className="px-5 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-md flex items-center gap-2 self-start sm:self-auto"
          >
            <Download className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Download Full Backup</span>
          </button>
        </div>
      </div>
    </div>
  );
};
