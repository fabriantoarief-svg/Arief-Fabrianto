import React from 'react';
import { ActiveTab, Department, Activity, NewsArticle, GalleryItem, DonationCampaign } from '../types';
import { FOUNDATION_INFO } from '../data/initialData';
import { 
  ArrowRight, 
  GraduationCap, 
  BookOpen, 
  HeartHandshake, 
  Activity as ActivityIcon, 
  ShoppingBag, 
  Calendar, 
  MapPin, 
  Users, 
  Heart, 
  ChevronRight,
  Sparkles,
  Building,
  Quote
} from 'lucide-react';

interface HomeSectionProps {
  departments: Department[];
  activities: Activity[];
  newsList: NewsArticle[];
  galleryList: GalleryItem[];
  campaigns: DonationCampaign[];
  setActiveTab: (tab: ActiveTab) => void;
  onOpenQuickDonate: () => void;
  onSelectDepartment: (deptId: string) => void;
  onSelectNews: (news: NewsArticle) => void;
  onOpenActivityRegister: (activity: Activity) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  departments,
  activities,
  newsList,
  galleryList,
  campaigns,
  setActiveTab,
  onOpenQuickDonate,
  onSelectDepartment,
  onSelectNews,
  onOpenActivityRegister,
}) => {
  const getDeptIcon = (id: string) => {
    switch (id) {
      case 'pendidikan': return <GraduationCap className="w-5 h-5" />;
      case 'dakwah': return <BookOpen className="w-5 h-5" />;
      case 'sosial': return <HeartHandshake className="w-5 h-5" />;
      case 'kesehatan': return <ActivityIcon className="w-5 h-5" />;
      case 'ekonomi': return <ShoppingBag className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const upcomingActivities = activities.slice(0, 3);
  const featuredNews = newsList.slice(0, 3);

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-emerald-950 text-white min-h-[580px] lg:min-h-[660px] flex items-center">
        {/* Background Image with Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_islamic_foundation_1794360629011.jpg"
            alt="Suasana Ruang Belajar YPI Arief Fabrianto"
            className="w-full h-full object-cover object-center scale-102 filter brightness-65 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent opacity-90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Tagline / Subtitle with Official Logo */}
              <div className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-widest text-amber-300 bg-emerald-900/80 border border-emerald-700/60 pl-2 pr-3.5 py-1.5 rounded-full backdrop-blur-xs">
                <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center p-0.5 overflow-hidden shrink-0">
                  <img
                    src="/assets/aistudio/logo_dan_slogan_ab63ff9c.png"
                    alt="Logo YPI"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span>Yayasan Pendidikan Islam Arief Fabrianto</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight sm:leading-none text-balance">
                Bertumbuh Bersama <br />
                <span className="text-amber-400 italic">Generasi Islami Mandiri</span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-emerald-100/90 leading-relaxed font-light max-w-2xl">
                Pusat pendidikan terpadu, dakwah keislaman, pelayanan masyarakat, dan pemberdayaan ekonomi umat di Menteng Dalam, Tebet, Jakarta Selatan. Berlandaskan amanah, kepedulian sosial, dan kemandirian berkah.
              </p>

              {/* 4 Main Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => setActiveTab('tentang')}
                  className="px-5 py-3 text-xs sm:text-sm font-semibold text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Kenali Yayasan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActiveTab('bidang')}
                  className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-emerald-900/90 hover:bg-emerald-800 border border-emerald-700 rounded-lg shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Lihat Program</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenQuickDonate}
                  className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white/80" />
                  <span>Dukung Kegiatan Kami</span>
                </button>

                <button
                  onClick={() => setActiveTab('donasi')}
                  className="px-4 py-3 text-xs sm:text-sm font-medium text-emerald-200 hover:text-white underline transition-colors cursor-pointer"
                >
                  Bergabung Relawan
                </button>
              </div>
            </div>

            {/* Right Emblem Showcase Card */}
            <div className="hidden lg:flex lg:col-span-4 items-center justify-center">
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl text-center group hover:scale-102 transition-transform duration-300 w-full max-w-xs">
                <div className="w-52 h-52 mx-auto flex items-center justify-center p-3 rounded-2xl bg-white shadow-xl border border-amber-400/40">
                  <img
                    src="/assets/aistudio/logo_dan_slogan_ab63ff9c.png"
                    alt="Logo Resmi Yayasan Pendidikan Islam Arief Fabrianto"
                    className="w-full h-full object-contain filter drop-shadow-md"
                  />
                </div>
                <div className="mt-4 space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-semibold block">
                    Logo & Lambang Resmi
                  </span>
                  <h3 className="font-serif font-bold text-base text-white">
                    YPI Arief Fabrianto
                  </h3>
                  <p className="text-xs text-emerald-200/90 italic font-serif">
                    "Bertumbuh Bersama Generasi Islami Mandiri"
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Operational Strip */}
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-emerald-900/60 bg-emerald-950/80 backdrop-blur-md hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
            <div className="grid grid-cols-4 gap-4 text-xs text-emerald-200 divide-x divide-emerald-800/60">
              <div className="pl-3 first:pl-0 flex items-center gap-2">
                <Building className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">Legalitas: {FOUNDATION_INFO.legalDoc}</span>
              </div>
              <div className="pl-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>5 Pilar Bidang Khidmat Ummat</span>
              </div>
              <div className="pl-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400 shrink-0" />
                <span>250+ Porsi Jumat Berkah Tiap Pekan</span>
              </div>
              <div className="pl-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="truncate">Menteng Dalam, Tebet, Jaksel</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sambutan Ketua Yayasan & Profil Singkat */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Visual / Portrait Column */}
            <div className="lg:col-span-5 bg-stone-100 relative min-h-[320px] lg:min-h-full">
              <img
                src="/src/assets/images/hero_islamic_foundation_1794360629011.jpg"
                alt="Pusat Kegiatan YPI Arief Fabrianto"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/85 via-emerald-950/20 to-transparent" />
              
              {/* Official Logo Seal */}
              <div className="absolute top-4 left-4 z-10 w-12 h-12 rounded-xl bg-white/95 backdrop-blur-xs p-1 shadow-md border border-stone-200">
                <img
                  src="/assets/aistudio/logo_dan_slogan_ab63ff9c.png"
                  alt="Lambang YPI Arief Fabrianto"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold block">
                  Ketua Umum Yayasan
                </span>
                <h3 className="font-serif text-2xl font-bold mt-0.5">{FOUNDATION_INFO.leader}</h3>
                <p className="text-xs text-stone-200 font-light mt-1">
                  YPI Arief Fabrianto · Berdiri Sejak {FOUNDATION_INFO.foundedYear}
                </p>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                  <Quote className="w-4 h-4 text-amber-600 rotate-180" />
                  <span>Sambutan & Amanah Kelembagaan</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
                  Menebar Manfaat Nyata, Membangun Generasi Saleh dan Mandiri
                </h2>

                <div className="text-stone-600 text-sm leading-relaxed space-y-3">
                  <p>
                    Bismillahirrahmannirrahim. Yayasan Pendidikan Islam Arief Fabrianto didirikan atas dasar kesadaran luhur akan pentingnya peran pendidikan terpadu dan aksi sosial nyata bagi umat. Kami meyakini bahwa generasi Islam yang kokoh adalah generasi yang seimbang antara kecerdasan intelektual, kedalaman akhlak, kesehatan raga, dan kemandirian ekonomi.
                  </p>
                  <p>
                    Melalui 5 bidang khidmat kami—Pendidikan, Dakwah, Pelayanan Sosial, Kesehatan & Kemanusiaan, serta Pemberdayaan Ekonomi—kami bertekad mengelola setiap amanah donasi dan kebaikan para muhsinin secara transparan, profesional, dan akuntabel.
                  </p>
                </div>

                <blockquote className="border-y border-stone-200 py-3.5 my-4">
                  <p className="font-serif italic text-base text-emerald-950 font-medium">
                    "خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ — Sebaik-baik manusia adalah yang paling bermanfaat bagi sesama manusia."
                  </p>
                </blockquote>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-stone-100">
                <div className="text-xs text-stone-500">
                  <span className="font-semibold text-stone-700 block">Surat Keputusan Kemenkumham RI</span>
                  <span className="font-mono text-stone-600">{FOUNDATION_INFO.legalDoc}</span>
                </div>
                <button
                  onClick={() => setActiveTab('tentang')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors cursor-pointer"
                >
                  <span>Baca Selengkapnya Profil Yayasan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Lima Bidang Kegiatan Utama */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold font-mono">
            5 Pilar Khidmat Ummat
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Bidang Kegiatan Utama Yayasan
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed">
            Setiap bidang dikelola oleh pengurus yang amanah dengan program kerja berkelanjutan yang menyentuh langsung kebutuhan warga.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {departments.map((dept) => (
            <div
              key={dept.id}
              onClick={() => {
                onSelectDepartment(dept.id);
                setActiveTab('bidang');
              }}
              className="bg-white rounded-xl border border-stone-200 hover:border-amber-500/80 p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center justify-center group-hover:bg-emerald-900 group-hover:text-amber-300 transition-colors">
                  {getDeptIcon(dept.id)}
                </div>
                <div>
                  <span className="text-[11px] font-arabic text-emerald-900 block font-medium">
                    {dept.arabicName}
                  </span>
                  <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-emerald-900 transition-colors">
                    {dept.title}
                  </h3>
                </div>
                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {dept.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="font-medium text-emerald-800">{dept.programsCount} Program Kerja</span>
                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Program Unggulan & Kegiatan Terkini (Highlight) */}
      <section className="bg-stone-100 py-16 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold font-mono">
                Fokus Aksi Berkelanjutan
              </span>
              <h2 className="font-serif text-3xl font-bold text-stone-900 mt-1">
                Program Unggulan & Rutin Yayasan
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('agenda')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-900 hover:text-emerald-700 transition-colors"
            >
              <span>Lihat Kalender Lengkap</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Jumat Berkah */}
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between">
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src="/src/assets/images/social_humanitarian_care_1794360629790.jpg"
                    alt="Program Jumat Berkah"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-emerald-900/90 text-amber-300 text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs">
                    Rutin Tiap Jumat
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[11px] text-stone-500 font-medium uppercase tracking-wider">
                    Bidang Sosial & Kemasyarakatan
                  </span>
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Jumat Berkah Berbagi Santapan Sehat
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Pembagian 250+ porsi hidangan bergizi setiap pekan selepas shalat Jumat untuk warga dhuafa, pejuang nafkah jalanan, dan musafir.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <button
                  onClick={onOpenQuickDonate}
                  className="w-full py-2 px-3 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-red-600 text-red-600" />
                  <span>Titip Sedekah Jumat (Rp 15.000 / Porsi)</span>
                </button>
              </div>
            </div>

            {/* Card 2: Latihan P.S. Sin Lam Ba */}
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between">
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src="/src/assets/images/ps_sinlamba_martialarts_1794360629240.jpg"
                    alt="Latihan Perguruan Silat Sin Lam Ba"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-emerald-900/90 text-amber-300 text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs">
                    Malam Jumat & Malam Minggu
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[11px] text-stone-500 font-medium uppercase tracking-wider">
                    Dakwah & Karakter Pemuda
                  </span>
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Latihan P.S. Sin Lam Ba (Silat & Olah Batin)
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Pelestarian seni bela diri warisan leluhur untuk melatih ketahanan fisik, jurus bela diri, adab tawadhu, serta mental kesatria islami.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <button
                  onClick={() => setActiveTab('agenda')}
                  className="w-full py-2 px-3 text-xs font-semibold text-stone-800 bg-stone-50 hover:bg-stone-100 rounded-lg transition-colors border border-stone-200 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-stone-600" />
                  <span>Jadwal Latihan & Info Pendaftaran</span>
                </button>
              </div>
            </div>

            {/* Card 3: Bimbingan Belajar & Tahsin */}
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs flex flex-col justify-between">
              <div>
                <div className="h-44 overflow-hidden relative">
                  <img
                    src="/src/assets/images/education_classroom_1794360628624.jpg"
                    alt="Kelas Les Belajar dan Tahsin Al-Quran"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-emerald-900/90 text-amber-300 text-[11px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs">
                    Senin s/d Sabtu
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[11px] text-stone-500 font-medium uppercase tracking-wider">
                    Pendidikan & Literasi
                  </span>
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    Kelas Belajar Gratis & Tahsin Al-Qur'an
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Les Matematika, IPA, Bahasa Inggris, Bahasa Arab, Fiqih dan Tahsin tajwid dengan instruktur berpengalaman secara cuma-cuma bagi dhuafa.
                  </p>
                </div>
              </div>
              <div className="p-5 pt-0">
                <button
                  onClick={() => setActiveTab('pendidikan')}
                  className="w-full py-2 px-3 text-xs font-semibold text-emerald-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Daftar Kelas Belajar Online</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Agenda Terdekat & Kalender Cuplikan */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold font-mono">
              Kalender Kegiatan
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-900 mt-1">
              Agenda Kegiatan Terdekat
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('agenda')}
            className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Buka Kalender Agenda Lengkap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingActivities.map((act) => (
            <div
              key={act.id}
              className="bg-white p-5 rounded-xl border border-stone-200 hover:border-emerald-700/60 transition-all shadow-2xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-mono text-emerald-800 font-medium">
                    {new Date(act.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  <span className="text-stone-400">{act.time}</span>
                </div>

                <h3 className="font-serif font-bold text-base text-stone-900 leading-snug">
                  {act.title}
                </h3>

                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {act.description}
                </p>

                <div className="text-[11px] text-stone-500 flex items-center gap-1.5 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{act.location}</span>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-500">
                  Terdaftar: <strong className="text-stone-800 font-mono">{act.registeredCount}</strong> / {act.quota || 100}
                </span>
                <button
                  onClick={() => onOpenActivityRegister(act)}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-md transition-colors cursor-pointer"
                >
                  Ikuti Kegiatan
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Dukungan Donasi & Penyaluran Berkah */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-stone-900 text-white rounded-2xl p-6 sm:p-10 lg:p-12 shadow-xl border border-emerald-800/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
                Amanah Donasi & Sedekah Umat
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
                Bersama Menjaga Asa Anak-Anak Yatim dan Keluarga Prasejahtera
              </h2>
              <p className="text-sm text-emerald-100/80 leading-relaxed font-light">
                Seluruh dana titipan para donatur dicatat secara terpisah, tidak dicampur dengan operasional komersial yayasan, dan dilaporkan secara berkala demi menjaga kehormatan dan amanah syariah.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={onOpenQuickDonate}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-white/80" />
                  <span>Donasi Sekarang</span>
                </button>
                <button
                  onClick={() => setActiveTab('donasi')}
                  className="px-5 py-3 bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-700 text-emerald-100 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer"
                >
                  Lihat Laporan Penyaluran
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-xl p-5 space-y-4 backdrop-blur-xs">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                Program Donasi Unggulan Aktif:
              </h4>

              {campaigns.slice(0, 2).map((camp) => {
                const percent = Math.min(100, Math.round((camp.collectedAmount / camp.targetAmount) * 100));
                return (
                  <div key={camp.id} className="space-y-2 pb-3 border-b border-white/10 last:border-none last:pb-0">
                    <div className="flex justify-between items-start text-xs">
                      <span className="font-semibold text-white">{camp.title}</span>
                      <span className="text-amber-400 font-mono font-bold">{percent}%</span>
                    </div>

                    <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>

                    <div className="flex justify-between text-[11px] text-emerald-200 font-mono">
                      <span>Terkumpul: Rp {camp.collectedAmount.toLocaleString('id-ID')}</span>
                      <span>Target: Rp {camp.targetAmount.toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* 7. Berita & Galeri Terkini */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold font-mono">
              Warta & Publikasi
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-900 mt-1">
              Berita & Dokumentasi Terkini
            </h2>
          </div>
          <button
            onClick={() => setActiveTab('berita')}
            className="text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Lihat Semua Berita & Foto</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredNews.map((news) => (
            <article
              key={news.id}
              onClick={() => onSelectNews(news)}
              className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="h-44 overflow-hidden relative bg-stone-100">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/80 text-amber-300 text-[10px] uppercase font-semibold px-2 py-0.5 rounded backdrop-blur-xs">
                    {news.category}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="text-[11px] text-stone-500 flex items-center gap-2">
                    <span>{new Date(news.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span aria-hidden="true">·</span>
                    <span>{news.readTime}</span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-emerald-900 transition-colors leading-snug">
                    {news.title}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                    {news.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <span className="text-xs font-semibold text-emerald-800 group-hover:text-emerald-950 inline-flex items-center gap-1">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 8. Kemitraan & Kolaborasi Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-100 border border-stone-200 rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Membuka Peluang Kerja Sama & Program CSR
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Yayasan menyambut terbuka kemitraan strategis bersama korporasi, lembaga pendidikan, instansi kesehatan, dan komunitas masyarakat untuk menyalurkan program CSR yang berdampak luas.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('kemitraan')}
            className="px-6 py-3 bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-semibold rounded-lg text-xs sm:text-sm shadow-xs transition-colors shrink-0 cursor-pointer"
          >
            Ajukan Kemitraan / CSR
          </button>
        </div>
      </section>

    </div>
  );
};
