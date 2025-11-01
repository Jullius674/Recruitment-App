import { Mail, X } from "lucide-react@0.487.0";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface CandidateCardProps {
  candidate: {
    id: string;
    name: string;
    currentPosition: string;
    matchScore: number;
    skills: string[];
    avatar?: string;
    status: string;
  };
}

export function CandidateCard({ candidate }: CandidateCardProps) {
  const getMatchColor = (score: number) => {
    if (score >= 80) return "#10b981";
    if (score >= 60) return "#f59e0b";
    return "#ef4444";
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={candidate.avatar} />
          <AvatarFallback className="bg-slate-200 text-slate-700">
            {getInitials(candidate.name)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="text-slate-900 mb-1">{candidate.name}</h4>
              <p className="text-slate-600">{candidate.currentPosition}</p>
            </div>
            <div className="text-right">
              <div
                className="inline-flex items-center justify-center w-16 h-16 rounded-full"
                style={{
                  backgroundColor: `${getMatchColor(candidate.matchScore)}20`,
                }}
              >
                <span
                  style={{ color: getMatchColor(candidate.matchScore) }}
                >
                  {candidate.matchScore}%
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {candidate.skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="bg-slate-100 text-slate-700"
              >
                {skill}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              className="gap-2"
              style={{ backgroundColor: '#2563eb' }}
            >
              <Mail className="w-4 h-4" />
              Contact
            </Button>
            <Button size="sm" variant="outline" className="gap-2 text-red-600 hover:bg-red-50">
              <X className="w-4 h-4" />
              Reject
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
