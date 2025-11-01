import { useState } from "react";
import { ArrowLeft, Search, SlidersHorizontal } from "lucide-react@0.487.0";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { CandidateCard } from "./CandidateCard";
import { ScrollArea } from "./ui/scroll-area";

interface CandidateManagementProps {
  onBack: () => void;
}

const mockCandidates = [
  {
    id: "1",
    name: "Sarah Johnson",
    currentPosition: "Senior Frontend Developer at Google",
    matchScore: 94,
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    status: "Screening",
  },
  {
    id: "2",
    name: "Michael Chen",
    currentPosition: "Full Stack Engineer at Meta",
    matchScore: 88,
    skills: ["React", "Python", "AWS", "Docker"],
    status: "HR Review",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    currentPosition: "Frontend Lead at Stripe",
    matchScore: 85,
    skills: ["React", "TypeScript", "Next.js", "Testing"],
    status: "Interview",
  },
  {
    id: "4",
    name: "David Kim",
    currentPosition: "Software Engineer at Amazon",
    matchScore: 82,
    skills: ["React", "JavaScript", "Redux", "CSS"],
    status: "Screening",
  },
  {
    id: "5",
    name: "Jessica Taylor",
    currentPosition: "UI Engineer at Airbnb",
    matchScore: 78,
    skills: ["React", "Vue.js", "Tailwind", "Figma"],
    status: "Screening",
  },
  {
    id: "6",
    name: "Alex Rivera",
    currentPosition: "Frontend Developer at Shopify",
    matchScore: 75,
    skills: ["React", "TypeScript", "Redux", "Jest"],
    status: "HR Review",
  },
  {
    id: "7",
    name: "Chris Anderson",
    currentPosition: "Web Developer at Microsoft",
    matchScore: 71,
    skills: ["React", "Angular", "TypeScript", "Azure"],
    status: "Screening",
  },
  {
    id: "8",
    name: "Lisa Wang",
    currentPosition: "Software Engineer at Netflix",
    matchScore: 68,
    skills: ["React", "Node.js", "MongoDB", "Docker"],
    status: "Screening",
  },
];

export function CandidateManagement({ onBack }: CandidateManagementProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [matchScoreRange, setMatchScoreRange] = useState([0, 100]);
  const [statusFilters, setStatusFilters] = useState<string[]>([]);

  const statuses = ["Screening", "HR Review", "Interview", "Offer"];

  const toggleStatusFilter = (status: string) => {
    if (statusFilters.includes(status)) {
      setStatusFilters(statusFilters.filter((s) => s !== status));
    } else {
      setStatusFilters([...statusFilters, status]);
    }
  };

  const filteredCandidates = mockCandidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.currentPosition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesScore =
      candidate.matchScore >= matchScoreRange[0] &&
      candidate.matchScore <= matchScoreRange[1];
    const matchesStatus =
      statusFilters.length === 0 || statusFilters.includes(candidate.status);

    return matchesSearch && matchesScore && matchesStatus;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" onClick={onBack} className="mb-4 gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Analytics
        </Button>
        <h1 className="text-slate-900 mb-2">Candidate Management</h1>
        <p className="text-slate-600">Senior Frontend Developer - 75 Total Candidates</p>
      </div>

      {/* Split Panel Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <SlidersHorizontal className="w-5 h-5 text-slate-600" />
              <h3 className="text-slate-900">Filters</h3>
            </div>

            {/* Search */}
            <div className="mb-6">
              <Label htmlFor="search" className="mb-2 block">
                Search Candidates
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="search"
                  placeholder="Name or position..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Match Score Range */}
            <div className="mb-6">
              <Label className="mb-3 block">
                Match Score: {matchScoreRange[0]}% - {matchScoreRange[1]}%
              </Label>
              <Slider
                min={0}
                max={100}
                step={5}
                value={matchScoreRange}
                onValueChange={setMatchScoreRange}
                className="mb-2"
              />
              <div className="flex justify-between text-slate-500">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Status Filters */}
            <div className="mb-6">
              <Label className="mb-3 block">Status</Label>
              <div className="space-y-3">
                {statuses.map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={status}
                      checked={statusFilters.includes(status)}
                      onCheckedChange={() => toggleStatusFilter(status)}
                    />
                    <label htmlFor={status} className="text-slate-700 cursor-pointer">
                      {status}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setSearchQuery("");
                setMatchScoreRange([0, 100]);
                setStatusFilters([]);
              }}
            >
              Clear All Filters
            </Button>
          </div>
        </div>

        {/* Right Panel - Candidate Cards */}
        <div className="lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-slate-600">
              Showing {filteredCandidates.length} of {mockCandidates.length} candidates
            </p>
          </div>

          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="space-y-4 pr-4">
              {filteredCandidates.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} />
              ))}
              {filteredCandidates.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg border border-slate-200">
                  <p className="text-slate-600">No candidates match your filters</p>
                  <Button
                    variant="link"
                    onClick={() => {
                      setSearchQuery("");
                      setMatchScoreRange([0, 100]);
                      setStatusFilters([]);
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
