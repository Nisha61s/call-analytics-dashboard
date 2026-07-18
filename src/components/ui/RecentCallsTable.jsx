import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { format } from "date-fns";

export default function RecentCallsTable({ calls }) {

  return (

    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">

        Recent Call Logs

      </h2>
   <div className="overflow-x-auto">
      <Table>

        <TableHeader>

          <TableRow>

            <TableHead>Caller Name</TableHead>

            <TableHead>Caller Number</TableHead>

            <TableHead>Receiver Number</TableHead>

            <TableHead>City</TableHead>

            <TableHead>Duration</TableHead>

            <TableHead>Cost</TableHead>

            <TableHead>Start Time</TableHead>

          </TableRow>

        </TableHeader>

        <TableBody>

          {calls.map((call) => (

            <TableRow key={call.id}
            className="odd:bg-slate-50">

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
    </div>

  );

}