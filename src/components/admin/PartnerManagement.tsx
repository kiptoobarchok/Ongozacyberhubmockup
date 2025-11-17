import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Upload,
  Building2,
  ExternalLink,
  Eye,
  Image as ImageIcon
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Partner {
  id: string;
  name: string;
  description: string;
  logo: string;
  website?: string;
  type: 'support' | 'technology' | 'education' | 'funding' | 'other';
  status: 'active' | 'inactive';
  addedDate: string;
}

export function PartnerManagement() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    logo: '',
    website: '',
    type: 'support' as Partner['type'],
    status: 'active' as Partner['status'],
  });

  // Load partners from localStorage
  useEffect(() => {
    const storedPartners = localStorage.getItem('ochPartners');
    if (storedPartners) {
      setPartners(JSON.parse(storedPartners));
    } else {
      // Initialize with sample partners
      const samplePartners: Partner[] = [
        {
          id: '1',
          name: 'Microsoft',
          description: 'Cloud technology and enterprise solutions partner',
          logo: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=200&h=200&fit=crop',
          website: 'https://microsoft.com',
          type: 'technology',
          status: 'active',
          addedDate: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'AWS',
          description: 'Cloud computing and infrastructure partner',
          logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=200&h=200&fit=crop',
          website: 'https://aws.amazon.com',
          type: 'technology',
          status: 'active',
          addedDate: new Date().toISOString(),
        },
        {
          id: '3',
          name: 'Coursera',
          description: 'Online learning and certification platform partner',
          logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=200&fit=crop',
          website: 'https://coursera.org',
          type: 'education',
          status: 'active',
          addedDate: new Date().toISOString(),
        },
      ];
      setPartners(samplePartners);
      localStorage.setItem('ochPartners', JSON.stringify(samplePartners));
    }
  }, []);

  // Save partners to localStorage
  const savePartners = (updatedPartners: Partner[]) => {
    setPartners(updatedPartners);
    localStorage.setItem('ochPartners', JSON.stringify(updatedPartners));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setFormData({ ...formData, logo: result });
        setPreviewImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPartner = () => {
    if (!formData.name || !formData.description || !formData.logo) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newPartner: Partner = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      logo: formData.logo,
      website: formData.website,
      type: formData.type,
      status: formData.status,
      addedDate: new Date().toISOString(),
    };

    const updatedPartners = [...partners, newPartner];
    savePartners(updatedPartners);
    
    toast.success('Partner added successfully!');
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEditPartner = () => {
    if (!selectedPartner || !formData.name || !formData.description || !formData.logo) {
      toast.error('Please fill in all required fields');
      return;
    }

    const updatedPartners = partners.map(p =>
      p.id === selectedPartner.id
        ? {
            ...p,
            name: formData.name,
            description: formData.description,
            logo: formData.logo,
            website: formData.website,
            type: formData.type,
            status: formData.status,
          }
        : p
    );

    savePartners(updatedPartners);
    toast.success('Partner updated successfully!');
    setIsEditDialogOpen(false);
    resetForm();
  };

  const handleDeletePartner = (partnerId: string) => {
    if (confirm('Are you sure you want to delete this partner?')) {
      const updatedPartners = partners.filter(p => p.id !== partnerId);
      savePartners(updatedPartners);
      toast.success('Partner deleted successfully!');
    }
  };

  const openEditDialog = (partner: Partner) => {
    setSelectedPartner(partner);
    setFormData({
      name: partner.name,
      description: partner.description,
      logo: partner.logo,
      website: partner.website || '',
      type: partner.type,
      status: partner.status,
    });
    setPreviewImage(partner.logo);
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      logo: '',
      website: '',
      type: 'support',
      status: 'active',
    });
    setPreviewImage('');
    setSelectedPartner(null);
  };

  const openAddDialog = () => {
    resetForm();
    setIsAddDialogOpen(true);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'technology':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'education':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'support':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'funding':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const activePartners = partners.filter(p => p.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-1">Total Partners</p>
                <p className="text-2xl text-white">{partners.length}</p>
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
                <p className="text-sm text-slate-400 mb-1">Active Partners</p>
                <p className="text-2xl text-white">{activePartners}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/20">
                <Eye className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-1">Partner Types</p>
                <p className="text-2xl text-white">{new Set(partners.map(p => p.type)).size}</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/20">
                <ImageIcon className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Partners Grid */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Partner Directory</CardTitle>
              <CardDescription className="text-slate-400 mt-1">
                Manage partner companies displayed on the platform
              </CardDescription>
            </div>
            <Button
              onClick={openAddDialog}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Partner
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {partners.length === 0 ? (
            <div className="text-center py-12">
              <Building2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 mb-4">No partners added yet</p>
              <Button
                onClick={openAddDialog}
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Add Your First Partner
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {partners.map((partner) => (
                <Card key={partner.id} className="bg-slate-900/50 border-slate-700 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 rounded-lg bg-slate-800 flex items-center justify-center overflow-hidden">
                        {partner.logo ? (
                          <img src={partner.logo} alt={partner.name} className="w-full h-full object-cover" />
                        ) : (
                          <Building2 className="w-8 h-8 text-slate-600" />
                        )}
                      </div>
                      <Badge className={partner.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-slate-500/20 text-slate-400 border-slate-500/30'}>
                        {partner.status}
                      </Badge>
                    </div>

                    <h3 className="text-white mb-2">{partner.name}</h3>
                    <p className="text-sm text-slate-400 mb-4 line-clamp-2">{partner.description}</p>

                    <div className="flex items-center gap-2 mb-4">
                      <Badge className={getTypeColor(partner.type)}>
                        {partner.type}
                      </Badge>
                      {partner.website && (
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openEditDialog(partner)}
                        className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeletePartner(partner.id)}
                        className="border-red-700 text-red-400 hover:bg-red-900/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Partner Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Add New Partner</DialogTitle>
            <DialogDescription className="text-slate-400">
              Add a new partner to be displayed on the platform
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-slate-300">Partner Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Company Name"
                className="mt-2 bg-slate-900/50 border-slate-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-slate-300">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the partnership"
                className="mt-2 bg-slate-900/50 border-slate-700 text-white"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="website" className="text-slate-300">Website (Optional)</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://example.com"
                className="mt-2 bg-slate-900/50 border-slate-700 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type" className="text-slate-300">Partner Type *</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Partner['type'] })}
                  className="mt-2 w-full bg-slate-900/50 border border-slate-700 text-white rounded-md px-3 py-2"
                >
                  <option value="support">Support</option>
                  <option value="technology">Technology</option>
                  <option value="education">Education</option>
                  <option value="funding">Funding</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <Label htmlFor="status" className="text-slate-300">Status *</Label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Partner['status'] })}
                  className="mt-2 w-full bg-slate-900/50 border border-slate-700 text-white rounded-md px-3 py-2"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="logo" className="text-slate-300">Partner Logo *</Label>
              <div className="mt-2 border-2 border-dashed border-slate-700 rounded-lg p-6 text-center hover:border-cyan-500 transition-colors">
                <input
                  type="file"
                  id="logo-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <label htmlFor="logo-upload" className="cursor-pointer">
                  {previewImage ? (
                    <div className="space-y-4">
                      <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover mx-auto rounded-lg" />
                      <p className="text-sm text-slate-400">Click to change logo</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                      <p className="text-slate-400 mb-1">Click to upload logo</p>
                      <p className="text-xs text-slate-500">PNG, JPG or SVG (Max 2MB)</p>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-slate-700">
              <Button
                onClick={handleAddPartner}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
              >
                Add Partner
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddDialogOpen(false);
                  resetForm();
                }}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Partner Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Partner</DialogTitle>
            <DialogDescription className="text-slate-400">
              Update partner information
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name" className="text-slate-300">Partner Name *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Company Name"
                className="mt-2 bg-slate-900/50 border-slate-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="edit-description" className="text-slate-300">Description *</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the partnership"
                className="mt-2 bg-slate-900/50 border-slate-700 text-white"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="edit-website" className="text-slate-300">Website (Optional)</Label>
              <Input
                id="edit-website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://example.com"
                className="mt-2 bg-slate-900/50 border-slate-700 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-type" className="text-slate-300">Partner Type *</Label>
                <select
                  id="edit-type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as Partner['type'] })}
                  className="mt-2 w-full bg-slate-900/50 border border-slate-700 text-white rounded-md px-3 py-2"
                >
                  <option value="support">Support</option>
                  <option value="technology">Technology</option>
                  <option value="education">Education</option>
                  <option value="funding">Funding</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <Label htmlFor="edit-status" className="text-slate-300">Status *</Label>
                <select
                  id="edit-status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Partner['status'] })}
                  className="mt-2 w-full bg-slate-900/50 border border-slate-700 text-white rounded-md px-3 py-2"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="edit-logo" className="text-slate-300">Partner Logo *</Label>
              <div className="mt-2 border-2 border-dashed border-slate-700 rounded-lg p-6 text-center hover:border-cyan-500 transition-colors">
                <input
                  type="file"
                  id="edit-logo-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <label htmlFor="edit-logo-upload" className="cursor-pointer">
                  {previewImage ? (
                    <div className="space-y-4">
                      <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover mx-auto rounded-lg" />
                      <p className="text-sm text-slate-400">Click to change logo</p>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                      <p className="text-slate-400 mb-1">Click to upload logo</p>
                      <p className="text-xs text-slate-500">PNG, JPG or SVG (Max 2MB)</p>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-slate-700">
              <Button
                onClick={handleEditPartner}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
              >
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  resetForm();
                }}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
