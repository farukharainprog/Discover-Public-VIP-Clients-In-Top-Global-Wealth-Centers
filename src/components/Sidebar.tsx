import React from 'react';
import {
  LayoutDashboard,
  Search,
  BookmarkCheck,
  Send,
  Download,
  ShieldAlert,
  Settings,
  Sparkles,
  Building2,
  Globe2,
  MessageSquare,
  Users,
  Lock,
  History,
  CheckCircle2,
  Phone,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { useLeads } from '../context/LeadContext.tsx';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const { isSuperOwner, ownerWhatsApp } = useAuth();
  const { savedLeads } = useLeads();

  const primaryNavItems = [
    {
      id: 'dashboard',
      label: 'Executive Overview',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'private_whatsapp',
      label: 'PRIVATE VIP CLIENT FINDER',
      icon: MessageSquare,
      highlight: true,
      ownerPrivate: true,
      badge: 'OWNER VIP',
    },
    {
      id: 'finder',
      label: 'Global Client Finder',
      icon: Search,
      badge: 'Live AI',
    },
    {
      id: 'verified_leads',
      label: 'Verified Business Contacts',
      icon: CheckCircle2,
      badge: 'Real Numbers',
    },
    {
      id: 'saved',
      label: 'Saved Contacts',
      icon: BookmarkCheck,
      badge: savedLeads.length > 0 ? savedLeads.length : null,
    },
    {
      id: 'outreach',
      label: 'AI Outreach Generator',
      icon: Send,
      badge: 'FARUKH AI',
    },
    {
      id: 'export',
      label: 'Export Contacts',
      icon: Download,
      badge: null,
    },
    {
      id: 'search_history',
      label: 'Search History',
      icon: History,
      badge: null,
    },
  ];

  const ownerExclusiveItems = [
    {
      id: 'gmail_manager',
      label: 'Gmail Access Manager',
      icon: Users,
      badge: 'Owner Only',
    },
    {
      id: 'owner_security',
      label: 'Owner Security Settings',
      icon: Lock,
      badge: '2FA',
    },
    {
      id: 'admin',
      label: 'VIP Admin Controls',
      icon: ShieldAlert,
      badge: 'Master',
    },
    {
      id: 'settings',
      label: 'Application Settings',
      icon: Settings,
      badge: null,
    },
  ];

  const handleSelect = (viewId: string) => {
    setActiveView(viewId);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 lg:top-[61px] left-0 h-screen lg:h-[calc(100vh-61px)] w-72 bg-[#0c0d12] border-r border-amber-500/15 flex flex-col justify-between z-40 transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 space-y-6 overflow-y-auto">
          {/* VIP Status Card */}
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-amber-950/40 via-[#16140e] to-black border border-amber-500/30 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-amber-500/10 rounded-full blur-xl pointer-events-none group-hover:bg-amber-500/20 transition-all"></div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 font-mono-code flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> VIP Executive Hub
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
            <h3 className="text-sm font-bold text-white mt-1">FARUKH BUSINESSMAN WALA</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              15+ Global Wealth Centers &amp; Verified WhatsApp
            </p>
          </div>

          {/* Discovery & Leads Navigation */}
          <nav className="space-y-1.5">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-2">
              Discovery &amp; Intelligence
            </p>
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'gold-gradient-bg text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                      : item.ownerPrivate
                      ? 'bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-500/40 text-emerald-300 hover:border-emerald-400'
                      : item.highlight
                      ? 'bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/80 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive
                          ? 'stroke-[2.5] text-slate-950'
                          : item.ownerPrivate
                          ? 'text-emerald-400'
                          : item.highlight
                          ? 'text-amber-400'
                          : 'text-slate-400'
                      }`}
                    />
                    <span className={item.ownerPrivate ? 'font-bold' : ''}>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase ${
                        isActive
                          ? 'bg-black/20 text-slate-950'
                          : item.ownerPrivate
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-800 text-amber-300 border border-amber-500/20'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Super Owner Controls Navigation */}
          {isSuperOwner && (
            <nav className="space-y-1.5 pt-2 border-t border-slate-850">
              <p className="text-[11px] font-bold text-amber-400 uppercase tracking-widest px-3 mb-2 flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-amber-400" /> Super Owner Controls
              </p>
              {ownerExclusiveItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-xs tracking-wide transition-all cursor-pointer ${
                      isActive
                        ? 'gold-gradient-bg text-slate-950 font-bold shadow-lg shadow-amber-500/20'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900/80 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 ${
                          isActive ? 'stroke-[2.5] text-slate-950' : 'text-amber-400'
                        }`}
                      />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase ${
                          isActive
                            ? 'bg-black/20 text-slate-950'
                            : 'bg-slate-800 text-amber-300 border border-amber-500/20'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          )}

          {/* Target Niches Box */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <Building2 className="w-3.5 h-3.5" />
              <span>Worldwide Wealth Centers</span>
            </div>
            <div className="flex flex-wrap gap-1 text-[10px]">
              <span className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300">USA 🇺🇸</span>
              <span className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300">UK 🇬🇧</span>
              <span className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300">UAE 🇦🇪</span>
              <span className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300">Japan 🇯🇵</span>
              <span className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300">China 🇨🇳</span>
              <span className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300">Canada 🇨🇦</span>
              <span className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300">Singapore 🇸🇬</span>
              <span className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300">Saudi 🇸🇦</span>
            </div>
          </div>
        </div>

        {/* Footer info in sidebar */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 text-[11px] text-slate-400 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-amber-400/90 font-mono-code font-bold">
            <Globe2 className="w-3.5 h-3.5" />
            <span>FARUKH BUSINESSMAN WALA</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono-code font-bold">ACTIVE</span>
        </div>
      </aside>
    </>
  );
};
