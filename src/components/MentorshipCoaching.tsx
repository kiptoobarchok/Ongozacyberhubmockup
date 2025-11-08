import { useState } from 'react';
import { UserRole } from '../App';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Calendar } from './ui/calendar';
import { 
  Users, 
  Calendar as CalendarIcon,
  Clock,
  Video,
  MessageSquare,
  CheckCircle2,
  Star,
  TrendingUp
} from 'lucide-react';

interface MentorshipCoachingProps {
  role: UserRole;
}

export function MentorshipCoaching({ role }: MentorshipCoachingProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const upcomingSessions = [
    {
      id: 1,
      title: 'Weekly Progress Review',
      mentor: 'Dr. Sarah Smith',
      student: 'Alex Johnson',
      date: '2025-11-09',
      time: '14:00',
      duration: '45 min',
      type: 'video',
      status: 'scheduled',
    },
    {
      id: 2,
      title: 'Project Feedback Session',
      mentor: 'John Williams',
      student: 'Maria Garcia',
      date: '2025-11-09',
      time: '16:00',
      duration: '30 min',
      type: 'video',
      status: 'scheduled',
    },
    {
      id: 3,
      title: 'Career Guidance Discussion',
      mentor: 'Dr. Sarah Smith',
      student: 'David Chen',
      date: '2025-11-10',
      time: '10:00',
      duration: '60 min',
      type: 'video',
      status: 'scheduled',
    },
  ];

  const students = [
    {
      id: 1,
      name: 'Alex Johnson',
      track: 'SOC Analyst',
      progress: 68,
      lastSession: '2025-11-01',
      nextSession: '2025-11-09',
      performance: 'excellent',
    },
    {
      id: 2,
      name: 'Maria Garcia',
      track: 'Network Security',
      progress: 54,
      lastSession: '2025-10-30',
      nextSession: '2025-11-09',
      performance: 'good',
    },
    {
      id: 3,
      name: 'David Chen',
      track: 'Penetration Testing',
      progress: 42,
      lastSession: '2025-10-28',
      nextSession: '2025-11-10',
      performance: 'needs-attention',
    },
  ];

  const feedbackNotes = [
    {
      id: 1,
      student: 'Alex Johnson',
      date: '2025-11-01',
      note: 'Excellent progress on the SIEM dashboard project. Strong understanding of log analysis. Recommended to explore advanced correlation rules.',
      rating: 5,
    },
    {
      id: 2,
      student: 'Maria Garcia',
      date: '2025-10-30',
      note: 'Good grasp of networking fundamentals. Needs more practice with firewall configuration. Assigned additional lab exercises.',
      rating: 4,
    },
  ];

  const getPerformanceBadge = (performance: string) => {
    const config = {
      excellent: { color: 'bg-green-500/20 text-green-300 border-green-500', label: 'Excellent' },
      good: { color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500', label: 'Good' },
      'needs-attention': { color: 'bg-orange-500/20 text-orange-300 border-orange-500', label: 'Needs Attention' },
    };
    return (
      <Badge className={config[performance as keyof typeof config].color}>
        {config[performance as keyof typeof config].label}
      </Badge>
    );
  };

  const renderMentorView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-8">
        {/* Student List */}
        <div>
          <h2 className="text-2xl text-white mb-4">My Students</h2>
          <div className="space-y-4">
            {students.map((student) => (
              <Card key={student.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500">
                      <AvatarFallback className="text-white">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg text-white mb-1">{student.name}</h3>
                          <p className="text-sm text-slate-400">{student.track} Track</p>
                        </div>
                        {getPerformanceBadge(student.performance)}
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-400">Overall Progress</span>
                          <span className="text-sm text-white">{student.progress}%</span>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-slate-400">Last Session</p>
                          <p className="text-white">{new Date(student.lastSession).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Next Session</p>
                          <p className="text-white">{new Date(student.nextSession).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Send Message
                        </Button>
                        <Button size="sm" variant="outline" className="border-slate-700 text-slate-300">
                          View Progress
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Feedback History */}
        <div>
          <h2 className="text-2xl text-white mb-4">Recent Feedback</h2>
          <div className="space-y-4">
            {feedbackNotes.map((feedback) => (
              <Card key={feedback.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-white mb-1">{feedback.student}</h4>
                      <p className="text-sm text-slate-400">{new Date(feedback.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < feedback.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-300">{feedback.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        {/* Calendar */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Session Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border border-slate-700 bg-slate-900/50"
            />
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Upcoming Sessions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingSessions.slice(0, 3).map((session) => (
              <div
                key={session.id}
                className="p-3 rounded-lg bg-slate-900/50 border border-slate-700"
              >
                <h4 className="text-sm text-white mb-2">{session.title}</h4>
                <p className="text-xs text-slate-400 mb-2">{session.student}</p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>{session.time} • {session.duration}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderStudentView = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-8">
        {/* My Mentor */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">My Mentor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500">
                <AvatarFallback className="text-white text-xl">SS</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl text-white mb-1">Dr. Sarah Smith</h3>
                <p className="text-sm text-slate-400 mb-3">Senior Security Analyst • 10 years experience</p>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white">4.9</span>
                    <span className="text-slate-400 text-sm">(127 reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-cyan-400" />
                    <span className="text-white">24</span>
                    <span className="text-slate-400 text-sm">students</span>
                  </div>
                </div>

                <p className="text-slate-300 mb-4">
                  Specialized in SOC operations, threat hunting, and SIEM platforms. 
                  Passionate about helping students develop practical security skills.
                </p>

                <div className="flex gap-3">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Schedule Session
                  </Button>
                  <Button variant="outline" className="border-slate-700 text-slate-300">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Session History */}
        <div>
          <h2 className="text-2xl text-white mb-4">Session History</h2>
          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <Card key={session.id} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-cyan-500/10">
                      <Video className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="text-white mb-1">{session.title}</h4>
                          <p className="text-sm text-slate-400">{session.mentor}</p>
                        </div>
                        <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500">
                          {session.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{new Date(session.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{session.time} • {session.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1 space-y-6">
        {/* Stats */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Session Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Total Sessions</span>
              <span className="text-2xl text-white">24</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">This Month</span>
              <span className="text-2xl text-white">6</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Avg. Rating</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl text-white">4.8</span>
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Session */}
        <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-white">Next Session</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h4 className="text-white mb-2">Weekly Progress Review</h4>
              <p className="text-sm text-slate-400">with Dr. Sarah Smith</p>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center gap-2 text-slate-300">
                <CalendarIcon className="w-4 h-4 text-cyan-400" />
                <span>Tomorrow, Nov 9</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>2:00 PM - 2:45 PM</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Video className="w-4 h-4 text-cyan-400" />
                <span>Video Call</span>
              </div>
            </div>
            <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
              Join Session
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl text-white mb-2">
          {role === 'mentor' ? 'Mentorship Dashboard' : 'My Mentorship'}
        </h1>
        <p className="text-slate-400">
          {role === 'mentor' 
            ? 'Guide and support your students on their cybersecurity journey'
            : 'Connect with your mentor and track your progress'}
        </p>
      </div>

      {role === 'mentor' ? renderMentorView() : renderStudentView()}
    </div>
  );
}
