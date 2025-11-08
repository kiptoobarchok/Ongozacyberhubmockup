import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Shield, Upload, ArrowLeft, Building, Mail, Lock, Globe, FileText, MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface EmployerRegistrationProps {
  onBack: () => void;
}

export function EmployerRegistration({ onBack }: EmployerRegistrationProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    companyName: '',
    industry: '',
    businessRegNumber: '',
    companySize: '',
    website: '',
    companyDescription: '',
    physicalAddress: '',
    password: '',
    confirmPassword: '',
  });
  const [logo, setLogo] = useState<string | null>(null);
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
          role: 'employer',
          fullName: formData.fullName,
          email: formData.email,
          companyName: formData.companyName,
          industry: formData.industry,
          businessRegNumber: formData.businessRegNumber,
          companySize: formData.companySize,
          website: formData.website,
          companyDescription: formData.companyDescription,
          physicalAddress: formData.physicalAddress,
          logo: logo || undefined,
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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
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
              <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-white">Employer Registration</CardTitle>
            <CardDescription className="text-slate-400">
              Connect with talented cybersecurity professionals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Logo */}
              <div className="flex flex-col items-center">
                <Label className="text-slate-300 mb-3">Company Logo</Label>
                <div className="relative">
                  <div className="w-32 h-32 rounded-lg bg-slate-900/50 border-2 border-slate-700 flex items-center justify-center overflow-hidden">
                    {logo ? (
                      <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <Building className="w-12 h-12 text-slate-500" />
                    )}
                  </div>
                  <label
                    htmlFor="logo"
                    className="absolute bottom-0 right-0 p-2 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer transition-colors"
                  >
                    <Upload className="w-4 h-4 text-white" />
                    <input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Contact Person & Email */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName" className="text-slate-300">Contact Person *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="bg-slate-900/50 border-slate-700 text-white mt-2"
                    placeholder="Full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-slate-300">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-slate-900/50 border-slate-700 text-white mt-2"
                    placeholder="contact@company.com"
                    required
                  />
                </div>
              </div>

              {/* Company Name */}
              <div>
                <Label htmlFor="companyName" className="text-slate-300">Company / Organization Name *</Label>
                <div className="relative mt-2">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="pl-10 bg-slate-900/50 border-slate-700 text-white"
                    placeholder="Company Ltd."
                    required
                  />
                </div>
              </div>

              {/* Industry & Business Reg Number */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="industry" className="text-slate-300">Industry Sector *</Label>
                  <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                    <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white mt-2">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="financial">Financial Services</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="government">Government</SelectItem>
                      <SelectItem value="telecommunications">Telecommunications</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="businessRegNumber" className="text-slate-300">Business Reg Number *</Label>
                  <div className="relative mt-2">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="businessRegNumber"
                      value={formData.businessRegNumber}
                      onChange={(e) => setFormData({ ...formData, businessRegNumber: e.target.value })}
                      className="pl-10 bg-slate-900/50 border-slate-700 text-white"
                      placeholder="REG123456"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Company Size & Website */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companySize" className="text-slate-300">Company Size *</Label>
                  <Select value={formData.companySize} onValueChange={(value) => setFormData({ ...formData, companySize: value })}>
                    <SelectTrigger className="bg-slate-900/50 border-slate-700 text-white mt-2">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="501+">501+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="website" className="text-slate-300">Website URL</Label>
                  <div className="relative mt-2">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="pl-10 bg-slate-900/50 border-slate-700 text-white"
                      placeholder="https://company.com"
                    />
                  </div>
                </div>
              </div>

              {/* Company Description */}
              <div>
                <Label htmlFor="companyDescription" className="text-slate-300">Company Description *</Label>
                <Textarea
                  id="companyDescription"
                  value={formData.companyDescription}
                  onChange={(e) => setFormData({ ...formData, companyDescription: e.target.value })}
                  className="bg-slate-900/50 border-slate-700 text-white mt-2"
                  placeholder="Brief description of your company and what you do..."
                  rows={3}
                  required
                />
              </div>

              {/* Physical Address */}
              <div>
                <Label htmlFor="physicalAddress" className="text-slate-300">Physical Address *</Label>
                <div className="relative mt-2">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <Textarea
                    id="physicalAddress"
                    value={formData.physicalAddress}
                    onChange={(e) => setFormData({ ...formData, physicalAddress: e.target.value })}
                    className="pl-10 bg-slate-900/50 border-slate-700 text-white"
                    placeholder="Company physical address"
                    rows={2}
                    required
                  />
                </div>
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
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Register Company'}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={onBack}
                  className="text-sm text-slate-400 hover:text-green-400 transition-colors"
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
