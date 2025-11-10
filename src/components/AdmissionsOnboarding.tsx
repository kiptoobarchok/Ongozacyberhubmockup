import { useState } from 'react';
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
import { LEARNING_TRACKS } from '../lib/constants';
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
  FileCheck
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function AdmissionsOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Education', icon: GraduationCap },
    { number: 3, title: 'Documents', icon: FileText },
    { number: 4, title: 'Track Selection', icon: MapPin },
    { number: 5, title: 'Review & Submit', icon: CheckCircle2 },
  ];

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

  const progress = (currentStep / totalSteps) * 100;

  const orientationChecklist = [
    { id: 1, task: 'Complete personal profile', completed: true },
    { id: 2, task: 'Upload required documents', completed: uploadedDocs.id && uploadedDocs.transcript && uploadedDocs.cv },
    { id: 3, task: 'Select learning track', completed: !!formData.track },
    { id: 4, task: 'Review platform orientation guide', completed: false },
    { id: 5, task: 'Schedule introductory mentor session', completed: false },
  ];

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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
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

      case 2:
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

      case 3:
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

      case 4:
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

      case 5:
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

            <Card className="bg-slate-800/30 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Orientation Checklist</CardTitle>
                <CardDescription className="text-slate-400">Complete these steps to get started</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {orientationChecklist.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      {item.completed ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600" />
                      )}
                      <span className={item.completed ? 'text-slate-300' : 'text-slate-500'}>
                        {item.task}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-cyan-400 mt-0.5" />
                <div>
                  <p className="text-sm text-cyan-300 mb-1">Ready to Submit</p>
                  <p className="text-xs text-slate-400">
                    By submitting this application, you agree to the OCH terms and conditions. 
                    You'll receive a confirmation email within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      toast.success('Progress saved!');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast.success('Application submitted successfully! Welcome to OCH!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-white mb-2">Student Admissions & Onboarding</h1>
        <p className="text-slate-400">Complete your application to join Ongoza Cyber Hub</p>
      </div>

      {/* Progress Bar */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Progress</span>
              <span className="text-sm text-cyan-400">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Steps */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;

              return (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                        isCompleted
                          ? 'bg-green-500 border-green-500'
                          : isActive
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 border-cyan-500'
                          : 'bg-slate-800 border-slate-700'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      ) : (
                        <Icon className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <span className="text-xs text-slate-400 mt-2 text-center max-w-20">
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-0.5 w-12 lg:w-24 mx-2 transition-colors ${
                        isCompleted ? 'bg-green-500' : 'bg-slate-700'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">{steps[currentStep - 1].title}</CardTitle>
          <CardDescription className="text-slate-400">
            Step {currentStep} of {totalSteps}
          </CardDescription>
        </CardHeader>
        <CardContent>{renderStepContent()}</CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button
          onClick={handleBack}
          variant="outline"
          disabled={currentStep === 1}
          className="border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-50"
        >
          Back
        </Button>
        <div className="flex gap-2">
          {currentStep < totalSteps ? (
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
            >
              Continue
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white"
            >
              Submit Application
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
