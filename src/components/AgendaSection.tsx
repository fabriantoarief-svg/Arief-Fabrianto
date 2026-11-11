import React, { useState } from 'react';
import { Activity, DepartmentKey } from '../types';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle,
  Share2,
  CalendarCheck
} from 'lucide-react';

interface AgendaSectionProps {
  activities: Activity[];
  onRegisterActivity: (activity: Activity) => void;
}

export const AgendaSection: React.FC<AgendaSectionProps> = ({
  activities,
  onRegisterActivity,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | DepartmentKey | 'routine'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredActivities = activities.filter((act) => {
    const matchesSearch = act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.location.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'routine') return act.isRoutine;
    return act.deptId === selectedFilter;
  });

  const routineSummary = [
    { name: 'Jumat Berkah', schedule: 'Setiap Hari Jumat', desc: 'Pembagian 250+ porsi hidangan bergizi ba\'da shalat Jumat' },
    { name: 'Pengajian Umum', schedule: 'Setiap Malam Jumat', desc: 'Kajian kitab, tahlil, & maulid di Majelis Utama' },
    { name: 'Latihan P.S. Sin Lam Ba', schedule: 'Malam Jumat & Malam Minggu', desc: 'Pencak silat, olah nafas, dan adab santri' },
    { name: 'Pengajian Kaum Ibu', schedule: 'Minggu ke-3 Setiap Bulan', desc: 'Fiqih wanita, parenting islami, dan silaturahmi' },
    { name: 'Santunan Yatim Piatu', schedule: 'Ramadan & 10 Muharram (Asyura)', desc: 'Beasiswa, seragam baru, dan uang saku santri binaan' },
    { name: 'Kurban Berkah Iduladha', schedule: '10-13 Dzulhijjah (Iduladha)', desc: 'Penyembelihan syar\'i & distribusi daging dhuafa' },
    { name: 'Maulid & Isra Mikraj', schedule: 'Rabi\'ul Awwal & Rajab', desc: 'Tabligh akbar tahunan bersama alim ulama' },
    { name: 'Haul Syekh Abdul Qodir Al Jailani', schedule: 'Bulan Rabi\'ul Akhir', desc: 'Pembacaan manaqib & doa keselamatan bangsa' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      
      {/* Title */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold font-mono">
          Kalender & Jadwal
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
          Program & Agenda Kegiatan Yayasan
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Ikuti kegiatan dakwah rutin, latihan fisik bela diri Sin Lam Ba, baksos Jumat Berkah, serta tabligh akbar peringatan hari besar Islam di YPI Arief Fabrianto.
        </p>
      </div>

      {/* Routine Agenda Box */}
      <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-lg text-emerald-950">
              Agenda Rutin & Kalender Tahunan Yayasan
            </h3>
            <p className="text-xs text-stone-500">
              Jadwal kegiatan tetap yang diselenggarakan secara istiqomah
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md hidden sm:inline-block">
            Kalender Hijriah & Masehi
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {routineSummary.map((item, idx) => (
            <div key={idx} className="bg-white p-3.5 rounded-xl border border-stone-200/80 shadow-2xs space-y-1.5">
              <span className="text-xs font-bold text-stone-900 block">{item.name}</span>
              <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded inline-block">
                {item.schedule}
              </span>
              <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Cari nama agenda atau lokasi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-emerald-700 focus:outline-none"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none text-xs">
          {[
            { id: 'all', label: 'Semua Agenda' },
            { id: 'routine', label: 'Kegiatan Rutin' },
            { id: 'dakwah', label: 'Dakwah & Sin Lam Ba' },
            { id: 'sosial', label: 'Sosial & Yatim' },
            { id: 'pendidikan', label: 'Pendidikan' },
            { id: 'kesehatan', label: 'Kesehatan' },
            { id: 'ekonomi', label: 'Ekonomi UMKM' },
          ].map((f) => {
            const isSelected = selectedFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer font-medium ${
                  isSelected
                    ? 'bg-emerald-900 text-amber-300'
                    : 'bg-white hover:bg-stone-100 text-stone-600 border border-stone-200'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredActivities.map((act) => {
          const isFull = act.quota ? act.registeredCount >= act.quota : false;
          return (
            <div
              key={act.id}
              className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-900 font-mono">
                    {new Date(act.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  {act.isRoutine ? (
                    <span className="text-[10px] bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded">
                      Rutin
                    </span>
                  ) : (
                    <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded">
                      Agenda Khusus
                    </span>
                  )}
                </div>

                <h3 className="font-serif font-bold text-base text-stone-900 leading-snug">
                  {act.title}
                </h3>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {act.description}
                </p>

                <div className="space-y-1.5 pt-2 text-xs text-stone-500 border-t border-stone-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{act.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="truncate">{act.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="truncate">PIC: {act.pic}</span>
                  </div>
                  {act.hijriNote && (
                    <div className="text-[11px] text-amber-800 font-serif italic pt-1">
                      *{act.hijriNote}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-stone-400">Peserta: </span>
                  <span className="font-mono font-semibold text-stone-800">
                    {act.registeredCount}
                  </span>
                  {act.quota && <span className="text-stone-400">/{act.quota}</span>}
                </div>

                <button
                  disabled={isFull}
                  onClick={() => onRegisterActivity(act)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isFull
                      ? 'bg-stone-200 text-stone-500 cursor-not-allowed'
                      : 'bg-emerald-900 hover:bg-emerald-800 text-white shadow-2xs'
                  }`}
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>{isFull ? 'Kuota Penuh' : 'Daftar Ikut'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
