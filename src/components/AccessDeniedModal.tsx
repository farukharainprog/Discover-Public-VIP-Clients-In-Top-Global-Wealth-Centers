import React from 'react';
import { ShieldAlert, X, MessageSquare, LogIn, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';

export const AccessDeniedModal: React.FC = () => {
  const {
    accessDenied,
    accessDeniedMessage,
    dismissAccessDenied,
    signInWithGoogle,
    ownerWhatsApp,
    currentUser,
  } = useAuth();

  if (!accessDenied) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl dark-card border border-red-500/50 p-6 sm:p-8 space-y-6 shadow-2xl text-center">
        {/* Shield Icon */}
        <div className="w-16 h-16 rounded-2xl bg-red-950/80 border border-red-500/40 flex items-center justify-center mx-auto text-red-400 shadow-xl shadow-red-500/20">
          <ShieldAlert className="w-8 h-8 stroke-[2.5]" />
        </div>

        {/* Message */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 font-mono-code">
            Security Restriction
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white font-brand">
            Access Authorization Required
          </h3>
          <p className="text-sm font-bold text-red-300 p-3 rounded-xl bg-red-950/40 border border-red-500/30">
            {accessDeniedMessage ||
              'ACCESS DENIED: Your Gmail account is not authorized to access this private portal.'}
          </p>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
          This private business platform is exclusively reserved for FARUKH BUSINESSMAN WALA and authorized invited accounts. Public registration is strictly disabled.
        </p>

        {currentUser?.email && (
          <div className="text-xs text-slate-400 font-mono-code p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            Authenticated Account: <span className="text-slate-200">{currentUser.email}</span>
          </div>
        )}

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={`https://wa.me/923421336388?text=${encodeURIComponent(
              `Hello Farukh Businessman Wala! I would like to request portal access authorization for my Gmail account: ${
                currentUser?.email || ''
              }`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Contact Owner WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => {
              dismissAccessDenied();
              signInWithGoogle();
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-300 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Switch Google Account</span>
          </button>
        </div>

        <button
          onClick={dismissAccessDenied}
          className="text-xs text-slate-500 hover:text-slate-300 underline cursor-pointer"
        >
          Return to Startup Screen
        </button>
      </div>
    </div>
  );
};
