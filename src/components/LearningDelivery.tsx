import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import {
  BookOpen,
  Video,
  FlaskConical,
  CheckCircle,
  Lock,
  Play,
  Download,
  Sparkles,
  MessageSquare,
  Award,
  Clock,
  Target,
  ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function LearningDelivery() {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponses, setAiResponses] = useState<Array<{ question: string; answer: string }>>([]);

  const modules = [
    {
      id: 1,
      title: 'Network Security Fundamentals',
      category: 'Fundamentals',
      progress: 100,
      status: 'completed',
      duration: '8 hours',
      lessons: 12,
      icon: '🌐',
    },
    {
      id: 2,
      title: 'SOC Operations & SIEM',
      category: 'SOC',
      progress: 75,
      status: 'in-progress',
      duration: '12 hours',
      lessons: 15,
      icon: '🛡️',
    },
    {
      id: 3,
      title: 'Cloud Security Architecture',
      category: 'Cloud',
      progress: 45,
      status: 'in-progress',
      duration: '10 hours',
      lessons: 14,
      icon: '☁️',
    },
    {
      id: 4,
      title: 'Penetration Testing Basics',
      category: 'Pentesting',
      progress: 0,
      status: 'locked',
      duration: '16 hours',
      lessons: 18,
      icon: '🔓',
    },
    {
      id: 5,
      title: 'Incident Response & Forensics',
      category: 'Incident Response',
      progress: 0,
      status: 'locked',
      duration: '14 hours',
      lessons: 16,
      icon: '🚨',
    },
  ];

  const currentModuleData = {
    title: 'SOC Operations & SIEM',
    description: 'Master Security Operations Center workflows, SIEM platforms, and threat detection techniques',
    lessons: [
      { id: 1, title: 'Introduction to SOC', duration: '15 min', completed: true },
      { id: 2, title: 'SIEM Architecture Overview', duration: '20 min', completed: true },
      { id: 3, title: 'Log Collection & Normalization', duration: '25 min', completed: true },
      { id: 4, title: 'Writing Detection Rules', duration: '30 min', completed: false },
      { id: 5, title: 'Alert Triage & Investigation', duration: '35 min', completed: false },
    ],
    currentLesson: {
      title: 'Writing Detection Rules',
      content: `# Writing Effective Detection Rules

Security Information and Event Management (SIEM) detection rules are the backbone of any SOC operation. These rules enable automated threat detection by analyzing log data in real-time.

## Core Principles

1. **Be Specific**: Avoid overly broad rules that generate false positives
2. **Use Context**: Correlate multiple data sources
3. **Think Like an Attacker**: Understand TTPs (Tactics, Techniques, and Procedures)
4. **Test Thoroughly**: Validate rules before production deployment

## Example: Detecting Brute Force Attempts

\`\`\`
Rule: Failed Login Threshold
Condition: user_login_failed >= 5 within 5 minutes
Action: Generate Alert (Medium Severity)
Additional Context: Check user location, time of day
\`\`\`

## Hands-on Exercise

You'll now practice writing a detection rule for detecting suspicious PowerShell execution in our cloud lab environment.`,
      videoUrl: 'https://example.com/siem-rules-video',
      labUrl: 'https://labs.och.edu/siem-detection-lab',
      resources: [
        { name: 'SIEM Rule Cheat Sheet', url: '#' },
        { name: 'MITRE ATT&CK Framework', url: '#' },
        { name: 'Sample Log Data', url: '#' },
      ],
    },
  };

  const handleAiQuestion = () => {
    if (!aiQuery.trim()) return;

    // Simulate AI response
    const responses = [
      "SIEM detection rules work by continuously analyzing log data from various sources. They use pattern matching, statistical analysis, and correlation to identify potential security incidents. The key is to balance sensitivity with specificity to minimize false positives.",
      "To write effective detection rules, start by understanding the attack you want to detect. Study the MITRE ATT&CK framework for TTPs, then identify what log signatures those attacks would leave. Test your rules against known good and bad data before deploying to production.",
      "Common SIEM platforms include Splunk, QRadar, ArcSight, and open-source options like ELK Stack and Wazuh. Each has different query languages, but the core concepts remain the same: collect, normalize, correlate, and alert.",
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    setAiResponses([...aiResponses, { question: aiQuery, answer: randomResponse }]);
    setAiQuery('');
    toast.success('AI Coach response generated!');
  };

  const completedCount = modules.filter(m => m.status === 'completed').length;
  const overallProgress = (modules.reduce((sum, m) => sum + m.progress, 0) / modules.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-white mb-2">Learning Modules</h1>
        <p className="text-slate-400">Your personalized cybersecurity curriculum</p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Overall Progress</p>
                <p className="text-2xl text-white">{Math.round(overallProgress)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Completed Modules</p>
                <p className="text-2xl text-white">{completedCount}/{modules.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Certificates Earned</p>
                <p className="text-2xl text-white">{completedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Module List */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Your Modules</CardTitle>
              <CardDescription className="text-slate-400">Select a module to continue learning</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-3">
                  {modules.map((module) => (
                    <button
                      key={module.id}
                      onClick={() => module.status !== 'locked' && setSelectedModule(module.id)}
                      disabled={module.status === 'locked'}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        selectedModule === module.id
                          ? 'border-cyan-500 bg-cyan-500/10'
                          : module.status === 'locked'
                          ? 'border-slate-700 bg-slate-900/30 opacity-50 cursor-not-allowed'
                          : 'border-slate-700 bg-slate-900/50 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{module.icon}</span>
                          <div>
                            <h3 className="text-white text-sm">{module.title}</h3>
                            <p className="text-xs text-slate-400">{module.category}</p>
                          </div>
                        </div>
                        {module.status === 'locked' && (
                          <Lock className="w-4 h-4 text-slate-500" />
                        )}
                        {module.status === 'completed' && (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                      </div>

                      <div className="space-y-2">
                        <Progress value={module.progress} className="h-1.5" />
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span>{module.lessons} lessons</span>
                          <span>{module.progress}%</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Module Content */}
        <div className="lg:col-span-2 space-y-6">
          {selectedModule ? (
            <>
              {/* Current Lesson */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">{currentModuleData.currentLesson.title}</CardTitle>
                      <CardDescription className="text-slate-400">{currentModuleData.title}</CardDescription>
                    </div>
                    <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                      Lesson 4 of 5
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="content" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-slate-900/50">
                      <TabsTrigger value="content" className="data-[state=active]:bg-slate-700">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Content
                      </TabsTrigger>
                      <TabsTrigger value="video" className="data-[state=active]:bg-slate-700">
                        <Video className="w-4 h-4 mr-2" />
                        Video
                      </TabsTrigger>
                      <TabsTrigger value="lab" className="data-[state=active]:bg-slate-700">
                        <FlaskConical className="w-4 h-4 mr-2" />
                        Hands-On Lab
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" className="mt-4">
                      <ScrollArea className="h-[400px] pr-4">
                        <div className="prose prose-invert prose-slate max-w-none">
                          <div className="text-slate-300 whitespace-pre-wrap">
                            {currentModuleData.currentLesson.content}
                          </div>
                        </div>
                      </ScrollArea>

                      <div className="mt-6">
                        <h3 className="text-white mb-3">Downloadable Resources</h3>
                        <div className="space-y-2">
                          {currentModuleData.currentLesson.resources.map((resource, idx) => (
                            <button
                              key={idx}
                              className="w-full p-3 rounded-lg bg-slate-900/50 border border-slate-700 hover:border-cyan-500 transition-colors flex items-center justify-between"
                            >
                              <span className="text-slate-300">{resource.name}</span>
                              <Download className="w-4 h-4 text-slate-400" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="video" className="mt-4">
                      <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center border border-slate-700">
                        <div className="text-center">
                          <Play className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                          <p className="text-slate-400">Video Player</p>
                          <p className="text-xs text-slate-500 mt-2">Duration: 30 minutes</p>
                          <Button className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-500">
                            <Play className="w-4 h-4 mr-2" />
                            Watch Video
                          </Button>
                        </div>
                      </div>

                      <div className="mt-4 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                        <div className="flex items-start gap-3">
                          <Video className="w-5 h-5 text-cyan-400 mt-0.5" />
                          <div>
                            <p className="text-sm text-cyan-300 mb-1">Video Tutorial</p>
                            <p className="text-xs text-slate-400">
                              Watch the instructor demonstrate how to write detection rules in Splunk, 
                              including best practices and common pitfalls to avoid.
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="lab" className="mt-4">
                      <div className="p-6 rounded-lg bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
                            <FlaskConical className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white">Interactive Lab Environment</h3>
                            <p className="text-sm text-slate-400">Practice writing SIEM detection rules</p>
                          </div>
                        </div>

                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-2 text-sm text-slate-300">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span>Cloud-based Splunk instance</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-300">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span>Pre-loaded sample log data</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-300">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span>Guided exercises with solutions</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-300">
                            <Clock className="w-4 h-4 text-cyan-400" />
                            <span>Estimated time: 45 minutes</span>
                          </div>
                        </div>

                        <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500">
                          Launch Lab Environment
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>

                      <div className="mt-4 p-4 rounded-lg bg-slate-900/50 border border-slate-700">
                        <h4 className="text-white mb-2">Lab Objectives</h4>
                        <ul className="space-y-2 text-sm text-slate-400">
                          <li>• Write a rule to detect failed login attempts</li>
                          <li>• Create a correlation rule for lateral movement</li>
                          <li>• Test and tune your detection rules</li>
                          <li>• Generate a detection summary report</li>
                        </ul>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="mt-6 flex items-center justify-between">
                    <Button variant="outline" className="border-slate-700 text-slate-300">
                      Previous Lesson
                    </Button>
                    <Button 
                      className="bg-gradient-to-r from-cyan-500 to-blue-500"
                      onClick={() => toast.success('Lesson marked as complete!')}
                    >
                      Mark Complete & Continue
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* AI Coach Sidebar */}
              <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <CardTitle className="text-white">AI Learning Coach</CardTitle>
                  </div>
                  <CardDescription className="text-slate-400">
                    Ask questions, get explanations, or request summaries
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* AI Responses */}
                  {aiResponses.length > 0 && (
                    <ScrollArea className="h-48 pr-4">
                      <div className="space-y-4">
                        {aiResponses.map((item, idx) => (
                          <div key={idx} className="space-y-2">
                            <div className="p-3 rounded-lg bg-slate-700/50 border border-slate-600">
                              <p className="text-sm text-white mb-1">You asked:</p>
                              <p className="text-sm text-slate-300">{item.question}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                              <div className="flex items-start gap-2">
                                <Sparkles className="w-4 h-4 text-purple-400 mt-0.5" />
                                <p className="text-sm text-slate-300">{item.answer}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}

                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      className="cursor-pointer bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30"
                      onClick={() => setAiQuery('Explain SIEM detection rules in simple terms')}
                    >
                      Explain this concept
                    </Badge>
                    <Badge 
                      className="cursor-pointer bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30"
                      onClick={() => setAiQuery('Generate a summary of this lesson')}
                    >
                      Generate summary
                    </Badge>
                    <Badge 
                      className="cursor-pointer bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30"
                      onClick={() => setAiQuery('Recommend related labs')}
                    >
                      Recommend labs
                    </Badge>
                  </div>

                  {/* Input */}
                  <div className="flex gap-2">
                    <Textarea
                      value={aiQuery}
                      onChange={(e) => setAiQuery(e.target.value)}
                      placeholder="Ask AI Coach anything about this lesson..."
                      className="bg-slate-900/50 border-slate-700 text-white resize-none"
                      rows={2}
                    />
                    <Button 
                      onClick={handleAiQuestion}
                      className="bg-gradient-to-r from-purple-500 to-blue-500"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-12 text-center">
                <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl text-white mb-2">Select a Module to Start Learning</h3>
                <p className="text-slate-400">Choose a module from the list to view lessons and content</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
