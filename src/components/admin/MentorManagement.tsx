import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { 
  Search, 
  Star, 
  DollarSign, 
  Users, 
  Calendar,
  TrendingUp,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Mentor {
  id: string;
  name: string;
  email: string;
  expertise: string[];
  rating: number;
  activeStudents: number;
  completedSessions: number;
  pendingPayment: number;
  totalEarned: number;
  status: 'active' | 'inactive' | 'pending';
  joinedDate: string;
}

export function MentorManagement() {
  const [mentors, setMentors] = useState<Mentor[]>([
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      email: 'sarah.chen@och.edu',
      expertise: ['SOC Operations', 'SIEM', 'Incident Response'],
      rating: 4.8,
      activeStudents: 12,
      completedSessions: 45,
      pendingPayment: 2250,
      totalEarned: 18500,
      status: 'active',
      joinedDate: '2024-06-15',
    },
    {
      id: '2',
      name: 'James Wilson',
      email: 'james.wilson@och.edu',
      expertise: ['Cloud Security', 'AWS', 'Azure'],
      rating: 4.9,
      activeStudents: 15,
      completedSessions: 62,
      pendingPayment: 3100,
      totalEarned: 24800,
      status: 'active',
      joinedDate: '2024-05-20',
    },
    {
      id: '3',
      name: 'Maria Garcia',
      email: 'maria.garcia@och.edu',
      expertise: ['Penetration Testing', 'Web Security', 'OSCP'],
      rating: 4.7,
      activeStudents: 10,
      completedSessions: 38,
      pendingPayment: 1900,
      totalEarned: 15200,
      status: 'active',
      joinedDate: '2024-07-10',
    },
    {
      id: '4',
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@och.edu',
      expertise: ['GRC', 'Compliance', 'Risk Management'],
      rating: 4.6,
      activeStudents: 8,
      completedSessions: 28,
      pendingPayment: 1400,
      totalEarned: 11200,
      status: 'active',
      joinedDate: '2024-08-01',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const filteredMentors = mentors.filter(mentor =>
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPendingPayments = mentors.reduce((sum, m) => sum + m.pendingPayment, 0);
  const totalPaidOut = mentors.reduce((sum, m) => sum + m.totalEarned, 0);

  const handleProcessPayment = (mentorId: string) => {
    setMentors(mentors.map(m => {
      if (m.id === mentorId) {
        return {
          ...m,
          totalEarned: m.totalEarned + m.pendingPayment,
          pendingPayment: 0,
        };
      }
      return m;
    }));
    toast.success('Payment processed successfully!');
  };

  const handleToggleStatus = (mentorId: string) => {
    setMentors(mentors.map(m => {
      if (m.id === mentorId) {
        return {
          ...m,
          status: m.status === 'active' ? 'inactive' : 'active' as 'active' | 'inactive',
        };
      }
      return m;
    }));
    toast.success('Mentor status updated!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl text-white mb-2">Mentor Management</h2>
        <p className="text-slate-400">Manage mentors, review performance, and process payments</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Mentors</p>
                <p className="text-2xl text-white">{mentors.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Active Mentors</p>
                <p className="text-2xl text-white">{mentors.filter(m => m.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Pending Payments</p>
                <p className="text-2xl text-white">${totalPendingPayments.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Paid Out</p>
                <p className="text-2xl text-white">${totalPaidOut.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-700 text-white"
            placeholder="Search mentors by name, email, or expertise..."
          />
        </div>
      </div>

      {/* Mentors Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">All Mentors</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300">Mentor</TableHead>
                <TableHead className="text-slate-300">Expertise</TableHead>
                <TableHead className="text-slate-300">Rating</TableHead>
                <TableHead className="text-slate-300">Students</TableHead>
                <TableHead className="text-slate-300">Sessions</TableHead>
                <TableHead className="text-slate-300">Pending</TableHead>
                <TableHead className="text-slate-300">Status</TableHead>
                <TableHead className="text-slate-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMentors.map((mentor) => (
                <TableRow key={mentor.id} className="border-slate-700">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                          {mentor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white">{mentor.name}</p>
                        <p className="text-xs text-slate-400">{mentor.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {mentor.expertise.slice(0, 2).map((exp, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs border-cyan-500/30 text-cyan-400">
                          {exp}
                        </Badge>
                      ))}
                      {mentor.expertise.length > 2 && (
                        <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                          +{mentor.expertise.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white">{mentor.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-white">{mentor.activeStudents}</TableCell>
                  <TableCell className="text-white">{mentor.completedSessions}</TableCell>
                  <TableCell className="text-yellow-400">${mentor.pendingPayment.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={
                      mentor.status === 'active' 
                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                        : 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                    }>
                      {mentor.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-700"
                        onClick={() => {
                          setSelectedMentor(mentor);
                          setIsDetailsOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {mentor.pendingPayment > 0 && (
                        <Button
                          size="sm"
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => handleProcessPayment(mentor.id)}
                        >
                          <DollarSign className="w-4 h-4 mr-1" />
                          Pay
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Mentor Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Mentor Details</DialogTitle>
            <DialogDescription className="text-slate-400">
              Performance and payment information
            </DialogDescription>
          </DialogHeader>
          {selectedMentor && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-xl">
                    {selectedMentor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl text-white">{selectedMentor.name}</h3>
                  <p className="text-slate-400">{selectedMentor.email}</p>
                  <Badge className={
                    selectedMentor.status === 'active' 
                      ? 'bg-green-500/20 text-green-400 border-green-500/30 mt-2'
                      : 'bg-slate-500/20 text-slate-400 border-slate-500/30 mt-2'
                  }>
                    {selectedMentor.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
                  <p className="text-sm text-slate-400 mb-1">Active Students</p>
                  <p className="text-2xl text-white">{selectedMentor.activeStudents}</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
                  <p className="text-sm text-slate-400 mb-1">Completed Sessions</p>
                  <p className="text-2xl text-white">{selectedMentor.completedSessions}</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
                  <p className="text-sm text-slate-400 mb-1">Rating</p>
                  <div className="flex items-center gap-2">
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    <p className="text-2xl text-white">{selectedMentor.rating}</p>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
                  <p className="text-sm text-slate-400 mb-1">Joined Date</p>
                  <p className="text-lg text-white">{new Date(selectedMentor.joinedDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-white">Expertise Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMentor.expertise.map((exp, idx) => (
                    <Badge key={idx} className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                      {exp}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-slate-400">Pending Payment</p>
                    <p className="text-3xl text-green-400">${selectedMentor.pendingPayment.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">Total Earned</p>
                    <p className="text-xl text-white">${selectedMentor.totalEarned.toLocaleString()}</p>
                  </div>
                </div>
                {selectedMentor.pendingPayment > 0 && (
                  <Button 
                    onClick={() => {
                      handleProcessPayment(selectedMentor.id);
                      setIsDetailsOpen(false);
                    }}
                    className="w-full bg-green-500 hover:bg-green-600"
                  >
                    <DollarSign className="w-4 h-4 mr-2" />
                    Process Payment (${selectedMentor.pendingPayment.toLocaleString()})
                  </Button>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleToggleStatus(selectedMentor.id)}
                  variant="outline"
                  className="flex-1 border-slate-700"
                >
                  {selectedMentor.status === 'active' ? (
                    <>
                      <XCircle className="w-4 h-4 mr-2" />
                      Deactivate Mentor
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Activate Mentor
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
