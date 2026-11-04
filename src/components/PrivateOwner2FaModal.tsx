import React, { useState } from 'react';
import { ShieldCheck, Lock, KeyRound, AlertTriangle, X, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';

interface PrivateOwner2FaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PrivateOwner2FaModal: React.FC<PrivateOwner2FaModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { currentUser, verifyOwner2Fa, signInWithGoogle } = useAuth();
  const [code, setCode] = useState('');
  const [masterPass, setMasterPass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsVerifying(true);

    const verified = verifyOwner2Fa(code.trim(), masterPass.trim());
    setIsVerifying(false);

    if (verified) {
      onSuccess();
    } else {
      setErrorMsg(
        'Two-Factor Authentication failed. Please enter the valid 6-digit owner code (e.g. 962962) or Master Owner Key.'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md rounded-2xl dark-card border border-amber-500/40 p-6 sm:p-7 space-y-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gold-gradient-bg flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
              <Lock className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-mono-code flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" /> Private Owner Shield
              </span>
              <h3 className="text-lg font-extrabold text-white font-brand">Owner 2FA Verification</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security Warning Notice */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-300/90 leading-relaxed space-y-1">
          <p className="font-bold text-amber-300 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            Restricted to FARUKH BUSINESSMAN WALA
          </p>
          <p className="text-[11px] text-slate-300">
            This private module contains confidential international WhatsApp creator discovery tools.
            Sessions automatically expire after 15 minutes of inactivity.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1.5 flex items-center justify-between">
              <span>Enter 6-Digit Two-Factor PIN</span>
              <span className="text-[10px] text-amber-400 font-mono-code">PIN: 962962</span>
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="6-digit code..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-sm font-mono-code text-white tracking-widest outline-none text-center"
                autoFocus
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-200 mb-1.5">
              Master Owner Security Key (Optional if logged into owner Google account)
            </label>
            <input
              type="password"
              value={masterPass}
              onChange={(e) => setMasterPass(e.target.value)}
              placeholder="Enter VIP Master Key..."
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-xs text-white outline-none"
            />
          </div>

          {errorMsg && (
            <p className="text-xs text-red-400 font-medium p-2.5 rounded-lg bg-red-950/40 border border-red-500/30">
              {errorMsg}
            </p>
          )}

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3 rounded-xl gold-gradient-bg text-slate-950 font-black text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
              <span>Verify &amp; Enter Private Hub</span>
            </button>

            {!currentUser && (
              <button
                type="button"
                onClick={signInWithGoogle}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs font-semibold text-slate-300 cursor-pointer"
              >
                Sign In with Owner Google Account
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
