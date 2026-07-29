import { Card, CardContent } from "@/components/ui/card";

import {
  Phone,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function KPICards({ analytics }) {
  const safeAnalytics = analytics ?? {};

  const cards = [
    {
      title: "Total Calls",
      value: safeAnalytics.totalCalls ?? 0,
      icon: Phone,
      color: "bg-cyan-500/20",
      iconColor: "text-cyan-400",
    },
    {
      title: "Total Cost",
      value: `$${Number(safeAnalytics.totalCost ?? 0).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      icon: DollarSign,
      color: "bg-cyan-500/20",
      iconColor: "text-cyan-400",
    },
    {
      title: "Average Duration",
      value: `${Number(safeAnalytics.averageDuration ?? 0).toFixed(1)} sec`,
      icon: Clock,
      color: "bg-cyan-500/20",
      iconColor: "text-cyan-400",
    },
    {
      title: "Successful Calls",
      value: safeAnalytics.successfulCalls ?? 0,
      icon: CheckCircle,
      color: "bg-emerald-500/20",
      iconColor: "text-emerald-400",
    },
    {
      title: "Failed Calls",
      value: safeAnalytics.failedCalls ?? 0,
      icon: XCircle,
      color: "bg-red-500/20",
      iconColor: "text-red-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

      {cards.map((card) => {

        const Icon = card.icon;

        return (

          <Card key={card.title} className="transition-all duration-200 hover:scale-105 hover:shadow-lg border-cyan-500/30 bg-slate-800/50">

            <CardContent className="p-6">

              <div className="flex justify-between items-start">

                <div className="flex-1">
                  <h3 className="text-cyan-400 text-sm font-medium">
                    {card.title}
                  </h3>
                  <p className="text-3xl font-bold mt-4 text-white">
                    {card.value}
                  </p>
                </div>

                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon size={22} className={card.iconColor} />
                </div>

              </div>

            </CardContent>

          </Card>

        );

      })}

    </div>
  );

}