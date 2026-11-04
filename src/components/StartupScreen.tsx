import React from 'react';
import { Crown, Sparkles, MessageSquare, ShieldCheck, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';

interface StartupScreenProps {
  onStart: () => void;
}

export const StartupScreen: React.FC<StartupScreenProps> = ({ onStart }) => {
  const { signInWithGoogle, ownerWhatsApp, loading } = useAuth();

  const handleStart = async () => {
    await signInWithGoogle();
    onStart();
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-slate-100 flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden select-none">
      {/* Background Decorative Gold Ambient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Bar with Status and WhatsApp Contact */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between gap-4 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/20">
            <Crown className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-amber-400 font-mono-code">
              FARUKH BUSINESSMAN WALA
            </p>
            <p className="text-[10px] text-slate-400 font-medium">Global Executive Portal</p>
          </div>
        </div>

        <a
          href={`https://wa.me/923421336388`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/40 text-emerald-300 text-xs font-mono-code transition-all shadow-sm"
        >
          <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline text-slate-400 text-[11px]">Official WhatsApp:</span>
          <span className="font-bold">{ownerWhatsApp}</span>
        </a>
      </header>

      {/* Hero Core Card */}
      <main className="max-w-3xl mx-auto w-full my-auto text-center space-y-7 z-10 py-10">
        {/* VIP Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-widest font-mono-code shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Private Global Business Discovery Platform</span>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-brand leading-tight">
            GLOBAL VIP <span className="gold-gradient-text">CLIENT FINDER</span>
          </h1>
          <p className="text-base sm:text-lg font-extrabold text-amber-400/95 uppercase tracking-wider font-mono-code">
            FARUKH BUSINESSMAN WALA
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          High-performance discovery engine for discovering verified corporate contacts, official WhatsApp business channels, and international creators across Japan, China, USA, UK, UAE, Saudi Arabia, Singapore, and Europe.
        </p>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto pt-2">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-left">
            <p className="text-[10px] text-amber-400 font-bold uppercase">15+ Markets</p>
            <p className="text-xs text-white font-semibold">Worldwide Coverage</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-left">
            <p className="text-[10px] text-emerald-400 font-bold uppercase">Real Numbers</p>
            <p className="text-xs text-white font-semibold">Verified WhatsApp</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-left">
            <p className="text-[10px] text-purple-400 font-bold uppercase">AI Outreach</p>
            <p className="text-xs text-white font-semibold">7 Core Services</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-left">
            <p className="text-[10px] text-sky-400 font-bold uppercase">Private Cloud</p>
            <p className="text-xs text-white font-semibold">Owner Security</p>
          </div>
        </div>

        {/* Large START Button */}
        <div className="pt-4 flex flex-col items-center justify-center gap-3">
          <button
            onClick={handleStart}
            disabled={loading}
            className="group relative px-10 sm:px-14 py-4 sm:py-5 rounded-2xl gold-gradient-bg text-slate-950 font-black text-sm sm:text-base uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-2xl shadow-amber-500/30 cursor-pointer flex items-center gap-3"
          >
            <Sparkles className="w-5 h-5 stroke-[2.5]" />
            <span>START APPLICATION</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-1.5 transition-transform" />
          </button>

          <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Authorized Gmail Authentication via Google OAuth</span>
          </p>
        </div>
      </main>

      {/* Footer Info (Owner Gmail is strictly NOT displayed here) */}
      <footer className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 pt-6 border-t border-slate-900 z-10 font-mono-code">
        <div>
          <span>Official Brand: </span>
          <span className="text-amber-400 font-bold">FARUKH BUSINESSMAN WALA</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Official WhatsApp:</span>
          <a
            href="https://wa.me/923421336388"
            target="_blank"
            rel="noreferrer"
            className="text-emerald-400 hover:underline font-bold"
          >
            +92 3421336388
          </a>
        </div>
      </footer>
    </div>
  );
};
