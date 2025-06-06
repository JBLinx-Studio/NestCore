
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Search,
  Plus,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

export const TenantManager = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const tenants = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+27 82 123 4567",
      property: "Sunnydale Apartments",
      unit: "2A",
      rentAmount: "R2,800",
      leaseStart: "2024-01-01",
      leaseEnd: "2024-12-31",
      paymentStatus: "paid",
      lastPayment: "2024-03-01",
      deposit: "R5,600",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@email.com",
      phone: "+27 83 987 6543",
      property: "Garden View Flats",
      unit: "1B",
      rentAmount: "R2,100",
      leaseStart: "2023-06-15",
      leaseEnd: "2024-06-14",
      paymentStatus: "overdue",
      lastPayment: "2024-01-15",
      deposit: "R4,200",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Linda Williams",
      email: "linda.w@email.com",
      phone: "+27 84 555 7890",
      property: "City Center Studios",
      unit: "3C",
      rentAmount: "R1,750",
      leaseStart: "2024-02-01",
      leaseEnd: "2025-01-31",
      paymentStatus: "pending",
      lastPayment: "2024-02-01",
      deposit: "R3,500",
      avatar: "/placeholder.svg"
    },
    {
      id: 4,
      name: "David Thompson",
      email: "d.thompson@email.com",
      phone: "+27 82 444 1234",
      property: "Beachfront Residence",
      unit: "1A",
      rentAmount: "R3,500",
      leaseStart: "2023-09-01",
      leaseEnd: "2024-08-31",
      paymentStatus: "paid",
      lastPayment: "2024-03-01",
      deposit: "R7,000",
      avatar: "/placeholder.svg"
    }
  ];

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-orange-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tenant Management</h2>
          <p className="text-gray-600">Manage tenant relationships and track payments</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Add New Tenant
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search tenants by name, property, or unit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-gray-600">Total Tenants</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">9</div>
                <div className="text-sm text-gray-600">Paid This Month</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold">2</div>
                <div className="text-sm text-gray-600">Overdue Payments</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-gray-600">Leases Expiring Soon</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tenants List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTenants.map((tenant) => (
          <Card key={tenant.id} className="hover:shadow-md transition-shadow duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={tenant.avatar} alt={tenant.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {tenant.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{tenant.name}</CardTitle>
                    <CardDescription className="flex items-center space-x-1">
                      <span>{tenant.property}</span>
                      <span>•</span>
                      <span>Unit {tenant.unit}</span>
                    </CardDescription>
                  </div>
                </div>
                <Badge className={getPaymentStatusColor(tenant.paymentStatus)}>
                  {tenant.paymentStatus}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Contact Information */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{tenant.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{tenant.phone}</span>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Monthly Rent</span>
                  <span className="font-bold text-lg">{tenant.rentAmount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Last Payment</span>
                  <div className="flex items-center space-x-1">
                    {getPaymentStatusIcon(tenant.paymentStatus)}
                    <span className="text-sm">{new Date(tenant.lastPayment).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Security Deposit</span>
                  <span className="text-sm font-medium">{tenant.deposit}</span>
                </div>
              </div>

              {/* Lease Information */}
              <div className="border-t pt-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Lease Period</span>
                  <span>{new Date(tenant.leaseStart).toLocaleDateString()} - {new Date(tenant.leaseEnd).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Send Message
                </Button>
                {tenant.paymentStatus === 'overdue' && (
                  <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                    Send Reminder
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTenants.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tenants found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first tenant'}
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Tenant
          </Button>
        </div>
      )}
    </div>
  );
};
