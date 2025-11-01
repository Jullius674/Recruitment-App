import { useState } from "react";
import { Plus, Search, Filter, TrendingUp, Users, Target } from "lucide-react@0.487.0";
import { StatsCard } from "./StatsCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Vacancy {
  id: string;
  jobTitle: string;
  dateCreated: string;
  applicants: number;
  matchRate: number;
  status: "Active" | "Closed";
  department: string;
}

const mockVacancies: Vacancy[] = [
  {
    id: "1",
    jobTitle: "Senior Frontend Developer",
    dateCreated: "2025-10-15",
    applicants: 45,
    matchRate: 72,
    status: "Active",
    department: "Engineering"
  },
  {
    id: "2",
    jobTitle: "Product Manager",
    dateCreated: "2025-10-20",
    applicants: 63,
    matchRate: 68,
    status: "Active",
    department: "Product"
  },
  {
    id: "3",
    jobTitle: "UX Designer",
    dateCreated: "2025-10-12",
    applicants: 28,
    matchRate: 81,
    status: "Active",
    department: "Design"
  },
  {
    id: "4",
    jobTitle: "Data Scientist",
    dateCreated: "2025-10-08",
    applicants: 52,
    matchRate: 64,
    status: "Active",
    department: "Data"
  },
  {
    id: "5",
    jobTitle: "Backend Engineer",
    dateCreated: "2025-09-28",
    applicants: 87,
    matchRate: 58,
    status: "Closed",
    department: "Engineering"
  },
  {
    id: "6",
    jobTitle: "Marketing Manager",
    dateCreated: "2025-10-22",
    applicants: 34,
    matchRate: 75,
    status: "Active",
    department: "Marketing"
  },
];

interface DashboardProps {
  onCreateVacancy?: () => void;
  onViewAnalytics?: (vacancyId: string) => void;
  onNavigate?: (section: string) => void;
}

export function Dashboard({ onCreateVacancy, onViewAnalytics, onNavigate }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredVacancies = mockVacancies.filter((vacancy) => {
    const matchesSearch = vacancy.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || vacancy.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeVacancies = mockVacancies.filter(v => v.status === "Active").length;
  const totalCandidates = mockVacancies.reduce((sum, v) => sum + v.applicants, 0);
  const avgMatchRate = Math.round(
    mockVacancies.reduce((sum, v) => sum + v.matchRate, 0) / mockVacancies.length
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Active Vacancies"
          value={activeVacancies}
          icon={TrendingUp}
          trend="+3 this week"
          trendUp={true}
        />
        <StatsCard
          title="Candidates This Week"
          value={156}
          icon={Users}
          trend="+12% from last week"
          trendUp={true}
        />
        <StatsCard
          title="Average Match Rate"
          value={`${avgMatchRate}%`}
          icon={Target}
          trend="+5% improvement"
          trendUp={true}
        />
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 w-full md:max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search vacancies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Vacancies Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>Number of Applicants</TableHead>
              <TableHead>Match Rate %</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVacancies.map((vacancy) => (
              <TableRow key={vacancy.id} className="hover:bg-slate-50 cursor-pointer">
                <TableCell>
                  <div>
                    <div className="text-slate-900">{vacancy.jobTitle}</div>
                    <div className="text-slate-500">{vacancy.department}</div>
                  </div>
                </TableCell>
                <TableCell className="text-slate-600">{vacancy.dateCreated}</TableCell>
                <TableCell className="text-slate-900">{vacancy.applicants}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-100 rounded-full h-2 max-w-[100px]">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${vacancy.matchRate}%`,
                          backgroundColor: vacancy.matchRate >= 70 ? '#10b981' : vacancy.matchRate >= 50 ? '#f59e0b' : '#ef4444'
                        }}
                      />
                    </div>
                    <span className="text-slate-900">{vacancy.matchRate}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={vacancy.status === "Active" ? "default" : "secondary"}
                    className={vacancy.status === "Active" ? "bg-green-100 text-green-700 hover:bg-green-100" : ""}
                  >
                    {vacancy.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (onViewAnalytics) onViewAnalytics(vacancy.id);
                      if (onNavigate) onNavigate('analytics');
                    }}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => {
          if (onCreateVacancy) onCreateVacancy();
          if (onNavigate) onNavigate('create-vacancy');
        }}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
        style={{ backgroundColor: '#2563eb' }}
      >
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
