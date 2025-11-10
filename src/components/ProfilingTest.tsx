import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { AIInsightCard } from './shared/AIInsightCard';
import { TrackBadge } from './shared/TrackBadge';
import { LEARNING_TRACKS, TrackId } from '../lib/constants';
import {
  Brain,
  Code,
  Users,
  Target,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  BarChart3,
} from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { toast } from 'sonner@2.0.3';

export function ProfilingTest() {
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      id: 1,
      type: 'personality',
      question: 'When faced with a security incident, what is your first instinct?',
      options: [
        { value: 'A', text: 'Dive into logs and technical analysis immediately', track: 'builders' },
        { value: 'B', text: 'Coordinate team response and delegate tasks', track: 'leaders' },
        { value: 'C', text: 'Think about innovative detection methods', track: 'entrepreneurs' },
        { value: 'D', text: 'Document the incident for training purposes', track: 'educators' },
        { value: 'E', text: 'Research similar incidents and emerging patterns', track: 'researchers' },
      ],
    },
    {
      id: 2,
      type: 'skill',
      question: 'Which activity sounds most appealing to you?',
      options: [
        { value: 'A', text: 'Building and configuring security tools', track: 'builders' },
        { value: 'B', text: 'Developing security policies and frameworks', track: 'leaders' },
        { value: 'C', text: 'Creating innovative security solutions', track: 'entrepreneurs' },
        { value: 'D', text: 'Teaching others about cybersecurity', track: 'educators' },
        { value: 'E', text: 'Analyzing threat intelligence data', track: 'researchers' },
      ],
    },
    {
      id: 3,
      type: 'technical',
      question: 'Complete this Python security check:\nif user_input.contains("<?php"):\n    _____',
      options: [
        { value: 'A', text: 'block_request()', track: 'builders' },
        { value: 'B', text: 'alert_admin()', track: 'leaders' },
        { value: 'C', text: 'log_and_analyze()', track: 'researchers' },
        { value: 'D', text: 'sanitize_input()', track: 'builders' },
      ],
    },
    {
      id: 4,
      type: 'scenario',
      question: 'Your company needs to implement a new security program. What role do you prefer?',
      options: [
        { value: 'A', text: 'Implement technical controls and monitoring', track: 'builders' },
        { value: 'B', text: 'Lead the project and manage stakeholders', track: 'leaders' },
        { value: 'C', text: 'Design an innovative approach to the problem', track: 'entrepreneurs' },
        { value: 'D', text: 'Train staff on the new security measures', track: 'educators' },
        { value: 'E', text: 'Research best practices and emerging threats', track: 'researchers' },
      ],
    },
    {
      id: 5,
      type: 'preference',
      question: 'What type of cybersecurity content do you consume most?',
      options: [
        { value: 'A', text: 'Technical tutorials and lab exercises', track: 'builders' },
        { value: 'B', text: 'Industry reports and compliance frameworks', track: 'leaders' },
        { value: 'C', text: 'Startup stories and innovation trends', track: 'entrepreneurs' },
        { value: 'D', text: 'Educational resources and teaching methods', track: 'educators' },
        { value: 'E', text: 'Academic papers and threat research', track: 'researchers' },
      ],
    },
  ];

  // Simulated test results
  const skillGaps = [
    { skill: 'Network Security', current: 65, target: 85, gap: 20 },
    { skill: 'Cloud Security', current: 45, target: 80, gap: 35 },
    { skill: 'Incident Response', current: 70, target: 90, gap: 20 },
    { skill: 'Python Scripting', current: 55, target: 75, gap: 20 },
    { skill: 'SIEM Tools', current: 50, target: 85, gap: 35 },
  ];

  const skillRadarData = [
    { skill: 'Technical', value: 75 },
    { skill: 'Problem Solving', value: 85 },
    { skill: 'Communication', value: 70 },
    { skill: 'Leadership', value: 60 },
    { skill: 'Innovation', value: 80 },
    { skill: 'Analysis', value: 78 },
  ];

  const trackScores: Record<string, number> = {
    builders: 85,
    leaders: 62,
    entrepreneurs: 70,
    educators: 58,
    researchers: 75,
  };

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
    
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        toast.success('Answer recorded!');
      }, 300);
    } else {
      setTimeout(() => {
        setTestCompleted(true);
        toast.success('Profiling test completed! Analyzing results...');
      }, 300);
    }
  };

  const startTest = () => {
    setTestStarted(true);
    toast.info('Profiling test started. Answer honestly for best results!');
  };

  const restartTest = () => {
    setTestStarted(false);
    setTestCompleted(false);
    setCurrentQuestion(0);
    setAnswers({});
  };

  // Start Screen
  if (!testStarted) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl text-white mb-2">Profiling & Track Suitability Assessment</h1>
          <p className="text-slate-400">Discover your optimal learning path in cybersecurity</p>
        </div>

        <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-white">AI-Powered Track Assessment</CardTitle>
                <CardDescription className="text-slate-400">
                  Personalized learning path recommendation
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <p className="text-white">Comprehensive Assessment</p>
                  <p className="text-sm text-slate-400">5 questions covering personality, skills, and technical aptitude</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <p className="text-white">AI Analysis</p>
                  <p className="text-sm text-slate-400">Advanced algorithms analyze your responses to predict optimal track fit</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <p className="text-white">Skill Gap Visualization</p>
                  <p className="text-sm text-slate-400">Detailed breakdown of your strengths and areas for development</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <p className="text-white">Personalized Recommendations</p>
                  <p className="text-sm text-slate-400">Tailored module suggestions based on your results</p>
                </div>
              </div>
            </div>

            <Button 
              onClick={startTest}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white"
            >
              Start Assessment
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Learning Tracks Overview */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Available Learning Tracks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.values(LEARNING_TRACKS).map((track) => (
              <div
                key={track.id}
                className={`p-4 rounded-lg border ${track.borderColor} ${track.bgColor}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{track.icon}</span>
                  <div>
                    <h3 className={track.textColor}>{track.name}</h3>
                    <p className="text-sm text-slate-400">{track.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Test in Progress
  if (!testCompleted) {
    const currentQ = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl text-white mb-2">Track Suitability Assessment</h1>
          <p className="text-slate-400">Question {currentQuestion + 1} of {questions.length}</p>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Progress</span>
                <span className="text-sm text-cyan-400">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <Badge className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/30">
              {currentQ.type.charAt(0).toUpperCase() + currentQ.type.slice(1)} Question
            </Badge>

            <h2 className="text-xl text-white mb-6 whitespace-pre-wrap">{currentQ.question}</h2>

            <div className="space-y-3">
              {currentQ.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full p-4 rounded-lg border-2 border-slate-700 bg-slate-900/50 hover:border-cyan-500 hover:bg-slate-800/50 transition-all text-left group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-slate-600 group-hover:border-cyan-500 flex items-center justify-center transition-colors">
                      <span className="text-slate-400 group-hover:text-cyan-400">{option.value}</span>
                    </div>
                    <span className="text-slate-300 group-hover:text-white">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Results Screen
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl text-white mb-2">Your Profiling Results</h1>
        <p className="text-slate-400">AI-powered track recommendation and skill analysis</p>
      </div>

      {/* Primary Track Recommendation */}
      <AIInsightCard
        title="Primary Track Recommendation"
        type="prediction"
        confidence={trackScores.builders}
        insight={`Based on your responses, you show exceptional alignment with the Builders Track. Your technical aptitude, hands-on problem-solving approach, and preference for practical implementation indicate you'll thrive in SOC operations, security engineering, and technical security roles.`}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Track Fit Scores */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="w-5 h-5" />
              Track Fit Analysis
            </CardTitle>
            <CardDescription className="text-slate-400">Your compatibility with each learning track</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(trackScores).map(([trackId, score]) => {
              const track = LEARNING_TRACKS[trackId as TrackId];
              return (
                <div key={trackId}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span>{track.icon}</span>
                      <span className="text-slate-300">{track.name}</span>
                    </div>
                    <span className={track.textColor}>{score}%</span>
                  </div>
                  <Progress value={score} className="h-2" />
                  {score === Math.max(...Object.values(trackScores)) && (
                    <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">
                      Recommended
                    </Badge>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Skill Radar Chart */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Competency Profile
            </CardTitle>
            <CardDescription className="text-slate-400">Your strengths across key areas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={skillRadarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="skill" stroke="#94a3b8" />
                <PolarRadiusAxis stroke="#94a3b8" />
                <Radar name="Skills" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Skill Gap Visualizer */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Skill Gap Analysis
          </CardTitle>
          <CardDescription className="text-slate-400">
            Areas for development to reach your target proficiency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={skillGaps} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis type="number" stroke="#94a3b8" />
              <YAxis dataKey="skill" type="category" stroke="#94a3b8" width={150} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
              />
              <Bar dataKey="current" fill="#06b6d4" name="Current Level" radius={[0, 4, 4, 0]} />
              <Bar dataKey="target" fill="#8b5cf6" name="Target Level" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Secondary Recommendations */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Personalized Learning Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
            <div className="flex items-start gap-3">
              <Code className="w-5 h-5 text-cyan-400 mt-0.5" />
              <div>
                <h3 className="text-white mb-1">Start with Network Security Fundamentals</h3>
                <p className="text-sm text-slate-400">
                  Build a strong foundation in TCP/IP, firewalls, and network protocols. This aligns with your Builders Track recommendation.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-purple-400 mt-0.5" />
              <div>
                <h3 className="text-white mb-1">Consider Leadership Track as Secondary</h3>
                <p className="text-sm text-slate-400">
                  Your communication scores suggest you could benefit from governance and management modules later in your journey.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
            <div className="flex items-start gap-3">
              <Target className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <h3 className="text-white mb-1">Focus on Cloud Security Certification</h3>
                <p className="text-sm text-slate-400">
                  Your skill gap analysis shows cloud security as a high-impact area. AWS Security Fundamentals is recommended.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Button
          onClick={restartTest}
          variant="outline"
          className="border-slate-700 text-slate-300 hover:bg-slate-800"
        >
          Retake Assessment
        </Button>
        <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
          Start Learning Journey
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
