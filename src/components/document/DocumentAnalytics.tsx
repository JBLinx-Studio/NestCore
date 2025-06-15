
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Calendar,
  PieChart,
  BarChart3
} from "lucide-react";

interface DocumentAnalyticsProps {
  documents: any[];
}

export const DocumentAnalytics = ({ documents }: DocumentAnalyticsProps) => {
  // Calculate analytics
  const totalDocuments = documents.length;
  const totalSize = documents.reduce((acc, doc) => {
    const sizeInMB = parseFloat(doc.size.replace(/[^\d.]/g, '')) || 0;
    return acc + sizeInMB;
  }, 0);

  const statusCounts = documents.reduce((acc, doc) => {
    acc[doc.status] = (acc[doc.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryCounts = documents.reduce((acc, doc) => {
    acc[doc.category] = (acc[doc.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const recentUploads = documents.filter(doc => {
    const uploadDate = new Date(doc.uploadDate);
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    return uploadDate >= lastWeek;
  }).length;

  const expiringSoon = documents.filter(doc => {
    if (!doc.expiryDate) return false;
    const expiryDate = new Date(doc.expiryDate);
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    return expiryDate <= nextMonth && expiryDate >= new Date();
  }).length;

  const storageUsagePercentage = Math.min((totalSize / 1000) * 100, 100); // Assuming 1GB limit

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Documents */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Total Documents</p>
              <p className="text-2xl font-bold text-blue-900">{totalDocuments}</p>
              <p className="text-xs text-blue-700">{recentUploads} uploaded this week</p>
            </div>
            <div className="h-12 w-12 bg-blue-500 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Storage Usage */}
      <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-purple-600">Storage Used</p>
              <p className="text-2xl font-bold text-purple-900">{totalSize.toFixed(1)} MB</p>
              <Progress value={storageUsagePercentage} className="mt-2 h-2" />
              <p className="text-xs text-purple-700 mt-1">{storageUsagePercentage.toFixed(1)}% of limit</p>
            </div>
            <div className="h-12 w-12 bg-purple-500 rounded-full flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Documents */}
      <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Active/Signed</p>
              <p className="text-2xl font-bold text-green-900">
                {(statusCounts.signed || 0) + (statusCounts.active || 0) + (statusCounts.approved || 0)}
              </p>
              <div className="flex gap-1 mt-1">
                <Badge variant="outline" className="text-xs text-green-700">
                  {statusCounts.signed || 0} signed
                </Badge>
              </div>
            </div>
            <div className="h-12 w-12 bg-green-500 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Expiring Soon */}
      <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Expiring Soon</p>
              <p className="text-2xl font-bold text-orange-900">{expiringSoon}</p>
              <p className="text-xs text-orange-700">Next 30 days</p>
            </div>
            <div className="h-12 w-12 bg-orange-500 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PieChart className="h-5 w-5 text-gray-600" />
            <span>Document Categories</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(categoryCounts).map(([category, count]) => {
              const percentage = (count / totalDocuments) * 100;
              return (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <span className="text-sm font-medium w-20">{category}</span>
                    <Progress value={percentage} className="flex-1 h-2" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{count}</span>
                    <Badge variant="outline" className="text-xs">
                      {percentage.toFixed(1)}%
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Timeline */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-600" />
            <span>Recent Activity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documents
              .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
              .slice(0, 5)
              .map((doc, index) => (
                <div key={doc.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className={`h-3 w-3 rounded-full ${
                    doc.status === 'signed' || doc.status === 'active' ? 'bg-green-500' :
                    doc.status === 'pending' ? 'bg-yellow-500' :
                    doc.status === 'uploaded' ? 'bg-blue-500' : 'bg-gray-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                    <p className="text-xs text-gray-500">{doc.property} • {doc.uploadDate}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      doc.status === 'signed' || doc.status === 'active' ? 'text-green-700 border-green-200' :
                      doc.status === 'pending' ? 'text-yellow-700 border-yellow-200' :
                      'text-gray-700 border-gray-200'
                    }`}
                  >
                    {doc.status}
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
