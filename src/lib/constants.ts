// OCH Learning Tracks
export const LEARNING_TRACKS = {
  builders: {
    id: 'builders',
    name: 'Builders Track',
    description: 'Technical, hands-on cybersecurity operations',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-400',
    icon: '🔧',
  },
  leaders: {
    id: 'leaders',
    name: 'Leaders Track',
    description: 'Management & policy roles',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500',
    textColor: 'text-green-400',
    icon: '👔',
  },
  entrepreneurs: {
    id: 'entrepreneurs',
    name: 'Entrepreneurs Track',
    description: 'Cyber startups & innovation',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500',
    textColor: 'text-purple-400',
    icon: '🚀',
  },
  educators: {
    id: 'educators',
    name: 'Educators Track',
    description: 'Cyber literacy & training specialization',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500',
    textColor: 'text-yellow-400',
    icon: '📚',
  },
  researchers: {
    id: 'researchers',
    name: 'Researchers Track',
    description: 'Threat analysis & emerging tech R&D',
    color: 'from-red-500 to-rose-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500',
    textColor: 'text-red-400',
    icon: '🔬',
  },
} as const;

export type TrackId = keyof typeof LEARNING_TRACKS;

// AI Feature Types
export const AI_FEATURES = {
  TRACK_PREDICTION: 'track_prediction',
  LEARNING_RECOMMENDATION: 'learning_recommendation',
  MENTOR_MATCHING: 'mentor_matching',
  AUTO_GRADING: 'auto_grading',
  SKILL_GAP_ANALYSIS: 'skill_gap_analysis',
  CAREER_MATCHING: 'career_matching',
  CONTENT_SUMMARY: 'content_summary',
  DOCUMENT_VERIFICATION: 'document_verification',
} as const;

// Placement Stages
export const PLACEMENT_STAGES = [
  { id: 'applied', label: 'Applied', color: 'bg-slate-500' },
  { id: 'screening', label: 'Screening', color: 'bg-blue-500' },
  { id: 'interview', label: 'Interview', color: 'bg-purple-500' },
  { id: 'technical', label: 'Technical Round', color: 'bg-cyan-500' },
  { id: 'offer', label: 'Offer', color: 'bg-green-500' },
  { id: 'rejected', label: 'Rejected', color: 'bg-red-500' },
] as const;

// Module Categories
export const MODULE_CATEGORIES = [
  { id: 'fundamentals', label: 'Fundamentals', icon: '📖' },
  { id: 'networks', label: 'Network Security', icon: '🌐' },
  { id: 'cloud', label: 'Cloud Security', icon: '☁️' },
  { id: 'pentesting', label: 'Penetration Testing', icon: '🔓' },
  { id: 'soc', label: 'SOC Operations', icon: '🛡️' },
  { id: 'governance', label: 'Governance & Compliance', icon: '📋' },
  { id: 'threat', label: 'Threat Intelligence', icon: '🎯' },
  { id: 'incident', label: 'Incident Response', icon: '🚨' },
] as const;

// Skills Database
export const SKILLS = [
  // Technical Skills
  'Network Security', 'Penetration Testing', 'Vulnerability Assessment',
  'SOC Operations', 'SIEM Tools', 'Incident Response',
  'Threat Intelligence', 'Malware Analysis', 'Digital Forensics',
  'Cloud Security', 'AWS Security', 'Azure Security',
  'Application Security', 'Web Application Security', 'API Security',
  'Cryptography', 'PKI', 'Identity & Access Management',
  'Security Automation', 'Python Scripting', 'PowerShell',
  // Management & Soft Skills
  'Risk Management', 'Compliance', 'Security Governance',
  'Team Leadership', 'Project Management', 'Communication',
  'Problem Solving', 'Critical Thinking', 'Collaboration',
  // Certifications
  'CISSP', 'CEH', 'CompTIA Security+', 'OSCP', 'CISM',
] as const;
