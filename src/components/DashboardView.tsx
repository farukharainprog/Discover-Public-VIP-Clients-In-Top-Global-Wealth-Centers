import React from 'react';
import {
  Users,
  CheckCircle2,
  Globe2,
  BookmarkCheck,
  PhoneCall,
  HeartHandshake,
  Search,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  ExternalLink,
  Mail,
  MessageSquare,
} from 'lucide-react';
import { useLeads } from '../context/LeadContext.tsx';
import { TARGET_COUNTRIES, TARGET_INDUSTRIES } from '../data/verifiedDirectory.ts';

interface DashboardViewProps {
  onNavigateToFinder: (country?: string, industry?: string) => void;
  onNavigateToSaved: () => void;
  onOpenOutreach: (lead: any) => void;
  onOpenDetails: (lead: any) => void;
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

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigateToFinder,
  onNavigateToSaved,
  onOpenOutreach,
  onOpenDetails,
}) => {
  const { stats, searchResults, savedLeads, saveLead, isLeadSaved } = useLeads();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-amber-950/50 via-[#141310] to-[#0d0e14] border border-amber-500/30 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>International Lead Intelligence Engine</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-brand">
            Discover Public VIP Clients In <span className="gold-gradient-text">Top Global Wealth Centers</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Built for freelancers, digital agencies, video editors, and digital service providers.
            Access publicly listed business contacts, official websites, corporate emails, and verified
            directories across the 12 highest-GDP nations.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateToFinder()}
              className="flex items-center gap-2 px-6 py-3 rounded-xl gold-gradient-bg text-slate-950 font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-lg shadow-amber-500/25 cursor-pointer"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              Start Finding Clients
            </button>
            <button
              onClick={onNavigateToSaved}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-amber-500/30 text-amber-300 font-semibold text-sm tracking-wide transition-all cursor-pointer"
            >
              <BookmarkCheck className="w-4 h-4" />
              View Saved Leads ({savedLeads.length})
            </button>
          </div>
        </div>
      </div>

      {/* Live Statistics Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            Live Verified Statistics
          </h3>
          <span className="text-[11px] text-slate-400 font-mono-code">
            Based on active collected records
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {/* Card 1: Total Leads Found */}
          <div className="p-4 rounded-xl dark-card gold-border-glow border border-slate-800 transition-all">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-2">
              <Users className="w-4 h-4" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-white font-mono-code">
              {stats.totalLeadsFound}
            </p>
            <p className="text-xs text-slate-400 font-medium">Total Leads Found</p>
          </div>

          {/* Card 2: Verified Contacts */}
          <div className="p-4 rounded-xl dark-card gold-border-glow border border-slate-800 transition-all">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-emerald-400 font-mono-code">
              {stats.verifiedContacts}
            </p>
            <p className="text-xs text-slate-400 font-medium">Verified Contacts</p>
          </div>

          {/* Card 3: Countries Covered */}
          <div className="p-4 rounded-xl dark-card gold-border-glow border border-slate-800 transition-all">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-2">
              <Globe2 className="w-4 h-4" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-sky-400 font-mono-code">
              {stats.countriesCovered}
            </p>
            <p className="text-xs text-slate-400 font-medium">Countries Covered</p>
          </div>

          {/* Card 4: Saved Leads */}
          <div className="p-4 rounded-xl dark-card gold-border-glow border border-slate-800 transition-all">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-2">
              <BookmarkCheck className="w-4 h-4" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-amber-300 font-mono-code">
              {stats.savedLeads}
            </p>
            <p className="text-xs text-slate-400 font-medium">Saved Leads</p>
          </div>

          {/* Card 5: Contacted Businesses */}
          <div className="p-4 rounded-xl dark-card gold-border-glow border border-slate-800 transition-all">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-2">
              <PhoneCall className="w-4 h-4" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-purple-400 font-mono-code">
              {stats.contactedBusinesses}
            </p>
            <p className="text-xs text-slate-400 font-medium">Contacted</p>
          </div>

          {/* Card 6: Interested Businesses */}
          <div className="p-4 rounded-xl dark-card gold-border-glow border border-slate-800 transition-all">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-300 mb-2">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <p className="text-xl sm:text-2xl font-black text-emerald-300 font-mono-code">
              {stats.interestedBusinesses}
            </p>
            <p className="text-xs text-slate-400 font-medium">Interested Deals</p>
          </div>
        </div>
      </div>

      {/* Target Countries Quick Access */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-amber-400" />
            Target Wealth Economies
          </h3>
          <span className="text-xs text-slate-400">Click a country to search leads instantly</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {TARGET_COUNTRIES.map((country) => (
            <button
              key={country}
              onClick={() => onNavigateToFinder(country)}
              className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 hover:border-amber-500/40 text-left transition-all group cursor-pointer"
            >
              <span className="text-2xl select-none">{COUNTRY_FLAGS[country] || '🌐'}</span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-200 group-hover:text-amber-300 truncate">
                  {country}
                </p>
                <p className="text-[10px] text-slate-500 group-hover:text-amber-400/80 flex items-center gap-0.5">
                  Explore <ArrowRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Target Industries Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Building className="w-4 h-4 text-amber-400" />
            High-Value Target Industries
          </h3>
          <span className="text-xs text-slate-400">11 Premium Business Categories</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {TARGET_INDUSTRIES.map((ind) => (
            <button
              key={ind}
              onClick={() => onNavigateToFinder(undefined, ind)}
              className="px-3.5 py-2 rounded-xl bg-slate-900/70 hover:bg-amber-500/10 border border-slate-800 hover:border-amber-500/40 text-xs font-semibold text-slate-300 hover:text-amber-300 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>{ind}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Connected Public Data Sources Audit Card */}
      <div className="p-5 rounded-2xl dark-card border border-amber-500/20 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Connected Public Directories &amp; Regulatory Registries
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Strictly compliant with public records. Never invent phone numbers, emails, or company listings.
            </p>
          </div>
          <span className="text-[11px] px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono-code font-bold self-start">
            100% TRANSPARENT CITATIONS
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <p className="font-bold text-slate-200">Companies House UK</p>
            <p className="text-[11px] text-slate-400">Official Executive Public Business Register</p>
            <span className="text-[10px] text-emerald-400 font-mono-code">Status: ACTIVE VERIFIED</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <p className="font-bold text-slate-200">Dubai DED &amp; Land Dept</p>
            <p className="text-[11px] text-slate-400">UAE Department of Economy &amp; Tourism</p>
            <span className="text-[10px] text-emerald-400 font-mono-code">Status: ACTIVE VERIFIED</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <p className="font-bold text-slate-200">ACRA Singapore &amp; Swiss UID</p>
            <p className="text-[11px] text-slate-400">Federal Commercial Registers</p>
            <span className="text-[10px] text-emerald-400 font-mono-code">Status: ACTIVE VERIFIED</span>
          </div>
        </div>
      </div>

      {/* Featured Client Discoveries */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Recent High-Value Discoveries</h3>
            <p className="text-xs text-slate-400">
              Verified corporate entities ready for personalized digital outreach
            </p>
          </div>
          <button
            onClick={() => onNavigateToFinder()}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
          >
            Explore All Leads <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.slice(0, 6).map((lead) => {
            const isSaved = isLeadSaved(lead);
            return (
              <div
                key={lead.id}
                className="rounded-xl dark-card p-4 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-lg">{COUNTRY_FLAGS[lead.country] || '🌐'}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-bold uppercase">
                      {lead.industry}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors mt-2">
                    {lead.businessName}
                  </h4>
                  <p className="text-xs text-slate-400">
                    {lead.city}, {lead.country}
                  </p>

                  <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                    {lead.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <div className="text-[10px] text-slate-400 font-mono-code truncate">
                    <span className="text-amber-400 font-semibold">Source:</span> {lead.source}
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-1.5">
                      {lead.website && (
                        <a
                          href={lead.website}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-md bg-slate-800 text-slate-300 hover:text-amber-300 hover:bg-slate-700 transition-colors"
                          title="Visit Official Website"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {lead.email && (
                        <a
                          href={`mailto:${lead.email}`}
                          className="p-1.5 rounded-md bg-slate-800 text-slate-300 hover:text-emerald-300 hover:bg-slate-700 transition-colors"
                          title={`Email: ${lead.email}`}
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {lead.whatsapp && (
                        <a
                          href={`https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-md bg-emerald-950/60 text-emerald-400 hover:bg-emerald-900 border border-emerald-500/30 transition-colors"
                          title={`WhatsApp: ${lead.whatsapp}`}
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onOpenOutreach(lead)}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-bold text-[11px] transition-all cursor-pointer flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3" /> Outreach
                      </button>
                      <button
                        onClick={() => saveLead(lead)}
                        disabled={isSaved}
                        className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                          isSaved
                            ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-default'
                            : 'gold-gradient-bg text-slate-950 hover:brightness-110 shadow-sm'
                        }`}
                      >
                        {isSaved ? 'Saved' : 'Save'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
