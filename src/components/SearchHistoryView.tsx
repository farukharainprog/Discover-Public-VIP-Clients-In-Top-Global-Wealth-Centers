import React, { useState, useEffect } from 'react';
import { History, Search, ArrowRight, RotateCw, Trash2, Calendar, Globe2 } from 'lucide-react';
import { SearchHistoryRecord } from '../types/index.ts';

interface SearchHistoryViewProps {
  onRerunSearch: (query: string, country?: string) => void;
}

export const SearchHistoryView: React.FC<SearchHistoryViewProps> = ({ onRerunSearch }) => {
  const [history, setHistory] = useState<SearchHistoryRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/search-history');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setHistory(data.data);
        }
      }
    } catch (err) {
      console.warn('Could not fetch search history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white font-brand tracking-tight flex items-center gap-2">
            <History className="w-6 h-6 text-amber-400" />
            Global Search History &amp; Audit Logs
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Review past client discovery executions, timestamps, and discovered lead volumes.
          </p>
        </div>

        <button
          onClick={fetchHistory}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer self-start sm:self-auto"
        >
          <RotateCw className="w-3.5 h-3.5" /> Refresh History
        </button>
      </div>

      {/* History Table */}
      <div className="p-6 rounded-2xl dark-card border border-slate-800 space-y-4">
        {loading ? (
          <div className="p-10 text-center text-xs text-slate-400">Loading audit history...</div>
        ) : history.length === 0 ? (
          <div className="p-10 text-center text-xs text-slate-400 space-y-2">
            <History className="w-8 h-8 text-slate-600 mx-auto" />
            <p>No recent search executions recorded.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase font-mono-code text-[11px]">
                  <th className="pb-3 font-semibold">Search Query / Target</th>
                  <th className="pb-3 font-semibold">Country</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Results</th>
                  <th className="pb-3 font-semibold">Execution Time</th>
                  <th className="pb-3 font-semibold text-right">Rerun</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-850">
                {history.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/40">
                    <td className="py-3.5 font-bold text-white pr-2 flex items-center gap-2">
                      <Search className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{item.query}</span>
                    </td>
                    <td className="py-3.5 text-slate-300">{item.country}</td>
                    <td className="py-3.5">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 font-mono-code text-emerald-400 font-bold">
                      {item.resultsCount} leads
                    </td>
                    <td className="py-3.5 text-slate-400 font-mono-code text-[11px]">
                      {item.timestamp}
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => onRerunSearch(item.query, item.country)}
                        className="px-3 py-1.5 rounded-lg gold-gradient-bg text-slate-950 font-bold text-[11px] hover:brightness-110 cursor-pointer shadow-sm inline-flex items-center gap-1"
                      >
                        <span>Rerun</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
