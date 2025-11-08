import { useState } from 'react';
import { UserRole } from '../App';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  Upload, 
  FolderKanban, 
  Star, 
  Eye,
  GitBranch,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Code,
  Shield
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface ProjectsPortfolioProps {
  role: UserRole;
}

interface Project {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'in-review' | 'revision' | 'draft';
  score?: number;
  submittedDate: string;
  technologies: string[];
  versions: number;
}

export function ProjectsPortfolio({ role }: ProjectsPortfolioProps) {
  const [activeTab, setActiveTab] = useState('my-projects');

  const projects: Project[] = [
    {
      id: 1,
      title: 'Network Security Audit Tool',
      description: 'Python-based tool for automated network vulnerability scanning',
      status: 'completed',
      score: 92,
      submittedDate: '2025-10-15',
      technologies: ['Python', 'Nmap', 'Scapy'],
      versions: 3,
    },
    {
      id: 2,
      title: 'SIEM Dashboard Implementation',
      description: 'Custom Splunk dashboard for real-time threat monitoring',
      status: 'in-review',
      submittedDate: '2025-11-01',
      technologies: ['Splunk', 'SPL', 'JavaScript'],
      versions: 2,
    },
    {
      id: 3,
      title: 'Incident Response Playbook',
      description: 'Comprehensive documentation for common security incidents',
      status: 'revision',
      score: 78,
      submittedDate: '2025-10-28',
      technologies: ['Documentation', 'Best Practices'],
      versions: 4,
    },
  ];

  const portfolioProjects = [
    {
      id: 1,
      title: 'Network Security Audit Tool',
      description: 'Automated vulnerability scanner with reporting capabilities',
      image: 'security-tool',
      technologies: ['Python', 'Nmap', 'Scapy'],
      stars: 24,
      views: 342,
    },
    {
      id: 2,
      title: 'Threat Intelligence Platform',
      description: 'Aggregates threat feeds from multiple sources',
      image: 'threat-intel',
      technologies: ['React', 'Node.js', 'MongoDB'],
      stars: 18,
      views: 256,
    },
  ];

  const getStatusBadge = (status: Project['status']) => {
    const statusConfig = {
      completed: { color: 'bg-green-500/20 text-green-300 border-green-500', label: 'Completed' },
      'in-review': { color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500', label: 'In Review' },
      revision: { color: 'bg-orange-500/20 text-orange-300 border-orange-500', label: 'Needs Revision' },
      draft: { color: 'bg-slate-500/20 text-slate-300 border-slate-500', label: 'Draft' },
    };
    const config = statusConfig[status];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'in-review':
        return <Clock className="w-5 h-5 text-cyan-400" />;
      case 'revision':
        return <AlertCircle className="w-5 h-5 text-orange-400" />;
      default:
        return <FolderKanban className="w-5 h-5 text-slate-400" />;
    }
  };

  const renderStudentView = () => (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="bg-slate-800/50 border border-slate-700 mb-8">
        <TabsTrigger value="my-projects" className="data-[state=active]:bg-slate-700">
          My Projects
        </TabsTrigger>
        <TabsTrigger value="submit" className="data-[state=active]:bg-slate-700">
          Submit New
        </TabsTrigger>
        <TabsTrigger value="portfolio" className="data-[state=active]:bg-slate-700">
          Public Portfolio
        </TabsTrigger>
      </TabsList>

      <TabsContent value="my-projects">
        <div className="grid grid-cols-1 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-slate-900/50">
                    {getStatusIcon(project.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl text-white mb-1">{project.title}</h3>
                        <p className="text-sm text-slate-400">{project.description}</p>
                      </div>
                      {getStatusBadge(project.status)}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="border-slate-600 text-slate-300">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-sm">
                        <p className="text-slate-400">Submitted</p>
                        <p className="text-white">{new Date(project.submittedDate).toLocaleDateString()}</p>
                      </div>
                      <div className="text-sm">
                        <p className="text-slate-400">Versions</p>
                        <p className="text-white">{project.versions}</p>
                      </div>
                      {project.score && (
                        <div className="text-sm">
                          <p className="text-slate-400">Score</p>
                          <div className="flex items-center gap-2">
                            <p className="text-white">{project.score}/100</p>
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          </div>
                        </div>
                      )}
                    </div>

                    {project.status === 'revision' && (
                      <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg mb-4">
                        <h4 className="text-sm text-orange-300 mb-2">Mentor Feedback:</h4>
                        <p className="text-sm text-slate-300">
                          Great work on the core functionality! Please add more detailed error handling and 
                          include unit tests for critical functions.
                        </p>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                        View Details
                      </Button>
                      {project.status === 'revision' && (
                        <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                          Submit Revision
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="submit">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Submit New Project</CardTitle>
            <CardDescription className="text-slate-400">
              Upload your project and provide details for mentor review
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="project-title" className="text-slate-300">Project Title</Label>
              <Input
                id="project-title"
                placeholder="e.g., Security Monitoring Dashboard"
                className="bg-slate-900/50 border-slate-700 text-white mt-2"
              />
            </div>

            <div>
              <Label htmlFor="project-desc" className="text-slate-300">Description</Label>
              <Textarea
                id="project-desc"
                placeholder="Describe your project, its features, and technologies used"
                className="bg-slate-900/50 border-slate-700 text-white mt-2"
                rows={4}
              />
            </div>

            <div>
              <Label className="text-slate-300 mb-3 block">Technologies Used</Label>
              <div className="flex flex-wrap gap-2">
                {['Python', 'JavaScript', 'React', 'Node.js', 'Docker', 'AWS'].map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:border-cyan-500 cursor-pointer"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-slate-300">Project Files</Label>
              
              <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-cyan-500 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <p className="text-white mb-2">Upload Project Files</p>
                <p className="text-sm text-slate-400">ZIP, PDF, or GitHub Repository Link</p>
              </div>

              <div>
                <Label htmlFor="github-link" className="text-slate-300">GitHub Repository (Optional)</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="github-link"
                    placeholder="https://github.com/username/repo"
                    className="bg-slate-900/50 border-slate-700 text-white"
                  />
                  <Button variant="outline" className="border-slate-700 text-slate-300">
                    <GitBranch className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button variant="outline" className="flex-1 border-slate-700 text-slate-300">
                Save as Draft
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                Submit for Review
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="portfolio">
        <div className="mb-6">
          <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white mb-2">Your Public Portfolio</h3>
                  <p className="text-sm text-slate-400">Share your work with potential employers</p>
                </div>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Public Link
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioProjects.map((project) => (
            <Card key={project.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm overflow-hidden group hover:border-cyan-500 transition-all">
              <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                <Shield className="w-16 h-16 text-cyan-400/30" />
              </div>
              <CardContent className="pt-6">
                <h3 className="text-xl text-white mb-2">{project.title}</h3>
                <p className="text-sm text-slate-400 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="border-slate-600 text-slate-300 text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span>{project.stars}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{project.views}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 group-hover:border-cyan-500 group-hover:text-cyan-300">
                    <Code className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );

  const renderMentorView = () => (
    <div>
      <div className="grid grid-cols-1 gap-6">
        {projects.filter(p => p.status === 'in-review' || p.status === 'revision').map((project) => (
          <Card key={project.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-slate-900/50">
                  {getStatusIcon(project.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl text-white mb-1">{project.title}</h3>
                      <p className="text-sm text-slate-400">Student: Alex Johnson</p>
                    </div>
                    {getStatusBadge(project.status)}
                  </div>

                  <p className="text-slate-300 mb-4">{project.description}</p>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-sm">
                      <p className="text-slate-400">Submitted</p>
                      <p className="text-white">{new Date(project.submittedDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-slate-400">Version</p>
                      <p className="text-white">{project.versions}</p>
                    </div>
                    <div className="text-sm">
                      <p className="text-slate-400">Track</p>
                      <p className="text-white">SOC Analyst</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                      Review & Score
                    </Button>
                    <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                      View Files
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderEmployerView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {portfolioProjects.map((project) => (
        <Card key={project.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm overflow-hidden group hover:border-cyan-500 transition-all">
          <div className="aspect-video bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
            <Shield className="w-16 h-16 text-cyan-400/30" />
          </div>
          <CardContent className="pt-6">
            <h3 className="text-lg text-white mb-2">{project.title}</h3>
            <p className="text-sm text-slate-400 mb-3">Alex Johnson • SOC Analyst Track</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="border-slate-600 text-slate-300 text-xs">
                  {tech}
                </Badge>
              ))}
            </div>

            <Button size="sm" className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
              View Portfolio
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl text-white mb-2">
          {role === 'student' && 'Projects & Portfolio'}
          {role === 'mentor' && 'Project Reviews'}
          {role === 'employer' && 'Student Portfolios'}
        </h1>
        <p className="text-slate-400">
          {role === 'student' && 'Showcase your cybersecurity projects and skills'}
          {role === 'mentor' && 'Review and provide feedback on student submissions'}
          {role === 'employer' && 'Explore talented cybersecurity candidates'}
        </p>
      </div>

      {role === 'student' && renderStudentView()}
      {role === 'mentor' && renderMentorView()}
      {role === 'employer' && renderEmployerView()}
    </div>
  );
}
