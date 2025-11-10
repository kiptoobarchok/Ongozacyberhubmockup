import { UserRole } from '../App';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { StatCard } from './shared/StatCard';
import { AIInsightCard } from './shared/AIInsightCard';
import { TrackBadge } from './shared/TrackBadge';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import {
  BookOpen,
  Users,
  Briefcase,
  Target,
  Calendar,
  Award,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { useAuth } from '../contexts/AuthContext';

interface DashboardOverviewProps {
  role: UserRole;
}

export function DashboardOverview({ role }: DashboardOverviewProps) {
  const { user } = useAuth();

  // Student Dashboard
  if (role === 'student') {
    const learningProgress = [
      { module: 'Network Security', progress: 85 },
      { module: 'SOC Operations', progress: 72 },
      { module: 'Cloud Security', progress: 60 },
      { module: 'Penetration Testing', progress: 45 },
      { module: 'Incident Response', progress: 30 },
    ];

    const weeklyActivity = [
      { day: 'Mon', hours: 3.5 },
      { day: 'Tue', hours: 4.2 },
      { day: 'Wed', hours: 2.8 },
      { day: 'Thu', hours: 5.1 },
      { day: 'Fri', hours: 3.9 },
      { day: 'Sat', hours: 6.5 },
      { day: 'Sun', hours: 4.0 },
    ];

    const skillRadar = [
      { skill: 'Technical', value: 75 },
      { skill: 'Problem Solving', value: 85 },
      { skill: 'Communication', value: 70 },
      { skill: 'Leadership', value: 60 },
      { skill: 'Creativity', value: 80 },
    ];

    const upcomingSessions = [
      { mentor: 'Dr. Sarah Chen', topic: 'Advanced SOC Techniques', date: '2025-11-12', time: '14:00' },
      { mentor: 'James Wilson', topic: 'Cloud Security Review', date: '2025-11-14', time: '10:00' },
    ];

    const announcements = [
      { title: 'New Lab Environment Available', type: 'info', date: '2 hours ago' },
      { title: 'Cohort 5 Capstone Showcase', type: 'event', date: '1 day ago' },
      { title: 'Security+ Certification Workshop', type: 'opportunity', date: '3 days ago' },
    ];

    return (
      <div className="space-y-6">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl text-white mb-2">Welcome back, {user?.fullName?.split(' ')[0]}! 👋</h1>
          <p className="text-slate-400">Here's your learning journey overview</p>
        </div>

        {/* Track Assignment */}
        <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white mb-2">Your Learning Track</CardTitle>
                <TrackBadge trackId="builders" size="lg" />
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400 mb-1">Track Confidence</p>
                <p className="text-2xl text-cyan-400">92%</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Overall Progress"
            value="68%"
            icon={Target}
            gradient="from-cyan-500 to-blue-500"
            trend={{ value: 12, direction: 'up' }}
            description="Keep up the great work!"
          />
          <StatCard
            title="Completed Modules"
            value="12/24"
            icon={BookOpen}
            gradient="from-green-500 to-emerald-500"
            trend={{ value: 8, direction: 'up' }}
          />
          <StatCard
            title="Mentor Sessions"
            value="8"
            icon={Users}
            gradient="from-purple-500 to-pink-500"
            trend={{ value: 2, direction: 'up' }}
            description="Next session in 2 days"
          />
          <StatCard
            title="Portfolio Projects"
            value="5"
            icon={Award}
            gradient="from-yellow-500 to-orange-500"
            trend={{ value: 1, direction: 'up' }}
            description="3 portfolio-ready"
          />
        </div>

        {/* AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AIInsightCard
            title="AI Learning Recommendation"
            type="recommendation"
            confidence={88}
            insight="Based on your strong performance in Network Security, we recommend advancing to the Cloud Security Architecture module. Your current skill set aligns well with AWS Security fundamentals."
          />
          <AIInsightCard
            title="Career Path Prediction"
            type="prediction"
            confidence={85}
            insight="Your learning patterns and project portfolio indicate a strong fit for SOC Analyst roles. Consider completing the SIEM Tools certification to boost your placement potential by 23%."
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Learning Progress */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Module Progress</CardTitle>
                <CardDescription className="text-slate-400">Your current learning modules</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {learningProgress.map((module) => (
                  <div key={module.module}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300">{module.module}</span>
                      <span className="text-cyan-400">{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Weekly Activity Chart */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Weekly Learning Activity</CardTitle>
                <CardDescription className="text-slate-400">Hours spent learning this week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={weeklyActivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="day" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                      labelStyle={{ color: '#f1f5f9' }}
                    />
                    <Bar dataKey="hours" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Skill Radar */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Skill Assessment</CardTitle>
                <CardDescription className="text-slate-400">Your competency across key areas</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={skillRadar}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="skill" stroke="#94a3b8" />
                    <PolarRadiusAxis stroke="#94a3b8" />
                    <Radar name="Skills" dataKey="value" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Sessions */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingSessions.map((session, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-900/50 border border-slate-700">
                    <p className="text-white mb-1">{session.topic}</p>
                    <p className="text-sm text-slate-400 mb-2">with {session.mentor}</p>
                    <div className="flex items-center gap-2 text-xs text-cyan-400">
                      <Clock className="w-3 h-3" />
                      {session.date} at {session.time}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Announcements */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Announcements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {announcements.map((announcement, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-900/50 border border-slate-700">
                    <div className="flex items-start gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-cyan-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-white">{announcement.title}</p>
                        <p className="text-xs text-slate-400 mt-1">{announcement.date}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs border-cyan-500/30 text-cyan-400">
                      {announcement.type}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <button className="w-full p-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 transition-opacity">
                  Continue Learning
                </button>
                <button className="w-full p-3 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition-colors">
                  View Portfolio
                </button>
                <button className="w-full p-3 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition-colors">
                  Book Mentor Session
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Mentor Dashboard
  if (role === 'mentor') {
    const studentActivity = [
      { name: 'Week 1', students: 12 },
      { name: 'Week 2', students: 15 },
      { name: 'Week 3', students: 18 },
      { name: 'Week 4', students: 14 },
    ];

    const myStudents = [
      { name: 'Alice Johnson', track: 'builders', progress: 75, nextSession: '2025-11-12' },
      { name: 'Bob Martinez', track: 'leaders', progress: 82, nextSession: '2025-11-13' },
      { name: 'Carol White', track: 'entrepreneurs', progress: 68, nextSession: '2025-11-15' },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl text-white mb-2">Mentor Dashboard</h1>
          <p className="text-slate-400">Track your mentees' progress and upcoming sessions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Students"
            value="24"
            icon={Users}
            gradient="from-purple-500 to-pink-500"
            trend={{ value: 15, direction: 'up' }}
          />
          <StatCard
            title="Sessions This Month"
            value="18"
            icon={Calendar}
            gradient="from-cyan-500 to-blue-500"
            trend={{ value: 12, direction: 'up' }}
          />
          <StatCard
            title="Projects Reviewed"
            value="32"
            icon={CheckCircle}
            gradient="from-green-500 to-emerald-500"
            trend={{ value: 8, direction: 'up' }}
          />
          <StatCard
            title="Avg Student Progress"
            value="74%"
            icon={TrendingUp}
            gradient="from-yellow-500 to-orange-500"
            trend={{ value: 5, direction: 'up' }}
          />
        </div>

        <AIInsightCard
          title="Mentorship Impact Analysis"
          type="analysis"
          confidence={91}
          insight="Your students show 28% faster progression compared to the cohort average. Your focus on hands-on project reviews is particularly effective. Consider scaling your approach to group sessions."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Student Activity Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={studentActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                  />
                  <Line type="monotone" dataKey="students" stroke="#a855f7" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">My Students</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {myStudents.map((student) => (
                <div key={student.name} className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-white">{student.name}</p>
                      <TrackBadge trackId={student.track as any} size="sm" />
                    </div>
                    <span className="text-purple-400">{student.progress}%</span>
                  </div>
                  <Progress value={student.progress} className="mb-2" />
                  <p className="text-xs text-slate-400">Next session: {student.nextSession}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Employer Dashboard
  if (role === 'employer') {
    const candidatePipeline = [
      { stage: 'Applied', count: 45 },
      { stage: 'Screening', count: 32 },
      { stage: 'Interview', count: 18 },
      { stage: 'Technical', count: 12 },
      { stage: 'Offer', count: 5 },
    ];

    const COLORS = ['#06b6d4', '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl text-white mb-2">Employer Dashboard</h1>
          <p className="text-slate-400">Access top cybersecurity talent</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Active Candidates"
            value="112"
            icon={Users}
            gradient="from-green-500 to-emerald-500"
            trend={{ value: 22, direction: 'up' }}
          />
          <StatCard
            title="Shortlisted"
            value="18"
            icon={Target}
            gradient="from-cyan-500 to-blue-500"
          />
          <StatCard
            title="Interviews Scheduled"
            value="12"
            icon={Calendar}
            gradient="from-purple-500 to-pink-500"
          />
          <StatCard
            title="Offers Extended"
            value="5"
            icon={Briefcase}
            gradient="from-yellow-500 to-orange-500"
            trend={{ value: 2, direction: 'up' }}
          />
        </div>

        <AIInsightCard
          title="AI Candidate Matching"
          type="recommendation"
          confidence={94}
          insight="We've identified 8 candidates with 90%+ match for your SOC Analyst opening. Top candidate: Sarah Johnson - Builders Track, specializing in SIEM and incident response with 3 certified projects."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Candidate Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={candidatePipeline}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {candidatePipeline.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Top Matched Candidates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'Sarah Johnson', track: 'builders', match: 94, skills: ['SIEM', 'SOC', 'Incident Response'] },
                { name: 'Michael Chen', track: 'builders', match: 91, skills: ['Penetration Testing', 'Cloud Security'] },
                { name: 'Emily Davis', track: 'leaders', match: 88, skills: ['GRC', 'Risk Management', 'CISSP'] },
              ].map((candidate) => (
                <div key={candidate.name} className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white">{candidate.name}</p>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {candidate.match}% Match
                    </Badge>
                  </div>
                  <TrackBadge trackId={candidate.track as any} size="sm" />
                  <div className="flex flex-wrap gap-1 mt-2">
                    {candidate.skills.map((skill) => (
                      <span key={skill} className="px-2 py-1 rounded text-xs bg-slate-700 text-slate-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  if (role === 'admin') {
    const cohortMetrics = [
      { month: 'Jul', enrolled: 45, completed: 38 },
      { month: 'Aug', enrolled: 52, completed: 44 },
      { month: 'Sep', enrolled: 61, completed: 51 },
      { month: 'Oct', enrolled: 58, completed: 49 },
      { month: 'Nov', enrolled: 67, completed: 12 },
    ];

    const trackDistribution = [
      { name: 'Builders', value: 35 },
      { name: 'Leaders', value: 22 },
      { name: 'Entrepreneurs', value: 18 },
      { name: 'Educators', value: 15 },
      { name: 'Researchers', value: 10 },
    ];

    const TRACK_COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl text-white mb-2">Admin Dashboard</h1>
          <p className="text-slate-400">Platform-wide analytics and insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Students"
            value="324"
            icon={Users}
            gradient="from-cyan-500 to-blue-500"
            trend={{ value: 18, direction: 'up' }}
          />
          <StatCard
            title="Active Mentors"
            value="42"
            icon={Award}
            gradient="from-purple-500 to-pink-500"
            trend={{ value: 5, direction: 'up' }}
          />
          <StatCard
            title="Placement Rate"
            value="87%"
            icon={Briefcase}
            gradient="from-green-500 to-emerald-500"
            trend={{ value: 12, direction: 'up' }}
          />
          <StatCard
            title="Completion Rate"
            value="78%"
            icon={Target}
            gradient="from-yellow-500 to-orange-500"
            trend={{ value: 3, direction: 'up' }}
          />
        </div>

        <AIInsightCard
          title="Platform Performance Insight"
          type="analysis"
          confidence={89}
          insight="Top performing track this quarter: Builders (35% enrollment, 92% completion). Recommend expanding SOC and Cloud Security modules. Mentor-to-student ratio is optimal at 1:7.7."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Cohort Performance</CardTitle>
              <CardDescription className="text-slate-400">Enrollment vs Completion</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cohortMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                  />
                  <Bar dataKey="enrolled" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="completed" fill="#10b981" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Track Distribution</CardTitle>
              <CardDescription className="text-slate-400">Student enrollment by track</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={trackDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {trackDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={TRACK_COLORS[index % TRACK_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
