import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { AIInsightCard } from '../shared/AIInsightCard';
import { 
  Plus, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Users, 
  Eye, 
  Edit, 
  Trash2,
  TrendingUp,
  Clock,
  CheckCircle,
  Target,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface JobListing {
  id: string;
  title: string;
  description: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary: string;
  requirements: string[];
  skills: string[];
  status: 'active' | 'closed' | 'draft';
  postedDate: string;
  applications: number;
  views: number;
  aiMatchScore: number;
  topCandidates: number;
}

export function JobListings() {
  const [jobListings, setJobListings] = useState<JobListing[]>([
    {
      id: '1',
      title: 'Junior SOC Analyst',
      description: 'Looking for a motivated SOC Analyst to join our security operations team. You will monitor security events, investigate incidents, and help protect our infrastructure.',
      location: 'Nairobi, Kenya',
      type: 'full-time',
      salary: 'KES 80,000 - 120,000/month',
      requirements: ['SIEM experience', 'Network security knowledge', 'Log analysis'],
      skills: ['SIEM', 'SOC Operations', 'Incident Response', 'Network Security'],
      status: 'active',
      postedDate: '2025-11-01',
      applications: 23,
      views: 156,
      aiMatchScore: 94,
      topCandidates: 8,
    },
    {
      id: '2',
      title: 'Cloud Security Engineer',
      description: 'Seeking an experienced Cloud Security Engineer to design and implement security controls for our AWS and Azure environments.',
      location: 'Remote',
      type: 'full-time',
      salary: 'KES 150,000 - 200,000/month',
      requirements: ['AWS/Azure experience', 'Security certifications', '3+ years experience'],
      skills: ['Cloud Security', 'AWS', 'Azure', 'DevSecOps', 'Terraform'],
      status: 'active',
      postedDate: '2025-10-28',
      applications: 18,
      views: 203,
      aiMatchScore: 91,
      topCandidates: 6,
    },
    {
      id: '3',
      title: 'Penetration Tester Intern',
      description: 'Internship opportunity for aspiring penetration testers. You will work alongside our security team to identify vulnerabilities and strengthen our security posture.',
      location: 'Nairobi, Kenya',
      type: 'internship',
      salary: 'KES 30,000 - 50,000/month',
      requirements: ['Basic pentesting knowledge', 'Eagerness to learn', 'CEH or similar cert'],
      skills: ['Penetration Testing', 'Web Security', 'Burp Suite', 'Metasploit'],
      status: 'active',
      postedDate: '2025-11-05',
      applications: 34,
      views: 289,
      aiMatchScore: 88,
      topCandidates: 12,
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    location: '',
    type: 'full-time' as const,
    salary: '',
    requirements: '',
    skills: '',
  });

  const handleCreateJob = () => {
    if (!newJob.title || !newJob.description || !newJob.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    const job: JobListing = {
      id: Date.now().toString(),
      title: newJob.title,
      description: newJob.description,
      location: newJob.location,
      type: newJob.type,
      salary: newJob.salary,
      requirements: newJob.requirements.split(',').map(r => r.trim()).filter(r => r),
      skills: newJob.skills.split(',').map(s => s.trim()).filter(s => s),
      status: 'active',
      postedDate: new Date().toISOString().split('T')[0],
      applications: 0,
      views: 0,
      aiMatchScore: 0,
      topCandidates: 0,
    };

    setJobListings([job, ...jobListings]);
    setNewJob({
      title: '',
      description: '',
      location: '',
      type: 'full-time',
      salary: '',
      requirements: '',
      skills: '',
    });
    setIsCreateDialogOpen(false);
    toast.success('Job listing created successfully!');
  };

  const handleDeleteJob = (jobId: string) => {
    setJobListings(jobListings.filter(j => j.id !== jobId));
    toast.success('Job listing deleted!');
  };

  const handleToggleStatus = (jobId: string) => {
    setJobListings(jobListings.map(j => 
      j.id === jobId 
        ? { ...j, status: j.status === 'active' ? 'closed' : 'active' as 'active' | 'closed' }
        : j
    ));
    toast.success('Job status updated!');
  };

  const totalApplications = jobListings.reduce((sum, j) => sum + j.applications, 0);
  const activeJobs = jobListings.filter(j => j.status === 'active').length;

  // AI analytics data
  const applicationTrend = [
    { week: 'Week 1', applications: 12 },
    { week: 'Week 2', applications: 18 },
    { week: 'Week 3', applications: 23 },
    { week: 'Week 4', applications: 32 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-white mb-2">Job Listings</h2>
          <p className="text-slate-400">Post and manage job opportunities</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500">
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Post New Job</DialogTitle>
              <DialogDescription className="text-slate-400">
                Create a new job listing to attract OCH talent
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-slate-300">Job Title *</Label>
                <Input
                  value={newJob.title}
                  onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  className="mt-2 bg-slate-900/50 border-slate-700 text-white"
                  placeholder="e.g., Senior SOC Analyst"
                />
              </div>

              <div>
                <Label className="text-slate-300">Description *</Label>
                <Textarea
                  value={newJob.description}
                  onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  className="mt-2 bg-slate-900/50 border-slate-700 text-white"
                  placeholder="Detailed job description..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Location *</Label>
                  <Input
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    className="mt-2 bg-slate-900/50 border-slate-700 text-white"
                    placeholder="Nairobi, Kenya or Remote"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Job Type *</Label>
                  <Select value={newJob.type} onValueChange={(value: any) => setNewJob({ ...newJob, type: value })}>
                    <SelectTrigger className="mt-2 bg-slate-900/50 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-slate-300">Salary Range</Label>
                <Input
                  value={newJob.salary}
                  onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                  className="mt-2 bg-slate-900/50 border-slate-700 text-white"
                  placeholder="e.g., KES 100,000 - 150,000/month"
                />
              </div>

              <div>
                <Label className="text-slate-300">Requirements (comma-separated)</Label>
                <Textarea
                  value={newJob.requirements}
                  onChange={(e) => setNewJob({ ...newJob, requirements: e.target.value })}
                  className="mt-2 bg-slate-900/50 border-slate-700 text-white"
                  placeholder="SIEM experience, Network security, Log analysis"
                  rows={3}
                />
              </div>

              <div>
                <Label className="text-slate-300">Required Skills (comma-separated)</Label>
                <Input
                  value={newJob.skills}
                  onChange={(e) => setNewJob({ ...newJob, skills: e.target.value })}
                  className="mt-2 bg-slate-900/50 border-slate-700 text-white"
                  placeholder="SIEM, SOC Operations, Incident Response"
                />
              </div>

              <Button onClick={handleCreateJob} className="w-full bg-gradient-to-r from-green-500 to-emerald-500">
                Post Job Listing
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Active Jobs</p>
                <p className="text-2xl text-white">{activeJobs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Applications</p>
                <p className="text-2xl text-white">{totalApplications}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Avg. Match Score</p>
                <p className="text-2xl text-white">91%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Top Candidates</p>
                <p className="text-2xl text-white">{jobListings.reduce((sum, j) => sum + j.topCandidates, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Analytics */}
      <AIInsightCard
        title="AI Application Analytics"
        type="analysis"
        confidence={92}
        insight="Your job listings are performing 34% better than industry average. The 'Junior SOC Analyst' position has the highest match rate at 94%. Consider posting similar roles to capitalize on OCH's strong SOC-focused curriculum."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Application Trend Chart */}
        <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Application Trends</CardTitle>
            <CardDescription className="text-slate-400">Weekly application volume</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={applicationTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="week" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                />
                <Line type="monotone" dataKey="applications" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Quick Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Avg. Time to Fill</span>
                <Clock className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-xl text-white">18 days</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Application Rate</span>
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <p className="text-xl text-white">8.2 per job</p>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Quality Score</span>
                <CheckCircle className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-xl text-white">4.6/5.0</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Listings Grid */}
      <div className="space-y-4">
        <h3 className="text-xl text-white">Your Job Listings</h3>
        {jobListings.map((job) => (
          <Card key={job.id} className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl text-white">{job.title}</h3>
                    <Badge className={
                      job.status === 'active'
                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                        : 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                    }>
                      {job.status}
                    </Badge>
                    {job.aiMatchScore > 0 && (
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        🤖 {job.aiMatchScore}% Match
                      </Badge>
                    )}
                  </div>
                  <p className="text-slate-400 mb-3">{job.description}</p>
                  
                  <div className="flex flex-wrap gap-4 mb-3 text-sm">
                    <div className="flex items-center gap-2 text-slate-300">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-2 text-slate-300">
                      <Briefcase className="w-4 h-4" />
                      {job.type}
                    </div>
                    {job.salary && (
                      <div className="flex items-center gap-2 text-slate-300">
                        <DollarSign className="w-4 h-4" />
                        {job.salary}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-cyan-400">
                      <Users className="w-4 h-4" />
                      {job.applications} applications
                    </div>
                    <div className="flex items-center gap-2 text-purple-400">
                      <Eye className="w-4 h-4" />
                      {job.views} views
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.skills.slice(0, 5).map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-cyan-500/30 text-cyan-400">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-700"
                    onClick={() => {
                      setSelectedJob(job);
                      setIsDetailsOpen(true);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-700"
                    onClick={() => handleToggleStatus(job.id)}
                  >
                    {job.status === 'active' ? 'Close' : 'Activate'}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-500 text-red-400"
                    onClick={() => handleDeleteJob(job.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {job.topCandidates > 0 && (
                <div className="pt-4 border-t border-slate-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-slate-300">{job.topCandidates} top-matched candidates available</span>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-purple-500 to-pink-500">
                      View Candidates
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
