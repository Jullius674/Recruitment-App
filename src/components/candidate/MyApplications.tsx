import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  Video, 
  Award,
  XCircle,
  Calendar,
  MapPin,
  Building2
} from 'lucide-react';

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  appliedDate: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'rejected';
  currentStage: string;
  progress: number;
  nextStep?: string;
  interviewDate?: string;
}

export function MyApplications() {
  const applications: Application[] = [
    {
      id: '1',
      jobTitle: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      appliedDate: '2024-10-25',
      status: 'interview',
      currentStage: 'Technical Interview',
      progress: 75,
      nextStep: 'Final Round Interview',
      interviewDate: '2024-11-05',
    },
    {
      id: '2',
      jobTitle: 'Product Designer',
      company: 'Design Studio',
      location: 'Remote',
      appliedDate: '2024-10-28',
      status: 'screening',
      currentStage: 'Resume Review',
      progress: 50,
      nextStep: 'Portfolio Review',
    },
    {
      id: '3',
      jobTitle: 'Frontend Developer',
      company: 'WebDev Solutions',
      location: 'Austin, TX',
      appliedDate: '2024-10-30',
      status: 'applied',
      currentStage: 'Application Submitted',
      progress: 25,
    },
    {
      id: '4',
      jobTitle: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'New York, NY',
      appliedDate: '2024-10-20',
      status: 'offer',
      currentStage: 'Offer Extended',
      progress: 100,
      nextStep: 'Decision deadline: Nov 10',
    },
    {
      id: '5',
      jobTitle: 'UI/UX Designer',
      company: 'Creative Agency',
      location: 'Los Angeles, CA',
      appliedDate: '2024-10-15',
      status: 'rejected',
      currentStage: 'Application Rejected',
      progress: 0,
    },
  ];

  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case 'applied':
        return <FileText className="h-5 w-5 text-blue-600" />;
      case 'screening':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'interview':
        return <Video className="h-5 w-5 text-purple-600" />;
      case 'offer':
        return <Award className="h-5 w-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getStatusBadge = (status: Application['status']) => {
    const styles = {
      applied: 'bg-blue-100 text-blue-700 border-blue-200',
      screening: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      interview: 'bg-purple-100 text-purple-700 border-purple-200',
      offer: 'bg-green-100 text-green-700 border-green-200',
      rejected: 'bg-red-100 text-red-700 border-red-200',
    };

    const labels = {
      applied: 'Applied',
      screening: 'In Screening',
      interview: 'Interview',
      offer: 'Offer Received',
      rejected: 'Not Selected',
    };

    return (
      <Badge variant="outline" className={styles[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const filterApplications = (status?: Application['status']) => {
    if (!status) return applications;
    return applications.filter(app => app.status === status);
  };

  const ApplicationCard = ({ application }: { application: Application }) => (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="mt-1">
            {getStatusIcon(application.status)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="text-gray-900 mb-1">{application.jobTitle}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Building2 className="h-4 w-4" />
                  <span>{application.company}</span>
                </div>
              </div>
              {getStatusBadge(application.status)}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {application.location}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Applied {new Date(application.appliedDate).toLocaleDateString()}
              </div>
            </div>

            {application.status !== 'rejected' && (
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-700">Current Stage: {application.currentStage}</span>
                  <span className="text-gray-600">{application.progress}%</span>
                </div>
                <Progress value={application.progress} className="h-2" />
              </div>
            )}

            {application.nextStep && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-blue-900">
                  <strong>Next Step:</strong> {application.nextStep}
                </p>
              </div>
            )}

            {application.interviewDate && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-4">
                <p className="text-sm text-purple-900">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  <strong>Interview Scheduled:</strong> {new Date(application.interviewDate).toLocaleDateString()} at 2:00 PM
                </p>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                View Details
              </Button>
              {application.status === 'interview' && (
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  Join Interview
                </Button>
              )}
              {application.status === 'offer' && (
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Review Offer
                </Button>
              )}
              <Button variant="ghost" size="sm">
                Withdraw
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  const activeCount = applications.filter(a => a.status !== 'rejected').length;
  const interviewCount = applications.filter(a => a.status === 'interview').length;
  const offerCount = applications.filter(a => a.status === 'offer').length;

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Applications</p>
              <p className="text-2xl text-gray-900 mt-1">{applications.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl text-gray-900 mt-1">{activeCount}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Interviews</p>
              <p className="text-2xl text-gray-900 mt-1">{interviewCount}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Video className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Offers</p>
              <p className="text-2xl text-gray-900 mt-1">{offerCount}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Award className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Applications List with Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            All ({applications.length})
          </TabsTrigger>
          <TabsTrigger value="active">
            Active ({activeCount})
          </TabsTrigger>
          <TabsTrigger value="interview">
            Interviews ({interviewCount})
          </TabsTrigger>
          <TabsTrigger value="offer">
            Offers ({offerCount})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {applications.map(app => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {filterApplications().filter(a => a.status !== 'rejected' && a.status !== 'offer').map(app => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </TabsContent>

        <TabsContent value="interview" className="space-y-4">
          {filterApplications('interview').map(app => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </TabsContent>

        <TabsContent value="offer" className="space-y-4">
          {filterApplications('offer').map(app => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
