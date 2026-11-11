import React, { useState } from 'react';
import { MessageCircle, X, Send, ArrowRight } from 'lucide-react';
import { FOUNDATION_INFO } from '../data/initialData';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('umum');
  const [customMsg, setCustomMsg] = useState('');

  const topics = [
    { id: 'umum', label: 'Tanya Program & Informasi Umum', template: 'Assalamu\'alaikum, saya ingin bertanya tentang kegiatan dan program YPI Arief Fabrianto.' },
    { id: 'pendidikan', label: 'Pendaftaran Kelas Belajar / Santri', template: 'Assalamu\'alaikum, saya ingin mendaftarkan putra/putri saya untuk kelas bimbingan belajar / tahsin di YPI.' },
    { id: 'donasi', label: 'Konfirmasi Donasi / Infaq', template: 'Bismillah, saya ingin mengonfirmasi amanah donasi / sedekah program Jumat Berkah / Santunan Yatim.' },
    { id: 'kemitraan', label: 'Rencana Kerja Sama / CSR Lembaga', template: 'Assalamu\'alaikum, perkenankan kami dari lembaga / perusahaan ingin mendiskusikan peluang kolaborasi program.' },
  ];

  const handleSendWA = () => {
    const currentTopicObj = topics.find(t => t.id === selectedTopic);
    const textToSend = customMsg.trim() || currentTopicObj?.template || 'Assalamu\'alaikum YPI Arief Fabrianto';
    const cleanPhone = FOUNDATION_INFO.whatsapp.replace(/[^0-9]/g, '');
    const waUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(textToSend)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="bg-emerald-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-800 flex items-center justify-center text-amber-400 font-bold text-sm">
                YPI
              </div>
              <div>
                <h4 className="font-semibold text-sm leading-tight">Sekretariat YPI Arief Fabrianto</h4>
                <p className="text-[11px] text-emerald-200">Layanan Komunikasi & Konsultasi Umat</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-300 hover:text-white p-1 rounded-md transition-colors"
              aria-label="Tutup Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 text-xs text-stone-700 bg-stone-50/50">
            <div className="bg-white p-3 rounded-lg border border-stone-200/80 shadow-2xs">
              <p className="text-stone-600 leading-relaxed">
                Assalamu'alaikum warahmatullah. Silakan pilih topik keperluan Anda untuk terhubung langsung dengan tim sekretariat kami di WhatsApp.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="font-semibold text-stone-800 block text-[11px] uppercase tracking-wider">
                Pilih Topik Konsultasi:
              </label>
              <div className="space-y-1">
                {topics.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setSelectedTopic(t.id);
                      setCustomMsg(t.template);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center justify-between ${
                      selectedTopic === t.id
                        ? 'bg-emerald-100 text-emerald-950 font-medium border border-emerald-300'
                        : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                    }`}
                  >
                    <span>{t.label}</span>
                    <ArrowRight className="w-3 h-3 opacity-60" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-stone-800 block text-[11px] uppercase tracking-wider">
                Pesan Anda:
              </label>
              <textarea
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Tuliskan pertanyaan atau kebutuhan Anda..."
                rows={3}
                className="w-full p-2.5 bg-white border border-stone-200 rounded-md text-xs focus:ring-1 focus:ring-emerald-700 focus:outline-none resize-none"
              />
            </div>

            <button
              onClick={handleSendWA}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg shadow-sm transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Buka Percakapan WhatsApp</span>
            </button>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer focus-visible:outline-emerald-600 group"
        aria-label="Layanan WhatsApp"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <MessageCircle className="w-6 h-6 text-amber-300 group-hover:scale-110 transition-transform" />
        </div>
        <span className="text-xs font-semibold tracking-wide pr-1 hidden sm:inline-block">
          Konsultasi & Layanan
        </span>
      </button>
    </div>
  );
};
