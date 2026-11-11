import React, { useState } from 'react';
import { 
  AdminRole, 
  Activity, 
  ClassItem, 
  StudentRegistration, 
  DonationCampaign, 
  DonationRecord, 
  DonationReport, 
  NewsArticle, 
  GalleryItem, 
  PartnershipRequest, 
  ContactMessage,
  Department
} from '../types';
import { FOUNDATION_INFO } from '../data/initialData';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BookOpen, 
  Heart, 
  FileText, 
  Image as ImageIcon, 
  Handshake, 
  Mail, 
  Shield, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  Download,
  Clock,
  Edit3
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToSite: () => void;
  departments: Department[];
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  classes: ClassItem[];
  setClasses: React.Dispatch<React.SetStateAction<ClassItem[]>>;
  registrations: StudentRegistration[];
  setRegistrations: React.Dispatch<React.SetStateAction<StudentRegistration[]>>;
  campaigns: DonationCampaign[];
  donationRecords: DonationRecord[];
  setDonationRecords: React.Dispatch<React.SetStateAction<DonationRecord[]>>;
  newsList: NewsArticle[];
  setNewsList: React.Dispatch<React.SetStateAction<NewsArticle[]>>;
  galleryList: GalleryItem[];
  setGalleryList: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
  partnerships: PartnershipRequest[];
  setPartnerships: React.Dispatch<React.SetStateAction<PartnershipRequest[]>>;
  messages: ContactMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ContactMessage[]>>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToSite,
  departments,
  activities,
  setActivities,
  classes,
  registrations,
  setRegistrations,
  campaigns,
  donationRecords,
  setDonationRecords,
  newsList,
  setNewsList,
  galleryList,
  setGalleryList,
  partnerships,
  setPartnerships,
  messages,
  setMessages,
}) => {
  const [currentRole, setCurrentRole] = useState<AdminRole>('Super Admin');
  const [activeMenu, setActiveMenu] = useState<
    'overview' | 'registrations' | 'agenda' | 'donations' | 'news' | 'gallery' | 'partners' | 'messages'
  >('overview');

  // Search in admin tables
  const [searchQuery, setSearchQuery] = useState('');

  // Add Agenda Modal State
  const [newAgendaOpen, setNewAgendaOpen] = useState(false);
  const [agendaTitle, setAgendaTitle] = useState('');
  const [agendaDate, setAgendaDate] = useState('');
  const [agendaTime, setAgendaTime] = useState('');
  const [agendaLocation, setAgendaLocation] = useState('');
  const [agendaDept, setAgendaDept] = useState<'pendidikan' | 'dakwah' | 'sosial' | 'kesehatan' | 'ekonomi'>('dakwah');
  const [agendaPic, setAgendaPic] = useState('');

  // Add News Modal State
  const [newNewsOpen, setNewNewsOpen] = useState(false);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState<NewsArticle['category']>('Yayasan');
  const [newsExcerpt, setNewsExcerpt] = useState('');
  const [newsContent, setNewsContent] = useState('');

  // Totals
  const totalDonationAmount = donationRecords.reduce((acc, d) => acc + d.amount, 0);
  const unreadMessagesCount = messages.filter(m => m.status === 'unread').length;
  const pendingRegsCount = registrations.filter(r => r.status === 'pending').length;

  const handleUpdateRegStatus = (id: string, status: StudentRegistration['status']) => {
    setRegistrations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const handleAddAgenda = (e: React.FormEvent) => {
    e.preventDefault();
    const newAct: Activity = {
      id: `act-${Date.now()}`,
      title: agendaTitle.trim(),
      deptId: agendaDept,
      date: agendaDate,
      time: agendaTime || '19.30 WIB',
      location: agendaLocation.trim() || FOUNDATION_INFO.address,
      pic: agendaPic.trim() || 'Pengurus Yayasan',
      isRoutine: false,
      quota: 100,
      registeredCount: 0,
      description: `Agenda kegiatan ${agendaTitle} yang diselenggarakan oleh YPI Arief Fabrianto.`,
      status: 'upcoming',
    };
    setActivities([newAct, ...activities]);
    setNewAgendaOpen(false);
    setAgendaTitle('');
    setAgendaDate('');
    setAgendaTime('');
    setAgendaLocation('');
  };

  const handleDeleteActivity = (id: string) => {
    if (confirm('Yakin ingin menghapus agenda kegiatan ini?')) {
      setActivities(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleAddNews = (e: React.FormEvent) => {
    e.preventDefault();
    const article: NewsArticle = {
      id: `news-${Date.now()}`,
      title: newsTitle.trim(),
      slug: newsTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: newsCategory,
      author: 'Humas YPI Arief Fabrianto',
      publishedAt: new Date().toISOString().split('T')[0],
      readTime: '3 Menit',
      excerpt: newsExcerpt.trim(),
      content: newsContent.trim(),
      image: '/src/assets/images/hero_islamic_foundation_1794360629011.jpg',
      featured: false,
    };
    setNewsList([article, ...newsList]);
    setNewNewsOpen(false);
    setNewsTitle('');
    setNewsExcerpt('');
    setNewsContent('');
  };

  const handleDeleteNews = (id: string) => {
    if (confirm('Yakin ingin menghapus artikel berita ini?')) {
      setNewsList(prev => prev.filter(n => n.id !== id));
    }
  };

  const handleUpdatePartnerStatus = (id: string, status: PartnershipRequest['status']) => {
    setPartnerships(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  const handleMarkMessageRead = (id: string) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status: 'read' } : m));
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col font-sans">
      
      {/* Admin Top Navigation */}
      <header className="bg-emerald-950 text-white border-b border-emerald-900 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToSite}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-xs font-semibold text-emerald-100 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Website</span>
            </button>

            <div className="h-5 w-px bg-emerald-800 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white p-0.5 flex items-center justify-center shrink-0 shadow-2xs">
                <img
                  src="/assets/aistudio/logo_dan_slogan_ab63ff9c.png"
                  alt="Logo YPI"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-serif font-bold text-sm sm:text-base text-amber-300 block leading-tight">
                  Dashboard CMS Yayasan
                </span>
                <span className="text-[10px] text-emerald-300 font-mono hidden md:inline-block">
                  YPI Arief Fabrianto · Terdaftar Kemenkumham RI
                </span>
              </div>
            </div>
          </div>

          {/* Role Switcher */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-emerald-900/80 px-2.5 py-1.5 rounded-lg border border-emerald-800 text-xs">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-emerald-200 hidden sm:inline-block">Hak Akses:</span>
              <select
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value as AdminRole)}
                className="bg-transparent text-amber-300 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="Super Admin" className="text-stone-900">Super Admin (Arief Fabrianto)</option>
                <option value="Admin Yayasan" className="text-stone-900">Admin Yayasan (Sekretaris)</option>
                <option value="Admin Pendidikan" className="text-stone-900">Admin Pendidikan</option>
                <option value="Admin Dakwah" className="text-stone-900">Admin Dakwah</option>
                <option value="Admin Sosial" className="text-stone-900">Admin Sosial</option>
                <option value="Admin Kesehatan" className="text-stone-900">Admin Kesehatan</option>
                <option value="Admin Ekonomi" className="text-stone-900">Admin Ekonomi</option>
                <option value="Editor" className="text-stone-900">Editor Berita</option>
                <option value="Bendahara" className="text-stone-900">Bendahara (Kas & Donasi)</option>
              </select>
            </div>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-6">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs space-y-1 shrink-0 h-fit">
          <div className="flex items-center gap-3 p-2.5 mb-2 bg-stone-50 rounded-xl border border-stone-200">
            <div className="w-10 h-10 rounded-lg bg-white p-1 border border-stone-200 flex items-center justify-center shrink-0 shadow-2xs">
              <img
                src="/assets/aistudio/logo_dan_slogan_ab63ff9c.png"
                alt="Logo YPI"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="overflow-hidden">
              <h4 className="font-serif font-bold text-xs text-stone-900 truncate">YPI Arief Fabrianto</h4>
              <span className="text-[10px] text-stone-500 block truncate">Menteng Dalam, Tebet</span>
            </div>
          </div>

          <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-stone-400 font-mono">
            Menu Pengelolaan
          </div>

          {[
            { id: 'overview', label: 'Ringkasan Dashboard', icon: LayoutDashboard },
            { id: 'registrations', label: 'Pendaftar Santri', icon: Users, badge: pendingRegsCount },
            { id: 'agenda', label: 'Agenda & Kegiatan', icon: Calendar },
            { id: 'donations', label: 'Donasi & Rekap Kas', icon: DollarSign },
            { id: 'news', label: 'Warta Berita & Artikel', icon: FileText },
            { id: 'gallery', label: 'Dokumentasi Galeri', icon: ImageIcon },
            { id: 'partners', label: 'Permohonan Mitra CSR', icon: Handshake, badge: partnerships.length },
            { id: 'messages', label: 'Pesan Pengunjung', icon: Mail, badge: unreadMessagesCount },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id as any)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-emerald-900 text-amber-300 font-semibold shadow-2xs'
                    : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge ? (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    isActive ? 'bg-amber-400 text-emerald-950' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </aside>

        {/* Content Body */}
        <main className="flex-1 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs overflow-hidden">
          
          {/* TAB: OVERVIEW */}
          {activeMenu === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h2 className="font-serif font-bold text-2xl text-stone-900">
                  Selamat Datang di Panel Pengurus
                </h2>
                <p className="text-xs text-stone-500">
                  Anda login sebagai: <strong className="text-emerald-900 font-semibold">{currentRole}</strong> · YPI Arief Fabrianto
                </p>
              </div>

              {/* KPI Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-1">
                  <span className="text-[11px] text-stone-500 font-medium">Total Infaq Donasi</span>
                  <div className="font-serif font-bold text-xl text-emerald-950 font-mono">
                    Rp {totalDonationAmount.toLocaleString('id-ID')}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-medium">Tercatat di sistem buku kas</span>
                </div>

                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-1">
                  <span className="text-[11px] text-stone-500 font-medium">Pendaftar Kelas Santri</span>
                  <div className="font-serif font-bold text-xl text-stone-900 font-mono">
                    {registrations.length} Siswa
                  </div>
                  <span className="text-[10px] text-amber-700 font-medium">{pendingRegsCount} Menunggu Verifikasi</span>
                </div>

                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-1">
                  <span className="text-[11px] text-stone-500 font-medium">Agenda Terjadwal</span>
                  <div className="font-serif font-bold text-xl text-stone-900 font-mono">
                    {activities.length} Kegiatan
                  </div>
                  <span className="text-[10px] text-stone-500">Rutin & momentum PHBI</span>
                </div>

                <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-1">
                  <span className="text-[11px] text-stone-500 font-medium">Pesan & Kemitraan</span>
                  <div className="font-serif font-bold text-xl text-stone-900 font-mono">
                    {messages.length + partnerships.length} Surat
                  </div>
                  <span className="text-[10px] text-emerald-700 font-medium">{unreadMessagesCount} Belum dibalas</span>
                </div>
              </div>

              {/* Quick Table: Pendaftar Terbaru */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Pendaftaran Santri Terbaru
                  </h3>
                  <button
                    onClick={() => setActiveMenu('registrations')}
                    className="text-xs text-emerald-800 hover:underline font-semibold"
                  >
                    Lihat Semua
                  </button>
                </div>

                <div className="border border-stone-200 rounded-xl overflow-x-auto text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-stone-50 text-stone-500 border-b border-stone-200 font-semibold">
                      <tr>
                        <th className="p-3">No. Registrasi</th>
                        <th className="p-3">Nama Santri</th>
                        <th className="p-3">Kelas Pilihan</th>
                        <th className="p-3">Wali Murid</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {registrations.slice(0, 4).map((r) => (
                        <tr key={r.id} className="hover:bg-stone-50/70">
                          <td className="p-3 font-mono font-medium text-emerald-900">{r.registrationNumber}</td>
                          <td className="p-3 font-semibold text-stone-800">{r.fullName}</td>
                          <td className="p-3 text-stone-600 truncate max-w-[180px]">{r.className}</td>
                          <td className="p-3 text-stone-600">{r.parentName} ({r.phone})</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              r.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                              r.status === 'verified' ? 'bg-blue-100 text-blue-800' :
                              r.status === 'rejected' ? 'bg-red-100 text-red-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {r.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Agenda Teaser */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Agenda Mendatang Terdekat
                  </h3>
                  <button
                    onClick={() => setActiveMenu('agenda')}
                    className="text-xs text-emerald-800 hover:underline font-semibold"
                  >
                    Kelola Agenda
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activities.slice(0, 2).map((a) => (
                    <div key={a.id} className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                      <div className="flex justify-between font-mono text-stone-500 text-[11px]">
                        <span>{a.date}</span>
                        <span>{a.time}</span>
                      </div>
                      <h4 className="font-serif font-bold text-stone-900">{a.title}</h4>
                      <p className="text-stone-500 truncate">{a.location}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: REGISTRATIONS */}
          {activeMenu === 'registrations' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif font-bold text-2xl text-stone-900">
                    Data Pendaftaran Santri / Siswa
                  </h2>
                  <p className="text-xs text-stone-500">
                    Kelola verifikasi calon peserta didik program bimbingan belajar dan tahsin.
                  </p>
                </div>
              </div>

              <div className="border border-stone-200 rounded-xl overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead className="bg-stone-50 text-stone-500 border-b border-stone-200 font-semibold">
                    <tr>
                      <th className="p-3">No. Reg</th>
                      <th className="p-3">Santri</th>
                      <th className="p-3">Kelas</th>
                      <th className="p-3">Kontak Wali</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Aksi Verifikasi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {registrations.map((r) => (
                      <tr key={r.id} className="hover:bg-stone-50/70">
                        <td className="p-3 font-mono font-bold text-emerald-900">{r.registrationNumber}</td>
                        <td className="p-3">
                          <strong className="text-stone-900 block">{r.fullName}</strong>
                          <span className="text-[10px] text-stone-500">Lahir: {r.dateOfBirth}</span>
                        </td>
                        <td className="p-3 text-stone-700">{r.className}</td>
                        <td className="p-3">
                          <div>{r.parentName}</div>
                          <a href={`https://wa.me/${r.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-emerald-800 hover:underline font-mono text-[11px]">
                            {r.phone}
                          </a>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            r.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                            r.status === 'verified' ? 'bg-blue-100 text-blue-800' :
                            r.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="p-3 text-right space-x-1.5">
                          {r.status !== 'accepted' && (
                            <button
                              onClick={() => handleUpdateRegStatus(r.id, 'accepted')}
                              className="px-2 py-1 bg-emerald-800 text-white rounded text-[10px] font-medium hover:bg-emerald-900"
                              title="Terima Siswa"
                            >
                              Terima
                            </button>
                          )}
                          {r.status === 'pending' && (
                            <button
                              onClick={() => handleUpdateRegStatus(r.id, 'verified')}
                              className="px-2 py-1 bg-blue-700 text-white rounded text-[10px] font-medium hover:bg-blue-800"
                              title="Verifikasi Dokumen"
                            >
                              Verifikasi
                            </button>
                          )}
                          {r.status !== 'rejected' && (
                            <button
                              onClick={() => handleUpdateRegStatus(r.id, 'rejected')}
                              className="px-2 py-1 bg-stone-200 text-stone-700 rounded text-[10px] font-medium hover:bg-red-100 hover:text-red-800"
                              title="Tolak"
                            >
                              Tolak
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: AGENDA */}
          {activeMenu === 'agenda' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif font-bold text-2xl text-stone-900">
                    Kelola Jadwal & Agenda Kegiatan
                  </h2>
                  <p className="text-xs text-stone-500">
                    Tambah atau perbarui agenda rutin, tabligh akbar, serta kegiatan P.S. Sin Lam Ba.
                  </p>
                </div>
                <button
                  onClick={() => setNewAgendaOpen(true)}
                  className="px-3.5 py-2 bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Agenda Baru</span>
                </button>
              </div>

              {/* Agenda Form Modal */}
              {newAgendaOpen && (
                <div className="p-5 bg-stone-50 rounded-xl border border-stone-300 space-y-4 text-xs">
                  <h4 className="font-serif font-bold text-sm text-stone-900">
                    Formulir Penambahan Agenda Baru
                  </h4>
                  <form onSubmit={handleAddAgenda} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold block mb-1">Judul Agenda:</label>
                        <input
                          type="text"
                          required
                          placeholder="Cth: Haul Syekh Abdul Qodir Al Jailani"
                          value={agendaTitle}
                          onChange={(e) => setAgendaTitle(e.target.value)}
                          className="w-full p-2 bg-white border border-stone-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="font-semibold block mb-1">Bidang:</label>
                        <select
                          value={agendaDept}
                          onChange={(e) => setAgendaDept(e.target.value as any)}
                          className="w-full p-2 bg-white border border-stone-300 rounded"
                        >
                          <option value="dakwah">Dakwah Keagamaan</option>
                          <option value="sosial">Sosial & Kemasyarakatan</option>
                          <option value="pendidikan">Pendidikan</option>
                          <option value="kesehatan">Kesehatan & Kemanusiaan</option>
                          <option value="ekonomi">Pemberdayaan Ekonomi</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="font-semibold block mb-1">Tanggal Kegiatan:</label>
                        <input
                          type="date"
                          required
                          value={agendaDate}
                          onChange={(e) => setAgendaDate(e.target.value)}
                          className="w-full p-2 bg-white border border-stone-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="font-semibold block mb-1">Waktu / Jam:</label>
                        <input
                          type="text"
                          required
                          placeholder="19.30 - 21.00 WIB"
                          value={agendaTime}
                          onChange={(e) => setAgendaTime(e.target.value)}
                          className="w-full p-2 bg-white border border-stone-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="font-semibold block mb-1">Penanggung Jawab (PIC):</label>
                        <input
                          type="text"
                          required
                          placeholder="Ust. Hamdan / Panitia"
                          value={agendaPic}
                          onChange={(e) => setAgendaPic(e.target.value)}
                          className="w-full p-2 bg-white border border-stone-300 rounded"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold block mb-1">Lokasi Kegiatan:</label>
                      <input
                        type="text"
                        required
                        placeholder="Majelis Utama YPI, Jl. KH Ramli Utara No. 12"
                        value={agendaLocation}
                        onChange={(e) => setAgendaLocation(e.target.value)}
                        className="w-full p-2 bg-white border border-stone-300 rounded"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-emerald-900 text-amber-300 font-semibold rounded text-xs"
                      >
                        Simpan Agenda
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewAgendaOpen(false)}
                        className="px-4 py-2 border border-stone-300 rounded text-stone-600 text-xs"
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Agenda List Table */}
              <div className="border border-stone-200 rounded-xl overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead className="bg-stone-50 text-stone-500 border-b border-stone-200 font-semibold">
                    <tr>
                      <th className="p-3">Nama Agenda</th>
                      <th className="p-3">Bidang</th>
                      <th className="p-3">Jadwal</th>
                      <th className="p-3">Lokasi & PIC</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {activities.map((a) => (
                      <tr key={a.id} className="hover:bg-stone-50/70">
                        <td className="p-3 font-semibold text-stone-900">{a.title}</td>
                        <td className="p-3 text-emerald-800 uppercase font-mono text-[10px]">{a.deptId}</td>
                        <td className="p-3 font-mono">{a.date} · {a.time}</td>
                        <td className="p-3 text-stone-600">{a.location}</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleDeleteActivity(a.id)}
                            className="p-1 text-red-600 hover:text-red-800 rounded"
                            title="Hapus Agenda"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: DONATIONS */}
          {activeMenu === 'donations' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif font-bold text-2xl text-stone-900">
                    Buku Kas Donasi & Transparansi
                  </h2>
                  <p className="text-xs text-stone-500">
                    Catatan aliran infaq, sedekah Jumat, dan santunan yatim terverifikasi.
                  </p>
                </div>
              </div>

              <div className="border border-stone-200 rounded-xl overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead className="bg-stone-50 text-stone-500 border-b border-stone-200 font-semibold">
                    <tr>
                      <th className="p-3">Kode Resi</th>
                      <th className="p-3">Nama Donatur</th>
                      <th className="p-3">Program Tujuan</th>
                      <th className="p-3">Metode</th>
                      <th className="p-3">Nominal (Rp)</th>
                      <th className="p-3">Tanggal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-mono">
                    {donationRecords.map((d) => (
                      <tr key={d.id} className="hover:bg-stone-50/70">
                        <td className="p-3 font-bold text-emerald-900">{d.donationCode}</td>
                        <td className="p-3 font-sans font-semibold text-stone-800">{d.donorName}</td>
                        <td className="p-3 font-sans text-stone-700">{d.campaignTitle}</td>
                        <td className="p-3 text-stone-600">{d.paymentMethod}</td>
                        <td className="p-3 font-bold text-emerald-950">Rp {d.amount.toLocaleString('id-ID')}</td>
                        <td className="p-3 text-stone-500">{d.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: NEWS */}
          {activeMenu === 'news' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif font-bold text-2xl text-stone-900">
                    Kelola Berita & Publikasi Yayasan
                  </h2>
                  <p className="text-xs text-stone-500">
                    Tulis warta kegiatan atau artikel dakwah keislaman.
                  </p>
                </div>
                <button
                  onClick={() => setNewNewsOpen(true)}
                  className="px-3.5 py-2 bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tulis Berita Baru</span>
                </button>
              </div>

              {newNewsOpen && (
                <div className="p-5 bg-stone-50 rounded-xl border border-stone-300 space-y-4 text-xs">
                  <h4 className="font-serif font-bold text-sm text-stone-900">
                    Formulir Artikel Berita Baru
                  </h4>
                  <form onSubmit={handleAddNews} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="font-semibold block mb-1">Judul Berita:</label>
                        <input
                          type="text"
                          required
                          value={newsTitle}
                          onChange={(e) => setNewsTitle(e.target.value)}
                          className="w-full p-2 bg-white border border-stone-300 rounded"
                        />
                      </div>
                      <div>
                        <label className="font-semibold block mb-1">Kategori:</label>
                        <select
                          value={newsCategory}
                          onChange={(e) => setNewsCategory(e.target.value as any)}
                          className="w-full p-2 bg-white border border-stone-300 rounded"
                        >
                          <option value="Yayasan">Yayasan</option>
                          <option value="Pendidikan">Pendidikan</option>
                          <option value="Dakwah">Dakwah</option>
                          <option value="Sosial">Sosial</option>
                          <option value="Kesehatan">Kesehatan</option>
                          <option value="Ekonomi">Ekonomi</option>
                          <option value="P.S. Sin Lam Ba">P.S. Sin Lam Ba</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold block mb-1">Ringkasan / Excerpt:</label>
                      <input
                        type="text"
                        required
                        value={newsExcerpt}
                        onChange={(e) => setNewsExcerpt(e.target.value)}
                        className="w-full p-2 bg-white border border-stone-300 rounded"
                      />
                    </div>

                    <div>
                      <label className="font-semibold block mb-1">Konten Lengkap Berita:</label>
                      <textarea
                        rows={4}
                        required
                        value={newsContent}
                        onChange={(e) => setNewsContent(e.target.value)}
                        className="w-full p-2 bg-white border border-stone-300 rounded resize-none"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-emerald-900 text-amber-300 font-semibold rounded text-xs"
                      >
                        Terbitkan Artikel
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewNewsOpen(false)}
                        className="px-4 py-2 border border-stone-300 rounded text-stone-600 text-xs"
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="space-y-3">
                {newsList.map((n) => (
                  <div key={n.id} className="p-4 border border-stone-200 rounded-xl flex items-center justify-between gap-4 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-emerald-800 font-semibold">{n.category}</span>
                      <h4 className="font-serif font-bold text-sm text-stone-900">{n.title}</h4>
                      <p className="text-stone-500 mt-0.5 line-clamp-1">{n.excerpt}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteNews(n.id)}
                      className="p-1.5 text-stone-400 hover:text-red-700 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PARTNERS */}
          {activeMenu === 'partners' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h2 className="font-serif font-bold text-2xl text-stone-900">
                  Permohonan Kerja Sama & CSR
                </h2>
                <p className="text-xs text-stone-500">
                  Daftar instansi atau korporasi yang mengajukan sinergi program.
                </p>
              </div>

              <div className="space-y-4">
                {partnerships.map((p) => (
                  <div key={p.id} className="p-5 border border-stone-200 rounded-xl space-y-2 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[11px] font-semibold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded">
                          {p.category}
                        </span>
                        <h4 className="font-serif font-bold text-base text-stone-900 mt-1">{p.institutionName}</h4>
                        <span className="text-stone-500">PIC: {p.picName} ({p.phone} / {p.email})</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                        p.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                        p.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {p.status}
                      </span>
                    </div>

                    <p className="text-stone-600 bg-stone-50 p-3 rounded-lg border border-stone-100">
                      {p.proposalSummary}
                    </p>

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => handleUpdatePartnerStatus(p.id, 'reviewed')}
                        className="px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-800 rounded text-[11px] font-medium"
                      >
                        Tandai Ditinjau
                      </button>
                      <button
                        onClick={() => handleUpdatePartnerStatus(p.id, 'approved')}
                        className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded text-[11px] font-medium"
                      >
                        Setujui Kolaborasi
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: MESSAGES */}
          {activeMenu === 'messages' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h2 className="font-serif font-bold text-2xl text-stone-900">
                  Kotak Masuk Pesan Pengunjung
                </h2>
                <p className="text-xs text-stone-500">
                  Pesan dan pertanyaan masyarakat melalui formulir kontak resmi.
                </p>
              </div>

              <div className="space-y-3">
                {messages.map((m) => (
                  <div key={m.id} className={`p-4 rounded-xl border text-xs space-y-2 ${
                    m.status === 'unread' ? 'bg-amber-50/40 border-amber-200' : 'bg-white border-stone-200'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <strong className="text-stone-900 block">{m.name}</strong>
                        <span className="text-[11px] text-stone-500 font-mono">{m.email} · {m.phone}</span>
                      </div>
                      <span className="font-mono text-[10px] text-stone-400">{m.sentAt}</span>
                    </div>
                    <div className="font-semibold text-emerald-950">{m.subject}</div>
                    <p className="text-stone-600 leading-relaxed bg-white p-3 rounded-lg border border-stone-200/70">
                      {m.message}
                    </p>
                    {m.status === 'unread' && (
                      <button
                        onClick={() => handleMarkMessageRead(m.id)}
                        className="text-[11px] text-emerald-800 font-semibold hover:underline"
                      >
                        Tandai Sudah Dibaca
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: GALLERY */}
          {activeMenu === 'gallery' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h2 className="font-serif font-bold text-2xl text-stone-900">
                  Pengelolaan Galeri Foto & Video
                </h2>
                <p className="text-xs text-stone-500">
                  Arsip dokumentasi kegiatan yayasan, kelas belajar, dan bela diri Sin Lam Ba.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                {galleryList.map((g) => (
                  <div key={g.id} className="border border-stone-200 rounded-xl overflow-hidden bg-stone-50 space-y-1 p-2">
                    <img src={g.imageUrl} alt={g.title} className="h-28 w-full object-cover rounded" />
                    <span className="font-semibold block truncate pt-1">{g.title}</span>
                    <span className="text-[10px] text-stone-400 block">{g.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
