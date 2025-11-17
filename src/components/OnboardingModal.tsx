import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { AIInsightCard } from './shared/AIInsightCard';
import { TrackBadge } from './shared/TrackBadge';
import { LEARNING_TRACKS, TrackId } from '../lib/constants';
import { 
  CheckCircle2, 
  Circle, 
  Upload, 
  FileText, 
  User, 
  GraduationCap,
  MapPin,
  CheckCircle,
  AlertCircle,
  Sparkles,
  FileCheck,
  Brain,
  Target,
  Lightbulb,
  BarChart3,
  Code,
  Users
} from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { toast } from 'sonner@2.0.3';
import confetti from 'canvas-confetti';

interface OnboardingModalProps {
  onComplete: () => void;
}

export function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 11; // 5 onboarding + 5 test questions + 1 results

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    education: '',
    institution: '',
    graduationYear: '',
    track: '',
    idDocument: null as File | null,
    transcript: null as File | null,
    cv: null as File | null,
  });

  const [uploadedDocs, setUploadedDocs] = useState({
    id: false,
    transcript: false,
    cv: false,
  });

  const [aiVerification, setAiVerification] = useState({
    id: 0,
    transcript: 0,
    cv: 0,
  });

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

  const progress = (currentStep / totalSteps) * 100;

  const handleFileUpload = (type: 'id' | 'transcript' | 'cv', file: File) => {
    setFormData({ ...formData, [`${type}Document`]: file });
    setUploadedDocs({ ...uploadedDocs, [type]: true });
    
    // Simulate AI verification
    setTimeout(() => {
      const confidence = Math.floor(Math.random() * 15) + 85; // 85-100%
      setAiVerification({ ...aiVerification, [type]: confidence });
      toast.success(`${type.toUpperCase()} document verified with ${confidence}% confidence`);
    }, 1500);
  };

  const handleAnswer = (questionIndex: number, value: string) => {
    setAnswers({ ...answers, [questionIndex]: value });
    setTimeout(() => {
      handleNext();
    }, 300);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      if (currentStep <= 5) {
        toast.success('Progress saved!');
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const handleFinish = () => {
    triggerConfetti();
    toast.success('Congratulations! Welcome to Ongoza Cyber Hub!');
    
    // Wait for confetti animation before completing
    setTimeout(() => {
      onComplete();
    }, 3500);
  };

  const getStepTitle = () => {
    if (currentStep === 1) return 'Personal Information';
    if (currentStep === 2) return 'Educational Background';
    if (currentStep === 3) return 'Document Upload';
    if (currentStep === 4) return 'Track Selection';
    if (currentStep === 5) return 'Review & Confirm';
    if (currentStep >= 6 && currentStep <= 10) return 'Aptitude Assessment';
    if (currentStep === 11) return 'Your Results';
    return '';
  };

  const renderStepContent = () => {
    // Step 1: Personal Info
    if (currentStep === 1) {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-slate-300">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="mt-2 bg-slate-900/50 border-slate-700 text-white"
                placeholder="John"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-slate-300">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="mt-2 bg-slate-900/50 border-slate-700 text-white"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-slate-300">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-2 bg-slate-900/50 border-slate-700 text-white"
              placeholder="john.doe@example.com"
            />
          </div>

          <div>
            <Label htmlFor="phone" className="text-slate-300">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-2 bg-slate-900/50 border-slate-700 text-white"
              placeholder="+254 700 000 000"
            />
          </div>

          <div>
            <Label htmlFor="address" className="text-slate-300">Address *</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="mt-2 bg-slate-900/50 border-slate-700 text-white"
              placeholder="Your full address"
              rows={3}
            />
          </div>
        </div>
      );
    }

    // Step 2: Education
    if (currentStep === 2) {
      return (
        <div className="space-y-6">
          <div>
            <Label htmlFor="education" className="text-slate-300">Highest Level of Education *</Label>
            <Select value={formData.education} onValueChange={(value) => setFormData({ ...formData, education: value })}>
              <SelectTrigger className="mt-2 bg-slate-900/50 border-slate-700 text-white">
                <SelectValue placeholder="Select education level" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="high-school">High School</SelectItem>
                <SelectItem value="diploma">Diploma</SelectItem>
                <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                <SelectItem value="masters">Master's Degree</SelectItem>
                <SelectItem value="phd">PhD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="institution" className="text-slate-300">Institution Name *</Label>
            <Input
              id="institution"
              value={formData.institution}
              onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
              className="mt-2 bg-slate-900/50 border-slate-700 text-white"
              placeholder="University of Nairobi"
            />
          </div>

          <div>
            <Label htmlFor="graduationYear" className="text-slate-300">Graduation Year *</Label>
            <Input
              id="graduationYear"
              type="number"
              value={formData.graduationYear}
              onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
              className="mt-2 bg-slate-900/50 border-slate-700 text-white"
              placeholder="2024"
            />
          </div>

          <div>
            <Label className="text-slate-300">Prior Experience</Label>
            <Textarea
              className="mt-2 bg-slate-900/50 border-slate-700 text-white"
              placeholder="Describe any relevant work experience, projects, or certifications..."
              rows={4}
            />
          </div>
        </div>
      );
    }

    // Step 3: Documents
    if (currentStep === 3) {
      return (
        <div className="space-y-6">
          <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-purple-400 mt-0.5" />
              <div>
                <p className="text-sm text-slate-300 mb-1">AI Document Verification Active</p>
                <p className="text-xs text-slate-400">Our AI system will automatically verify and extract information from your documents</p>
              </div>
            </div>
          </div>

          {/* ID Document */}
          <div>
            <Label className="text-slate-300 mb-2 block">National ID / Passport *</Label>
            <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center hover:border-cyan-500 transition-colors">
              <input
                type="file"
                id="id-upload"
                className="hidden"
                accept="image/*,.pdf"
                onChange={(e) => e.target.files?.[0] && handleFileUpload('id', e.target.files[0])}
              />
              <label htmlFor="id-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-slate-400 mb-1">Click to upload ID document</p>
                <p className="text-xs text-slate-500">PDF or Image (Max 5MB)</p>
              </label>
              {uploadedDocs.id && (
                <div className="mt-4 p-3 bg-slate-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-slate-300">ID Document Uploaded</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {aiVerification.id}% Verified
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Transcript */}
          <div>
            <Label className="text-slate-300 mb-2 block">Academic Transcript *</Label>
            <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center hover:border-cyan-500 transition-colors">
              <input
                type="file"
                id="transcript-upload"
                className="hidden"
                accept=".pdf"
                onChange={(e) => e.target.files?.[0] && handleFileUpload('transcript', e.target.files[0])}
              />
              <label htmlFor="transcript-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-slate-400 mb-1">Click to upload transcript</p>
                <p className="text-xs text-slate-500">PDF (Max 10MB)</p>
              </label>
              {uploadedDocs.transcript && (
                <div className="mt-4 p-3 bg-slate-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-slate-300">Transcript Uploaded</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {aiVerification.transcript}% Verified
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CV */}
          <div>
            <Label className="text-slate-300 mb-2 block">Curriculum Vitae (CV) *</Label>
            <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center hover:border-cyan-500 transition-colors">
              <input
                type="file"
                id="cv-upload"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={(e) => e.target.files?.[0] && handleFileUpload('cv', e.target.files[0])}
              />
              <label htmlFor="cv-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <p className="text-slate-400 mb-1">Click to upload CV/Resume</p>
                <p className="text-xs text-slate-500">PDF or Word (Max 5MB)</p>
              </label>
              {uploadedDocs.cv && (
                <div className="mt-4 p-3 bg-slate-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-slate-300">CV Uploaded</span>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {aiVerification.cv}% Verified
                    </Badge>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    // Step 4: Track Selection
    if (currentStep === 4) {
      return (
        <div className="space-y-6">
          <AIInsightCard
            title="AI Track Recommendation"
            type="recommendation"
            confidence={87}
            insight="Based on your educational background and CV analysis, we recommend the Builders Track. Your technical skills and hands-on project experience align well with SOC operations and security engineering roles."
          />

          <div>
            <Label className="text-slate-300 mb-4 block">Select Your Learning Track</Label>
            <div className="grid grid-cols-1 gap-4">
              {Object.values(LEARNING_TRACKS).map((track) => (
                <div
                  key={track.id}
                  onClick={() => setFormData({ ...formData, track: track.id })}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.track === track.id
                      ? `${track.borderColor} bg-gradient-to-br ${track.bgColor}`
                      : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{track.icon}</span>
                      <div>
                        <h3 className="text-white">{track.name}</h3>
                        <p className="text-sm text-slate-400">{track.description}</p>
                      </div>
                    </div>
                    {formData.track === track.id && (
                      <CheckCircle className="w-6 h-6 text-cyan-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    // Step 5: Review
    if (currentStep === 5) {
      return (
        <div className="space-y-6">
          <Card className="bg-slate-800/30 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Application Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Name</p>
                  <p className="text-white">{formData.firstName} {formData.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="text-white">{formData.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Education</p>
                  <p className="text-white">{formData.education}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Selected Track</p>
                  {formData.track && <TrackBadge trackId={formData.track as any} size="sm" />}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-cyan-400 mt-0.5" />
              <div>
                <p className="text-sm text-cyan-300 mb-1">Next: Aptitude Assessment</p>
                <p className="text-xs text-slate-400">
                  Continue to complete a brief aptitude test to finalize your learning path recommendation.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Steps 6-10: Test Questions
    if (currentStep >= 6 && currentStep <= 10) {
      const questionIndex = currentStep - 6;
      const currentQ = questions[questionIndex];
      const testProgress = ((questionIndex + 1) / questions.length) * 100;

      return (
        <div className="space-y-6">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Test Progress</span>
              <span className="text-sm text-cyan-400">{Math.round(testProgress)}%</span>
            </div>
            <Progress value={testProgress} className="h-2" />
          </div>

          <Badge className="mb-4 bg-purple-500/20 text-purple-400 border-purple-500/30">
            {currentQ.type.charAt(0).toUpperCase() + currentQ.type.slice(1)} Question
          </Badge>

          <h2 className="text-xl text-white mb-6 whitespace-pre-wrap">{currentQ.question}</h2>

          <div className="space-y-3">
            {currentQ.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(questionIndex, option.value)}
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
        </div>
      );
    }

    // Step 11: Results
    if (currentStep === 11) {
      return (
        <div className="space-y-6">
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

          {/* Recommendations */}
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

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
              <div>
                <p className="text-sm text-green-300 mb-1">Ready to Begin!</p>
                <p className="text-xs text-slate-400">
                  Click "Finish" to complete your onboarding and start your learning journey at Ongoza Cyber Hub.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-5xl my-8">
        <Card className="bg-slate-900 border-slate-700">
          <CardHeader className="border-b border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white text-2xl">Welcome to Ongoza Cyber Hub</CardTitle>
                <CardDescription className="text-slate-400 mt-1">{getStepTitle()}</CardDescription>
              </div>
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                Step {currentStep} of {totalSteps}
              </Badge>
            </div>
            
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Overall Progress</span>
                <span className="text-sm text-cyan-400">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardHeader>

          <CardContent className="p-6 max-h-[60vh] overflow-y-auto">
            {renderStepContent()}
          </CardContent>

          <div className="p-6 border-t border-slate-700 flex items-center justify-between bg-slate-800/50">
            <Button
              onClick={handleBack}
              variant="outline"
              disabled={currentStep === 1}
              className="border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-50"
            >
              Back
            </Button>
            
            {currentStep < totalSteps ? (
              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                disabled={currentStep >= 6 && currentStep <= 10}
              >
                {currentStep === 5 ? 'Start Aptitude Test' : 'Continue'}
              </Button>
            ) : (
              <Button
                onClick={handleFinish}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
              >
                Finish
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
