
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Home } from "lucide-react";

interface ChartData {
  name: string;
  value: number;
  change?: number;
  category?: string;
}

interface AdvancedChartsProps {
  marketTrends?: ChartData[];
  propertyPerformance?: ChartData[];
  financialMetrics?: ChartData[];
  portfolioDistribution?: ChartData[];
}

export const AdvancedCharts = ({ 
  marketTrends = [],
  propertyPerformance = [],
  financialMetrics = [],
  portfolioDistribution = []
}: AdvancedChartsProps) => {
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  // Sample data if none provided
  const defaultMarketTrends = [
    { name: 'Jan', value: 680000, change: 2.3 },
    { name: 'Feb', value: 695000, change: 2.2 },
    { name: 'Mar', value: 712000, change: 2.4 },
    { name: 'Apr', value: 728000, change: 2.2 },
    { name: 'May', value: 745000, change: 2.3 },
    { name: 'Jun', value: 760000, change: 2.0 }
  ];

  const defaultPropertyPerformance = [
    { name: 'Berg Street', value: 94.2, category: 'Occupancy' },
    { name: 'Cloete Street', value: 87.5, category: 'Occupancy' },
    { name: 'Lemmerville', value: 91.8, category: 'Occupancy' },
    { name: 'Pine Ridge', value: 96.1, category: 'Occupancy' }
  ];

  const defaultFinancialMetrics = [
    { name: 'Rental Income', value: 145000 },
    { name: 'Operating Expenses', value: 32000 },
    { name: 'Maintenance', value: 18000 },
    { name: 'Marketing', value: 8500 },
    { name: 'Insurance', value: 12000 },
    { name: 'Taxes', value: 22000 }
  ];

  const defaultPortfolioDistribution = [
    { name: 'Residential', value: 65 },
    { name: 'Commercial', value: 25 },
    { name: 'Mixed Use', value: 10 }
  ];

  const trends = marketTrends.length > 0 ? marketTrends : defaultMarketTrends;
  const performance = propertyPerformance.length > 0 ? propertyPerformance : defaultPropertyPerformance;
  const financial = financialMetrics.length > 0 ? financialMetrics : defaultFinancialMetrics;
  const portfolio = portfolioDistribution.length > 0 ? portfolioDistribution : defaultPortfolioDistribution;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Market Trends Chart */}
      <Card className="bg-white border border-slate-200/60 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <span>Market Value Trends</span>
          </CardTitle>
          <CardDescription>Average property values over time with growth rates</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" tickFormatter={(value) => `R ${(value / 1000).toFixed(0)}k`} />
              <Tooltip 
                formatter={(value: number) => [`R ${value.toLocaleString()}`, 'Market Value']}
                labelStyle={{ color: '#1e293b' }}
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#3B82F6" 
                strokeWidth={2}
                fill="url(#marketGradient)" 
              />
              <defs>
                <linearGradient id="marketGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Property Performance Chart */}
      <Card className="bg-white border border-slate-200/60 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Home className="h-5 w-5 text-green-600" />
            <span>Property Performance</span>
          </CardTitle>
          <CardDescription>Occupancy rates across your portfolio</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" tickFormatter={(value) => `${value}%`} />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Occupancy Rate']}
                labelStyle={{ color: '#1e293b' }}
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
              />
              <Bar dataKey="value" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Financial Breakdown Chart */}
      <Card className="bg-white border border-slate-200/60 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-emerald-600" />
            <span>Financial Breakdown</span>
          </CardTitle>
          <CardDescription>Income and expense distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={financial}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {financial.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`R ${value.toLocaleString()}`, 'Amount']}
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Portfolio Distribution Chart */}
      <Card className="bg-white border border-slate-200/60 shadow-lg">
        <CardHeader>
          <CardTitle>Portfolio Distribution</CardTitle>
          <CardDescription>Property type allocation</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={portfolio}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {portfolio.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Allocation']}
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
