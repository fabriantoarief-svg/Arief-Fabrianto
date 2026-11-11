import React, { useState } from 'react';
import { Department, DepartmentKey, ActiveTab } from '../types';
import { 
  GraduationCap, 
  BookOpen, 
  HeartHandshake, 
  Activity as ActivityIcon, 
  ShoppingBag, 
  Calendar, 
  Users, 
  Clock, 
  ArrowRight,
  Heart,
  Sparkles
} from 'lucide-react';

interface DepartmentsSectionProps {
  departments: Department[];
  selectedDeptId: DepartmentKey;
  onSelectDept: (deptId: DepartmentKey) => void;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenQuickDonate: () => void;
}

export const DepartmentsSection: React.FC<DepartmentsSectionProps> = ({
  departments,
  selectedDeptId,
  onSelectDept,
  setActiveTab,
  onOpenQuickDonate,
}) => {
  const currentDept = departments.find(d => d.id === selectedDeptId) || departments[0];

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

  const getDeptHeroImage = (id: string) => {
    switch (id) {
      case 'pendidikan': return '/src/assets/images/education_classroom_1794360628624.jpg';
      case 'dakwah': return '/src/assets/images/ps_sinlamba_martialarts_1794360629240.jpg';
      case 'sosial': return '/src/assets/images/social_humanitarian_care_1794360629790.jpg';
      default: return '/src/assets/images/hero_islamic_foundation_1794360629011.jpg';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      
      {/* Title */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold font-mono">
          Pilar Pengabdian
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
          5 Bidang Kegiatan Utama Yayasan
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Setiap bidang dirancang dengan program kerja yang terukur dan berorientasi pada kemaslahatan masyarakat serta keberlanjutan generasi Islam mandiri.
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pb-2 border-b border-stone-200">
        {departments.map((d) => {
          const isSelected = d.id === selectedDeptId;
          return (
            <button
              key={d.id}
              onClick={() => onSelectDept(d.id)}
              className={`p-3.5 rounded-xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
                  : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded-md ${isSelected ? 'bg-emerald-800 text-amber-300' : 'bg-stone-100 text-emerald-800'}`}>
                  {getDeptIcon(d.id)}
                </div>
                <span className={`text-[10px] font-mono ${isSelected ? 'text-emerald-200' : 'text-stone-400'}`}>
                  {d.programsCount} Program
                </span>
              </div>
              <div>
                <span className={`text-[10px] font-arabic block font-normal ${isSelected ? 'text-amber-200' : 'text-emerald-800'}`}>
                  {d.arabicName}
                </span>
                <span className="font-serif font-bold text-xs sm:text-sm block truncate">
                  {d.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Department Spotlight Header Card */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          
          <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-stone-100">
            <img
              src={getDeptHeroImage(currentDept.id)}
              alt={currentDept.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[11px] font-arabic text-amber-300 block">{currentDept.arabicName}</span>
              <h3 className="font-serif font-bold text-xl">{currentDept.title}</h3>
              <p className="text-xs text-stone-200 mt-1">{currentDept.tagline}</p>
            </div>
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Deskripsi & Tujuan Bidang</span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-stone-900 leading-snug">
                "{currentDept.tagline}"
              </h2>

              <p className="text-stone-600 text-sm leading-relaxed">
                {currentDept.description}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-stone-500">
                <span>Daftar {currentDept.programs.length} Program Kerja Terstruktur</span>
              </div>

              <div className="flex gap-2">
                {currentDept.id === 'pendidikan' && (
                  <button
                    onClick={() => setActiveTab('pendidikan')}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Daftar Kelas Belajar</span>
                  </button>
                )}
                {currentDept.id === 'sosial' && (
                  <button
                    onClick={onOpenQuickDonate}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white/80" />
                    <span>Dukung Program Sosial</span>
                  </button>
                )}
                <button
                  onClick={() => setActiveTab('agenda')}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Jadwal Agenda
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Program Cards Grid */}
      <div className="space-y-4">
        <h3 className="font-serif text-2xl font-bold text-stone-900">
          Program Kerja {currentDept.title}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentDept.programs.map((prog, idx) => (
            <div
              key={prog.id}
              className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs hover:shadow-md hover:border-emerald-700/60 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-mono text-emerald-800 font-semibold text-[11px]">
                    Program #{idx + 1}
                  </span>
                  <span className="text-[11px] bg-stone-100 px-2 py-0.5 rounded text-stone-600">
                    {prog.category}
                  </span>
                </div>

                <h4 className="font-serif font-bold text-base text-stone-900 leading-snug">
                  {prog.name}
                </h4>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {prog.description}
                </p>

                <div className="space-y-1.5 pt-2 text-xs text-stone-500 border-t border-stone-100">
                  {prog.schedule && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">{prog.schedule}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span className="truncate">Sasaran: {prog.audience}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                <button
                  onClick={() => setActiveTab('agenda')}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Lihat Jadwal Terdekat</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
