import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  ShieldCheck,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  PauseCircle,
  Trash2,
  RotateCcw,
  Mail,
  Lock,
  Sparkles,
  Info,
  Send,
  Check,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { AuthorizedRole, AuthorizedStatus, AuthorizedAccount } from '../types/index.ts';

export const GmailAccessManager: React.FC = () => {
  const {
    authorizedAccounts,
    addAuthorizedGmail,
    updateAccountStatus,
    removeAuthorizedAccount,
    isSuperOwner,
  } = useAuth();

  const [inputEmail, setInputEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<AuthorizedRole>('invited_member');
  const [accountLabel, setAccountLabel] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successToast, setSuccessToast] = useState('');

  const handleAddAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputEmail.trim() || !inputEmail.includes('@')) {
      alert('Please enter a valid Gmail address.');
      return;
    }

    setIsSubmitting(true);
    const success = await addAuthorizedGmail(
      inputEmail.trim(),
      selectedRole,
      accountLabel.trim() || 'Authorized Member',
      notes.trim()
    );
    setIsSubmitting(false);

    if (success) {
      setInputEmail('');
      setAccountLabel('');
      setNotes('');
      setSuccessToast(`Invitation issued & access approved for ${inputEmail}!`);
      setTimeout(() => setSuccessToast(''), 4000);
    }
  };

  const getStatusBadge = (status: AuthorizedStatus) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" /> Approved
          </span>
        );
      case 'suspended':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <PauseCircle className="w-3 h-3" /> Suspended
          </span>
        );
      case 'revoked':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 border border-red-500/30">
            <XCircle className="w-3 h-3" /> Revoked
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
            Pending
          </span>
        );
    }
  };

  const getRoleBadge = (role: AuthorizedRole) => {
    switch (role) {
      case 'super_owner':
        return (
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full gold-gradient-bg text-slate-950 shadow-sm">
            Permanent Super Owner
          </span>
        );
      case 'trusted_family':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
            Trusted Family
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30">
            Invited Member
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 font-mono-code">
            Super Owner Access Console
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white font-brand tracking-tight flex items-center gap-2 mt-1">
          <Users className="w-6 h-6 text-amber-400" />
          Gmail Access Manager &amp; Invitation System
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Authorize trusted family accounts and additional personal Gmail accounts to access the VIP portal.
        </p>
      </div>

      {successToast && (
        <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-xs font-semibold text-emerald-300 flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" /> {successToast}
        </div>
      )}

      {/* Add New Authorized Account Form */}
      <form
        onSubmit={handleAddAccount}
        className="p-6 rounded-2xl dark-card border border-amber-500/30 space-y-5 shadow-xl"
      >
        <div className="flex items-center justify-between pb-2 border-b border-slate-850">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-amber-400" /> Authorize New Gmail Account
            </h3>
            <p className="text-xs text-slate-400">
              Approved Gmail accounts can log in using Continue with Google.
            </p>
          </div>
          <span className="text-[11px] text-amber-400 font-mono-code font-bold">
            No Account Limit
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Email input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">
              Account Gmail Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                placeholder="e.g. personal.account@gmail.com"
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Role selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">Access Category</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none cursor-pointer focus:border-amber-400"
            >
              <option value="invited_member">Invited Member (Client Search &amp; Leads)</option>
              <option value="trusted_family">Trusted Family (Full Platform Access)</option>
            </select>
          </div>

          {/* Label / Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300">
              Account Label / Owner Note
            </label>
            <input
              type="text"
              value={accountLabel}
              onChange={(e) => setAccountLabel(e.target.value)}
              placeholder="e.g. Farukh Secondary Device / Partner"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-850">
          <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Invited accounts can never alter root ownership or remove the Super Owner.</span>
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl gold-gradient-bg text-slate-950 font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <Send className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Approve &amp; Send Invitation</span>
          </button>
        </div>
      </form>

      {/* List of Authorized Accounts */}
      <div className="p-6 rounded-2xl dark-card border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Authorized Accounts Whitelist
            </h3>
            <p className="text-xs text-slate-400">
              Live authorization registry checked upon Google authentication.
            </p>
          </div>
          <span className="text-xs font-mono-code px-3 py-1 rounded-full bg-slate-800 text-amber-300 border border-amber-500/20 font-bold">
            Total Authorized: {authorizedAccounts.filter((a) => a.status === 'approved').length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono-code text-[11px]">
                <th className="pb-3 font-semibold">Authorized Account</th>
                <th className="pb-3 font-semibold">Role Tier</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Added On</th>
                <th className="pb-3 font-semibold text-right">Owner Management Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {authorizedAccounts.map((account) => {
                const isSuperOwnerAccount = account.role === 'super_owner';

                return (
                  <tr key={account.id} className="hover:bg-slate-900/40">
                    <td className="py-3.5 pr-3">
                      <p className="font-bold text-white font-mono-code">
                        {/* For privacy of Super Owner in shared views */}
                        {isSuperOwnerAccount ? account.email : account.email}
                      </p>
                      <p className="text-[11px] text-slate-400">{account.label || 'Authorized Member'}</p>
                    </td>

                    <td className="py-3.5">{getRoleBadge(account.role)}</td>

                    <td className="py-3.5">{getStatusBadge(account.status)}</td>

                    <td className="py-3.5 text-slate-400 font-mono-code text-[11px]">
                      {new Date(account.addedAt).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 text-right">
                      {isSuperOwnerAccount ? (
                        <span className="text-[11px] text-amber-400 font-bold font-mono-code">
                          Permanent Root Identity
                        </span>
                      ) : (
                        <div className="flex items-center justify-end gap-1.5">
                          {account.status === 'approved' ? (
                            <>
                              <button
                                onClick={() => updateAccountStatus(account.id, 'suspended')}
                                className="px-2.5 py-1 rounded bg-amber-950/60 hover:bg-amber-900 text-amber-300 text-[11px] font-semibold border border-amber-500/30 cursor-pointer"
                                title="Suspend access temporarily"
                              >
                                Suspend
                              </button>
                              <button
                                onClick={() => updateAccountStatus(account.id, 'revoked')}
                                className="px-2.5 py-1 rounded bg-red-950/60 hover:bg-red-900 text-red-300 text-[11px] font-semibold border border-red-500/30 cursor-pointer"
                                title="Revoke access"
                              >
                                Revoke
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => updateAccountStatus(account.id, 'approved')}
                              className="px-2.5 py-1 rounded bg-emerald-950/60 hover:bg-emerald-900 text-emerald-300 text-[11px] font-semibold border border-emerald-500/30 cursor-pointer"
                              title="Restore approved access"
                            >
                              Restore Access
                            </button>
                          )}

                          <button
                            onClick={() => {
                              if (confirm(`Permanently remove ${account.email} from the whitelist?`)) {
                                removeAuthorizedAccount(account.id);
                              }
                            }}
                            className="p-1.5 rounded bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-400 border border-slate-800 transition-colors cursor-pointer"
                            title="Permanently remove account"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
