import { useState } from "react";
import { ArrowLeft, Check, X } from "lucide-react@0.487.0";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";

interface CreateVacancyProps {
  onBack: () => void;
}

export function CreateVacancy({ onBack }: CreateVacancyProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [jobTitle, setJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState<string[]>(["React", "TypeScript"]);
  const [newSkill, setNewSkill] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [educationReq, setEducationReq] = useState<string[]>([]);
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);

  const [criteriaSettings, setCriteriaSettings] = useState({
    skills: "required",
    experience: "required",
    education: "preferred",
  });

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const steps = [
    { number: 1, title: "Basic Details" },
    { number: 2, title: "AI Screening Criteria" },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Button variant="ghost" onClick={onBack} className="mb-4 gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
        <h1 className="text-slate-900 mb-2">Create New Vacancy</h1>
        <p className="text-slate-600">Fill in the details to post a new job vacancy</p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep >= step.number
                      ? 'text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                  style={currentStep >= step.number ? { backgroundColor: '#2563eb' } : {}}
                >
                  {currentStep > step.number ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.number
                  )}
                </div>
                <span className={`${currentStep >= step.number ? 'text-slate-900' : 'text-slate-500'}`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 mx-4 rounded ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Basic Details */}
      {currentStep === 1 && (
        <Card className="p-8 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div className="space-y-6">
            <div>
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Input
                id="jobTitle"
                placeholder="e.g. Senior Frontend Developer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="department">Department *</Label>
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="data">Data</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the role, responsibilities, and requirements..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 min-h-[200px]"
              />
              <p className="text-slate-500 mt-2">
                Tip: Include key responsibilities and what makes this role exciting
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Step 2: AI Screening Criteria */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <Card className="p-8 bg-white border border-slate-200 rounded-lg shadow-sm">
            <h3 className="text-slate-900 mb-4">Must-Have Skills</h3>
            <div className="space-y-4">
              <div>
                <div className="flex gap-2 mb-3">
                  <Input
                    placeholder="Add a skill (e.g. React, Python, AWS)"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  />
                  <Button onClick={addSkill} style={{ backgroundColor: '#2563eb' }}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-2 hover:text-blue-900"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-t border-slate-200">
                <Label>Mark as Required</Label>
                <Switch
                  checked={criteriaSettings.skills === "required"}
                  onCheckedChange={(checked) =>
                    setCriteriaSettings({
                      ...criteriaSettings,
                      skills: checked ? "required" : "preferred",
                    })
                  }
                />
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-white border border-slate-200 rounded-lg shadow-sm">
            <h3 className="text-slate-900 mb-4">Experience Requirements</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="experienceLevel">Experience Level *</Label>
                <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="junior">Junior (0-2 years)</SelectItem>
                    <SelectItem value="mid">Mid-Level (2-5 years)</SelectItem>
                    <SelectItem value="senior">Senior (5-8 years)</SelectItem>
                    <SelectItem value="lead">Lead (8+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="yearsExperience">Minimum Years of Experience</Label>
                <Input
                  id="yearsExperience"
                  type="number"
                  placeholder="e.g. 3"
                  value={yearsExperience}
                  onChange={(e) => setYearsExperience(e.target.value)}
                  className="mt-2"
                  min="0"
                />
              </div>

              <div className="flex items-center justify-between py-3 border-t border-slate-200">
                <Label>Mark as Required</Label>
                <Switch
                  checked={criteriaSettings.experience === "required"}
                  onCheckedChange={(checked) =>
                    setCriteriaSettings({
                      ...criteriaSettings,
                      experience: checked ? "required" : "preferred",
                    })
                  }
                />
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-white border border-slate-200 rounded-lg shadow-sm">
            <h3 className="text-slate-900 mb-4">Education Requirements</h3>
            <div className="space-y-3">
              <div className="space-y-3">
                {["Bachelor's Degree", "Master's Degree", "PhD", "Professional Certification"].map(
                  (edu) => (
                    <div key={edu} className="flex items-center space-x-2">
                      <Checkbox
                        id={edu}
                        checked={educationReq.includes(edu)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setEducationReq([...educationReq, edu]);
                          } else {
                            setEducationReq(educationReq.filter((e) => e !== edu));
                          }
                        }}
                      />
                      <label htmlFor={edu} className="text-slate-700 cursor-pointer">
                        {edu}
                      </label>
                    </div>
                  )
                )}
              </div>

              <div className="flex items-center justify-between py-3 border-t border-slate-200">
                <Label>Mark as Required</Label>
                <Switch
                  checked={criteriaSettings.education === "required"}
                  onCheckedChange={(checked) =>
                    setCriteriaSettings({
                      ...criteriaSettings,
                      education: checked ? "required" : "preferred",
                    })
                  }
                />
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox
            id="saveTemplate"
            checked={saveAsTemplate}
            onCheckedChange={(checked) => setSaveAsTemplate(checked as boolean)}
          />
          <label htmlFor="saveTemplate" className="text-slate-700 cursor-pointer">
            Save as Template
          </label>
        </div>

        <div className="flex gap-3">
          {currentStep > 1 && (
            <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
              Previous
            </Button>
          )}
          {currentStep < steps.length ? (
            <Button onClick={() => setCurrentStep(currentStep + 1)} style={{ backgroundColor: '#2563eb' }}>
              Next Step
            </Button>
          ) : (
            <Button style={{ backgroundColor: '#2563eb' }}>
              Create Vacancy
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
