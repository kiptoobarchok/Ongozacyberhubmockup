import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { TrackBadge } from '../shared/TrackBadge';
import { Plus, Users, Calendar, TrendingUp, Eye } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Cohort {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  students: number;
  avgProgress: number;
  status: 'upcoming' | 'active' | 'completed';
  trackDistribution: Record<string, number>;
}

export function CohortManagement() {
  const [cohorts, setCohorts] = useState<Cohort[]>([
    {
      id: '1',
      name: 'Cohort 5 - Fall 2024',
      startDate: '2024-09-01',
      endDate: '2024-12-15',
      students: 67,
      avgProgress: 78,
      status: 'active',
      trackDistribution: {
        builders: 24,
        leaders: 15,
        entrepreneurs: 12,
        educators: 8,
        researchers: 8,
      },
    },
    {
      id: '2',
      name: 'Cohort 6 - Winter 2025',
      startDate: '2025-01-10',
      endDate: '2025-04-25',
      students: 85,
      avgProgress: 0,
      status: 'upcoming',
      trackDistribution: {
        builders: 30,
        leaders: 20,
        entrepreneurs: 15,
        educators: 10,
        researchers: 10,
      },
    },
    {
      id: '3',
      name: 'Cohort 4 - Summer 2024',
      startDate: '2024-06-01',
      endDate: '2024-08-30',
      students: 58,
      avgProgress: 100,
      status: 'completed',
      trackDistribution: {
        builders: 20,
        leaders: 13,
        entrepreneurs: 10,
        educators: 8,
        researchers: 7,
      },
    },
  ]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState<Cohort | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [newCohort, setNewCohort] = useState({
    name: '',
    startDate: '',
    endDate: '',
  });

  const handleCreateCohort = () => {
    if (!newCohort.name || !newCohort.startDate || !newCohort.endDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const cohort: Cohort = {
      id: Date.now().toString(),
      name: newCohort.name,
      startDate: newCohort.startDate,
      endDate: newCohort.endDate,
      students: 0,
      avgProgress: 0,
      status: 'upcoming',
      trackDistribution: {
        builders: 0,
        leaders: 0,
        entrepreneurs: 0,
        educators: 0,
        researchers: 0,
      },
    };

    setCohorts([...cohorts, cohort]);
    setNewCohort({ name: '', startDate: '', endDate: '' });
    setIsCreateDialogOpen(false);
    toast.success('Cohort created successfully!');
  };

  const activeCohort = cohorts.find(c => c.status === 'active');
  const totalStudents = cohorts.reduce((sum, c) => sum + c.students, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-white mb-2">Cohort Management</h2>
          <p className="text-slate-400">Organize and track student cohorts</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500">
              <Plus className="w-4 h-4 mr-2" />
              Create Cohort
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Cohort</DialogTitle>
              <DialogDescription className="text-slate-400">
                Set up a new student cohort
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-slate-300">Cohort Name *</Label>
                <Input
                  value={newCohort.name}
                  onChange={(e) => setNewCohort({ ...newCohort, name: e.target.value })}
                  className="mt-2 bg-slate-900/50 border-slate-700 text-white"
                  placeholder="Cohort 7 - Spring 2025"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Start Date *</Label>
                  <Input
                    type="date"
                    value={newCohort.startDate}
                    onChange={(e) => setNewCohort({ ...newCohort, startDate: e.target.value })}
                    className="mt-2 bg-slate-900/50 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">End Date *</Label>
                  <Input
                    type="date"
                    value={newCohort.endDate}
                    onChange={(e) => setNewCohort({ ...newCohort, endDate: e.target.value })}
                    className="mt-2 bg-slate-900/50 border-slate-700 text-white"
                  />
                </div>
              </div>
              <Button onClick={handleCreateCohort} className="w-full bg-gradient-to-r from-cyan-500 to-blue-500">
                Create Cohort
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Students</p>
                <p className="text-2xl text-white">{totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Active Cohorts</p>
                <p className="text-2xl text-white">{cohorts.filter(c => c.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Avg. Progress</p>
                <p className="text-2xl text-white">{activeCohort ? activeCohort.avgProgress : 0}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cohorts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cohorts.map((cohort) => (
          <Card key={cohort.id} className="bg-slate-800/50 border-slate-700 hover:border-cyan-500 transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-white text-lg mb-2">{cohort.name}</CardTitle>
                  <Badge className={
                    cohort.status === 'active'
                      ? 'bg-green-500/20 text-green-400 border-green-500/30'
                      : cohort.status === 'upcoming'
                      ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      : 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                  }>
                    {cohort.status}
                  </Badge>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-slate-700"
                  onClick={() => {
                    setSelectedCohort(cohort);
                    setIsDetailsOpen(true);
                  }}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Calendar className="w-4 h-4" />
                <span>{new Date(cohort.startDate).toLocaleDateString()} - {new Date(cohort.endDate).toLocaleDateString()}</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Students</span>
                  <span className="text-white">{cohort.students}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Avg. Progress</span>
                  <span className="text-cyan-400">{cohort.avgProgress}%</span>
                </div>
                <Progress value={cohort.avgProgress} className="h-2" />
              </div>

              <div>
                <p className="text-xs text-slate-400 mb-2">Track Distribution</p>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(cohort.trackDistribution).map(([track, count]) => (
                    count > 0 && (
                      <Badge key={track} variant="outline" className="text-xs border-slate-600 text-slate-300">
                        {track}: {count}
                      </Badge>
                    )
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cohort Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-white">Cohort Details</DialogTitle>
            <DialogDescription className="text-slate-400">
              Detailed information and analytics
            </DialogDescription>
          </DialogHeader>
          {selectedCohort && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl text-white mb-2">{selectedCohort.name}</h3>
                <Badge className={
                  selectedCohort.status === 'active'
                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                    : selectedCohort.status === 'upcoming'
                    ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    : 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                }>
                  {selectedCohort.status}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
                  <p className="text-sm text-slate-400 mb-1">Total Students</p>
                  <p className="text-2xl text-white">{selectedCohort.students}</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
                  <p className="text-sm text-slate-400 mb-1">Avg. Progress</p>
                  <p className="text-2xl text-white">{selectedCohort.avgProgress}%</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-700">
                  <p className="text-sm text-slate-400 mb-1">Duration</p>
                  <p className="text-lg text-white">
                    {Math.ceil((new Date(selectedCohort.endDate).getTime() - new Date(selectedCohort.startDate).getTime()) / (1000 * 60 * 60 * 24 * 7))} weeks
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-white mb-3">Track Distribution</h4>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={Object.entries(selectedCohort.trackDistribution).map(([track, count]) => ({
                    track: track.charAt(0).toUpperCase() + track.slice(1),
                    students: count,
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="track" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                    />
                    <Bar dataKey="students" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center gap-2 p-4 rounded-lg bg-slate-900/50 border border-slate-700">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-sm text-slate-400">Duration</p>
                  <p className="text-white">
                    {new Date(selectedCohort.startDate).toLocaleDateString()} - {new Date(selectedCohort.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500">
                  View Students
                </Button>
                <Button variant="outline" className="flex-1 border-slate-700">
                  Export Report
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
