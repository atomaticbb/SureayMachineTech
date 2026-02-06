import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Users,
  TrendingUp,
  Eye,
  Clock,
  Search,
  RefreshCcw,
} from "lucide-react";
import { toast } from "sonner";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  status: string;
  createdAt: string;
}

interface Analytics {
  id: string;
  eventType: string;
  page: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

interface Statistics {
  contacts: {
    total: number;
    pending: number;
  };
  analytics: {
    pageViews: number;
    uniqueVisitors: number;
  };
  popularPages: Array<{ page: string; views: number }>;
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState<"contacts" | "analytics">(
    "contacts"
  );
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [analytics, setAnalytics] = useState<Analytics[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // 获取统计数据
  const fetchStatistics = async () => {
    try {
      const res = await fetch("/api/admin/statistics?days=7");
      const data = await res.json();
      if (data.success) {
        setStatistics(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch statistics:", error);
    }
  };

  // 获取联系人列表
  const fetchContacts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: "1",
        limit: "50",
        ...(statusFilter !== "all" && { status: statusFilter }),
        ...(searchTerm && { search: searchTerm }),
      });

      const res = await fetch(`/api/admin/contacts?${params}`);
      const data = await res.json();
      if (data.success) {
        setContacts(data.data.contacts);
      }
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  // 获取访问分析
  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/analytics?limit=100");
      const data = await res.json();
      if (data.success) {
        setAnalytics(data.data.analytics);
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  // 更新联系人状态
  const updateContactStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/contacts/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Status updated successfully");
        fetchContacts();
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  useEffect(() => {
    if (activeTab === "contacts") {
      fetchContacts();
    } else {
      fetchAnalytics();
    }
  }, [activeTab, statusFilter, searchTerm]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "replied":
        return "bg-blue-500";
      case "closed":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black text-foreground mb-4">
              ADMIN
              <span className="block text-primary mt-2">DASHBOARD</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Manage contacts and view website analytics
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Cards */}
      {statistics && (
        <section className="py-8 bg-background">
          <div className="container">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Contacts
                  </CardTitle>
                  <Users className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {statistics.contacts.total}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {statistics.contacts.pending} pending
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Page Views
                  </CardTitle>
                  <Eye className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {statistics.analytics.pageViews}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last 7 days
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Unique Visitors
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {statistics.analytics.uniqueVisitors}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last 7 days
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Top Page
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold truncate">
                    {statistics.popularPages[0]?.page || "N/A"}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {statistics.popularPages[0]?.views || 0} views
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-12 bg-background">
        <div className="container">
          <div className="max-w-7xl mx-auto">
            {/* Tabs */}
            <div className="flex gap-4 mb-8">
              <Button
                variant={activeTab === "contacts" ? "default" : "outline"}
                onClick={() => setActiveTab("contacts")}
              >
                Contacts
              </Button>
              <Button
                variant={activeTab === "analytics" ? "default" : "outline"}
                onClick={() => setActiveTab("analytics")}
              >
                Analytics
              </Button>
            </div>

            {/* Contacts Tab */}
            {activeTab === "contacts" && (
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <CardTitle>Contact Submissions</CardTitle>
                    <div className="flex gap-2 w-full md:w-auto">
                      <div className="relative flex-1 md:flex-none">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-9 w-full md:w-[200px]"
                        />
                      </div>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="replied">Replied</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={fetchContacts}
                        disabled={loading}
                      >
                        <RefreshCcw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8">Loading...</div>
                  ) : contacts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No contacts found
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {contacts.map((contact) => (
                            <TableRow key={contact.id}>
                              <TableCell className="font-medium">
                                {contact.name}
                              </TableCell>
                              <TableCell>{contact.email}</TableCell>
                              <TableCell>{contact.company || "-"}</TableCell>
                              <TableCell className="max-w-xs truncate">
                                {contact.message}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  className={getStatusColor(contact.status)}
                                >
                                  {contact.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {formatDate(contact.createdAt)}
                              </TableCell>
                              <TableCell>
                                <Select
                                  value={contact.status}
                                  onValueChange={(value) =>
                                    updateContactStatus(contact.id, value)
                                  }
                                >
                                  <SelectTrigger className="w-[120px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">
                                      Pending
                                    </SelectItem>
                                    <SelectItem value="replied">
                                      Replied
                                    </SelectItem>
                                    <SelectItem value="closed">
                                      Closed
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Analytics Tab */}
            {activeTab === "analytics" && (
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Analytics Records</CardTitle>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={fetchAnalytics}
                      disabled={loading}
                    >
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8">Loading...</div>
                  ) : analytics.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No analytics data found
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Event Type</TableHead>
                            <TableHead>Page</TableHead>
                            <TableHead>IP Address</TableHead>
                            <TableHead>User Agent</TableHead>
                            <TableHead>Date</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {analytics.map((record) => (
                            <TableRow key={record.id}>
                              <TableCell>
                                <Badge variant="outline">
                                  {record.eventType}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-medium">
                                {record.page || "-"}
                              </TableCell>
                              <TableCell className="text-sm">
                                {record.ipAddress || "-"}
                              </TableCell>
                              <TableCell className="text-sm max-w-xs truncate">
                                {record.userAgent || "-"}
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {formatDate(record.createdAt)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
