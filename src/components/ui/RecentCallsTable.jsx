import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { format } from "date-fns";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

export default function RecentCallsTable({ calls, currentPage, totalPages, totalRecords, setCurrentPage }) {
  //const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  //const itemsPerPage = 8;
  
  const filteredCalls = calls.filter((call) =>
    call.callerName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  
  const startIndex = (currentPage - 1) * 8;
const endIndex = startIndex + calls.length;
  //const startIndex = (currentPage - 1) * itemsPerPage;
  //const endIndex = startIndex + itemsPerPage;
  //const paginatedCalls = filteredCalls.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
};

const handleNextPage = () => {
    if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
    }
};

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (

    <div className="bg-slate-800/50 rounded-xl shadow p-6 border-l-4 border-l-cyan-500">

      <div className="flex flex-col gap-4 mb-6">
        <h2 className="text-2xl font-bold text-white">
          Recent Call Logs
        </h2>
        
        <div className="relative">
          <Search className="absolute left-3 top-3 text-cyan-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by caller name..."
            className="w-full pl-10 pr-4 py-2 border border-cyan-500/30 rounded-lg bg-slate-700/50 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          />
        </div>
      </div>

   <div className="overflow-x-auto">
      <Table>

        <TableHeader className="bg-gradient-to-r from-slate-700 to-slate-800">

          <TableRow className="border-b-2 border-cyan-500/50">

            <TableHead className="text-cyan-400 font-bold">Caller Name</TableHead>

            <TableHead className="text-cyan-400 font-bold">Caller Number</TableHead>

            <TableHead className="text-cyan-400 font-bold">Receiver Number</TableHead>

            <TableHead className="text-cyan-400 font-bold">City</TableHead>

            <TableHead className="text-cyan-400 font-bold">Duration</TableHead>

            <TableHead className="text-cyan-400 font-bold">Cost</TableHead>

            <TableHead className="text-cyan-400 font-bold">Start Time</TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {filteredCalls.map((call) => (

            <TableRow key={call.id}
            className="odd:bg-slate-700/30 hover:bg-slate-700/50 transition-colors text-white">

              <TableCell>

                {call.callerName}

              </TableCell>

              <TableCell>

                {call.callerNumber}

              </TableCell>

              <TableCell>

                {call.receiverNumber}

              </TableCell>

              <TableCell>

                {call.city}

              </TableCell>

              <TableCell>

                {call.callDuration}s

              </TableCell>

              <TableCell>

                ${Number(call.callCost).toFixed(2)}

              </TableCell>

              <TableCell>

                {format(
                  new Date(call.callStartTime),
                  "dd MMM yyyy HH:mm"
                )}

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>
      </div>

      <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-sm text-cyan-400 font-medium">
          <span>Showing {startIndex + 1} to {Math.min(endIndex, totalRecords)} of {totalRecords} calls</span>
          {searchQuery && (
            <span className="ml-2 text-cyan-300">
              (filtered from {filteredCalls.length} results)
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-cyan-500/50 text-cyan-400 hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            aria-label="Previous page"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-1">

    {[...Array(Math.min(totalPages, 5))].map((_, index) => {

        const page =
            currentPage <= 3
                ? index + 1
                : currentPage - 2 + index;

        if (page > totalPages) return null;

        return (
            <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                    currentPage === page
                        ? "bg-cyan-500 text-white"
                        : "border border-cyan-500/30 text-cyan-400 hover:bg-slate-700/50"
                }`}
            >
                {page}
            </button>
        );
    })}

</div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-cyan-500/50 text-cyan-400 hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            aria-label="Next page"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>

  );

}