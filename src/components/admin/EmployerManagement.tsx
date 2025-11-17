import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Label } from '../ui/label';
import { 
  Search, 
  Briefcase, 
  Building2, 
  Mail,
  Phone,
  Calendar,
  Eye,
  CheckCircle,
  XCircle,
  Ban,
  Users
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Employer {
  id: string;
  companyName: string;
  email: string;
  industry: string;
  companySize: string;
  contactPerson: string;
  phoneNumber?: string;
  website?: string;
  activeJobs: number;
  totalHires: number;
  status: 'active' | 'inactive' | 'suspended';
  joinedDate: string;
  logo?: string;
}

export function EmployerManagement() {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployer, setSelectedEmployer] = useState<Employer | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Load employers from localStorage
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('ochUsers') || '[]');
    const employerUsers = users.filter((user: any) => user.role === 'employer');
    
    const employerData: Employer[] = employerUsers.map((user: any) => ({
      id: user.id,
      companyName: user.companyName || 'N/A',
      email: user.email,
      industry: user.industry || 'N/A',
      companySize: user.companySize || 'N/A',
      contactPerson: user.fullName || 'N/A',
      phoneNumber: user.phoneNumber,
      website: user.website,
      activeJobs: Math.floor(Math.random() * 10), // Mock data
      totalHires: Math.floor(Math.random() * 20), // Mock data
      status: 'active' as const,
      joinedDate: new Date(parseInt(user.id)).toLocaleDateString(),
      logo: user.logo,
    }));

    setEmployers(employerData);
  }, []);

  const filteredEmployers = employers.filter(employer =>
    employer.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employer.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = (employerId: string, newStatus: 'active' | 'inactive' | 'suspended') => {
    setEmployers(employers.map(emp => 
      emp.id === employerId ? { ...emp, status: newStatus } : emp
    ));
    toast.success(`Employer status updated to ${newStatus}`);
  };

  const viewDetails = (employer: Employer) => {
    setSelectedEmployer(employer);
    setIsDetailsOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'inactive':
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      case 'suspended':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const totalEmployers = employers.length;
  const activeEmployers = employers.filter(e => e.status === 'active').length;
  const totalActiveJobs = employers.reduce((sum, e) => sum + e.activeJobs, 0);
  const totalHires = employers.reduce((sum, e) => sum + e.totalHires, 0);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-1">Total Employers</p>
                <p className="text-2xl text-white">{totalEmployers}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/20">
                <Building2 className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-1">Active Employers</p>
                <p className="text-2xl text-white">{activeEmployers}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/20">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-1">Active Job Postings</p>
                <p className="text-2xl text-white">{totalActiveJobs}</p>
              </div>
              <div className="p-3 rounded-lg bg-cyan-500/20">
                <Briefcase className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-1">Total Hires</p>
                <p className="text-2xl text-white">{totalHires}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/20">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employers Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Employer Directory</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search employers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-900/50 border-slate-700 text-white"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-slate-700 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700 hover:bg-slate-800/50">
                  <TableHead className="text-slate-300">Company</TableHead>
                  <TableHead className="text-slate-300">Contact Person</TableHead>
                  <TableHead className="text-slate-300">Industry</TableHead>
                  <TableHead className="text-slate-300">Company Size</TableHead>
                  <TableHead className="text-slate-300">Active Jobs</TableHead>
                  <TableHead className="text-slate-300">Total Hires</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-slate-400 py-8">
                      No employers found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEmployers.map((employer) => (
                    <TableRow key={employer.id} className="border-slate-700 hover:bg-slate-800/30">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500">
                            <AvatarFallback className="text-white">
                              {employer.companyName.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-white">{employer.companyName}</p>
                            <p className="text-xs text-slate-400">{employer.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300">{employer.contactPerson}</TableCell>
                      <TableCell className="text-slate-300">{employer.industry}</TableCell>
                      <TableCell className="text-slate-300">{employer.companySize}</TableCell>
                      <TableCell className="text-slate-300">{employer.activeJobs}</TableCell>
                      <TableCell className="text-slate-300">{employer.totalHires}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(employer.status)}>
                          {employer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => viewDetails(employer)}
                            className="border-slate-700 text-slate-300 hover:bg-slate-700"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {employer.status === 'active' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusChange(employer.id, 'suspended')}
                              className="border-red-700 text-red-400 hover:bg-red-900/20"
                            >
                              <Ban className="w-4 h-4" />
                            </Button>
                          )}
                          {employer.status === 'suspended' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusChange(employer.id, 'active')}
                              className="border-green-700 text-green-400 hover:bg-green-900/20"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Employer Details</DialogTitle>
            <DialogDescription className="text-slate-400">
              Complete information about the employer
            </DialogDescription>
          </DialogHeader>
          
          {selectedEmployer && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 pb-4 border-b border-slate-700">
                <Avatar className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500">
                  <AvatarFallback className="text-white text-xl">
                    {selectedEmployer.companyName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl text-white">{selectedEmployer.companyName}</h3>
                  <Badge className={getStatusColor(selectedEmployer.status)}>
                    {selectedEmployer.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-400">Contact Person</Label>
                  <p className="text-white mt-1">{selectedEmployer.contactPerson}</p>
                </div>
                <div>
                  <Label className="text-slate-400">Email</Label>
                  <p className="text-white mt-1">{selectedEmployer.email}</p>
                </div>
                <div>
                  <Label className="text-slate-400">Industry</Label>
                  <p className="text-white mt-1">{selectedEmployer.industry}</p>
                </div>
                <div>
                  <Label className="text-slate-400">Company Size</Label>
                  <p className="text-white mt-1">{selectedEmployer.companySize}</p>
                </div>
                {selectedEmployer.website && (
                  <div>
                    <Label className="text-slate-400">Website</Label>
                    <p className="text-white mt-1">{selectedEmployer.website}</p>
                  </div>
                )}
                {selectedEmployer.phoneNumber && (
                  <div>
                    <Label className="text-slate-400">Phone</Label>
                    <p className="text-white mt-1">{selectedEmployer.phoneNumber}</p>
                  </div>
                )}
                <div>
                  <Label className="text-slate-400">Active Jobs</Label>
                  <p className="text-white mt-1">{selectedEmployer.activeJobs}</p>
                </div>
                <div>
                  <Label className="text-slate-400">Total Hires</Label>
                  <p className="text-white mt-1">{selectedEmployer.totalHires}</p>
                </div>
                <div>
                  <Label className="text-slate-400">Joined Date</Label>
                  <p className="text-white mt-1">{selectedEmployer.joinedDate}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-slate-700">
                {selectedEmployer.status === 'active' && (
                  <Button
                    onClick={() => {
                      handleStatusChange(selectedEmployer.id, 'suspended');
                      setIsDetailsOpen(false);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Ban className="w-4 h-4 mr-2" />
                    Suspend Employer
                  </Button>
                )}
                {selectedEmployer.status === 'suspended' && (
                  <Button
                    onClick={() => {
                      handleStatusChange(selectedEmployer.id, 'active');
                      setIsDetailsOpen(false);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Activate Employer
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => setIsDetailsOpen(false)}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
