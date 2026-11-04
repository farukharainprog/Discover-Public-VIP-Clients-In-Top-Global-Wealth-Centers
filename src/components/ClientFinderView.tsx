import React, { useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle2,
  ExternalLink,
  Mail,
  MessageSquare,
  Sparkles,
  Building2,
  Globe2,
  BookmarkCheck,
  ChevronDown,
  Info,
  Linkedin,
  Instagram,
  Facebook,
  RotateCcw,
} from 'lucide-react';
import { useLeads } from '../context/LeadContext.tsx';
import { TARGET_COUNTRIES, TARGET_INDUSTRIES, COMPANY_SIZES } from '../data/verifiedDirectory.ts';
import { Lead } from '../types/index.ts';

interface ClientFinderViewProps {
  onOpenOutreach: (lead: Lead) => void;
  onOpenDetails: (lead: Lead) => void;
}

const COUNTRY_FLAGS: Record<string, string> = {
  'United States': '🇺🇸',
  'United Kingdom': '🇬🇧',
  'United Arab Emirates': '🇦🇪',
  'Saudi Arabia': '🇸🇦',
  Qatar: '🇶🇦',
  Kuwait: '🇰🇼',
  Canada: '🇨🇦',
  Australia: '🇦🇺',
  Germany: '🇩🇪',
  Switzerland: '🇨🇭',
  France: '🇫🇷',
  Singapore: '🇸🇬',
};

