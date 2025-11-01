import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Search, MapPin, DollarSign, Briefcase, Clock, Heart, ExternalLink } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  experience: string;
  postedDate: string;
  skills: string[];
  description: string;
  isQuickApply: boolean;
  isSaved: boolean;
}

export function JobBoard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [salaryRange, setSalaryRange] = useState([0, 200]);
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());

  const jobListings: JobListing[] = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      salary: '$120k - $180k',
      type: 'Full-time',
      experience: '5+ years',
      postedDate: '2 days ago',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      description: 'We are looking for a senior software engineer to join our platform team...',
      isQuickApply: true,
      isSaved: false,
    },
    {
      id: '2',
      title: 'Product Designer',
      company: 'Design Studio',
      location: 'Remote',
      salary: '$90k - $130k',
      type: 'Full-time',
      experience: '3+ years',
      postedDate: '1 week ago',
      skills: ['Figma', 'UI/UX', 'User Research', 'Prototyping'],
      description: 'Join our design team to create beautiful user experiences...',
      isQuickApply: true,
      isSaved: false,
    },
    {
      id: '3',
      title: 'Data Scientist',
      company: 'Analytics Pro',
      location: 'New York, NY',
      salary: '$110k - $160k',
      type: 'Full-time',
      experience: '4+ years',
      postedDate: '3 days ago',
      skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
      description: 'Help us build AI-powered analytics solutions for enterprise clients...',
      isQuickApply: false,
      isSaved: false,
    },
    {
      id: '4',
      title: 'Frontend Developer',
      company: 'WebDev Solutions',
      location: 'Austin, TX',
      salary: '$85k - $120k',
      type: 'Full-time',
      experience: '2+ years',
      postedDate: '5 days ago',
      skills: ['React', 'JavaScript', 'CSS', 'HTML'],
      description: 'Build modern web applications with the latest technologies...',
      isQuickApply: true,
      isSaved: false,
    },
    {
      id: '5',
      title: 'DevOps Engineer',
      company: 'Cloud Systems',
      location: 'Seattle, WA',
      salary: '$100k - $150k',
      type: 'Full-time',
      experience: '3+ years',
      postedDate: '1 day ago',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      description: 'Manage and optimize our cloud infrastructure...',
      isQuickApply: true,
      isSaved: false,
    },
    {
      id: '6',
      title: 'Marketing Manager',
      company: 'Growth Co.',
      location: 'Boston, MA',
      salary: '$75k - $110k',
      type: 'Full-time',
      experience: '4+ years',
      postedDate: '1 week ago',
      skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
      description: 'Lead our marketing initiatives and drive growth...',
      isQuickApply: false,
      isSaved: false,
    },
  ];

  const handleQuickApply = (jobId: string, jobTitle: string) => {
    toast.success(`Applied to ${jobTitle}!`, {
      description: 'Your application has been submitted successfully.',
    });
  };

  const toggleSaveJob = (jobId: string) => {
    const newSavedJobs = new Set(savedJobs);
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
      toast.info('Job removed from saved');
    } else {
      newSavedJobs.add(jobId);
      toast.success('Job saved!');
    }
    setSavedJobs(newSavedJobs);
  };

  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch = searchQuery === '' || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesLocation = locationFilter === 'all' || job.location.includes(locationFilter);
    const matchesExperience = experienceFilter === 'all' || job.experience.includes(experienceFilter);
    
    return matchesSearch && matchesLocation && matchesExperience;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="p-6">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by job title, company, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-700 mb-1 block">Location</label>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="San Francisco">San Francisco, CA</SelectItem>
                  <SelectItem value="New York">New York, NY</SelectItem>
                  <SelectItem value="Austin">Austin, TX</SelectItem>
                  <SelectItem value="Seattle">Seattle, WA</SelectItem>
                  <SelectItem value="Boston">Boston, MA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-700 mb-1 block">Experience Level</label>
              <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="2+">2+ years</SelectItem>
                  <SelectItem value="3+">3+ years</SelectItem>
                  <SelectItem value="4+">4+ years</SelectItem>
                  <SelectItem value="5+">5+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-gray-700 mb-1 block">
                Salary Range: ${salaryRange[0]}k - ${salaryRange[1]}k+
              </label>
              <Slider
                value={salaryRange}
                onValueChange={setSalaryRange}
                min={0}
                max={200}
                step={10}
                className="mt-2"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-gray-700">
          <span className="text-gray-900">{filteredJobs.length}</span> jobs found
        </p>
        <Button variant="outline" size="sm">
          Sort by: Relevance
        </Button>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {/* Job Header */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-gray-900">{job.title}</h3>
                      {job.isQuickApply && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Quick Apply
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-900">{job.company}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSaveJob(job.id)}
                    className={savedJobs.has(job.id) ? 'text-[#ef4444]' : 'text-gray-400'}
                  >
                    <Heart className={`h-5 w-5 ${savedJobs.has(job.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>

                {/* Job Details */}
                <div className="flex flex-wrap gap-4 mb-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    {job.experience}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Posted {job.postedDate}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-3">{job.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  {job.isQuickApply ? (
                    <Button
                      onClick={() => handleQuickApply(job.id, job.title)}
                      className="bg-[#2563eb] hover:bg-[#1d4ed8]"
                    >
                      Quick Apply
                    </Button>
                  ) : (
                    <Button className="bg-[#2563eb] hover:bg-[#1d4ed8]">
                      Apply Now
                    </Button>
                  )}
                  <Button variant="outline">
                    View Details
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No jobs found matching your criteria.</p>
          <Button
            variant="link"
            onClick={() => {
              setSearchQuery('');
              setLocationFilter('all');
              setExperienceFilter('all');
              setSalaryRange([0, 200]);
            }}
            className="text-[#2563eb]"
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
