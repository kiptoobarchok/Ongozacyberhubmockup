import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { DashboardOverview } from '../DashboardOverview';
import { TrackManagement } from './TrackManagement';
import { MentorManagement } from './MentorManagement';
import { CohortManagement } from './CohortManagement';
import { EmployerManagement } from './EmployerManagement';
import { PartnerManagement } from './PartnerManagement';
import {
  LayoutDashboard,
  Route,
  Users,
  GraduationCap,
  Briefcase,
  Handshake,
  Settings,
} from 'lucide-react';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl text-white mb-2">Admin Control Panel</h1>
        <p className="text-slate-400">Manage all aspects of the OCH platform</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-7 bg-slate-800/50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-slate-700">
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="tracks" className="data-[state=active]:bg-slate-700">
            <Route className="w-4 h-4 mr-2" />
            Tracks
          </TabsTrigger>
          <TabsTrigger value="mentors" className="data-[state=active]:bg-slate-700">
            <Users className="w-4 h-4 mr-2" />
            Mentors
          </TabsTrigger>
          <TabsTrigger value="cohorts" className="data-[state=active]:bg-slate-700">
            <GraduationCap className="w-4 h-4 mr-2" />
            Cohorts
          </TabsTrigger>
          <TabsTrigger value="employers" className="data-[state=active]:bg-slate-700">
            <Briefcase className="w-4 h-4 mr-2" />
            Employers
          </TabsTrigger>
          <TabsTrigger value="partners" className="data-[state=active]:bg-slate-700">
            <Handshake className="w-4 h-4 mr-2" />
            Partners
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-slate-700">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <DashboardOverview role="admin" />
        </TabsContent>

        <TabsContent value="tracks" className="mt-6">
          <TrackManagement />
        </TabsContent>

        <TabsContent value="mentors" className="mt-6">
          <MentorManagement />
        </TabsContent>

        <TabsContent value="cohorts" className="mt-6">
          <CohortManagement />
        </TabsContent>

        <TabsContent value="employers" className="mt-6">
          <EmployerManagement />
        </TabsContent>

        <TabsContent value="partners" className="mt-6">
          <PartnerManagement />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <div className="text-white">Platform Settings (Coming Soon)</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
