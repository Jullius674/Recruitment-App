import { ArrowLeft, Users, TrendingUp, Calendar } from "lucide-react@0.487.0";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface VacancyAnalyticsProps {
  onBack: () => void;
  onViewCandidates: () => void;
}

const matchRateData = [
  { range: "0-30%", candidates: 12, fill: "#ef4444" },
  { range: "30-70%", candidates: 28, fill: "#f59e0b" },
  { range: "70-100%", candidates: 35, fill: "#10b981" },
];

const screeningData = [
  { name: "Passed", value: 63, color: "#10b981" },
  { name: "Failed", value: 12, color: "#ef4444" },
];

const pipelineData = [
  {
    id: "screening",
    title: "Screening",
    count: 15,
    candidates: [
      { name: "John Smith", match: 82 },
      { name: "Sarah Johnson", match: 76 },
      { name: "Mike Chen", match: 71 },
    ],
  },
  {
    id: "hr-review",
    title: "HR Review",
    count: 8,
    candidates: [
      { name: "Emily Davis", match: 88 },
      { name: "Alex Rivera", match: 79 },
    ],
  },
  {
    id: "interview",
    title: "Interview",
    count: 5,
    candidates: [
      { name: "Chris Taylor", match: 91 },
      { name: "Jessica Lee", match: 85 },
    ],
  },
  {
    id: "offer",
    title: "Offer",
    count: 2,
    candidates: [{ name: "David Kim", match: 94 }],
  },
];

export function VacancyAnalytics({ onBack, onViewCandidates }: VacancyAnalyticsProps) {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" onClick={onBack} className="mb-4 gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-slate-900 mb-2">Senior Frontend Developer</h1>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-100 text-green-700">Active</Badge>
              <span className="text-slate-600">Engineering • Posted Oct 15, 2025</span>
            </div>
          </div>
          <Button onClick={onViewCandidates} style={{ backgroundColor: '#2563eb' }}>
            View All Candidates
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-600">Total Applicants</span>
            <Users className="w-5 h-5 text-slate-400" />
          </div>
          <p className="text-slate-900">75</p>
          <p className="text-green-600 mt-1">+12 this week</p>
        </Card>

        <Card className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-600">Average Match %</span>
            <TrendingUp className="w-5 h-5 text-slate-400" />
          </div>
          <p className="text-slate-900">72%</p>
          <p className="text-green-600 mt-1">Above target</p>
        </Card>

        <Card className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-600">Days Open</span>
            <Calendar className="w-5 h-5 text-slate-400" />
          </div>
          <p className="text-slate-900">13 days</p>
          <p className="text-slate-600 mt-1">On track</p>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Match Rate Distribution */}
        <Card className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
          <h3 className="text-slate-900 mb-6">Match Rate Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={matchRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="range" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="candidates" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-slate-600 mt-4">
            35 candidates scored above 70% match rate
          </p>
        </Card>

        {/* Screening Results */}
        <Card className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
          <h3 className="text-slate-900 mb-6">Screening Results</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={screeningData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {screeningData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <p className="text-slate-600 mt-4">
            84% of candidates passed automated screening
          </p>
        </Card>
      </div>

      {/* Candidate Pipeline */}
      <Card className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
        <h3 className="text-slate-900 mb-6">Candidate Pipeline</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {pipelineData.map((stage) => (
            <div key={stage.id} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-slate-900">{stage.title}</h4>
                <Badge variant="secondary" className="bg-slate-200">
                  {stage.count}
                </Badge>
              </div>
              <div className="space-y-3">
                {stage.candidates.map((candidate, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-3 rounded-lg border border-slate-200 hover:shadow-sm transition-shadow cursor-pointer"
                  >
                    <p className="text-slate-900 mb-1">{candidate.name}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full"
                          style={{
                            width: `${candidate.match}%`,
                            backgroundColor:
                              candidate.match >= 80 ? "#10b981" : "#f59e0b",
                          }}
                        />
                      </div>
                      <span className="text-slate-600">{candidate.match}%</span>
                    </div>
                  </div>
                ))}
                {stage.candidates.length < stage.count && (
                  <p className="text-slate-500 text-center">
                    +{stage.count - stage.candidates.length} more
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
