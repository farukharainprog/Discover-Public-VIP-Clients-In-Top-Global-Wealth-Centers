import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Search,
  Play,
  Square,
  Pause,
  RotateCw,
  Filter,
  MessageSquare,
  Globe2,
  BookmarkCheck,
  Trash2,
  FileSpreadsheet,
  Download,
  Sparkles,
  ExternalLink,
  Mail,
  Youtube,
  Instagram,
  CheckCircle2,
  Clock,
  UserCheck,
  PhoneCall,
  HeartHandshake,
  Award,
  ChevronDown,
  Layers,
  FileText,
  Check,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { usePrivateOwner } from '../context/PrivateOwnerContext.tsx';
import { PrivateOwner2FaModal } from './PrivateOwner2FaModal.tsx';
import { PrivateWhatsAppOutreachModal } from './PrivateWhatsAppOutreachModal.tsx';
import {
  PRIVATE_TARGET_COUNTRIES,
  CREATOR_FILTERS,
  BUSINESS_FILTERS,
} from '../data/privateCreatorDirectory.ts';
import { PrivateWhatsAppLead, LeadStatus } from '../types/index.ts';

const COUNTRY_FLAGS: Record<string, string> = {
  Japan: '🇯🇵',
  China: '🇨🇳',
  'United States': '🇺🇸',
  'United Kingdom': '🇬🇧',
  Canada: '🇨🇦',
  Australia: '🇦🇺',
  Germany: '🇩🇪',
  France: '🇫🇷',
  Switzerland: '🇨🇭',
  'Saudi Arabia': '🇸🇦',
  'United Arab Emirates': '🇦🇪',
  Qatar: '🇶🇦',
  Kuwait: '🇰🇼',
  Singapore: '🇸🇬',
  'South Korea': '🇰🇷',
  Italy: '🇮🇹',
  Netherlands: '🇳🇱',
};

