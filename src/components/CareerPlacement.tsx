import { useState } from 'react';
import { UserRole } from '../App';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { 
  Briefcase, 
  Building, 
  MapPin, 
  DollarSign,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  Target,
  Filter,
  Search,
  ExternalLink,
  Star
} from 'lucide-react';

interface CareerPlacementProps {
  role: UserRole;
}

export function CareerPlacement({ role }: CareerPlacementProps) {
  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  const employers = [
    {
      id: 1,
      name: 'CyberShield Solutions',
      logo: 'CS',
      positions: 3,
      hired: 12,
      industry: 'Financial Services',
    },
    {
      id: 2,
      name: 'SecureNet Technologies',
      logo: 'SN',
      positions: 5,
      hired: 8,
      industry: 'Technology',
    },
    {
      id: 3,
      name: 'DataGuard Corp',
      logo: 'DG',
      positions: 2,
      hired: 6,
      industry: 'Healthcare',
    },
  ];

  const jobRoles = [
    {
      id: 1,
      title: 'Junior SOC Analyst',
      company: 'CyberShield Solutions',
      location: 'Nairobi, Kenya',
      type: 'Full-time',
      salary: '$35,000 - $45,000',
      requiredSkills: ['SIEM', 'Log Analysis', 'Incident Response'],
      matchScore: 92,
      applicants: 12,
      status: 'open',
    },
    {
      id: 2,
      title: 'Network Security Engineer',
      company: 'SecureNet Technologies',
      location: 'Remote',
      type: 'Full-time',
      salary: '$50,000 - $65,000',
      requiredSkills: ['Firewall', 'VPN', 'IDS/IPS', 'Networking'],
      matchScore: 78,
      applicants: 18,
      status: 'open',
    },
    {
      id: 3,
      title: 'Security Operations Specialist',
      company: 'DataGuard Corp',
      location: 'Hybrid - Nairobi',
      type: 'Full-time',
      salary: '$40,000 - $55,000',
      requiredSkills: ['Security Monitoring', 'Threat Detection', 'Compliance'],
      matchScore: 85,
      applicants: 8,
      status: 'open',
    },
  ];

  const candidates = [
    {
      id: 1,
      name: 'Alex Johnson',
      track: 'SOC Analyst',
      score: 92,
      skills: ['SIEM', 'Splunk', 'Python', 'Incident Response'],
      status: 'shortlisted',
      portfolioProjects: 8,
      interviewDate: '2025-11-15',
    },
    {
      id: 2,
      name: 'Maria Garcia',
      track: 'Network Security',
      score: 88,
      skills: ['Firewall', 'Cisco', 'Network Security', 'VPN'],
      status: 'interview-scheduled',
      portfolioProjects: 6,
      interviewDate: '2025-11-12',
    },
    {
      id: 3,
      name: 'David Chen',
      track: 'Penetration Testing',
      score: 85,
      skills: ['Kali Linux', 'Burp Suite', 'Python', 'Web Security'],
      status: 'under-review',
      portfolioProjects: 10,
      interviewDate: null,
    },
  ];

  const applications = [
    {
      id: 1,
      role: 'Junior SOC Analyst',
      company: 'CyberShield Solutions',
      appliedDate: '2025-10-28',
      status: 'interview-scheduled',
      interviewDate: '2025-11-15',
    },
    {
      id: 2,
      role: 'Security Operations Specialist',
      company: 'DataGuard Corp',
      appliedDate: '2025-10-30',
      status: 'under-review',
      interviewDate: null,
    },
  ];

  const getStatusBadge = (status: string) => {
    const config: Record<string, { color: string; label: string }> = {
      'open': { color: 'bg-green-500/20 text-green-300 border-green-500', label: 'Open' },
      'shortlisted': { color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500', label: 'Shortlisted' },
      'interview-scheduled': { color: 'bg-purple-500/20 text-purple-300 border-purple-500', label: 'Interview Scheduled' },
      'under-review': { color: 'bg-orange-500/20 text-orange-300 border-orange-500', label: 'Under Review' },
      'applied': { color: 'bg-blue-500/20 text-blue-300 border-blue-500', label: 'Applied' },
    };
    return <Badge className={config[status]?.color || ''}>{config[status]?.label || status}</Badge>;
  };

  const renderStudentView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-8">
        {/* Search and Filters */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search job roles..."
                  className="pl-10 bg-slate-900/50 border-slate-700 text-white"
                />
              </div>
              <Button variant="outline" className="border-slate-700 text-slate-300">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Job Listings */}
        <div>
          <h2 className="text-2xl text-white mb-4">Recommended Roles</h2>
          <div className="space-y-4">
            {jobRoles.map((job) => (
              <Card
                key={job.id}
                className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:border-cyan-500 transition-all cursor-pointer"
                onClick={() => setSelectedRole(job.id)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl text-white mb-2">{job.title}</h3>
                      <p className="text-slate-400 mb-3">{job.company}</p>
                      
                      <div className="flex flex-wrap gap-3 text-sm text-slate-300 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-slate-400" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-slate-400" />
                          <span>{job.salary}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.requiredSkills.map((skill) => (
                          <Badge key={skill} variant="outline" className="border-slate-600 text-slate-300">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-center ml-4">
                      <div className="text-3xl text-cyan-400 mb-1">{job.matchScore}%</div>
                      <span className="text-xs text-slate-400">Match</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                    <span className="text-sm text-slate-400">{job.applicants} applicants</span>
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                      Apply Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* My Applications */}
        <div>
          <h2 className="text-2xl text-white mb-4">My Applications</h2>
          <div className="space-y-4">
            {applications.map((app) => (
              <Card key={app.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-white mb-1">{app.role}</h4>
                      <p className="text-sm text-slate-400">{app.company}</p>
                    </div>
                    {getStatusBadge(app.status)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400">Applied</p>
                      <p className="text-white">{new Date(app.appliedDate).toLocaleDateString()}</p>
                    </div>
                    {app.interviewDate && (
                      <div>
                        <p className="text-slate-400">Interview</p>
                        <p className="text-white">{new Date(app.interviewDate).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        {/* Profile Strength */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Profile Strength</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-4xl text-cyan-400 mb-2">85%</div>
              <p className="text-sm text-slate-400">Strong Profile</p>
            </div>
            <Progress value={85} className="h-2 mb-4" />
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Projects</span>
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Skills</span>
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Certifications</span>
                <Clock className="w-4 h-4 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employer Partners */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Employer Partners</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {employers.map((employer) => (
              <div
                key={employer.id}
                className="p-3 rounded-lg bg-slate-900/50 border border-slate-700 hover:border-cyan-500 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500">
                    <AvatarFallback className="text-white text-sm">{employer.logo}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-sm text-white">{employer.name}</h4>
                    <p className="text-xs text-slate-400">{employer.industry}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{employer.positions} open positions</span>
                  <span>{employer.hired} hired</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderEmployerView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-8">
        {/* Search and Filters */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search candidates by skills, track..."
                  className="pl-10 bg-slate-900/50 border-slate-700 text-white"
                />
              </div>
              <Button variant="outline" className="border-slate-700 text-slate-300">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Candidate List */}
        <div>
          <h2 className="text-2xl text-white mb-4">Top Candidates</h2>
          <div className="space-y-4">
            {candidates.map((candidate) => (
              <Card key={candidate.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500">
                      <AvatarFallback className="text-white text-xl">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl text-white mb-1">{candidate.name}</h3>
                          <p className="text-sm text-slate-400">{candidate.track} Track</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl text-cyan-400 mb-1">{candidate.score}</div>
                          <span className="text-xs text-slate-400">Score</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {candidate.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="border-slate-600 text-slate-300">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-slate-400">Portfolio</p>
                          <p className="text-white">{candidate.portfolioProjects} projects</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Status</p>
                          {getStatusBadge(candidate.status)}
                        </div>
                        {candidate.interviewDate && (
                          <div>
                            <p className="text-slate-400">Interview</p>
                            <p className="text-white">{new Date(candidate.interviewDate).toLocaleDateString()}</p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3">
                        <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                          View Portfolio
                        </Button>
                        <Button variant="outline" className="border-slate-700 text-slate-300">
                          Schedule Interview
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        {/* Pipeline Stats */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Placement Pipeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Total Candidates</span>
              <span className="text-2xl text-white">156</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Shortlisted</span>
              <span className="text-2xl text-white">23</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Interviews</span>
              <span className="text-2xl text-white">8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Offers</span>
              <span className="text-2xl text-white">5</span>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Interviews */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Upcoming Interviews</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {candidates.filter(c => c.interviewDate).map((candidate) => (
              <div
                key={candidate.id}
                className="p-3 rounded-lg bg-slate-900/50 border border-slate-700"
              >
                <h4 className="text-sm text-white mb-2">{candidate.name}</h4>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Calendar className="w-3 h-3" />
                  <span>{candidate.interviewDate && new Date(candidate.interviewDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl text-white mb-2">
          {role === 'employer' ? 'Candidate Pipeline' : 'Career Placement'}
        </h1>
        <p className="text-slate-400">
          {role === 'employer' 
            ? 'Discover and hire talented cybersecurity professionals'
            : 'Find your dream role in cybersecurity'}
        </p>
      </div>

      {role === 'employer' ? renderEmployerView() : renderStudentView()}
    </div>
  );
}
