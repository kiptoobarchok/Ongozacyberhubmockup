import { UserRole } from '../App';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  Award, 
  Calendar,
  Bell,
  Target,
  Clock
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface DashboardOverviewProps {
  role: UserRole;
}

export function DashboardOverview({ role }: DashboardOverviewProps) {
  const studentProgress = [
    { month: 'Jan', completed: 12 },
    { month: 'Feb', completed: 19 },
    { month: 'Mar', completed: 25 },
    { month: 'Apr', completed: 31 },
    { month: 'May', completed: 38 },
    { month: 'Jun', completed: 45 },
  ];

  const skillDistribution = [
    { name: 'Network Security', value: 85 },
    { name: 'Penetration Testing', value: 72 },
    { name: 'Cloud Security', value: 68 },
    { name: 'SIEM Tools', value: 90 },
  ];

  const COLORS = ['#06b6d4', '#8b5cf6', '#ec4899', '#10b981'];

  const announcements = [
    { id: 1, title: 'New Cybersecurity Module Released', time: '2 hours ago', type: 'update' },
    { id: 2, title: 'Mentor Session Tomorrow at 2 PM', time: '5 hours ago', type: 'session' },
    { id: 3, title: 'Project Submission Deadline - Nov 15', time: '1 day ago', type: 'deadline' },
  ];

  const renderStudentDashboard = () => (
    <>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-slate-400">Learning Progress</CardTitle>
              <BookOpen className="w-4 h-4 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white mb-2">68%</div>
            <Progress value={68} className="h-2 mb-2" />
            <p className="text-xs text-slate-500">12 of 18 modules complete</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-slate-400">Projects Submitted</CardTitle>
              <Award className="w-4 h-4 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white mb-2">8/10</div>
            <Progress value={80} className="h-2 mb-2" />
            <p className="text-xs text-slate-500">2 pending review</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-slate-400">Mentor Sessions</CardTitle>
              <Users className="w-4 h-4 text-pink-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white mb-2">24</div>
            <div className="flex items-center gap-2 text-xs text-green-400">
              <TrendingUp className="w-3 h-3" />
              <span>+3 this week</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-slate-400">Portfolio Score</CardTitle>
              <Target className="w-4 h-4 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white mb-2">4.6/5.0</div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  className={`w-4 h-1 rounded ${
                    star <= 4 ? 'bg-green-400' : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Progress Over Time</CardTitle>
            <CardDescription className="text-slate-400">Modules completed per month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={studentProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#06b6d4" 
                  strokeWidth={3}
                  dot={{ fill: '#06b6d4', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Skill Proficiency</CardTitle>
            <CardDescription className="text-slate-400">Current skill levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {skillDistribution.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300">{skill.name}</span>
                    <span className="text-sm text-slate-400">{skill.value}%</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${skill.value}%`,
                        background: `linear-gradient(to right, ${COLORS[index]}, ${COLORS[index]}dd)`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Announcements */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Announcements</CardTitle>
              <CardDescription className="text-slate-400">Stay updated with latest news</CardDescription>
            </div>
            <Bell className="w-5 h-5 text-cyan-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-slate-900/50 border border-slate-700 hover:border-cyan-500/50 transition-colors"
              >
                <div className="p-2 rounded-lg bg-cyan-500/10">
                  <Bell className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h4 className="text-white text-sm mb-1">{announcement.title}</h4>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span className="text-xs text-slate-500">{announcement.time}</span>
                    <Badge variant="outline" className="ml-2 text-xs border-slate-600 text-slate-400">
                      {announcement.type}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );

  const renderMentorDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-400">Active Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white">24</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-400">Sessions This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white">12</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-400">Projects to Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white">7</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-400">Avg. Feedback Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white">2.3h</div>
          </CardContent>
        </Card>
      </div>
    </>
  );

  const renderAdminDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-400">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white">342</div>
            <p className="text-xs text-green-400 mt-1">+18 this month</p>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-400">Active Mentors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white">28</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-400">Avg. Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white">78%</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-400">Placement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white">85%</div>
          </CardContent>
        </Card>
      </div>
    </>
  );

  const renderEmployerDashboard = () => (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-400">Available Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white">156</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-400">Shortlisted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white">23</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-400">Interviews Scheduled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white">8</div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-slate-400">Offers Extended</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl text-white">5</div>
          </CardContent>
        </Card>
      </div>
    </>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl text-white mb-2">
          Welcome back, {role === 'student' ? 'Alex' : role === 'mentor' ? 'Dr. Smith' : role === 'admin' ? 'Admin' : 'Tech Corp'}
        </h1>
        <p className="text-slate-400">
          {role === 'student' && "Continue your cybersecurity journey"}
          {role === 'mentor' && "Your students are waiting for guidance"}
          {role === 'admin' && "System overview and management"}
          {role === 'employer' && "Discover talented cybersecurity professionals"}
        </p>
      </div>

      {role === 'student' && renderStudentDashboard()}
      {role === 'mentor' && renderMentorDashboard()}
      {role === 'admin' && renderAdminDashboard()}
      {role === 'employer' && renderEmployerDashboard()}
    </div>
  );
}
