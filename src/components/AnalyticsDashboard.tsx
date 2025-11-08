import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  TrendingUp, 
  Users, 
  GraduationCap,
  Award,
  Target,
  Filter,
  Download
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

export function AnalyticsDashboard() {
  const enrollmentData = [
    { month: 'Jan', students: 28 },
    { month: 'Feb', students: 35 },
    { month: 'Mar', students: 42 },
    { month: 'Apr', students: 38 },
    { month: 'May', students: 51 },
    { month: 'Jun', students: 48 },
    { month: 'Jul', students: 55 },
  ];

  const completionRates = [
    { track: 'SOC Analyst', rate: 85 },
    { track: 'Network Security', rate: 78 },
    { track: 'Penetration Testing', rate: 72 },
    { track: 'Cloud Security', rate: 68 },
  ];

  const trackDistribution = [
    { name: 'SOC Analyst', value: 142, color: '#06b6d4' },
    { name: 'Network Security', value: 98, color: '#8b5cf6' },
    { name: 'Penetration Testing', value: 65, color: '#ec4899' },
    { name: 'Cloud Security', value: 37, color: '#10b981' },
  ];

  const mentorActivity = [
    { mentor: 'Dr. Sarah Smith', students: 24, sessions: 86, avgRating: 4.9 },
    { mentor: 'John Williams', students: 18, sessions: 64, avgRating: 4.7 },
    { mentor: 'Lisa Martinez', students: 22, sessions: 78, avgRating: 4.8 },
    { mentor: 'Michael Brown', students: 16, sessions: 52, avgRating: 4.6 },
  ];

  const studentProgress = [
    { week: 'Week 1', completion: 65 },
    { week: 'Week 2', completion: 72 },
    { week: 'Week 3', completion: 68 },
    { week: 'Week 4', completion: 75 },
    { week: 'Week 5', completion: 81 },
    { week: 'Week 6', completion: 78 },
  ];

  const skillGapData = [
    { skill: 'Linux/CLI', gap: 25 },
    { skill: 'Networking', gap: 18 },
    { skill: 'SIEM Tools', gap: 32 },
    { skill: 'Programming', gap: 38 },
    { skill: 'Cloud Security', gap: 42 },
  ];

  const placementOutcomes = [
    { month: 'Jan', placed: 8, interviewed: 15 },
    { month: 'Feb', placed: 12, interviewed: 18 },
    { month: 'Mar', placed: 15, interviewed: 22 },
    { month: 'Apr', placed: 11, interviewed: 19 },
    { month: 'May', placed: 17, interviewed: 24 },
    { month: 'Jun', placed: 14, interviewed: 21 },
  ];

  const performanceData = [
    { subject: 'Engagement', A: 85 },
    { subject: 'Completion', A: 78 },
    { subject: 'Assessment', A: 82 },
    { subject: 'Projects', A: 88 },
    { subject: 'Placement', A: 75 },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white mb-2">Analytics Dashboard</h1>
          <p className="text-slate-400">Comprehensive insights into platform performance</p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="current-cohort">
            <SelectTrigger className="w-48 bg-slate-800 border-slate-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="current-cohort">Current Cohort</SelectItem>
              <SelectItem value="all-time">All Time</SelectItem>
              <SelectItem value="last-quarter">Last Quarter</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-slate-700 text-slate-300">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-slate-400">Total Students</CardTitle>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-white mb-2">342</div>
            <div className="flex items-center gap-2 text-xs text-green-400">
              <TrendingUp className="w-3 h-3" />
              <span>+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-slate-400">Avg Completion</CardTitle>
              <GraduationCap className="w-4 h-4 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-white mb-2">78%</div>
            <div className="flex items-center gap-2 text-xs text-green-400">
              <TrendingUp className="w-3 h-3" />
              <span>+5% from last cohort</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-slate-400">Active Mentors</CardTitle>
              <Award className="w-4 h-4 text-pink-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-white mb-2">28</div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Avg 4.8 rating</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm text-slate-400">Placement Rate</CardTitle>
              <Target className="w-4 h-4 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-white mb-2">85%</div>
            <div className="flex items-center gap-2 text-xs text-green-400">
              <TrendingUp className="w-3 h-3" />
              <span>+8% from last cohort</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Student Enrollment Trend</CardTitle>
            <CardDescription className="text-slate-400">Monthly student enrollment over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  dot={{ fill: '#06b6d4', r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Track Distribution</CardTitle>
            <CardDescription className="text-slate-400">Students enrolled by track</CardDescription>
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
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Completion Rates by Track</CardTitle>
            <CardDescription className="text-slate-400">Average module completion percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={completionRates}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="track" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
                <Bar dataKey="rate" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Platform Performance</CardTitle>
            <CardDescription className="text-slate-400">Overall platform health metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={performanceData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" />
                <PolarRadiusAxis stroke="#94a3b8" />
                <Radar
                  name="Performance"
                  dataKey="A"
                  stroke="#06b6d4"
                  fill="#06b6d4"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Mentor Activity Table */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mb-8">
        <CardHeader>
          <CardTitle className="text-white">Mentor Activity</CardTitle>
          <CardDescription className="text-slate-400">Performance overview of active mentors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-sm text-slate-400">Mentor</th>
                  <th className="text-left py-3 px-4 text-sm text-slate-400">Students</th>
                  <th className="text-left py-3 px-4 text-sm text-slate-400">Sessions</th>
                  <th className="text-left py-3 px-4 text-sm text-slate-400">Avg Rating</th>
                  <th className="text-left py-3 px-4 text-sm text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {mentorActivity.map((mentor, index) => (
                  <tr key={index} className="border-b border-slate-700/50">
                    <td className="py-3 px-4 text-white">{mentor.mentor}</td>
                    <td className="py-3 px-4 text-white">{mentor.students}</td>
                    <td className="py-3 px-4 text-white">{mentor.sessions}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-white">{mentor.avgRating}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 h-3 mr-0.5 ${
                                i < Math.floor(mentor.avgRating) ? 'bg-yellow-400' : 'bg-slate-600'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-green-500/20 text-green-300 border-green-500">Active</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Row Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Placement Outcomes</CardTitle>
            <CardDescription className="text-slate-400">Students placed vs interviewed</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={placementOutcomes}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}
                  labelStyle={{ color: '#f1f5f9' }}
                />
                <Legend />
                <Bar dataKey="interviewed" fill="#8b5cf6" radius={[8, 8, 0, 0]} name="Interviewed" />
                <Bar dataKey="placed" fill="#10b981" radius={[8, 8, 0, 0]} name="Placed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Common Skill Gaps</CardTitle>
            <CardDescription className="text-slate-400">Areas requiring additional focus</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 pt-4">
              {skillGapData.map((skill) => (
                <div key={skill.skill}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300">{skill.skill}</span>
                    <span className="text-sm text-orange-400">{skill.gap}% gap</span>
                  </div>
                  <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                      style={{ width: `${skill.gap}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
