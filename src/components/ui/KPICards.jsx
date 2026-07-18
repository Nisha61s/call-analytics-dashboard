import { Card, CardContent } from "@/components/ui/card";

import {
  Phone,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function KPICards({ analytics }) {

  const cards = [
    {
      title: "Total Calls",
      value: analytics.totalCalls,
      icon: Phone,
    },
    {
      title: "Total Cost",
      value: `$${analytics.totalCost.toLocaleString(undefined, {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}`,
      icon: DollarSign,
    },
    {
      title: "Average Duration",
      value: `${analytics.averageDuration.toFixed(1)} sec`,
      icon: Clock,
    },
    {
      title: "Successful Calls",
      value: analytics.successfulCalls,
      icon: CheckCircle,
    },
    {
      title: "Failed Calls",
      value: analytics.failedCalls,
      icon: XCircle,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

      {cards.map((card) => {

        const Icon = card.icon;

        return (

          <Card key={card.title} className="transition-transform duration-200 hover:scale-105">

            <CardContent className="p-6">

              <div className="flex justify-between items-center">

                <h3 className="text-gray-500 text-sm">
                  {card.title}
                </h3>

                <Icon size={22} />

              </div>

              <p className="text-3xl font-bold mt-4">
                {card.value}
              </p>

            </CardContent>

          </Card>

        );

      })}

    </div>
  );

}