export const ClientFinderView: React.FC<ClientFinderViewProps> = ({
  onOpenOutreach,
  onOpenDetails,
}) => {
  const {
    searchResults,
    isSearching,
    searchProgress,
    lastSearchSummary,
    filters,
    setFilters,
    performSearch,
    saveLead,
    isLeadSaved,
  } = useLeads();

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    performSearch();
  };

  const handleResetFilters = () => {
    setFilters({
      country: 'United Arab Emirates',
      city: '',
      industry: 'Real Estate',
      businessType: 'All',
      companySize: 'All',
      verifiedOnly: true,
      hasEmailOnly: false,
      hasWhatsAppOnly: false,
      keyword: '',
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title & Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-brand tracking-tight flex items-center gap-2">
            <Globe2 className="w-6 h-6 text-amber-400" />
            Global Client Discovery Engine
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Search verified international public registries and live web citations across 12 high-net-worth economies.
          </p>
        </div>

        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer self-start md:self-auto ${
            showAdvancedFilters
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
              : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Advanced Filters</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Main Search & Filter Form */}
      <form
        onSubmit={handleSearchSubmit}
        className="p-5 sm:p-6 rounded-2xl dark-card border border-amber-500/30 space-y-5 shadow-xl"
      >
        {/* Row 1: Search Keyword and Country/Industry */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Keyword Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filters.keyword}
              onChange={(e) => setFilters((prev) => ({ ...prev, keyword: e.target.value }))}
              placeholder="Search by company name, keywords, or niche..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-amber-400 text-sm text-white placeholder-slate-500 outline-none transition-all"
            />
          </div>

          {/* Country Selection */}
          <div className="md:col-span-4 relative">
            <select
              value={filters.country}
              onChange={(e) => setFilters((prev) => ({ ...prev, country: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-amber-400 text-sm text-slate-200 outline-none transition-all cursor-pointer"
            >
              <option value="All">All 12 Wealthy Markets</option>
              {TARGET_COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {COUNTRY_FLAGS[country] || '🌐'} {country}
                </option>
              ))}
            </select>
          </div>

          {/* Industry Selection */}
          <div className="md:col-span-3 relative">
            <select
              value={filters.industry}
              onChange={(e) => setFilters((prev) => ({ ...prev, industry: e.target.value }))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-amber-400 text-sm text-slate-200 outline-none transition-all cursor-pointer"
            >
              <option value="All">All 11 Industries</option>
              {TARGET_INDUSTRIES.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Collapsible Advanced Filters */}
        {showAdvancedFilters && (
          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
            {/* City */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Specific City / Metro
              </label>
              <input
                type="text"
                value={filters.city}
                onChange={(e) => setFilters((prev) => ({ ...prev, city: e.target.value }))}
                placeholder="e.g. Dubai, London, New York..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-xs text-white placeholder-slate-500 outline-none"
              />
            </div>

            {/* Company Size */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Company Size</label>
              <select
                value={filters.companySize}
                onChange={(e) => setFilters((prev) => ({ ...prev, companySize: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 focus:border-amber-400 text-xs text-slate-200 outline-none cursor-pointer"
              >
                <option value="All">Any Scale</option>
                {COMPANY_SIZES.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Contact Verification Checkbox */}
            <div className="flex flex-col justify-end space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filters.verifiedOnly}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, verifiedOnly: e.target.checked }))
                  }
                  className="rounded border-slate-700 text-amber-500 focus:ring-amber-400 accent-amber-500"
                />
                <span>Verified Business Contacts Only</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filters.hasEmailOnly}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, hasEmailOnly: e.target.checked }))
                  }
                  className="rounded border-slate-700 text-amber-500 focus:ring-amber-400 accent-amber-500"
                />
                <span>Must Have Public Email</span>
              </label>
            </div>

            {/* WhatsApp Filter & Reset */}
            <div className="flex flex-col justify-end space-y-2">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={filters.hasWhatsAppOnly}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, hasWhatsAppOnly: e.target.checked }))
                  }
                  className="rounded border-slate-700 text-amber-500 focus:ring-amber-400 accent-amber-500"
                />
                <span>Must Have Official WhatsApp</span>
              </label>

              <button
                type="button"
                onClick={handleResetFilters}
                className="text-[11px] text-amber-400/80 hover:text-amber-300 flex items-center gap-1 cursor-pointer self-start"
              >
                <RotateCcw className="w-3 h-3" /> Reset Filter Options
              </button>
            </div>
          </div>
        )}

        {/* Action Button: START FINDING CLIENTS */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Real-time check against official public business registers, chambers of commerce, and web grounding.
            </span>
          </div>

          <button
            type="submit"
            disabled={isSearching}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl gold-gradient-bg text-slate-950 font-black text-sm uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-75 disabled:cursor-wait"
          >
            {isSearching ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                <span>Scanning Public Directories...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 stroke-[2.5]" />
                <span>Start Finding Clients</span>
              </>
            )}
          </button>
        </div>

        {/* Progress Bar when searching */}
        {isSearching && (
          <div className="space-y-1.5 pt-2">
            <div className="flex justify-between text-xs text-amber-300 font-mono-code">
              <span>Grounding Live Directory &amp; Regulatory Checks...</span>
              <span>{searchProgress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-amber-500/30">
              <div
                className="h-full gold-gradient-bg transition-all duration-300 rounded-full"
                style={{ width: `${searchProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </form>

      {/* Search Attribution Summary */}
      {lastSearchSummary && (
        <div className="px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-white">Sources Consulted:</span>
            <span>{lastSearchSummary.sourcesConsulted.join(' • ')}</span>
          </div>
          {lastSearchSummary.groundedLiveSearch && (
            <span className="text-[10px] uppercase font-mono-code px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
              Google Search Grounded
            </span>
          )}
        </div>
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-400" />
            Discovered Business Leads ({searchResults.length})
          </h3>
          <p className="text-xs text-slate-400">
            Never invented data. Every lead shows verifiable public citations.
          </p>
        </div>
      </div>

      {/* Lead Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {searchResults.map((lead) => {
          const isSaved = isLeadSaved(lead);

          return (
            <div
              key={lead.id}
              className="rounded-2xl dark-card p-5 border border-slate-800/90 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 group relative overflow-hidden shadow-lg"
            >
              {/* Header: Flags, Industry, Verification */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl" title={lead.country}>
                      {COUNTRY_FLAGS[lead.country] || '🌐'}
                    </span>
                    <span className="text-[11px] font-bold text-slate-400">
                      {lead.city}, {lead.country}
                    </span>
                  </div>

                  {lead.isVerified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>

                {/* Business Name */}
                <h4 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-tight">
                  {lead.businessName}
                </h4>

                {/* Industry & Scale Badge */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold">
                    {lead.industry}
                  </span>
                  {lead.companySize && (
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                      {lead.companySize}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 pt-1">
                  {lead.description}
                </p>
              </div>

              {/* Public Contact Details Matrix */}
              <div className="space-y-2.5 pt-3 border-t border-slate-800/90">
                {/* Email */}
                {lead.email ? (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-amber-400" />
                      <span className="truncate max-w-[170px]" title={lead.email}>
                        {lead.email}
                      </span>
                    </span>
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-[11px] text-amber-400 hover:underline font-semibold"
                    >
                      Email
                    </a>
                  </div>
                ) : (
                  <div className="text-[11px] text-slate-500 italic">
                    Public Email: Form inquiry via website
                  </div>
                )}

                {/* WhatsApp */}
                {lead.whatsapp && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="font-mono-code">{lead.whatsapp}</span>
                    </span>
                    <a
                      href={`https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[11px] text-emerald-400 hover:underline font-semibold"
                    >
                      Chat
                    </a>
                  </div>
                )}

                {/* Social Links Row */}
                <div className="flex items-center gap-2 pt-1 text-slate-400">
                  {lead.website && (
                    <a
                      href={lead.website}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-amber-300 border border-slate-800 transition-colors"
                      title="Official Website"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {lead.linkedin && (
                    <a
                      href={lead.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-[#0077b5] border border-slate-800 transition-colors"
                      title="LinkedIn Company Page"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {lead.instagram && (
                    <a
                      href={lead.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-[#e4405f] border border-slate-800 transition-colors"
                      title="Instagram Page"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {lead.facebook && (
                    <a
                      href={lead.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 hover:text-[#1877f2] border border-slate-800 transition-colors"
                      title="Facebook Page"
                    >
                      <Facebook className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Original Source Tag */}
                <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 text-[10px] text-slate-400 font-mono-code leading-tight">
                  <span className="text-amber-400/90 font-bold">Citation:</span> {lead.source}
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between gap-2 pt-2">
                  <button
                    onClick={() => onOpenDetails(lead)}
                    className="text-xs text-slate-400 hover:text-slate-200 underline cursor-pointer"
                  >
                    View Details
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenOutreach(lead)}
                      className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> Outreach
                    </button>
                    <button
                      onClick={() => saveLead(lead)}
                      disabled={isSaved}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isSaved
                          ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-default'
                          : 'gold-gradient-bg text-slate-950 hover:brightness-110 shadow-sm'
                      }`}
                    >
                      {isSaved ? 'Saved' : 'Save Lead'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
