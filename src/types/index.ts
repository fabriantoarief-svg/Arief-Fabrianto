export type ActiveTab = 
  | 'beranda'
  | 'tentang'
  | 'bidang'
  | 'agenda'
  | 'pendidikan'
  | 'donasi'
  | 'berita'
  | 'kemitraan'
  | 'kontak'
  | 'admin';

export type DepartmentKey = 'pendidikan' | 'dakwah' | 'sosial' | 'kesehatan' | 'ekonomi';

export interface Department {
  id: DepartmentKey;
  title: string;
  arabicName: string;
  tagline: string;
  description: string;
  iconName: string;
  color: string;
  programsCount: number;
  programs: ProgramItem[];
}

export interface ProgramItem {
  id: string;
  deptId: DepartmentKey;
  name: string;
  category: string;
  schedule?: string;
  audience: string;
  description: string;
  highlight?: boolean;
}

export interface Activity {
  id: string;
  title: string;
  deptId: DepartmentKey;
  date: string; // ISO date YYYY-MM-DD
  time: string;
  location: string;
  pic: string;
  isRoutine: boolean;
  frequency?: string;
  quota?: number;
  registeredCount: number;
  description: string;
  hijriNote?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface ClassItem {
  id: string;
  code: string;
  title: string;
  category: 'formal' | 'diniyah' | 'keterampilan';
  instructor: string;
  schedule: string;
  duration: string;
  fee: 'Gratis (Binaan)' | 'Infaq Sukarela' | string;
  targetLevel: string;
  capacity: number;
  enrolled: number;
  description: string;
  syllabus: string[];
}

export interface StudentRegistration {
  id: string;
  registrationNumber: string;
  fullName: string;
  parentName: string;
  phone: string;
  email: string;
  address: string;
  classId: string;
  className: string;
  dateOfBirth: string;
  notes?: string;
  registeredAt: string;
  status: 'pending' | 'verified' | 'accepted' | 'rejected';
}

export interface DonationCampaign {
  id: string;
  title: string;
  category: 'sosial' | 'pendidikan' | 'dakwah' | 'kemanusiaan';
  targetAmount: number;
  collectedAmount: number;
  donorsCount: number;
  deadline?: string;
  urgent?: boolean;
  description: string;
  image?: string;
}

export interface DonationRecord {
  id: string;
  donationCode: string;
  donorName: string;
  isAnonymous: boolean;
  donorPhone: string;
  donorEmail?: string;
  campaignId: string;
  campaignTitle: string;
  amount: number;
  paymentMethod: 'BSI' | 'BCA' | 'Mandiri' | 'QRIS' | 'Tunai';
  doaHarapan?: string;
  date: string;
  status: 'confirmed' | 'pending';
}

export interface DonationReport {
  id: string;
  period: string;
  program: string;
  totalDistributed: number;
  beneficiariesCount: number;
  beneficiariesTarget: string;
  date: string;
  documentationUrl?: string;
  description: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Yayasan' | 'Pendidikan' | 'Dakwah' | 'Sosial' | 'Kesehatan' | 'Ekonomi' | 'P.S. Sin Lam Ba';
  author: string;
  publishedAt: string;
  readTime: string;
  excerpt: string;
  content: string;
  image: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: DepartmentKey | 'sinlamba' | 'umum';
  type: 'photo' | 'video';
  date: string;
  location: string;
  imageUrl: string;
  description: string;
}

export interface PartnershipRequest {
  id: string;
  institutionName: string;
  picName: string;
  email: string;
  phone: string;
  category: 'CSR Perusahaan' | 'Kerja Sama Pendidikan' | 'Kerja Sama Dakwah' | 'Dukungan Sosial & Kemanusiaan' | 'Kesehatan' | 'UMKM' | 'Olahraga & Karakter (Sin Lam Ba)';
  proposalSummary: string;
  submittedAt: string;
  status: 'new' | 'reviewed' | 'in_discussion' | 'approved';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  sentAt: string;
  status: 'unread' | 'read' | 'replied';
}

export type AdminRole = 
  | 'Super Admin'
  | 'Admin Yayasan'
  | 'Admin Pendidikan'
  | 'Admin Dakwah'
  | 'Admin Sosial'
  | 'Admin Kesehatan'
  | 'Admin Ekonomi'
  | 'Editor'
  | 'Bendahara';
