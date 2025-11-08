import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Shield, GraduationCap, Users, Building } from 'lucide-react';

interface WelcomePageProps {
  onRoleSelect: (role: 'student' | 'mentor' | 'employer' | 'login') => void;
}

export function WelcomePage({ onRoleSelect }: WelcomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-8">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
              <Shield className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl text-white mb-3">Welcome to Ongoza Cyber Hub</h1>
          <p className="text-xl text-slate-400">Integrated Student Management Platform</p>
          <p className="text-slate-500 mt-2">Choose your role to get started</p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Student */}
          <Card 
            className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:border-cyan-500 transition-all cursor-pointer group"
            onClick={() => onRoleSelect('student')}
          >
            <CardHeader>
              <div className="p-4 rounded-lg bg-cyan-500/10 w-fit mb-4 group-hover:bg-cyan-500/20 transition-colors">
                <GraduationCap className="w-8 h-8 text-cyan-400" />
              </div>
              <CardTitle className="text-white">Student</CardTitle>
              <CardDescription className="text-slate-400">
                Start your cybersecurity learning journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Access learning modules
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Build your portfolio
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Connect with mentors
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  Find career opportunities
                </li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                Apply as Student
              </Button>
            </CardContent>
          </Card>

          {/* Mentor */}
          <Card 
            className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:border-purple-500 transition-all cursor-pointer group"
            onClick={() => onRoleSelect('mentor')}
          >
            <CardHeader>
              <div className="p-4 rounded-lg bg-purple-500/10 w-fit mb-4 group-hover:bg-purple-500/20 transition-colors">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <CardTitle className="text-white">Mentor</CardTitle>
              <CardDescription className="text-slate-400">
                Guide the next generation of cybersecurity professionals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Share your expertise
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Review student projects
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Conduct coaching sessions
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                  Make an impact
                </li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                Register as Mentor
              </Button>
            </CardContent>
          </Card>

          {/* Employer */}
          <Card 
            className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:border-green-500 transition-all cursor-pointer group"
            onClick={() => onRoleSelect('employer')}
          >
            <CardHeader>
              <div className="p-4 rounded-lg bg-green-500/10 w-fit mb-4 group-hover:bg-green-500/20 transition-colors">
                <Building className="w-8 h-8 text-green-400" />
              </div>
              <CardTitle className="text-white">Employer</CardTitle>
              <CardDescription className="text-slate-400">
                Find talented cybersecurity professionals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-300 mb-6">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Access talent pipeline
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  View student portfolios
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Post job opportunities
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Hire qualified candidates
                </li>
              </ul>
              <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                Register Company
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-slate-400 mb-4">Already have an account?</p>
          <Button 
            onClick={() => onRoleSelect('login')}
            variant="outline" 
            className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            Sign In
          </Button>
        </div>
      </div>
    </div>
  );
}
