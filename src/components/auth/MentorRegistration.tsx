import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Shield, Upload, ArrowLeft, User, Mail, Lock, Linkedin, Twitter } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface MentorRegistrationProps {
  onBack: () => void;
}

export function MentorRegistration({ onBack }: MentorRegistrationProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    gender: '',
    linkedinProfile: '',
    twitterProfile: '',
    educationalBackground: '',
    professionalBackground: '',
    mentorshipInterests: '',
    password: '',
    confirmPassword: '',
  });
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }

    setIsLoading(true);

    try {
      const success = await signup(
        {
          role: 'mentor',
          fullName: formData.fullName,
          email: formData.email,
          gender: formData.gender,
          linkedinProfile: formData.linkedinProfile,
          twitterProfile: formData.twitterProfile,
          educationalBackground: formData.educationalBackground,
          professionalBackground: formData.professionalBackground,
          mentorshipInterests: formData.mentorshipInterests,
          profilePicture: profilePicture || undefined,
        },
        formData.password
      );

      if (!success) {
        // Error already shown in signup function
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-8">
      <div className="max-w-3xl w-full">
        <Button
          onClick={onBack}
          variant="outline"
          className="mb-6 border-slate-700 text-slate-300 hover:bg-slate-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-white">Mentor Registration</CardTitle>
            <CardDescription className="text-slate-400">
              Share your expertise and guide future cybersecurity professionals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Picture */}
              <div className="flex flex-col items-center">
                <Label className="text-slate-300 mb-3">Profile Picture</Label>
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-slate-900/50 border-2 border-slate-700 flex items-center justify-center overflow-hidden">
                    {profilePicture ? (
                      <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-12 h-12 text-slate-500" />
                    )}
                  </div>
                  <label
                    htmlFor="profile-picture"
                    className="absolute bottom-0 right-0 p-2 rounded-full bg-purple-500 hover:bg-purple-600 cursor-pointer transition-colors"
                  >
                    <Upload className="w-4 h-4 text-white" />
                    <input
                      id="profile-picture"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Full Name & Email */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName" className="text-slate-300">Full Name *</Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="pl-10 bg-slate-900/50 border-slate-700 text-white"
                      placeholder="Dr. Jane Smith"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="gender" className="text-slate-300">Gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                    <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white mt-2">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-slate-300">Email Address *</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 bg-slate-900/50 border-slate-700 text-white"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              {/* Social Profiles */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="linkedinProfile" className="text-slate-300">LinkedIn Profile</Label>
                  <div className="relative mt-2">
                    <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="linkedinProfile"
                      value={formData.linkedinProfile}
                      onChange={(e) => setFormData({ ...formData, linkedinProfile: e.target.value })}
                      className="pl-10 bg-slate-900/50 border-slate-700 text-white"
                      placeholder="linkedin.com/in/username"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="twitterProfile" className="text-slate-300">X (Twitter) Profile</Label>
                  <div className="relative mt-2">
                    <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="twitterProfile"
                      value={formData.twitterProfile}
                      onChange={(e) => setFormData({ ...formData, twitterProfile: e.target.value })}
                      className="pl-10 bg-slate-900/50 border-slate-700 text-white"
                      placeholder="@username"
                    />
                  </div>
                </div>
              </div>

              {/* Educational Background */}
              <div>
                <Label htmlFor="educationalBackground" className="text-slate-300">Educational Background *</Label>
                <Textarea
                  id="educationalBackground"
                  value={formData.educationalBackground}
                  onChange={(e) => setFormData({ ...formData, educationalBackground: e.target.value })}
                  className="bg-slate-900/50 border-slate-700 text-white mt-2"
                  placeholder="E.g., PhD in Computer Science, MSc in Cybersecurity..."
                  rows={2}
                  required
                />
              </div>

              {/* Professional Background */}
              <div>
                <Label htmlFor="professionalBackground" className="text-slate-300">Professional Background *</Label>
                <Textarea
                  id="professionalBackground"
                  value={formData.professionalBackground}
                  onChange={(e) => setFormData({ ...formData, professionalBackground: e.target.value })}
                  className="bg-slate-900/50 border-slate-700 text-white mt-2"
                  placeholder="Share your work experience, certifications (CISSP, CEH, etc.), areas of expertise..."
                  rows={3}
                  required
                />
              </div>

              {/* Mentorship Interests */}
              <div>
                <Label htmlFor="mentorshipInterests" className="text-slate-300">Mentorship Interests *</Label>
                <Textarea
                  id="mentorshipInterests"
                  value={formData.mentorshipInterests}
                  onChange={(e) => setFormData({ ...formData, mentorshipInterests: e.target.value })}
                  className="bg-slate-900/50 border-slate-700 text-white mt-2"
                  placeholder="What areas would you like to mentor in? (e.g., SOC operations, penetration testing, cloud security...)"
                  rows={3}
                  required
                />
              </div>

              {/* Password */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password" className="text-slate-300">Password *</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-10 bg-slate-900/50 border-slate-700 text-white"
                      placeholder="Minimum 6 characters"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-slate-300">Confirm Password *</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="pl-10 bg-slate-900/50 border-slate-700 text-white"
                      placeholder="Re-enter password"
                      required
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Register as Mentor'}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={onBack}
                  className="text-sm text-slate-400 hover:text-purple-400 transition-colors"
                >
                  Already have an account? Sign in
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
