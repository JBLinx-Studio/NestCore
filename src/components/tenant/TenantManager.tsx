
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
  Clock,
  UserCheck,
  Shield,
  FileText,
  Home,
  MapPin,
  Star,
  MessageSquare
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const TenantManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

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
      avatar: "/placeholder.svg",
      type: "tenant",
      rating: 4.8,
      verified: true
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
      avatar: "/placeholder.svg",
      type: "tenant",
      rating: 4.2,
      verified: true
    },
    {
      id: 3,
      name: "Agent Jane Smith",
      email: "jane.smith@realestate.com",
      phone: "+27 84 555 7890",
      property: "Multiple Listings",
      unit: "N/A",
      rentAmount: "N/A",
      leaseStart: "2024-01-01",
      leaseEnd: "2024-12-31",
      paymentStatus: "active",
      lastPayment: "N/A",
      deposit: "N/A",
      avatar: "/placeholder.svg",
      type: "agent",
      rating: 4.9,
      verified: true,
      specialization: "Residential Sales"
    },
    {
      id: 4,
      name: "David Thompson - Contractor",
      email: "d.thompson@construction.com",
      phone: "+27 82 444 1234",
      property: "Service Provider",
      unit: "N/A",
      rentAmount: "N/A",
      leaseStart: "2023-09-01",
      leaseEnd: "2024-08-31",
      paymentStatus: "active",
      lastPayment: "N/A",
      deposit: "N/A",
      avatar: "/placeholder.svg",
      type: "contractor",
      rating: 4.7,
      verified: true,
      specialization: "Plumbing & Electrical"
    },
    {
      id: 5,
      name: "Attorney Lisa Parker",
      email: "l.parker@lawfirm.com",
      phone: "+27 83 222 9999",
      property: "Legal Services",
      unit: "N/A",
      rentAmount: "N/A",
      leaseStart: "2024-01-01",
      leaseEnd: "2024-12-31",
      paymentStatus: "active",
      lastPayment: "N/A",
      deposit: "N/A",
      avatar: "/placeholder.svg",
      type: "lawyer",
      rating: 5.0,
      verified: true,
      specialization: "Property Law"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'agent': return <UserCheck className="h-4 w-4 text-purple-600" />;
      case 'contractor': return <span className="text-orange-600 font-bold text-sm">🔧</span>;
      case 'lawyer': return <span className="text-red-600 font-bold text-sm">⚖️</span>;
      default: return <Home className="h-4 w-4 text-blue-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'agent': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'contractor': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'lawyer': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-orange-500" />;
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || tenant.paymentStatus === statusFilter;
    const matchesType = typeFilter === "all" || tenant.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">User Management Hub</h2>
            <p className="text-lg text-gray-600">Manage all industry professionals in one place</p>
            <div className="flex gap-2 mt-3">
              <Badge className="bg-blue-100 text-blue-800">Tenants & Renters</Badge>
              <Badge className="bg-purple-100 text-purple-800">Real Estate Agents</Badge>
              <Badge className="bg-orange-100 text-orange-800">Contractors</Badge>
              <Badge className="bg-red-100 text-red-800">Legal Professionals</Badge>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* Enhanced Search and Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search users by name, property, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="active">Active</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="tenant">Tenants</SelectItem>
                <SelectItem value="agent">Real Estate Agents</SelectItem>
                <SelectItem value="contractor">Contractors</SelectItem>
                <SelectItem value="lawyer">Legal Professionals</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Enhanced Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Home className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-800">2</div>
                <div className="text-sm text-blue-600">Active Tenants</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-800">1</div>
                <div className="text-sm text-purple-600">Real Estate Agents</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <span className="text-orange-600 font-bold text-lg">🔧</span>
              <div>
                <div className="text-2xl font-bold text-orange-800">1</div>
                <div className="text-sm text-orange-600">Contractors</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <span className="text-red-600 font-bold text-lg">⚖️</span>
              <div>
                <div className="text-2xl font-bold text-red-800">1</div>
                <div className="text-sm text-red-600">Legal Professionals</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-800">5</div>
                <div className="text-sm text-green-600">Verified Users</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Users List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTenants.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-all duration-200 border border-gray-200">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {user.name}
                      {user.verified && <Shield className="h-4 w-4 text-green-500" />}
                    </CardTitle>
                    <CardDescription className="flex items-center space-x-2">
                      {getTypeIcon(user.type)}
                      <span>{user.property}</span>
                      {user.unit !== "N/A" && (
                        <>
                          <span>•</span>
                          <span>Unit {user.unit}</span>
                        </>
                      )}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge className={getTypeColor(user.type)}>
                    {user.type === 'tenant' ? 'Tenant' : 
                     user.type === 'agent' ? 'Agent' : 
                     user.type === 'contractor' ? 'Contractor' : 'Legal'}
                  </Badge>
                  <Badge className={getPaymentStatusColor(user.paymentStatus)}>
                    {user.paymentStatus}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Contact Information */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{user.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{user.phone}</span>
                </div>
                {user.specialization && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Star className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{user.specialization}</span>
                  </div>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(user.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{user.rating}</span>
              </div>

              {/* Payment/Service Information */}
              {user.type === 'tenant' && (
                <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Monthly Rent</span>
                    <span className="font-bold text-lg">{user.rentAmount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Last Payment</span>
                    <div className="flex items-center space-x-1">
                      {getPaymentStatusIcon(user.paymentStatus)}
                      <span className="text-sm">{new Date(user.lastPayment).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Security Deposit</span>
                    <span className="text-sm font-medium">{user.deposit}</span>
                  </div>
                </div>
              )}

              {/* Lease/Contract Information */}
              <div className="border-t pt-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    {user.type === 'tenant' ? 'Lease Period' : 'Contract Period'}
                  </span>
                  <span>{new Date(user.leaseStart).toLocaleDateString()} - {new Date(user.leaseEnd).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  View Profile
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Message
                </Button>
                {user.paymentStatus === 'overdue' && (
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
          <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? 'Try adjusting your search terms' : 'Start building your professional network'}
          </p>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Your First User
          </Button>
        </div>
      )}
    </div>
  );
};
