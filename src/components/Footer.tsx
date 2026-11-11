import React from 'react';
import { ActiveTab } from '../types';
import { FOUNDATION_INFO } from '../data/initialData';
import { MapPin, Phone, Mail, ShieldCheck, Heart, ArrowUpRight, Compass } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenQuickDonate: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenQuickDonate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-emerald-950 text-stone-300 border-t border-emerald-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-emerald-900/80">
          
          {/* Col 1: Foundation Identity & Legal */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white p-1 border border-amber-400/40 flex items-center justify-center shrink-0 shadow-xs overflow-hidden">
                <img
                  src="/assets/aistudio/logo_dan_slogan_ab63ff9c.png"
                  alt="Logo Yayasan Pendidikan Islam Arief Fabrianto"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-serif font-bold text-xl text-white block">
                  {FOUNDATION_INFO.name}
                </span>
                <span className="text-xs text-emerald-300/80 font-mono">
                  {FOUNDATION_INFO.legalDoc}
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-300/90 leading-relaxed max-w-md">
              "{FOUNDATION_INFO.slogan}"
            </p>

            <p className="text-xs text-stone-400 leading-relaxed max-w-md">
              Yayasan Pendidikan Islam Arief Fabrianto didirikan pada tahun 2022 di Menteng Dalam, Tebet, Jakarta Selatan. Berkhidmat menyelenggarakan pendidikan, dakwah keislaman, pelayanan sosial kemasyarakatan, pemeriksaan kesehatan, dan kemandirian ekonomi umat secara amanah dan profesional.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-900/60 border border-emerald-800 text-emerald-200 rounded-md">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                SK Kemenkumham Sah
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-900/60 border border-emerald-800 text-emerald-200 rounded-md">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                Berdiri Sejak {FOUNDATION_INFO.foundedYear}
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold text-amber-400 tracking-wider uppercase font-serif">
              Navigasi Utama
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { tab: 'beranda' as ActiveTab, label: 'Beranda Utama' },
                { tab: 'tentang' as ActiveTab, label: 'Tentang Yayasan' },
                { tab: 'bidang' as ActiveTab, label: '5 Bidang Kegiatan' },
                { tab: 'agenda' as ActiveTab, label: 'Kalender & Agenda' },
                { tab: 'pendidikan' as ActiveTab, label: 'Kelas & Pendaftaran' },
                { tab: 'donasi' as ActiveTab, label: 'Donasi & Kepedulian' },
                { tab: 'berita' as ActiveTab, label: 'Berita & Dokumentasi' },
                { tab: 'kemitraan' as ActiveTab, label: 'Kerja Sama & CSR' },
                { tab: 'kontak' as ActiveTab, label: 'Kontak & Lokasi' },
              ].map((link) => (
                <li key={link.tab}>
                  <button
                    onClick={() => {
                      setActiveTab(link.tab);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-amber-300 transition-colors cursor-pointer text-stone-300 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: 5 Bidang Kegiatan */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-semibold text-amber-400 tracking-wider uppercase font-serif">
              Bidang Program
            </h4>
            <ul className="space-y-2 text-xs text-stone-300">
              <li>Pendidikan & Literasi</li>
              <li>Dakwah & PHBI</li>
              <li>P.S. Sin Lam Ba</li>
              <li>Jumat Berkah & Yatim</li>
              <li>Cek Kesehatan Gratis</li>
              <li>Pemberdayaan UMKM</li>
            </ul>

            <div className="pt-3">
              <button
                onClick={() => {
                  setActiveTab('admin');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1 text-xs text-amber-300 hover:text-amber-200 underline font-medium"
              >
                <span>Login Pengelola / CMS</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-semibold text-amber-400 tracking-wider uppercase font-serif">
              Sekretariat Pusat
            </h4>
            <div className="space-y-3 text-xs text-stone-300 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{FOUNDATION_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{FOUNDATION_INFO.phone} / {FOUNDATION_INFO.whatsapp}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-mono">{FOUNDATION_INFO.email}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenQuickDonate}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors shadow-xs"
              >
                <Heart className="w-3.5 h-3.5 fill-white/80" />
                <span>Salurkan Infaq & Sedekah</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {FOUNDATION_INFO.foundedYear}–{currentYear} {FOUNDATION_INFO.name}. Hak Cipta Dilindungi Undang-Undang.
          </div>
          <div className="flex items-center gap-4 text-stone-400 text-xs">
            <span>Amanah · Transparan · Berkelanjutan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