export const PrivateOwnerDashboard: React.FC = () => {
  const {
    owner2FaVerified,
    remainingSessionSeconds,
    lockOwnerSession,
    isOwner,
  } = useAuth();

  const {
    privateSearchResults,
    privateSavedLeads,
    searchStatus,
    searchProgress,
    privateFilters,
    setPrivateFilters,
    startSearch,
    stopSearch,
    pauseSearch,
    continueSearch,
    savePrivateLead,
    deletePrivateLead,
    updatePrivateLeadStatus,
    updatePrivateLeadNotes,
    isPrivateLeadSaved,
    exportPrivateLeadsToCsv,
    exportPrivateLeadsToExcel,
  } = usePrivateOwner();

  const [activeTab, setActiveTab] = useState<'finder' | 'database'>('finder');
  const [show2FaModal, setShow2FaModal] = useState<boolean>(!owner2FaVerified);
  const [selectedLeadForOutreach, setSelectedLeadForOutreach] =
    useState<PrivateWhatsAppLead | null>(null);

  const [dbSearchQuery, setDbSearchQuery] = useState('');
  const [dbStatusFilter, setDbStatusFilter] = useState<LeadStatus | 'all'>('all');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState('');

  // Format remaining seconds into MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const filteredSavedLeads = privateSavedLeads.filter((l) => {
    if (dbStatusFilter !== 'all' && l.status !== dbStatusFilter) return false;
    if (dbSearchQuery.trim()) {
      const q = dbSearchQuery.toLowerCase();
      const match =
        l.businessOrCreatorName.toLowerCase().includes(q) ||
        l.country.toLowerCase().includes(q) ||
        l.subCategory.toLowerCase().includes(q) ||
        (l.whatsapp && l.whatsapp.includes(q)) ||
        (l.notes && l.notes.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const handleStartEditNotes = (lead: PrivateWhatsAppLead) => {
    setEditingNotesId(lead.id);
    setNotesDraft(lead.notes || '');
  };

  const handleSaveNotes = async (leadId: string) => {
    await updatePrivateLeadNotes(leadId, notesDraft);
    setEditingNotesId(null);
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'client':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full gold-gradient-bg text-slate-950 shadow-sm">
            <Award className="w-3 h-3" /> Signed Client
          </span>
        );
      case 'interested':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <HeartHandshake className="w-3 h-3" /> Interested
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
            <PhoneCall className="w-3 h-3" /> Contacted
          </span>
        );
      case 'not_interested':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-red-500/15 text-red-300 border border-red-500/30">
            Not Interested
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
            New Lead
          </span>
        );
    }
  };

  // If 2FA is not yet verified, display lock banner with trigger
  if (!owner2FaVerified) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 animate-fadeIn">
        <div className="p-8 rounded-2xl dark-card border border-amber-500/40 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl gold-gradient-bg flex items-center justify-center mx-auto text-slate-950 font-black shadow-lg shadow-amber-500/20">
            <Lock className="w-8 h-8 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30">
              FARUKH BUSINESSMAN WALA ONLY
            </span>
            <h2 className="text-2xl font-black text-white font-brand">
              Private VIP Global WhatsApp Client Finder
            </h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              This space is strictly restricted to the website owner. It provides confidential discovery of official published WhatsApp contacts for global creators, business owners, and digital agencies across Japan, China, USA, UK, UAE, Saudi Arabia, Singapore, and Europe.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-left text-xs space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Two-Factor Owner Authentication Required</span>
            </div>
            <p className="text-slate-400 text-[11px]">
              Click below to enter your 6-digit owner code (PIN: 962962) or Master Owner Credentials.
            </p>
          </div>

          <button
            onClick={() => setShow2FaModal(true)}
            className="w-full py-3.5 rounded-xl gold-gradient-bg text-slate-950 font-black text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
            <span>Unlock Private Owner Dashboard</span>
          </button>
        </div>

        <PrivateOwner2FaModal
          isOpen={show2FaModal}
          onClose={() => setShow2FaModal(false)}
          onSuccess={() => setShow2FaModal(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Security & Session Management Header */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/60 via-[#18140c] to-[#0d0e14] border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl gold-gradient-bg flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20 shrink-0">
            <ShieldAlert className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-mono-code">
                <ShieldCheck className="w-3 h-3" /> 2FA Encrypted Owner Session
              </span>
              <span className="hidden md:inline-block text-[11px] text-amber-300 font-semibold">
                FARUKH BUSINESSMAN WALA
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white font-brand mt-0.5">
              Private VIP Global WhatsApp Client Finder
            </h2>
          </div>
        </div>

        {/* Session Timeout Timer & Lock Button */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono-code text-slate-300">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Auto Lock:</span>
            <span className="text-amber-300 font-bold">{formatTime(remainingSessionSeconds)}</span>
          </div>

          <button
            onClick={lockOwnerSession}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock</span>
          </button>
        </div>
      </div>

      {/* Tabs Switcher: Global WhatsApp Discovery vs Private Lead Database */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('finder')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'finder'
              ? 'gold-gradient-bg text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Search className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Global WhatsApp Discovery</span>
        </button>

        <button
          onClick={() => setActiveTab('database')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'database'
              ? 'gold-gradient-bg text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <BookmarkCheck className="w-3.5 h-3.5" />
          <span>Private Lead Database ({privateSavedLeads.length})</span>
        </button>
      </div>

      {/* TAB 1: GLOBAL WHATSAPP DISCOVERY */}
      {activeTab === 'finder' && (
        <div className="space-y-6">
          {/* Search Controls & Filters Card */}
          <div className="p-5 sm:p-6 rounded-2xl dark-card border border-amber-500/30 space-y-5 shadow-xl">
            {/* Control Bar: START, STOP, PAUSE, CONTINUE */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Play className="w-3.5 h-3.5 text-amber-400" /> Real-Time Search Controls
                </h3>
                <p className="text-xs text-slate-400">
                  Execute, pause, or stop the global directory &amp; live web grounding scanner.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* START GLOBAL SEARCH */}
                <button
                  onClick={startSearch}
                  disabled={searchStatus === 'searching'}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl gold-gradient-bg text-slate-950 font-black text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-md disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Global Search</span>
                </button>

                {/* PAUSE SEARCH */}
                <button
                  onClick={pauseSearch}
                  disabled={searchStatus !== 'searching'}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-amber-300 transition-all cursor-pointer disabled:opacity-40"
                >
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause</span>
                </button>

                {/* CONTINUE SEARCH */}
                <button
                  onClick={continueSearch}
                  disabled={searchStatus !== 'paused'}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-emerald-400 transition-all cursor-pointer disabled:opacity-40"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Continue</span>
                </button>

                {/* STOP SEARCH */}
                <button
                  onClick={stopSearch}
                  disabled={searchStatus === 'idle' || searchStatus === 'stopped'}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-950/70 hover:bg-red-900 border border-red-500/40 text-xs font-bold text-red-300 transition-all cursor-pointer disabled:opacity-40"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Stop</span>
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            {searchStatus === 'searching' && (
              <div className="space-y-1.5 animate-fadeIn">
                <div className="flex justify-between text-xs text-amber-300 font-mono-code">
                  <span>Scanning Public WhatsApp Registers (Japan, China, UAE, USA, Europe)...</span>
                  <span>{searchProgress}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden border border-amber-500/30">
                  <div
                    className="h-full gold-gradient-bg transition-all duration-300"
                    style={{ width: `${searchProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Filters Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
              {/* Country Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Global Country Filter
                </label>
                <select
                  value={privateFilters.country}
                  onChange={(e) =>
                    setPrivateFilters((prev) => ({ ...prev, country: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-xs text-white outline-none cursor-pointer"
                >
                  <option value="All">All Available Countries (Worldwide)</option>
                  {PRIVATE_TARGET_COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {COUNTRY_FLAGS[c] || '🌐'} {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Creator vs Business Category Filter */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Entity Category Filter
                </label>
                <select
                  value={privateFilters.categoryType}
                  onChange={(e) =>
                    setPrivateFilters((prev) => ({
                      ...prev,
                      categoryType: e.target.value as any,
                      subCategory: 'All',
                    }))
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-xs text-white outline-none cursor-pointer"
                >
                  <option value="All">All Creators &amp; Businesses</option>
                  <option value="Creator">Creators &amp; Influencers Only</option>
                  <option value="Business">Businesses &amp; Agencies Only</option>
                </select>
              </div>

              {/* Sub-filter for Role */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Specific Creator / Business Filter
                </label>
                <select
                  value={privateFilters.subCategory}
                  onChange={(e) =>
                    setPrivateFilters((prev) => ({ ...prev, subCategory: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-xs text-white outline-none cursor-pointer"
                >
                  <option value="All">All Subcategories</option>
                  {privateFilters.categoryType !== 'Business' && (
                    <optgroup label="Creators &amp; Influencers">
                      {CREATOR_FILTERS.map((cr) => (
                        <option key={cr} value={cr}>
                          {cr}
                        </option>
                      ))}
                    </optgroup>
                  )}
                  {privateFilters.categoryType !== 'Creator' && (
                    <optgroup label="Businesses &amp; Companies">
                      {BUSINESS_FILTERS.map((bf) => (
                        <option key={bf} value={bf}>
                          {bf}
                        </option>
                      ))}
                    </optgroup>
                  )}
                </select>
              </div>

              {/* Keyword & WhatsApp Toggle */}
              <div className="space-y-2">
                <input
                  type="text"
                  value={privateFilters.keyword}
                  onChange={(e) =>
                    setPrivateFilters((prev) => ({ ...prev, keyword: e.target.value }))
                  }
                  placeholder="Keyword or creator name..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-xs text-white placeholder-slate-500 outline-none"
                />

                <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={privateFilters.whatsappOnly}
                    onChange={(e) =>
                      setPrivateFilters((prev) => ({
                        ...prev,
                        whatsappOnly: e.target.checked,
                      }))
                    }
                    className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-400 accent-emerald-500"
                  />
                  <span>WhatsApp Business Contacts Only</span>
                </label>
              </div>
            </div>
          </div>

          {/* Search Results Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-emerald-400" />
                  Verified WhatsApp Business Contacts ({privateSearchResults.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Showing publicly listed official WhatsApp business contacts, YouTube channels, and verified profiles.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {privateSearchResults.map((lead) => {
                const isSaved = isPrivateLeadSaved(lead);
                const cleanWhatsApp = lead.whatsapp ? lead.whatsapp.replace(/[^0-9]/g, '') : '';

                return (
                  <div
                    key={lead.id}
                    className="rounded-2xl dark-card p-5 border border-slate-800/90 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 group relative overflow-hidden shadow-lg"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-xs text-slate-300">
                          <span className="text-xl">{COUNTRY_FLAGS[lead.country] || '🌐'}</span>
                          <span className="font-semibold">{lead.country}</span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-bold uppercase">
                          {lead.subCategory}
                        </span>
                      </div>

                      {/* Name */}
                      <h4 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors mt-2 leading-tight">
                        {lead.businessOrCreatorName}
                      </h4>

                      {/* Description */}
                      <p className="text-xs text-slate-300 line-clamp-3 mt-2 leading-relaxed">
                        {lead.description}
                      </p>
                    </div>

                    {/* Official WhatsApp Business Banner */}
                    <div className="space-y-3 pt-3 border-t border-slate-800/90">
                      {lead.whatsapp ? (
                        <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-xs">
                            <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                            <div>
                              <p className="text-[10px] text-emerald-400/90 font-bold uppercase font-mono-code">
                                Official WhatsApp Business
                              </p>
                              <p className="font-mono-code font-bold text-white text-xs">
                                {lead.whatsapp}
                              </p>
                            </div>
                          </div>

                          <a
                            href={`https://wa.me/${cleanWhatsApp}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-1"
                          >
                            <span>Chat</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-500 italic p-2 rounded-lg bg-slate-950/60">
                          Public WhatsApp not officially published. Inquiries via verified channel.
                        </div>
                      )}

                      {/* Channels Row (YouTube, Instagram, Website, Email) */}
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        {lead.youtube && (
                          <a
                            href={lead.youtube}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-red-950/60 hover:text-red-400 border border-slate-800 transition-colors"
                            title="Official YouTube Channel"
                          >
                            <Youtube className="w-4 h-4" />
                          </a>
                        )}

                        {lead.instagram && (
                          <a
                            href={lead.instagram}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-pink-950/60 hover:text-pink-400 border border-slate-800 transition-colors"
                            title="Official Instagram"
                          >
                            <Instagram className="w-4 h-4" />
                          </a>
                        )}

                        {lead.website && (
                          <a
                            href={lead.website}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 hover:text-amber-300 border border-slate-800 transition-colors"
                            title="Official Website"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}

                        {lead.email && (
                          <a
                            href={`mailto:${lead.email}`}
                            className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 hover:text-emerald-300 border border-slate-800 transition-colors"
                            title={`Email: ${lead.email}`}
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                        )}

                        <div className="ml-auto text-[10px] text-slate-500 font-mono-code truncate max-w-[130px]">
                          {lead.source}
                        </div>
                      </div>

                      {/* Actions: AI Outreach & Save to Private DB */}
                      <div className="flex items-center justify-between gap-2 pt-1">
                        <button
                          onClick={() => setSelectedLeadForOutreach(lead)}
                          className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <Sparkles className="w-3.5 h-3.5" /> Pitch 7 Services
                        </button>

                        <button
                          onClick={() => savePrivateLead(lead)}
                          disabled={isSaved}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isSaved
                              ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-default'
                              : 'gold-gradient-bg text-slate-950 hover:brightness-110 shadow-sm'
                          }`}
                        >
                          {isSaved ? 'Saved In Private DB' : 'Save Contact'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRIVATE LEAD DATABASE (OWNER ONLY) */}
      {activeTab === 'database' && (
        <div className="space-y-6">
          {/* Header & Export Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-400" />
                Confidential Owner Lead Database ({privateSavedLeads.length})
              </h3>
              <p className="text-xs text-slate-400">
                Isolated repository accessible strictly to FARUKH BUSINESSMAN WALA.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => exportPrivateLeadsToCsv(filteredSavedLeads)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" /> Export CSV
              </button>
              <button
                onClick={() => exportPrivateLeadsToExcel(filteredSavedLeads)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl gold-gradient-bg text-slate-950 text-xs font-black uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-md"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" /> Export Excel
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Status Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800 self-start">
              <button
                onClick={() => setDbStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  dbStatusFilter === 'all'
                    ? 'gold-gradient-bg text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({privateSavedLeads.length})
              </button>
              <button
                onClick={() => setDbStatusFilter('client')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  dbStatusFilter === 'client'
                    ? 'gold-gradient-bg text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Signed Clients ({privateSavedLeads.filter((l) => l.status === 'client').length})
              </button>
              <button
                onClick={() => setDbStatusFilter('interested')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  dbStatusFilter === 'interested'
                    ? 'gold-gradient-bg text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Interested ({privateSavedLeads.filter((l) => l.status === 'interested').length})
              </button>
              <button
                onClick={() => setDbStatusFilter('contacted')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  dbStatusFilter === 'contacted'
                    ? 'gold-gradient-bg text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Contacted ({privateSavedLeads.filter((l) => l.status === 'contacted').length})
              </button>
              <button
                onClick={() => setDbStatusFilter('new')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  dbStatusFilter === 'new'
                    ? 'gold-gradient-bg text-slate-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                New ({privateSavedLeads.filter((l) => l.status === 'new').length})
              </button>
            </div>

            {/* Search within private DB */}
            <div className="relative w-full md:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={dbSearchQuery}
                onChange={(e) => setDbSearchQuery(e.target.value)}
                placeholder="Search private database..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* List of Private Saved Leads */}
          {filteredSavedLeads.length === 0 ? (
            <div className="p-12 text-center rounded-2xl dark-card border border-slate-800 space-y-3">
              <BookmarkCheck className="w-12 h-12 text-amber-500/40 mx-auto" />
              <h4 className="text-base font-bold text-white">No private contacts in this filter</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Discover creators and businesses in the Global WhatsApp Discovery tab and click "Save Contact".
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSavedLeads.map((lead) => {
                const cleanWhatsApp = lead.whatsapp ? lead.whatsapp.replace(/[^0-9]/g, '') : '';

                return (
                  <div
                    key={lead.id}
                    className="p-5 rounded-2xl dark-card border border-slate-800 hover:border-amber-500/30 transition-all space-y-4 shadow-md"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-lg font-bold text-white">
                            {lead.businessOrCreatorName}
                          </h4>
                          {getStatusBadge(lead.status)}
                        </div>
                        <p className="text-xs text-slate-400">
                          {COUNTRY_FLAGS[lead.country] || '🌐'} {lead.country} •{' '}
                          <span className="text-amber-300 font-semibold">{lead.subCategory}</span>
                        </p>
                      </div>

                      {/* Status Selector & Delete */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400 font-medium">Stage:</span>
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            updatePrivateLeadStatus(lead.id, e.target.value as LeadStatus)
                          }
                          className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-semibold text-slate-200 outline-none cursor-pointer focus:border-amber-400"
                        >
                          <option value="new">New Contact</option>
                          <option value="contacted">Mark as Contacted</option>
                          <option value="interested">Mark as Interested</option>
                          <option value="client">Mark as Signed Client</option>
                          <option value="not_interested">Mark as Not Interested</option>
                        </select>

                        <button
                          onClick={() => deletePrivateLead(lead.id)}
                          className="p-2 rounded-lg bg-slate-900 hover:bg-red-950/60 text-slate-400 hover:text-red-400 border border-slate-800 transition-colors cursor-pointer"
                          title="Delete contact from private database"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* WhatsApp & Channels */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 border-t border-slate-850">
                      {lead.whatsapp && (
                        <a
                          href={`https://wa.me/${cleanWhatsApp}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-emerald-400 font-bold hover:underline"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WhatsApp: {lead.whatsapp}</span>
                        </a>
                      )}

                      {lead.website && (
                        <a
                          href={lead.website}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-amber-300 hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Website</span>
                        </a>
                      )}

                      {lead.youtube && (
                        <a
                          href={lead.youtube}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 hover:text-red-400"
                        >
                          <Youtube className="w-3.5 h-3.5 text-red-500" />
                          <span>YouTube Channel</span>
                        </a>
                      )}

                      {lead.instagram && (
                        <a
                          href={lead.instagram}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 hover:text-pink-400"
                        >
                          <Instagram className="w-3.5 h-3.5 text-pink-500" />
                          <span>Instagram</span>
                        </a>
                      )}

                      <div className="text-[10px] text-slate-500 font-mono-code ml-auto">
                        Source: {lead.source}
                      </div>
                    </div>

                    {/* Notes Section */}
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-850 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5" /> Confidential Notes &amp; Project Scope
                        </span>
                        {editingNotesId !== lead.id && (
                          <button
                            onClick={() => handleStartEditNotes(lead)}
                            className="text-[11px] text-slate-400 hover:text-slate-200 underline cursor-pointer"
                          >
                            {lead.notes ? 'Edit Notes' : '+ Add Note'}
                          </button>
                        )}
                      </div>

                      {editingNotesId === lead.id ? (
                        <div className="space-y-2">
                          <textarea
                            rows={2}
                            value={notesDraft}
                            onChange={(e) => setNotesDraft(e.target.value)}
                            placeholder="Add client requirements, agreed rates, services ordered, or follow-up milestones..."
                            className="w-full p-2.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400"
                          />
                          <div className="flex items-center gap-2 justify-end">
                            <button
                              onClick={() => setEditingNotesId(null)}
                              className="px-2.5 py-1 rounded bg-slate-800 text-[11px] text-slate-300 cursor-pointer"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSaveNotes(lead.id)}
                              className="px-3 py-1 rounded gold-gradient-bg text-slate-950 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                            >
                              <Check className="w-3 h-3" /> Save Note
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-300 italic">
                          {lead.notes || 'No confidential notes logged yet.'}
                        </p>
                      )}
                    </div>

                    {/* Trigger AI Outreach */}
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={() => setSelectedLeadForOutreach(lead)}
                        className="px-4 py-2 rounded-xl gold-gradient-bg text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 flex items-center gap-1.5 cursor-pointer shadow-md"
                      >
                        <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Craft 7-Service Proposal</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 2FA Challenge Modal */}
      <PrivateOwner2FaModal
        isOpen={show2FaModal}
        onClose={() => setShow2FaModal(false)}
        onSuccess={() => setShow2FaModal(false)}
      />

      {/* 7 Services WhatsApp Outreach Modal */}
      <PrivateWhatsAppOutreachModal
        lead={selectedLeadForOutreach}
        isOpen={Boolean(selectedLeadForOutreach)}
        onClose={() => setSelectedLeadForOutreach(null)}
      />
    </div>
  );
};
