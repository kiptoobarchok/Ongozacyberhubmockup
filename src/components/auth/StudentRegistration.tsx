import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Shield, Upload, ArrowLeft, User, Mail, Phone, MapPin, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface StudentRegistrationProps {
  onBack: () => void;
}

export function StudentRegistration({ onBack }: StudentRegistrationProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    location: '',
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
          role: 'student',
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          gender: formData.gender,
          location: formData.location,
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
      <div className="max-w-2xl w-full">
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
              <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-white">Student Application</CardTitle>
            <CardDescription className="text-slate-400">
              Begin your cybersecurity journey with Ongoza Cyber Hub
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
                    className="absolute bottom-0 right-0 p-2 rounded-full bg-cyan-500 hover:bg-cyan-600 cursor-pointer transition-colors"
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

              {/* Full Name */}
              <div>
                <Label htmlFor="fullName" className="text-slate-300">Full Name *</Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="pl-10 bg-slate-900/50 border-slate-700 text-white"
                    placeholder="John Doe"
                    required
                  />
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

              {/* Phone Number */}
              <div>
                <Label htmlFor="phoneNumber" className="text-slate-300">Phone Number *</Label>
                <div className="relative mt-2">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="pl-10 bg-slate-900/50 border-slate-700 text-white"
                    placeholder="+254 700 000 000"
                    required
                  />
                </div>
              </div>

              {/* Gender & Location */}
              <div className="grid grid-cols-2 gap-4">
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

                <div>
                  <Label htmlFor="location" className="text-slate-300">Location *</Label>
                  <div className="relative mt-2">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="pl-10 bg-slate-900/50 border-slate-700 text-white"
                      placeholder="Nairobi, Kenya"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
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

              {/* Confirm Password */}
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
                    placeholder="Re-enter your password"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Student Account'}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={onBack}
                  className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
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
