import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { 
  Upload, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github,
  Globe,
  Plus,
  X,
  Briefcase,
  GraduationCap,
  Award
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function MyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState(['React', 'TypeScript', 'Node.js', 'Python', 'AWS']);
  const [newSkill, setNewSkill] = useState('');

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleResumeUpload = () => {
    toast.success('Resume uploaded successfully!');
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  return (
    <div className="space-y-6">
      {/* Profile Header Card */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-[#2563eb] rounded-full flex items-center justify-center text-white text-2xl">
              JD
            </div>
            <div>
              <h2 className="text-gray-900 mb-1">John Doe</h2>
              <p className="text-gray-700 mb-2">Senior Software Engineer</p>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
          <Button
            onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
            className={isEditing ? 'bg-[#10b981] hover:bg-[#059669]' : 'bg-[#2563eb] hover:bg-[#1d4ed8]'}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">john.doe@email.com</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-gray-400" />
            <span className="text-gray-600">+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Linkedin className="h-4 w-4 text-gray-400" />
            <a href="#" className="text-[#2563eb] hover:underline">linkedin.com/in/johndoe</a>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Github className="h-4 w-4 text-gray-400" />
            <a href="#" className="text-[#2563eb] hover:underline">github.com/johndoe</a>
          </div>
        </div>

        {/* Resume Upload */}
        <div className="border-t pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-[#2563eb]" />
              </div>
              <div>
                <p className="text-sm text-gray-900">Resume_JohnDoe_2024.pdf</p>
                <p className="text-xs text-gray-500">Updated 2 weeks ago • 245 KB</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResumeUpload}
              >
                <Upload className="h-4 w-4 mr-2" />
                Replace
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* About Section */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">About</h3>
        {isEditing ? (
          <Textarea
            placeholder="Write a brief introduction about yourself..."
            className="min-h-32"
            defaultValue="Experienced software engineer with 8+ years in full-stack development. Passionate about building scalable web applications and leading technical teams. Specialized in React, Node.js, and cloud technologies."
          />
        ) : (
          <p className="text-gray-600">
            Experienced software engineer with 8+ years in full-stack development. Passionate about building scalable web applications and leading technical teams. Specialized in React, Node.js, and cloud technologies.
          </p>
        )}
      </Card>

      {/* Skills Section */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Skills</h3>
          {isEditing && (
            <div className="flex items-center gap-2">
              <Input
                placeholder="Add skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                className="w-40"
              />
              <Button size="sm" onClick={addSkill}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-sm">
              {skill}
              {isEditing && (
                <button
                  onClick={() => removeSkill(skill)}
                  className="ml-2 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Work Experience */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Work Experience</h3>
          {isEditing && (
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          )}
        </div>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Briefcase className="h-6 w-6 text-[#2563eb]" />
            </div>
            <div className="flex-1">
              <h4 className="text-gray-900">Senior Software Engineer</h4>
              <p className="text-sm text-gray-700">TechCorp Inc.</p>
              <p className="text-sm text-gray-500 mb-2">2020 - Present • 4 years</p>
              <p className="text-sm text-gray-600">
                Led development of cloud-based SaaS platform serving 100k+ users. Managed team of 5 engineers and improved system performance by 40%.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Briefcase className="h-6 w-6 text-[#2563eb]" />
            </div>
            <div className="flex-1">
              <h4 className="text-gray-900">Software Engineer</h4>
              <p className="text-sm text-gray-700">StartupXYZ</p>
              <p className="text-sm text-gray-500 mb-2">2017 - 2020 • 3 years</p>
              <p className="text-sm text-gray-600">
                Built and maintained multiple web applications using React and Node.js. Implemented CI/CD pipelines and automated testing.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Education */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Education</h3>
          {isEditing && (
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          )}
        </div>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <GraduationCap className="h-6 w-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h4 className="text-gray-900">Bachelor of Science in Computer Science</h4>
              <p className="text-sm text-gray-700">University of California, Berkeley</p>
              <p className="text-sm text-gray-500">2013 - 2017</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Certifications */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900">Certifications</h3>
          {isEditing && (
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          )}
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Award className="h-5 w-5 text-[#f59e0b] mt-0.5" />
            <div>
              <h4 className="text-sm text-gray-900">AWS Certified Solutions Architect</h4>
              <p className="text-xs text-gray-500">Amazon Web Services • 2023</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Award className="h-5 w-5 text-[#f59e0b] mt-0.5" />
            <div>
              <h4 className="text-sm text-gray-900">Professional Scrum Master I</h4>
              <p className="text-xs text-gray-500">Scrum.org • 2022</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
