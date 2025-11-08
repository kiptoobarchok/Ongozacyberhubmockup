import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  CheckCircle2, 
  Circle, 
  Upload, 
  FileText, 
  User, 
  GraduationCap,
  MapPin,
  Calendar
} from 'lucide-react';

export function AdmissionsOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Education', icon: GraduationCap },
    { number: 3, title: 'Documents', icon: FileText },
    { number: 4, title: 'Track Selection', icon: MapPin },
    { number: 5, title: 'Review', icon: CheckCircle2 },
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
  });

  const progress = (currentStep / totalSteps) * 100;

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-slate-300">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="bg-slate-800/50 border-slate-700 text-white mt-2"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-slate-300">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="bg-slate-800/50 border-slate-700 text-white mt-2"
                  placeholder="Enter last name"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="text-slate-300">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white mt-2"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-slate-300">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white mt-2"
                placeholder="+254 700 000 000"
              />
            </div>
            <div>
              <Label htmlFor="address" className="text-slate-300">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white mt-2"
                placeholder="Enter your address"
                rows={3}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="education" className="text-slate-300">Highest Education Level</Label>
              <Select value={formData.education} onValueChange={(value) => setFormData({ ...formData, education: value })}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white mt-2">
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="high-school">High School</SelectItem>
                  <SelectItem value="diploma">Diploma</SelectItem>
                  <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                  <SelectItem value="masters">Master's Degree</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="institution" className="text-slate-300">Institution Name</Label>
              <Input
                id="institution"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white mt-2"
                placeholder="University/College name"
              />
            </div>
            <div>
              <Label htmlFor="graduationYear" className="text-slate-300">Graduation Year</Label>
              <Input
                id="graduationYear"
                type="number"
                value={formData.graduationYear}
                onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white mt-2"
                placeholder="2024"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-cyan-500 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-white mb-2">Upload ID Document</p>
              <p className="text-sm text-slate-400">PDF, JPG, PNG (Max 5MB)</p>
            </div>
            <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-cyan-500 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-white mb-2">Upload Academic Certificates</p>
              <p className="text-sm text-slate-400">PDF, JPG, PNG (Max 10MB)</p>
            </div>
            <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-cyan-500 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-white mb-2">Upload CV/Resume (Optional)</p>
              <p className="text-sm text-slate-400">PDF, DOC (Max 5MB)</p>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="mb-4">
              <h3 className="text-white mb-2">Select Your Track</h3>
              <p className="text-sm text-slate-400">Choose the cybersecurity specialization that interests you most</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'network', title: 'Network Security', desc: 'Firewall, IDS/IPS, VPN configuration' },
                { id: 'pentest', title: 'Penetration Testing', desc: 'Ethical hacking, vulnerability assessment' },
                { id: 'cloud', title: 'Cloud Security', desc: 'AWS, Azure, GCP security practices' },
                { id: 'soc', title: 'SOC Analyst', desc: 'SIEM, threat hunting, incident response' },
              ].map((track) => (
                <div
                  key={track.id}
                  onClick={() => setFormData({ ...formData, track: track.id })}
                  className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.track === track.id
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-slate-700 bg-slate-800/30 hover:border-slate-600'
                  }`}
                >
                  <h4 className="text-white mb-2">{track.title}</h4>
                  <p className="text-sm text-slate-400">{track.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-400 mt-1" />
                <div>
                  <h3 className="text-white mb-2">Application Summary</h3>
                  <p className="text-sm text-slate-400">Please review your information before submitting</p>
                </div>
              </div>
            </div>

            <Card className="bg-slate-800/30 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Name:</span>
                  <span className="text-white">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Email:</span>
                  <span className="text-white">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Phone:</span>
                  <span className="text-white">{formData.phone}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/30 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Cohort Assignment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-white">Cohort Nov-2025-A</h4>
                      <p className="text-sm text-slate-400">Network Security Track</p>
                    </div>
                    <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500">Assigned</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400">Start Date</p>
                      <p className="text-white">November 18, 2025</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Duration</p>
                      <p className="text-white">6 Months</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl text-white mb-2">Student Onboarding</h1>
        <p className="text-slate-400">Complete your application to join Ongoza Cyber Hub</p>
      </div>

      {/* Progress Bar */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mb-8">
        <CardContent className="pt-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-400">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-slate-400">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.number;
              const isCurrent = currentStep === step.number;

              return (
                <div key={step.number} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isCurrent
                        ? 'bg-cyan-500 text-white'
                        : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <span className={`text-xs ${isCurrent ? 'text-white' : 'text-slate-500'}`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mb-8">
        <CardHeader>
          <CardTitle className="text-white">{steps[currentStep - 1].title}</CardTitle>
          <CardDescription className="text-slate-400">
            {currentStep === 1 && 'Enter your personal details'}
            {currentStep === 2 && 'Provide your educational background'}
            {currentStep === 3 && 'Upload required documents'}
            {currentStep === 4 && 'Choose your specialization'}
            {currentStep === 5 && 'Review and submit your application'}
          </CardDescription>
        </CardHeader>
        <CardContent>{renderStepContent()}</CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          variant="outline"
          className="border-slate-700 text-slate-300 hover:bg-slate-800"
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            if (currentStep < totalSteps) {
              setCurrentStep(currentStep + 1);
            }
          }}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
        >
          {currentStep === totalSteps ? 'Submit Application' : 'Next Step'}
        </Button>
      </div>
    </div>
  );
}
