import { useEffect, useState } from "react";
import { fetchCalls } from "../api/cdrApi";
import KPICards from "../components/ui/KPICards";
import { getAnalytics } from "../utils/analytics";
import DurationChart from "../components/ui/DurationChart";
import CostChart from "../components/ui/CostChart";
import ActivityTimeline from "../components/ui/ActivityTimeline";
import CityChart from "../components/ui/CityChart";
import RecentCallsTable from "../components/ui/RecentCallsTable";
import { Skeleton } from "../components/ui/skeleton";

export default function Dashboard() {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchCalls();
        setCalls(data);
      } catch (error) {
        setError("Failed to fetch call data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 space-y-6">
        <Skeleton className="h-10 w-72" />
        <div className="grid grid-cols-5 gap-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
          <Skeleton className="h-32" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl text-red-600">{error}</h2>
          <p className="mt-2">Please refresh the page.</p>
        </div>
      </div>
    );
  }

  const filteredCalls = calls.filter((call) =>
    call.callerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const analytics = getAnalytics(filteredCalls);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-slate-50 to-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <section className="overflow-hidden rounded-[2rem] bg-slate-950/95 shadow-2xl ring-1 ring-white/10">
          <div className="px-6 py-8 lg:px-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Call Analytics Dashboard
                </h1>
                <p className="mt-4 max-w-2xl text-slate-300">
                  Monitor call traffic, costs, and performance with easy-to-scan charts and tables.
                </p>
              </div>

              <div className="w-full max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search by caller name..."
                  className="w-full rounded-3xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder-slate-300 shadow-lg shadow-slate-900/20 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/25"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 text-sm text-slate-300 sm:flex-row sm:items-center sm:gap-6">
              <span>{filteredCalls.length} call records displayed</span>
              {searchQuery && (
                <span>
                  Filtering by "<span className="text-white">{searchQuery}</span>"
                </span>
              )}
            </div>
          </div>
        </section>

        <KPICards analytics={analytics} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
          <DurationChart analytics={analytics} />
          <CostChart calls={filteredCalls} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
          <ActivityTimeline calls={filteredCalls} />
          <CityChart calls={filteredCalls} />
        </div>

        <RecentCallsTable calls={filteredCalls} />
      </div>
    </div>
  );
}