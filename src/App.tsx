/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Menu, Sparkles, X } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { LeadProvider, useLeads } from './context/LeadContext.tsx';
import { PrivateOwnerProvider } from './context/PrivateOwnerContext.tsx';
import { Header } from './components/Header.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { DashboardView } from './components/DashboardView.tsx';
import { ClientFinderView } from './components/ClientFinderView.tsx';
import { SavedLeadsView } from './components/SavedLeadsView.tsx';
import { ExportView } from './components/ExportView.tsx';
import { VipAdminPanel } from './components/VipAdminPanel.tsx';
import { SettingsView } from './components/SettingsView.tsx';
import { PrivateOwnerDashboard } from './components/PrivateOwnerDashboard.tsx';
import { AiOutreachModal } from './components/AiOutreachModal.tsx';
import { LeadDetailsModal } from './components/LeadDetailsModal.tsx';
import { StartupScreen } from './components/StartupScreen.tsx';
import { AccessDeniedModal } from './components/AccessDeniedModal.tsx';
import { VerifiedLeadsView } from './components/VerifiedLeadsView.tsx';
import { GmailAccessManager } from './components/GmailAccessManager.tsx';
import { OwnerSecuritySettingsView } from './components/OwnerSecuritySettingsView.tsx';
import { SearchHistoryView } from './components/SearchHistoryView.tsx';

const MainAppContent: React.FC = () => {
  const { adminConfig, startupScreenDismissed, setStartupScreenDismissed } = useAuth();
  const {
    searchResults,
    savedLeads,
    setFilters,
    selectedLeadForOutreach,
    setSelectedLeadForOutreach,
    selectedLeadForDetails,
    setSelectedLeadForDetails,
  } = useLeads();

  const [activeView, setActiveView] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [dismissAnnouncement, setDismissAnnouncement] = useState<boolean>(false);

  // Helper when clicking from Dashboard to jump to Finder with preset filters
  const handleJumpToFinder = (country?: string, industry?: string) => {
    if (country) {
      setFilters((prev) => ({ ...prev, country }));
    }
    if (industry) {
      setFilters((prev) => ({ ...prev, industry }));
    }
    setActiveView('finder');
  };

  // Helper when user navigates to Outreach from sidebar without a selected lead
  const handleOpenOutreachDefault = () => {
    if (savedLeads.length > 0) {
      setSelectedLeadForOutreach(savedLeads[0]);
    } else if (searchResults.length > 0) {
      setSelectedLeadForOutreach(searchResults[0]);
    } else {
      setActiveView('finder');
    }
  };

  if (!startupScreenDismissed) {
    return (
      <>
        <StartupScreen onStart={() => setStartupScreenDismissed(true)} />
        <AccessDeniedModal />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#07070a] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Admin Broadcast Announcement Banner */}
      {adminConfig.vipAnnouncement && !dismissAnnouncement && (
        <div className="bg-gradient-to-r from-amber-950 via-[#1d170e] to-amber-950 border-b border-amber-500/30 px-4 py-2 text-xs text-amber-200 flex items-center justify-between gap-3 font-medium">
          <div className="flex items-center gap-2 max-w-5xl mx-auto min-w-0">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{adminConfig.vipAnnouncement}</span>
          </div>
          <button
            onClick={() => setDismissAnnouncement(true)}
            className="p-1 hover:text-white rounded cursor-pointer shrink-0"
            title="Dismiss announcement"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Header */}
      <Header
        activeView={activeView}
        onNavigateToFinder={() => setActiveView('finder')}
        onNavigateToPrivate={() => setActiveView('private_whatsapp')}
      />

      {/* Mobile Subheader Bar with Menu Toggle */}
      <div className="lg:hidden flex items-center justify-between px-4 py-2.5 bg-[#0e0f14] border-b border-slate-800">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-300 text-xs font-semibold"
        >
          <Menu className="w-4 h-4" />
          <span>Menu</span>
        </button>

        <span className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono-code truncate max-w-[200px]">
          {activeView.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      {/* Body Layout: Sidebar + Main Content */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <Sidebar
          activeView={activeView}
          setActiveView={(view) => {
            if (view === 'outreach') {
              handleOpenOutreachDefault();
            } else {
              setActiveView(view);
            }
          }}
          isMobileOpen={isMobileMenuOpen}
          setIsMobileOpen={setIsMobileMenuOpen}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          {activeView === 'dashboard' && (
            <DashboardView
              onNavigateToFinder={handleJumpToFinder}
              onNavigateToSaved={() => setActiveView('saved')}
              onOpenOutreach={(lead) => setSelectedLeadForOutreach(lead)}
              onOpenDetails={(lead) => setSelectedLeadForDetails(lead)}
            />
          )}

          {activeView === 'private_whatsapp' && <PrivateOwnerDashboard />}

          {activeView === 'finder' && (
            <ClientFinderView
              onOpenOutreach={(lead) => setSelectedLeadForOutreach(lead)}
              onOpenDetails={(lead) => setSelectedLeadForDetails(lead)}
            />
          )}

          {activeView === 'verified_leads' && (
            <VerifiedLeadsView
              onOpenOutreach={(lead) => setSelectedLeadForOutreach(lead)}
              onOpenDetails={(lead) => setSelectedLeadForDetails(lead)}
            />
          )}

          {activeView === 'saved' && (
            <SavedLeadsView
              onOpenOutreach={(lead) => setSelectedLeadForOutreach(lead)}
              onOpenDetails={(lead) => setSelectedLeadForDetails(lead)}
            />
          )}

          {activeView === 'export' && <ExportView />}

          {activeView === 'gmail_manager' && <GmailAccessManager />}

          {activeView === 'owner_security' && <OwnerSecuritySettingsView />}

          {activeView === 'search_history' && (
            <SearchHistoryView
              onRerunSearch={(query, country) => handleJumpToFinder(country, query)}
            />
          )}

          {activeView === 'admin' && <VipAdminPanel />}

          {activeView === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* AI Outreach Modal (Standard) */}
      <AiOutreachModal
        lead={selectedLeadForOutreach}
        isOpen={Boolean(selectedLeadForOutreach)}
        onClose={() => setSelectedLeadForOutreach(null)}
      />

      {/* Lead Details Modal */}
      <LeadDetailsModal
        lead={selectedLeadForDetails}
        isOpen={Boolean(selectedLeadForDetails)}
        onClose={() => setSelectedLeadForDetails(null)}
        onOpenOutreach={(lead) => {
          setSelectedLeadForDetails(null);
          setSelectedLeadForOutreach(lead);
        }}
      />

      {/* Global Access Denied Modal */}
      <AccessDeniedModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <LeadProvider>
        <PrivateOwnerProvider>
          <MainAppContent />
        </PrivateOwnerProvider>
      </LeadProvider>
    </AuthProvider>
  );
}
