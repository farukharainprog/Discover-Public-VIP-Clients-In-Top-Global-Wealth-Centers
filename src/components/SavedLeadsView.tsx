import React, { useState } from 'react';
import {
  BookmarkCheck,
  Trash2,
  PhoneCall,
  HeartHandshake,
  XCircle,
  FileText,
  Download,
  Mail,
  MessageSquare,
  ExternalLink,
  Sparkles,
  Search,
  Filter,
  Check,
} from 'lucide-react';
import { useLeads } from '../context/LeadContext.tsx';
import { Lead, LeadStatus } from '../types/index.ts';

interface SavedLeadsViewProps {
  onOpenOutreach: (lead: Lead) => void;
  onOpenDetails: (lead: Lead) => void;
}

export const SavedLeadsView: React.FC<SavedLeadsViewProps> = ({
  onOpenOutreach,
  onOpenDetails,
}) => {
  const {
    savedLeads,
    removeLead,
    updateLeadStatus,
    updateLeadNotes,
    exportLeadsToCsv,
    exportLeadsToExcel,
  } = useLeads();

  const [activeTab, setActiveTab] = useState<LeadStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');

  // Filter saved leads
  const filteredLeads = savedLeads.filter((lead) => {
    if (activeTab !== 'all' && lead.status !== activeTab) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        lead.businessName.toLowerCase().includes(q) ||
        lead.country.toLowerCase().includes(q) ||
        lead.city.toLowerCase().includes(q) ||
        lead.industry.toLowerCase().includes(q) ||
        (lead.notes && lead.notes.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const handleStartEditNotes = (lead: Lead) => {
    setEditingNotesId(lead.id);
    setTempNotes(lead.notes || '');
  };

  const handleSaveNotes = async (leadId: string) => {
    await updateLeadNotes(leadId, tempNotes);
    setEditingNotesId(null);
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'interested':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <HeartHandshake className="w-3 h-3" /> Interested
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
            <PhoneCall className="w-3 h-3" /> Contacted
          </span>
        );
      case 'not_interested':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-500/15 text-red-300 border border-red-500/30">
            <XCircle className="w-3 h-3" /> Not Interested
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
            New Lead
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header & Export Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-brand tracking-tight flex items-center gap-2">
            <BookmarkCheck className="w-6 h-6 text-amber-400" />
            VIP Client Pipeline &amp; Lead Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Organize international target accounts, track contact stages, add personal notes, and export.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => exportLeadsToCsv(filteredLeads)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" /> Export CSV
          </button>
          <button
            onClick={() => exportLeadsToExcel(filteredLeads)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl gold-gradient-bg text-slate-950 text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-md"
          >
            <Download className="w-3.5 h-3.5" /> Export Excel
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800 self-start">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'gold-gradient-bg text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Leads ({savedLeads.length})
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'new'
                ? 'gold-gradient-bg text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            New ({savedLeads.filter((l) => l.status === 'new').length})
          </button>
          <button
            onClick={() => setActiveTab('contacted')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'contacted'
                ? 'gold-gradient-bg text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Contacted ({savedLeads.filter((l) => l.status === 'contacted').length})
          </button>
          <button
            onClick={() => setActiveTab('interested')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'interested'
                ? 'gold-gradient-bg text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Interested ({savedLeads.filter((l) => l.status === 'interested').length})
          </button>
          <button
            onClick={() => setActiveTab('not_interested')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'not_interested'
                ? 'gold-gradient-bg text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Not Interested ({savedLeads.filter((l) => l.status === 'not_interested').length})
          </button>
        </div>

        {/* Search within saved */}
        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search saved leads..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Saved Leads List */}
      {filteredLeads.length === 0 ? (
        <div className="p-12 text-center rounded-2xl dark-card border border-slate-800 space-y-3">
          <BookmarkCheck className="w-12 h-12 text-amber-500/40 mx-auto" />
          <h3 className="text-base font-bold text-white">No saved leads in this stage</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Go to "Start Finding Clients" to discover and save verified international businesses.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="p-5 rounded-2xl dark-card border border-slate-800 hover:border-amber-500/30 transition-all space-y-4 shadow-md"
            >
              {/* Row 1: Top info & Status Badges */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{lead.businessName}</h3>
                    {getStatusBadge(lead.status)}
                  </div>
                  <p className="text-xs text-slate-400">
                    {lead.city}, {lead.country} •{' '}
                    <span className="text-amber-400 font-semibold">{lead.industry}</span>
                  </p>
                </div>

                {/* Status Switcher Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">Stage:</span>
                  <select
                    value={lead.status}
                    onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs font-semibold text-slate-200 outline-none cursor-pointer focus:border-amber-400"
                  >
                    <option value="new">New Lead</option>
                    <option value="contacted">Mark as Contacted</option>
                    <option value="interested">Mark as Interested</option>
                    <option value="not_interested">Mark as Not Interested</option>
                  </select>

                  <button
                    onClick={() => removeLead(lead.id)}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-red-950/60 text-slate-400 hover:text-red-400 border border-slate-800 transition-colors cursor-pointer"
                    title="Remove from saved leads"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Row 2: Contact Methods & Socials */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 border-t border-slate-850">
                {lead.website && (
                  <a
                    href={lead.website}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-amber-400 hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Official Portal</span>
                  </a>
                )}
                {lead.email && (
                  <a
                    href={`mailto:${lead.email}`}
                    className="flex items-center gap-1.5 hover:text-emerald-300"
                  >
                    <Mail className="w-3.5 h-3.5 text-amber-400" />
                    <span>{lead.email}</span>
                  </a>
                )}
                {lead.whatsapp && (
                  <a
                    href={`https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-emerald-400 hover:underline"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp: {lead.whatsapp}</span>
                  </a>
                )}

                <div className="text-[11px] text-slate-500 font-mono-code ml-auto">
                  Source: {lead.source}
                </div>
              </div>

              {/* Row 3: Personal Notes Section */}
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-850 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-400 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" /> Personal Follow-up Notes
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
                      value={tempNotes}
                      onChange={(e) => setTempNotes(e.target.value)}
                      placeholder="Add conversation history, required services, budget estimate, or next scheduled touchpoint..."
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
                    {lead.notes || 'No personal notes recorded yet. Click "+ Add Note" to log interaction details.'}
                  </p>
                )}
              </div>

              {/* Row 4: Outreach Trigger */}
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  onClick={() => onOpenDetails(lead)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 font-semibold cursor-pointer"
                >
                  Full Profile
                </button>
                <button
                  onClick={() => onOpenOutreach(lead)}
                  className="px-4 py-1.5 rounded-lg gold-gradient-bg text-slate-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Generate AI Outreach
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
