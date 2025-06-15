
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, BarChart3, Download, FileText } from "lucide-react";
import { toast } from "sonner";

export const MarketAnalysisWorkspace = () => {
  const [analysisData, setAnalysisData] = useState({
    area: "Berg Street, Bothasrus",
    radius: 600,
    priceRanges: [
      { range: "R 375,000 to R 425,999", percentage: 10 },
      { range: "R 426,000 to R 476,999", percentage: 0 },
      { range: "R 477,000 to R 527,999", percentage: 10 },
      { range: "R 528,000 to R 578,999", percentage: 0 },
      { range: "R 579,000 to R 629,999", percentage: 28 },
      { range: "R 630,000 to R 680,999", percentage: 10 },
      { range: "R 681,000 to R 731,999", percentage: 28 },
      { range: "R 732,000 to R 782,999", percentage: 5 },
      { range: "R 783,000 to R 833,999", percentage: 0 },
      { range: "R 834,000 to R 884,000", percentage: 9 }
    ]
  });

  const [marketTrends, setMarketTrends] = useState({
    averagePrice: 664000,
    medianPrice: 650000,
    priceGrowth: 5.2,
    timeOnMarket: 65,
    salesVolume: 24
  });

  const generateMarketReport = () => {
    toast.success("Generating comprehensive market analysis report...");
  };

  const exportPriceDistribution = () => {
    toast.success("Exporting price distribution chart...");
  };

  const maxPercentage = Math.max(...analysisData.priceRanges.map(r => r.percentage));

  return (
    <div className="space-y-6">
      {/* Market Area Definition */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Market Area Analysis</span>
          </CardTitle>
          <CardDescription>Define the geographical area for market analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="area">Target Area</Label>
              <Input
                id="area"
                value={analysisData.area}
                onChange={(e) => setAnalysisData({...analysisData, area: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="radius">Analysis Radius (meters)</Label>
              <Input
                id="radius"
                type="number"
                value={analysisData.radius}
                onChange={(e) => setAnalysisData({...analysisData, radius: Number(e.target.value)})}
              />
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-700">
              <strong>Analysis Area:</strong> Within a {analysisData.radius}m radius of "{analysisData.area}"
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Market Statistics</span>
          </CardTitle>
          <CardDescription>Key market indicators for the analysis area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                R {marketTrends.averagePrice.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Average Price</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                R {marketTrends.medianPrice.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Median Price</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                +{marketTrends.priceGrowth}%
              </div>
              <div className="text-sm text-gray-600">YoY Growth</div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {marketTrends.timeOnMarket}
              </div>
              <div className="text-sm text-gray-600">Days on Market</div>
            </div>
            
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {marketTrends.salesVolume}
              </div>
              <div className="text-sm text-gray-600">Sales (12 months)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Distribution */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Price Distribution</span>
            </CardTitle>
            <CardDescription>Property price ranges within the analysis area</CardDescription>
          </div>
          <Button onClick={exportPriceDistribution} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Chart
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {analysisData.priceRanges.map((range, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-48 text-sm font-medium">
                  {range.range}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium"
                    style={{ width: `${(range.percentage / maxPercentage) * 100}%` }}
                  >
                    {range.percentage > 0 && `${range.percentage}%`}
                  </div>
                </div>
                <div className="w-12 text-sm text-gray-600">
                  {range.percentage}%
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-700">
              <strong>Analysis Summary:</strong> The price distribution shows the highest concentration of sales 
              in the R 579,000 - R 629,999 and R 681,000 - R 731,999 ranges, each representing 28% of transactions. 
              This indicates a diverse market with properties appealing to different buyer segments.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Market Insights</CardTitle>
          <CardDescription>Professional analysis and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-green-500 bg-green-50">
              <div className="font-medium text-green-900">Strong Market Performance</div>
              <div className="text-sm text-green-700 mt-1">
                The area shows positive growth trends with average price increases of {marketTrends.priceGrowth}% year-over-year, 
                indicating a healthy and appreciating market.
              </div>
            </div>
            
            <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
              <div className="font-medium text-blue-900">Market Activity</div>
              <div className="text-sm text-blue-700 mt-1">
                With {marketTrends.salesVolume} sales in the last 12 months and an average of {marketTrends.timeOnMarket} days 
                on market, the area demonstrates good liquidity and buyer interest.
              </div>
            </div>
            
            <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
              <div className="font-medium text-purple-900">Price Positioning</div>
              <div className="text-sm text-purple-700 mt-1">
                Properties in the R 579,000 - R 731,999 range represent 56% of all sales, suggesting this is the 
                optimal price range for maximum market appeal and quick sales.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generate Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Generate Reports</CardTitle>
          <CardDescription>Export comprehensive market analysis reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button onClick={generateMarketReport} className="bg-gradient-to-r from-purple-500 to-purple-600">
              <FileText className="h-4 w-4 mr-2" />
              Full Market Report
            </Button>
            <Button variant="outline" onClick={() => toast.info("Trends analysis coming soon...")}>
              <TrendingUp className="h-4 w-4 mr-2" />
              Trends Analysis
            </Button>
            <Button variant="outline" onClick={() => toast.info("Comparable sales report coming soon...")}>
              <Download className="h-4 w-4 mr-2" />
              Comparable Sales
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
