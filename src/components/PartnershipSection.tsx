import React, { useState } from 'react';
import { PartnershipRequest } from '../types';
import { 
  Building2, 
  Handshake, 
  GraduationCap, 
  BookOpen, 
  HeartHandshake, 
  Activity as ActivityIcon, 
  ShoppingBag, 
  ShieldCheck, 
  CheckCircle2, 
  Send 
} from 'lucide-react';

interface PartnershipSectionProps {
  onNewPartnership: (req: PartnershipRequest) => void;
}

export const PartnershipSection: React.FC<PartnershipSectionProps> = ({ onNewPartnership }) => {
  const [institutionName, setInstitutionName] = useState('');
  const [picName, setPicName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<PartnershipRequest['category']>('CSR Perusahaan');
  const [proposalSummary, setProposalSummary] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const partnershipTypes = [
    { title: 'Program CSR Perusahaan', desc: 'Penyaluran dana CSR korporasi untuk beasiswa yatim, fasilitas belajar, atau renovasi lingkungan.' },
    { title: 'Kerja Sama Pendidikan', desc: 'Kolaborasi kurikulum sekolah mitra, pelatihan instruktur, beasiswa lanjut, dan donasi buku.' },
    { title: 'Kerja Sama Dakwah', desc: 'Penyelenggaraan tabligh akbar, safari dakwah, cetak mushaf Al-Qur\'an, dan pembinaan majelis.' },
    { title: 'Dukungan Sosial & Kemanusiaan', desc: 'Bantuan pangan rutin Jumat Berkah, paket sembako dhuafa, dan posko tanggap bencana.' },
    { title: 'Pemeriksaan Kesehatan', desc: 'Bakti medis pemeriksaan gratis, penyuluhan kesehatan lansia & balita bersama klinik berwenang.' },
    { title: 'Pengembangan UMKM', desc: 'Pendampingan modal kerja bergulir syariah, pelatihan digital marketing, dan sertifikasi halal.' },
    { title: 'Olahraga & Karakter (Sin Lam Ba)', desc: 'Pengembangan seni bela diri pencak silat tradisional, sarana gelanggang, dan pembinaan moral pemuda.' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: PartnershipRequest = {
      id: `pr-${Date.now()}`,
      institutionName: institutionName.trim(),
      picName: picName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      category,
      proposalSummary: proposalSummary.trim(),
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'new',
    };

    onNewPartnership(newReq);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setInstitutionName('');
    setPicName('');
    setEmail('');
    setPhone('');
    setProposalSummary('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      
      {/* Title */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold font-mono">
          Kolaborasi & Sinergi
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
          Kemitraan Strategis Bersama Yayasan
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          YPI Arief Fabrianto membuka pintu seluas-luasnya bagi perusahaan, BUMN/BUMD, perguruan tinggi, lembaga sosial, dan asosiasi profesi untuk berkolaborasi menghadirkan dampak nyata bagi masyarakat.
        </p>
      </div>

      {/* 7 Jenis Kemitraan Grid */}
      <div className="space-y-4">
        <h3 className="font-serif font-bold text-xl text-stone-900">
          7 Skema Kerja Sama yang Tersedia:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {partnershipTypes.map((item, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-stone-200 shadow-2xs space-y-2">
              <span className="text-xs font-mono font-semibold text-emerald-800">
                0{idx + 1}.
              </span>
              <h4 className="font-serif font-bold text-base text-stone-900">
                {item.title}
              </h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-10 max-w-3xl mx-auto shadow-xs">
        <div className="space-y-2 border-b border-stone-200 pb-4 mb-6">
          <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold font-mono">
            Formulir Resmi Pengajuan Kemitraan
          </span>
          <h3 className="font-serif font-bold text-2xl text-stone-900">
            Mulai Diskusi Sinergi Kebaikan
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Silakan lengkapi data kontak lembaga Anda. Tim sekretariat kemitraan YPI Arief Fabrianto akan segera menindaklanjuti untuk penjadwalan audiensi atau penandatanganan nota kesepahaman (MoU).
          </p>
        </div>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-stone-800 block mb-1">
                  Nama Lembaga / Perusahaan / Instansi:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Cth: PT Berkah Sejahtera Mandiri"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-800 block mb-1">
                  Nama Penanggung Jawab (PIC):
                </label>
                <input
                  type="text"
                  required
                  placeholder="Cth: Bpk. Bambang Wijaya"
                  value={picName}
                  onChange={(e) => setPicName(e.target.value)}
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-stone-800 block mb-1">
                  Email Resmi Kantor / PIC:
                </label>
                <input
                  type="email"
                  required
                  placeholder="csr@perusahaan.co.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-800 block mb-1">
                  No. Telepon / WhatsApp PIC:
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0812xxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-stone-800 block mb-1">
                Pilih Bidang Fokus Kemitraan:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full p-2.5 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none font-medium"
              >
                <option value="CSR Perusahaan">CSR Perusahaan (Beasiswa / Sarana)</option>
                <option value="Kerja Sama Pendidikan">Kerja Sama Pendidikan & Literasi</option>
                <option value="Kerja Sama Dakwah">Kerja Sama Dakwah & Syiar Islam</option>
                <option value="Dukungan Sosial & Kemanusiaan">Dukungan Sosial & Tanggap Kemanusiaan</option>
                <option value="Kesehatan">Kesehatan (Cek Gratis / Obat)</option>
                <option value="UMKM">Pemberdayaan UMKM & Pelatihan Wirausaha</option>
                <option value="Olahraga & Karakter (Sin Lam Ba)">Olahraga Bela Diri & Karakter (Sin Lam Ba)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-stone-800 block mb-1">
                Ringkasan Rencana Kerja Sama / Kebutuhan Lembaga:
              </label>
              <textarea
                rows={4}
                required
                placeholder="Jelaskan secara singkat latar belakang, sasaran penerima manfaat, dan bentuk dukungan yang ingin disinergikan..."
                value={proposalSummary}
                onChange={(e) => setProposalSummary(e.target.value)}
                className="w-full p-2.5 bg-white border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-semibold rounded-lg text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Permohonan Kerja Sama</span>
            </button>
          </form>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-emerald-700" />
            </div>
            <h4 className="font-serif font-bold text-xl text-stone-900">
              Permohonan Kemitraan Berhasil Dikirim!
            </h4>
            <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
              Terima kasih kepada <strong>{institutionName}</strong>. Pengajuan sinergi Anda telah terdata di sistem manajemen YPI Arief Fabrianto. Sekretaris kemitraan kami akan menghubungi PIC dalam 1-2 hari kerja.
            </p>
            <button
              onClick={handleReset}
              className="px-4 py-2 border border-stone-300 rounded-lg text-stone-700 font-medium hover:bg-stone-100 text-xs"
            >
              Ajukan Permohonan Lain
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
