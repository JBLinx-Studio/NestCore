
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Users, TrendingUp, DollarSign, Home, MapPin } from "lucide-react";

interface PropertyStatsProps {
  properties: any[];
}

export const PropertyStats = ({ properties }: PropertyStatsProps) => {
  const totalProperties = properties.length;
  const totalUnits = properties.reduce((sum, p) => sum + (p.units || 0), 0);
  const occupiedUnits = properties.reduce((sum, p) => sum + (p.occupiedUnits || 0), 0);
  const totalRevenue = properties.reduce((sum, p) => sum + (p.monthlyRent || 0), 0);
  const occupancyRate = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;
  const averageRent = totalProperties > 0 ? Math.round(totalRevenue / totalProperties) : 0;

  const stats = [
    {
      title: "Total Properties",
      value: totalProperties,
      icon: Home,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700"
    },
    {
      title: "Total Units",
      value: totalUnits,
      icon: Building,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700"
    },
    {
      title: "Occupied Units",
      value: occupiedUnits,
      icon: Users,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700"
    },
    {
      title: "Occupancy Rate",
      value: `${occupancyRate}%`,
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700"
    },
    {
      title: "Monthly Revenue",
      value: `R${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700"
    },
    {
      title: "Average Rent",
      value: `R${averageRent.toLocaleString()}`,
      icon: MapPin,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      textColor: "text-pink-700"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.textColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
