import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { Menu, X, ShieldCheck, Heart, Sparkles, LayoutDashboard } from 'lucide-react';
import { FOUNDATION_INFO } from '../data/initialData';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenQuickDonate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenQuickDonate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { tab: ActiveTab; label: string }[] = [
    { tab: 'beranda', label: 'Beranda' },
    { tab: 'tentang', label: 'Tentang Kami' },
    { tab: 'bidang', label: 'Bidang Kegiatan' },
    { tab: 'agenda', label: 'Program & Agenda' },
    { tab: 'pendidikan', label: 'Pendidikan' },
    { tab: 'donasi', label: 'Donasi & Kepedulian' },
    { tab: 'berita', label: 'Berita & Galeri' },
    { tab: 'kemitraan', label: 'Kemitraan' },
    { tab: 'kontak', label: 'Kontak' },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Notification / Trust Bar */}
      <div className="bg-emerald-950 text-emerald-100/90 text-xs py-2 px-4 border-b border-emerald-900/60">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">
              Yayasan Resmi Terdaftar Kemenkumham RI: <strong className="text-amber-300 font-medium">{FOUNDATION_INFO.legalDoc}</strong>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-emerald-200/80">
            <span>Tebet, Jakarta Selatan</span>
            <span aria-hidden="true">·</span>
            <span className="italic">{FOUNDATION_INFO.slogan}</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => handleNavClick('admin')}
              className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors cursor-pointer font-medium"
            >
              <LayoutDashboard className="w-3 h-3" />
              <span>Portal Admin CMS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/90 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">
            
            {/* Zone 1: Single text element Brand mark with authentic emblem */}
            <button
              onClick={() => handleNavClick('beranda')}
              className="flex items-center gap-3 text-left group shrink-0 focus-visible:outline-emerald-700"
            >
              <div className="w-12 h-12 sm:w-13 sm:h-13 shrink-0 flex items-center justify-center p-1 rounded-xl bg-white border border-stone-200/90 shadow-2xs group-hover:scale-105 transition-transform overflow-hidden">
                <img
                  src="/assets/aistudio/logo_dan_slogan_ab63ff9c.png"
                  alt="Logo Yayasan Pendidikan Islam Arief Fabrianto"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg sm:text-xl text-emerald-950 leading-tight tracking-tight group-hover:text-emerald-800 transition-colors">
                  YPI Arief Fabrianto
                </span>
                <span className="text-[11px] text-stone-500 font-medium tracking-wide">
                  Yayasan Pendidikan Islam · Est. 2022
                </span>
              </div>
            </button>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden xl:flex items-center gap-6 text-[13px] font-medium text-stone-700">
              {navItems.map((item) => {
                const isActive = activeTab === item.tab;
                return (
                  <button
                    key={item.tab}
                    onClick={() => handleNavClick(item.tab)}
                    className={`whitespace-nowrap transition-colors relative py-1 focus-visible:outline-emerald-700 ${
                      isActive
                        ? 'text-emerald-900 font-semibold'
                        : 'text-stone-600 hover:text-emerald-800'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: 1 Primary Action */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                onClick={onOpenQuickDonate}
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg shadow-xs hover:shadow-sm transition-all whitespace-nowrap cursor-pointer focus-visible:outline-red-700"
              >
                <Heart className="w-4 h-4 fill-white/80" />
                <span>Donasi Sekarang</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 text-stone-700 hover:text-emerald-900 hover:bg-stone-100 rounded-lg transition-colors focus-visible:outline-emerald-700"
                aria-label="Buka Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-stone-200 bg-stone-50 px-4 pt-3 pb-6 shadow-xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mb-4">
              {navItems.map((item) => {
                const isActive = activeTab === item.tab;
                return (
                  <button
                    key={item.tab}
                    onClick={() => handleNavClick(item.tab)}
                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-emerald-900 text-amber-300 font-semibold'
                        : 'text-stone-700 hover:bg-stone-200/70 hover:text-stone-900'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <Sparkles className="w-3.5 h-3.5 text-amber-400" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('admin')}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold text-emerald-900 bg-amber-100 hover:bg-amber-200 rounded-md transition-colors"
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-800" />
                <span>Buka Dashboard Admin (CMS)</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
