import React from 'react';
import { Crown, Sparkles, ShieldCheck, LogIn, LogOut, Search, MessageSquare, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';

interface HeaderProps {
  onNavigateToFinder: () => void;
  onNavigateToPrivate: () => void;
  activeView: string;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateToFinder,
  onNavigateToPrivate,
  activeView,
}) => {
  const { currentUser, signInWithGoogle, signOutUser, isAdmin, owner2FaVerified } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-[#0a0a0e]/95 backdrop-blur-md border-b border-amber-500/20 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950 font-black">
            <Crown className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5 font-brand">
                GLOBAL VIP CLIENT FINDER
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                <Sparkles className="w-2.5 h-2.5" /> AI Powered
              </span>
            </div>
            <p className="text-xs font-semibold tracking-wider text-amber-400/90 uppercase font-mono-code">
              FARUKH BUSINESSMAN WALA
            </p>
          </div>
        </div>

        {/* Center / Actions: Quick Finder + Private Owner Feature Quick Access */}
        <div className="hidden md:flex items-center gap-2">
          {/* Private Owner WhatsApp Client Finder Button */}
          <button
            onClick={onNavigateToPrivate}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeView === 'private_whatsapp'
                ? 'gold-gradient-bg text-slate-950 border-amber-300 shadow-md'
                : 'bg-emerald-950/60 hover:bg-emerald-900/80 border-emerald-500/40 text-emerald-300 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Private VIP WhatsApp</span>
            {owner2FaVerified && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            )}
          </button>

          {activeView !== 'finder' && (
            <button
              onClick={onNavigateToFinder}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-amber-500/30 text-amber-300 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 stroke-[2.5]" />
              Start Finding
            </button>
          )}
        </div>

        {/* Right: Public Registries Status & Auth */}
        <div className="flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-2 text-xs bg-slate-900/80 px-3 py-1.5 rounded-full border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-300 font-medium text-[11px]">Public Registries Online</span>
          </div>

          {isAdmin && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950 border border-amber-300 shadow-sm shadow-amber-500/30">
              <ShieldCheck className="w-3.5 h-3.5" /> VIP Admin
            </span>
          )}

          {currentUser ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || 'User'}
                  className="w-8 h-8 rounded-full border border-amber-500/50 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold text-xs">
                  {currentUser.email?.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="hidden lg:block text-left text-xs">
                <p className="font-semibold text-slate-200 truncate max-w-[120px]">
                  {currentUser.displayName || currentUser.email?.split('@')[0]}
                </p>
                <p className="text-[10px] text-amber-400/80 font-mono-code">VIP Client Access</p>
              </div>
              <button
                onClick={signOutUser}
                title="Sign Out"
                className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800/80 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={signInWithGoogle}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-amber-500/30 hover:border-amber-400 text-amber-300 font-semibold text-xs tracking-wide transition-all cursor-pointer shadow-sm"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
