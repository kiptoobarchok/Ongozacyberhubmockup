import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { LEARNING_TRACKS, TrackId } from '../../lib/constants';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Track {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  modules: number;
  students: number;
  active: boolean;
}

export function TrackManagement() {
  const [tracks, setTracks] = useState<Track[]>([
    { id: 'builders', name: 'Builders Track', description: 'Technical, hands-on cybersecurity operations', color: 'from-blue-500 to-cyan-500', icon: '🔧', modules: 24, students: 112, active: true },
    { id: 'leaders', name: 'Leaders Track', description: 'Management & policy roles', color: 'from-green-500 to-emerald-500', icon: '👔', modules: 18, students: 68, active: true },
    { id: 'entrepreneurs', name: 'Entrepreneurs Track', description: 'Cyber startups & innovation', color: 'from-purple-500 to-pink-500', icon: '🚀', modules: 20, students: 54, active: true },
    { id: 'educators', name: 'Educators Track', description: 'Cyber literacy & training specialization', color: 'from-yellow-500 to-orange-500', icon: '📚', modules: 16, students: 42, active: true },
    { id: 'researchers', name: 'Researchers Track', description: 'Threat analysis & emerging tech R&D', color: 'from-red-500 to-rose-500', icon: '🔬', modules: 22, students: 48, active: true },
  ]);

  const [editingTrack, setEditingTrack] = useState<Track | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTrack, setNewTrack] = useState({
    name: '',
    description: '',
    color: 'from-blue-500 to-cyan-500',
    icon: '📖',
  });

  const handleCreateTrack = () => {
    if (!newTrack.name || !newTrack.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const track: Track = {
      id: newTrack.name.toLowerCase().replace(/\s+/g, '-'),
      name: newTrack.name,
      description: newTrack.description,
      color: newTrack.color,
      icon: newTrack.icon,
      modules: 0,
      students: 0,
      active: true,
    };

    setTracks([...tracks, track]);
    setNewTrack({ name: '', description: '', color: 'from-blue-500 to-cyan-500', icon: '📖' });
    setIsCreateDialogOpen(false);
    toast.success('Track created successfully!');
  };

  const handleUpdateTrack = (track: Track) => {
    setTracks(tracks.map(t => t.id === track.id ? track : t));
    setEditingTrack(null);
    toast.success('Track updated successfully!');
  };

  const handleToggleActive = (trackId: string) => {
    setTracks(tracks.map(t => 
      t.id === trackId ? { ...t, active: !t.active } : t
    ));
    toast.success('Track status updated!');
  };

  const handleDeleteTrack = (trackId: string) => {
    const track = tracks.find(t => t.id === trackId);
    if (track && track.students > 0) {
      toast.error('Cannot delete track with enrolled students');
      return;
    }
    setTracks(tracks.filter(t => t.id !== trackId));
    toast.success('Track deleted successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-white">Track Management</h2>
          <p className="text-slate-400">Create and manage learning tracks</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500">
              <Plus className="w-4 h-4 mr-2" />
              Create Track
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Track</DialogTitle>
              <DialogDescription className="text-slate-400">
                Add a new learning track to the platform
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-slate-300">Track Name *</Label>
                <Input
                  value={newTrack.name}
                  onChange={(e) => setNewTrack({ ...newTrack, name: e.target.value })}
                  className="mt-2 bg-slate-900/50 border-slate-700 text-white"
                  placeholder="Advanced Security Track"
                />
              </div>
              <div>
                <Label className="text-slate-300">Description *</Label>
                <Textarea
                  value={newTrack.description}
                  onChange={(e) => setNewTrack({ ...newTrack, description: e.target.value })}
                  className="mt-2 bg-slate-900/50 border-slate-700 text-white"
                  placeholder="Description of the track..."
                  rows={3}
                />
              </div>
              <div>
                <Label className="text-slate-300">Icon Emoji</Label>
                <Input
                  value={newTrack.icon}
                  onChange={(e) => setNewTrack({ ...newTrack, icon: e.target.value })}
                  className="mt-2 bg-slate-900/50 border-slate-700 text-white"
                  placeholder="📖"
                />
              </div>
              <div>
                <Label className="text-slate-300">Color Gradient</Label>
                <Input
                  value={newTrack.color}
                  onChange={(e) => setNewTrack({ ...newTrack, color: e.target.value })}
                  className="mt-2 bg-slate-900/50 border-slate-700 text-white"
                  placeholder="from-blue-500 to-cyan-500"
                />
              </div>
              <Button onClick={handleCreateTrack} className="w-full bg-gradient-to-r from-cyan-500 to-blue-500">
                Create Track
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tracks.map((track) => (
          <Card key={track.id} className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              {editingTrack?.id === track.id ? (
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-300">Track Name</Label>
                    <Input
                      value={editingTrack.name}
                      onChange={(e) => setEditingTrack({ ...editingTrack, name: e.target.value })}
                      className="mt-2 bg-slate-900/50 border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Description</Label>
                    <Textarea
                      value={editingTrack.description}
                      onChange={(e) => setEditingTrack({ ...editingTrack, description: e.target.value })}
                      className="mt-2 bg-slate-900/50 border-slate-700 text-white"
                      rows={2}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleUpdateTrack(editingTrack)} className="bg-green-500">
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button onClick={() => setEditingTrack(null)} variant="outline" className="border-slate-700">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-lg bg-gradient-to-br ${track.color}`}>
                      <span className="text-3xl">{track.icon}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl text-white">{track.name}</h3>
                        <Badge className={track.active ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-slate-500/20 text-slate-400 border-slate-500/30'}>
                          {track.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <p className="text-slate-400 mb-3">{track.description}</p>
                      <div className="flex gap-4 text-sm">
                        <span className="text-slate-300">{track.modules} Modules</span>
                        <span className="text-slate-300">{track.students} Students</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setEditingTrack(track)}
                      variant="outline"
                      className="border-slate-700"
                      size="sm"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleToggleActive(track.id)}
                      variant="outline"
                      className="border-slate-700"
                      size="sm"
                    >
                      {track.active ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      onClick={() => handleDeleteTrack(track.id)}
                      variant="outline"
                      className="border-red-500 text-red-400 hover:bg-red-500/10"
                      size="sm"
                      disabled={track.students > 0}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
