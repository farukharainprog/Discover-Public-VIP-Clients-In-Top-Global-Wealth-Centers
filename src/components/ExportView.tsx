import React, { useState } from 'react';
import {
  Download,
  FileSpreadsheet,
  CheckCircle2,
  Table,
  Check,
  ShieldCheck,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useLeads } from '../context/LeadContext.tsx';
import { LeadStatus } from '../types/index.ts';

export const ExportView: React.FC = () => {
  const { savedLeads, searchResults, exportLeadsToCsv, exportLeadsToExcel } = useLeads();

  const [sourcePool, setSourcePool] = useState<'saved' | 'all'>('saved');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');

  const rawLeads = sourcePool === 'saved' ? savedLeads : [...savedLeads, ...searchResults];

  // De-duplicate if pulling from all
  const seen = new Set<string>();
  const leadsToExport = rawLeads.filter((l) => {
    if (seen.has(l.id)) return false;
    seen.add(l.id);
    if (statusFilter !== 'all' && l.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      <div className="pb-3 border-b border-slate-800">
        <h2 className="text-xl sm:text-2xl font-black text-white font-brand tracking-tight flex items-center gap-2">
          <Download className="w-6 h-6 text-amber-400" />
          Export VIP Business Leads
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Export verified international business contact records to CSV or Microsoft Excel spreadsheets for CRM import.
        </p>
      </div>

      {/* Configuration Card */}
      <div className="p-6 rounded-2xl dark-card border border-amber-500/30 space-y-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Source Pool */}
          <div>
            <label className="block text-xs font-bold text-amber-400 uppercase tracking-wide mb-1.5">
              Select Dataset
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSourcePool('saved')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-left ${
                  sourcePool === 'saved'
                    ? 'gold-gradient-bg text-slate-950 border-amber-400 shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <p>Saved Leads Only</p>
                <p className={`text-[10px] font-normal ${sourcePool === 'saved' ? 'text-slate-900' : 'text-slate-400'}`}>
                  {savedLeads.length} records ready
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSourcePool('all')}
                className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer text-left ${
                  sourcePool === 'all'
                    ? 'gold-gradient-bg text-slate-950 border-amber-400 shadow-md'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <p>All Discovered Leads</p>
                <p className={`text-[10px] font-normal ${sourcePool === 'all' ? 'text-slate-900' : 'text-slate-400'}`}>
                  Combined search pool
                </p>
              </button>
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-xs font-bold text-amber-400 uppercase tracking-wide mb-1.5">
              Pipeline Status Filter
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3.5 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none cursor-pointer focus:border-amber-400"
            >
              <option value="all">Export All Statuses</option>
              <option value="new">New Leads Only</option>
              <option value="contacted">Contacted Only</option>
              <option value="interested">Interested Only (Hot Leads)</option>
              <option value="not_interested">Not Interested Only</option>
            </select>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-850">
          <div className="text-xs text-slate-400">
            Exporting <span className="text-white font-bold">{leadsToExport.length}</span> verified business leads with complete citations.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => exportLeadsToCsv(leadsToExport)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-amber-500/30 text-amber-300 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" /> Export CSV (.csv)
            </button>
            <button
              onClick={() => exportLeadsToExcel(leadsToExport)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl gold-gradient-bg text-slate-950 font-black text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <Download className="w-4 h-4 stroke-[2.5]" /> Export Excel (.xls)
            </button>
          </div>
        </div>
      </div>

      {/* Included Fields Checklist */}
      <div className="p-5 rounded-2xl dark-card border border-slate-800 space-y-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" /> Included Data Columns In Export
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-amber-400" />
            <span>Business Name</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-amber-400" />
            <span>Country &amp; City</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-amber-400" />
            <span>Industry &amp; Scale</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Portal Website</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-amber-400" />
            <span>Public Business Email</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-amber-400" />
            <span>Published WhatsApp Number</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-amber-400" />
            <span>LinkedIn Company URL</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-amber-400" />
            <span>Lead Stage (Pipeline)</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Source Citation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
