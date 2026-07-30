import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//import { fetchCalls } from "../api/cdrApi";
import { fetchCalls, fetchAnalytics } from "../api/cdrApi";
import { useAuth } from "../context/AuthContext";
import KPICards from "../components/ui/KPICards";
//import { getAnalytics } from "../utils/analytics";
import DurationChart from "../components/ui/DurationChart";
import CostChart from "../components/ui/CostChart";
import ActivityTimeline from "../components/ui/ActivityTimeline";
import CityChart from "../components/ui/CityChart";
import RecentCallsTable from "../components/ui/RecentCallsTable";
import { Skeleton } from "../components/ui/skeleton";


export default function Dashboard() {
  //const [calls, setCalls] = useState([]);
  const [calls, setCalls] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const [sortBy, setSortBy] = useState("timestamp");
const [order, setOrder] = useState("desc");
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  

  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, order]);

  useEffect(() => {
    async function loadData() {
       try {
            const [callData, analyticsData] = await Promise.all([
    fetchCalls(
    currentPage,
    8,
    {},
    {
        sortBy,
        order,
    }
),
    fetchAnalytics(),
]);

setCalls(callData.calls);
setTotalPages(callData.totalPages);
setTotalRecords(callData.totalRecords);
setAnalytics(analyticsData);

        } catch (error) {
            console.error(error);
            setError("Failed to fetch call data");
        } finally {
            setLoading(false);
        }
    }


    loadData();
  }, [currentPage,sortBy, order]);

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

  // const analytics = getAnalytics(calls);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
         <section className="overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-800 to-slate-900 shadow-2xl ring-1 ring-cyan-500/20">
        
          <div className="px-6 py-8 lg:px-10">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="mt-2 flex flex-wrap gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white"
                  >
                    <option value="timestamp">Date</option>
                    <option value="duration">Duration</option>
                    <option value="callerName">Caller Name</option>
                    <option value="city">City</option>
                  </select>

                  <select
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-white"
                  >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </select>
                </div>

             
              </div>

              <div className="max-w-2xl">
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Call Analytics Dashboard
                </h1>
                <p className="mt-4 max-w-2xl text-slate-300">
                  Monitor call traffic, costs, and performance with easy-to-scan charts and tables.
                </p>

                 <button
    onClick={handleLogout}
    className="bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-2 rounded-lg shadow-md transition-all duration-200"
  >
    Sign Out
  </button>
              </div>
            </div>
          </div>
        </section>

        <KPICards analytics={analytics} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
          <DurationChart analytics={analytics} sortBy={sortBy} order={order} />
          <CostChart calls={calls} sortBy={sortBy} order={order} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-stretch">
          <ActivityTimeline calls={calls} sortBy={sortBy} order={order} />
          <CityChart calls={calls} sortBy={sortBy} order={order} />
        </div>

        <RecentCallsTable
    calls={calls}
    currentPage={currentPage}
    totalPages={totalPages}
    totalRecords={totalRecords}
    setCurrentPage={setCurrentPage}
/>
      </div>
    </div>
  );
}