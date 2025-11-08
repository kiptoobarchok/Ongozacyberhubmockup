import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Clock,
  PlayCircle,
  FileText,
  ExternalLink,
  Lock,
  Award
} from 'lucide-react';

interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  progress: number;
  status: 'completed' | 'in-progress' | 'locked';
  lessons: number;
  labs: number;
}

export function LearningDelivery() {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);

  const modules: Module[] = [
    {
      id: 1,
      title: 'Introduction to Cybersecurity',
      description: 'Fundamentals of information security, CIA triad, and threat landscape',
      duration: '4 hours',
      progress: 100,
      status: 'completed',
      lessons: 8,
      labs: 2,
    },
    {
      id: 2,
      title: 'Network Security Fundamentals',
      description: 'TCP/IP, network protocols, firewalls, and intrusion detection',
      duration: '6 hours',
      progress: 100,
      status: 'completed',
      lessons: 12,
      labs: 4,
    },
    {
      id: 3,
      title: 'Operating System Security',
      description: 'Linux security, hardening, user management, and permissions',
      duration: '8 hours',
      progress: 65,
      status: 'in-progress',
      lessons: 10,
      labs: 5,
    },
    {
      id: 4,
      title: 'Security Tools & SIEM',
      description: 'Wireshark, Nmap, Splunk, and log analysis',
      duration: '10 hours',
      progress: 0,
      status: 'locked',
      lessons: 15,
      labs: 8,
    },
    {
      id: 5,
      title: 'Incident Response',
      description: 'Detection, containment, eradication, and recovery procedures',
      duration: '6 hours',
      progress: 0,
      status: 'locked',
      lessons: 9,
      labs: 3,
    },
  ];

  const lessons = [
    {
      id: 1,
      title: 'Introduction to Linux Security',
      type: 'video',
      duration: '15 min',
      completed: true,
    },
    {
      id: 2,
      title: 'User Management & Permissions',
      type: 'video',
      duration: '22 min',
      completed: true,
    },
    {
      id: 3,
      title: 'File System Security',
      type: 'reading',
      duration: '10 min',
      completed: true,
    },
    {
      id: 4,
      title: 'SSH Configuration & Hardening',
      type: 'video',
      duration: '18 min',
      completed: false,
    },
    {
      id: 5,
      title: 'Lab: Linux Security Audit',
      type: 'lab',
      duration: '45 min',
      completed: false,
    },
  ];

  const getStatusIcon = (status: Module['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'in-progress':
        return <Circle className="w-5 h-5 text-cyan-400 animate-pulse" />;
      case 'locked':
        return <Lock className="w-5 h-5 text-slate-500" />;
    }
  };

  const getStatusColor = (status: Module['status']) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-500/10';
      case 'in-progress':
        return 'border-cyan-500 bg-cyan-500/10';
      case 'locked':
        return 'border-slate-700 bg-slate-800/30';
    }
  };

  if (selectedModule !== null) {
    const module = modules.find((m) => m.id === selectedModule);
    
    return (
      <div className="max-w-6xl mx-auto">
        <Button
          onClick={() => setSelectedModule(null)}
          variant="outline"
          className="mb-6 border-slate-700 text-slate-300 hover:bg-slate-800"
        >
          ← Back to Modules
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Content Area */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mb-6">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl text-white mb-2">{module?.title}</CardTitle>
                    <CardDescription className="text-slate-400">{module?.description}</CardDescription>
                  </div>
                  <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500">
                    In Progress
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Video Player */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mb-6">
              <CardContent className="p-0">
                <div className="aspect-video bg-slate-900 rounded-t-lg flex items-center justify-center border-b border-slate-700">
                  <div className="text-center">
                    <PlayCircle className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                    <p className="text-white mb-2">SSH Configuration & Hardening</p>
                    <p className="text-sm text-slate-400">18 minutes</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-white mb-4">Lesson Overview</h3>
                  <p className="text-slate-300 mb-6">
                    In this lesson, you'll learn how to configure and secure SSH access to your Linux systems.
                    We'll cover key-based authentication, disabling root login, and implementing fail2ban for
                    brute-force protection.
                  </p>

                  <Tabs defaultValue="content" className="w-full">
                    <TabsList className="bg-slate-900 border border-slate-700">
                      <TabsTrigger value="content" className="data-[state=active]:bg-slate-800">
                        Content
                      </TabsTrigger>
                      <TabsTrigger value="resources" className="data-[state=active]:bg-slate-800">
                        Resources
                      </TabsTrigger>
                      <TabsTrigger value="notes" className="data-[state=active]:bg-slate-800">
                        Notes
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="content" className="mt-4">
                      <div className="space-y-4">
                        <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                          <h4 className="text-white mb-2">Key Topics Covered</h4>
                          <ul className="space-y-2 text-sm text-slate-300">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                              <span>Generating SSH key pairs</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                              <span>Configuring sshd_config for security</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                              <span>Implementing two-factor authentication</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                              <span>Setting up fail2ban</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="resources" className="mt-4">
                      <div className="space-y-3">
                        <a
                          href="#"
                          className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-cyan-500 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="w-5 h-5 text-cyan-400" />
                            <span className="text-white">SSH Security Checklist.pdf</span>
                          </div>
                          <ExternalLink className="w-4 h-4 text-slate-400" />
                        </a>
                        <a
                          href="#"
                          className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-700 hover:border-cyan-500 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <ExternalLink className="w-5 h-5 text-cyan-400" />
                            <span className="text-white">Practice Lab Environment</span>
                          </div>
                          <ExternalLink className="w-4 h-4 text-slate-400" />
                        </a>
                      </div>
                    </TabsContent>
                    <TabsContent value="notes" className="mt-4">
                      <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                        <p className="text-sm text-slate-400">No notes yet. Start taking notes as you learn!</p>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex gap-4 mt-6">
                    <Button
                      variant="outline"
                      className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
                    >
                      Previous Lesson
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                      Mark Complete & Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle className="text-white">Module Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Overall</span>
                    <span className="text-sm text-white">{module?.progress}%</span>
                  </div>
                  <Progress value={module?.progress} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">Lessons</p>
                    <p className="text-white">{module?.lessons} total</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Labs</p>
                    <p className="text-white">{module?.labs} total</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Lessons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                        lesson.completed
                          ? 'border-slate-700 bg-slate-900/30'
                          : 'border-cyan-500 bg-cyan-500/10'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {lesson.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                          ) : (
                            <Circle className="w-4 h-4 text-cyan-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm text-white mb-1">{lesson.title}</h4>
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            <Clock className="w-3 h-3" />
                            <span>{lesson.duration}</span>
                            <Badge
                              variant="outline"
                              className="ml-1 border-slate-600 text-slate-400 text-xs"
                            >
                              {lesson.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl text-white mb-2">Learning Path</h1>
        <p className="text-slate-400">SOC Analyst Track - Your journey to becoming a security professional</p>
      </div>

      {/* Overall Progress */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl text-white mb-1">Overall Track Progress</h3>
              <p className="text-sm text-slate-400">3 of 5 modules completed</p>
            </div>
            <div className="text-center">
              <div className="text-3xl text-cyan-400 mb-1">53%</div>
              <Award className="w-6 h-6 text-cyan-400 mx-auto" />
            </div>
          </div>
          <Progress value={53} className="h-3" />
        </CardContent>
      </Card>

      {/* Modules List */}
      <div className="space-y-4">
        {modules.map((module) => (
          <Card
            key={module.id}
            className={`border-2 transition-all cursor-pointer hover:shadow-lg ${getStatusColor(module.status)}`}
            onClick={() => module.status !== 'locked' && setSelectedModule(module.id)}
          >
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-slate-900/50">
                  {getStatusIcon(module.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl text-white mb-1">{module.title}</h3>
                      <p className="text-sm text-slate-400">{module.description}</p>
                    </div>
                    {module.status === 'locked' && <Lock className="w-5 h-5 text-slate-500" />}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">{module.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">{module.lessons} lessons</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <ExternalLink className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">{module.labs} labs</span>
                    </div>
                  </div>

                  {module.status !== 'locked' && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-400">Progress</span>
                        <span className="text-sm text-white">{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>
                  )}

                  {module.status === 'in-progress' && (
                    <Button className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                      Continue Learning
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
