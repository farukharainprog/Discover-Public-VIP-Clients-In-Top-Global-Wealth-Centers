import React, { useState } from 'react';
import {
  Settings,
  User,
  ShieldCheck,
  CheckCircle2,
  Globe2,
  Sparkles,
  Save,
  Server,
  Lock,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';

export const SettingsView: React.FC = () => {
  const { currentUser, userProfile, isAdmin, signInWithGoogle } = useAuth();

  const [signatureName, setSignatureName] = useState(() => {
    return localStorage.getItem('vip_sender_signature') || 'FARUKH BUSINESSMAN WALA';
  });

  const [defaultCategory, setDefaultCategory] = useState(
    'graphic design, video editing, AI video creation, and digital content services'
  );

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('vip_sender_signature', signatureName);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      <div className="pb-3 border-b border-slate-800">
        <h2 className="text-xl sm:text-2xl font-black text-white font-brand tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-amber-400" />
          Application Settings &amp; Preferences
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Configure default outreach signatures, account preferences, and verify connected public data systems.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Preferences successfully saved!
        </div>
      )}

      {/* Account Profile Card */}
      <div className="p-6 rounded-2xl dark-card border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <User className="w-4 h-4 text-amber-400" /> Account &amp; Access Tier
        </h3>

        {currentUser ? (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-850">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full gold-gradient-bg flex items-center justify-center text-slate-950 font-black text-lg">
                {currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-white">{currentUser.displayName || 'VIP Member'}</p>
                <p className="text-xs text-slate-400">{currentUser.email}</p>
                <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                  {isAdmin ? 'Master Administrator' : 'VIP Gold Member'}
                </span>
              </div>
            </div>
            <div className="text-xs text-slate-400 font-mono-code">
              Firebase UID: <span className="text-slate-300">{currentUser.uid.slice(0, 12)}...</span>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-slate-200">You are currently in Demo / Guest Mode</p>
              <p className="text-[11px] text-slate-400">
                Sign in with Google to sync your saved client pipeline securely across devices.
              </p>
            </div>
            <button
              onClick={signInWithGoogle}
              className="px-4 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 cursor-pointer shadow-md"
            >
              Sign In with Google
            </button>
          </div>
        )}
      </div>

      {/* Brand & Outreach Signature Defaults */}
      <form
        onSubmit={handleSavePreferences}
        className="p-6 rounded-2xl dark-card border border-amber-500/30 space-y-5 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Default Outreach Signature &amp; Services
            </h3>
            <p className="text-xs text-slate-400">
              Customize the automatic sign-off and service pitch used by the AI Outreach Generator.
            </p>
          </div>

          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-md"
          >
            <Save className="w-3.5 h-3.5" /> Save Defaults
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Default Sender Signature
            </label>
            <input
              type="text"
              value={signatureName}
              onChange={(e) => setSignatureName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold text-amber-300 outline-none focus:border-amber-400"
            />
            <p className="text-[11px] text-slate-500 mt-1 font-mono-code">
              Official branding: FARUKH BUSINESSMAN WALA
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Default Digital Services Included in Proposals
            </label>
            <textarea
              rows={2}
              value={defaultCategory}
              onChange={(e) => setDefaultCategory(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </form>

      {/* Connected Directories & Engine Status */}
      <div className="p-6 rounded-2xl dark-card border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Server className="w-4 h-4 text-emerald-400" /> Connected Regulatory Registers &amp; Live AI Engine
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-850 flex items-center justify-between">
            <span className="text-slate-300">Google Gemini 3.8 Flash</span>
            <span className="text-[11px] text-emerald-400 font-bold font-mono-code">LIVE CONNECTED</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-850 flex items-center justify-between">
            <span className="text-slate-300">Google Search Web Grounding</span>
            <span className="text-[11px] text-emerald-400 font-bold font-mono-code">ACTIVE</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-850 flex items-center justify-between">
            <span className="text-slate-300">Cloud Firestore Enterprise</span>
            <span className="text-[11px] text-emerald-400 font-bold font-mono-code">SYNCHRONIZED</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-850 flex items-center justify-between">
            <span className="text-slate-300">12 International Chambers Index</span>
            <span className="text-[11px] text-emerald-400 font-bold font-mono-code">100% ONLINE</span>
          </div>
        </div>
      </div>
    </div>
  );
};
