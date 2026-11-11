import React, { useState } from 'react';
import { DonationCampaign, DonationReport, DonationRecord } from '../types';
import { FOUNDATION_INFO } from '../data/initialData';
import { 
  Heart, 
  ShieldCheck, 
  Building2, 
  QrCode, 
  FileText, 
  Users, 
  Calculator, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface DonationSectionProps {
  campaigns: DonationCampaign[];
  reports: DonationReport[];
  records: DonationRecord[];
  onOpenDonateModal: (campaignId?: string) => void;
}

export const DonationSection: React.FC<DonationSectionProps> = ({
  campaigns,
  reports,
  records,
  onOpenDonateModal,
}) => {
  const [activeTab, setActiveTab] = useState<'program' | 'laporan' | 'zakat' | 'relawan'>('program');

  // Zakat Calculator State
  const [monthlyIncome, setMonthlyIncome] = useState<string>('7000000');
  const [otherIncome, setOtherIncome] = useState<string>('0');
  const [monthlyExpense, setMonthlyExpense] = useState<string>('2000000');
  const goldPricePerGram = 1350000; // Harga emas standar
  const nisabYearly = 85 * goldPricePerGram; // 85 gram emas
  const nisabMonthly = nisabYearly / 12;

  const incomeNum = parseInt(monthlyIncome.replace(/\D/g, ''), 10) || 0;
  const otherNum = parseInt(otherIncome.replace(/\D/g, ''), 10) || 0;
  const expenseNum = parseInt(monthlyExpense.replace(/\D/g, ''), 10) || 0;
  const netMonthly = Math.max(0, (incomeNum + otherNum) - expenseNum);
  const isObligatedZakat = netMonthly >= nisabMonthly;
  const calculatedZakat = isObligatedZakat ? Math.round(netMonthly * 0.025) : 0;

  // Volunteer State
  const [volName, setVolName] = useState('');
  const [volPhone, setVolPhone] = useState('');
  const [volInterest, setVolInterest] = useState('sosial');
  const [volSkill, setVolSkill] = useState('');
  const [volSuccess, setVolSuccess] = useState(false);

  const handleVolunteerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVolSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      
      {/* Title */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold font-mono">
          Donasi & Kepedulian Umat
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
          Menyalurkan Kebaikan, Menjaga Kehormatan Umat
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Setiap rupiah titipan donatur disalurkan tepat sasaran kepada anak-anak yatim, janda dhuafa, dan program pendidikan umat dengan pelaporan transparan dan teraudit.
        </p>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-stone-200 scrollbar-none text-xs font-medium">
        {[
          { id: 'program', label: 'Program Donasi Aktif' },
          { id: 'laporan', label: 'Laporan Penyaluran & Transparansi' },
          { id: 'zakat', label: 'Kalkulator Zakat Penghasilan' },
          { id: 'relawan', label: 'Pendaftaran Relawan Kemanusiaan' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-900 text-amber-300 font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Program Donasi Aktif */}
      {activeTab === 'program' && (
        <div className="space-y-10 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {campaigns.map((camp) => {
              const percent = Math.min(100, Math.round((camp.collectedAmount / camp.targetAmount) * 100));
              return (
                <div
                  key={camp.id}
                  className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-900">
                        {camp.category}
                      </span>
                      {camp.urgent && (
                        <span className="text-[11px] font-semibold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                          Mendesak
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif font-bold text-xl text-stone-900">
                      {camp.title}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {camp.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between items-baseline text-xs">
                        <div>
                          <span className="text-stone-500 text-[11px] block">Terkumpul:</span>
                          <strong className="text-emerald-900 text-sm font-serif">
                            Rp {camp.collectedAmount.toLocaleString('id-ID')}
                          </strong>
                        </div>
                        <div className="text-right">
                          <span className="text-stone-500 text-[11px] block">Target:</span>
                          <span className="text-stone-700 font-mono">
                            Rp {camp.targetAmount.toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>

                      <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-700 h-full rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="flex justify-between text-[11px] text-stone-500">
                        <span>{camp.donorsCount} Orang Muhsinin</span>
                        <span className="font-semibold text-emerald-800">{percent}% Tercapai</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-stone-100">
                    <button
                      onClick={() => onOpenDonateModal(camp.id)}
                      className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Heart className="w-4 h-4 fill-white/80" />
                      <span>Donasi untuk Program Ini</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Official Bank Accounts Box */}
          <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-stone-900">
                  Rekening Resmi Yayasan Pendidikan Islam Arief Fabrianto
                </h3>
                <p className="text-xs text-stone-500">
                  Demi keamanan dan kesucian amanah, pastikan nomor rekening dan nama penerima sesuai dengan daftar di bawah ini.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-800 font-semibold bg-emerald-100/80 px-2.5 py-1 rounded-md shrink-0">
                <ShieldCheck className="w-4 h-4" />
                Terverifikasi Lembaga
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {FOUNDATION_INFO.bankAccounts.map((acc, i) => (
                <div key={i} className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs space-y-1">
                  <span className="text-xs font-semibold text-emerald-950 block">{acc.bank}</span>
                  <div className="font-mono font-bold text-base text-stone-900">{acc.accountNumber}</div>
                  <span className="text-[11px] text-stone-500 block">a.n. {acc.accountName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Laporan Penyaluran & Transparansi */}
      {activeTab === 'laporan' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="max-w-2xl space-y-2">
            <h3 className="font-serif font-bold text-2xl text-stone-900">
              Laporan Akuntabilitas & Penyaluran Amanah
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Sebagai wujud tanggung jawab lillahi ta'ala kepada para donatur dan masyarakat, berikut adalah ringkasan penyaluran program sosial yang telah dieksekusi.
            </p>
          </div>

          <div className="space-y-4">
            {reports.map((rep) => (
              <div
                key={rep.id}
                className="bg-white rounded-xl border border-stone-200 p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span className="font-semibold text-emerald-900">{rep.period}</span>
                    <span aria-hidden="true">·</span>
                    <span>Tanggal: {rep.date}</span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-stone-900">
                    {rep.program}
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {rep.description}
                  </p>
                  <div className="text-[11px] text-stone-500 pt-1">
                    Sasaran Penerima: <strong>{rep.beneficiariesTarget}</strong>
                  </div>
                </div>

                <div className="text-right shrink-0 bg-stone-50 p-4 rounded-lg border border-stone-200 min-w-[200px]">
                  <span className="text-[11px] text-stone-500 block">Dana Tersalurkan:</span>
                  <div className="text-lg font-bold font-serif text-emerald-950">
                    Rp {rep.totalDistributed.toLocaleString('id-ID')}
                  </div>
                  <span className="text-[11px] text-stone-600 font-medium block mt-0.5">
                    {rep.beneficiariesCount} Penerima Manfaat
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-emerald-950 text-white rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-base">Permohonan Salinan Laporan Keuangan Lengkap?</h4>
              <p className="text-xs text-emerald-200">
                Mitra korporasi atau donatur tetap dapat menghubungi bagian bendahara untuk salinan audit pembukuan.
              </p>
            </div>
            <a
              href={`mailto:${FOUNDATION_INFO.email}?subject=Permohonan Laporan Keuangan Yayasan`}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-semibold rounded-lg text-xs whitespace-nowrap"
            >
              Hubungi Bagian Keuangan
            </a>
          </div>
        </div>
      )}

      {/* Tab 3: Kalkulator Zakat */}
      {activeTab === 'zakat' && (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 animate-in fade-in duration-200 shadow-xs">
          <div className="space-y-2 border-b border-stone-200 pb-4">
            <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>Simulasi Zakat Penghasilan (Maal)</span>
            </div>
            <h3 className="font-serif font-bold text-xl text-stone-900">
              Kalkulator Zakat Penghasilan
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Berdasarkan fatwa MUI, nisab zakat profesi/penghasilan setara 85 gram emas per tahun (Rp {(nisabYearly).toLocaleString('id-ID')} per tahun atau Rp {(Math.round(nisabMonthly)).toLocaleString('id-ID')} per bulan).
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-stone-800 block mb-1">
                Gaji / Penghasilan Pokok Bulanan (Rp):
              </label>
              <input
                type="text"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value.replace(/\D/g, ''))}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs font-mono focus:ring-1 focus:ring-emerald-700 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-800 block mb-1">
                Penghasilan Tambahan / Bonus / Tunjangan Lainnya (Rp):
              </label>
              <input
                type="text"
                value={otherIncome}
                onChange={(e) => setOtherIncome(e.target.value.replace(/\D/g, ''))}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs font-mono focus:ring-1 focus:ring-emerald-700 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-stone-800 block mb-1">
                Kebutuhan Pokok Bulanan & Cicilan Pokok (Rp):
              </label>
              <input
                type="text"
                value={monthlyExpense}
                onChange={(e) => setMonthlyExpense(e.target.value.replace(/\D/g, ''))}
                className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs font-mono focus:ring-1 focus:ring-emerald-700 focus:outline-none"
              />
            </div>

            {/* Result Box */}
            <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 space-y-2">
              <div className="flex justify-between text-stone-600">
                <span>Penghasilan Bersih Bulanan:</span>
                <span className="font-mono font-semibold">Rp {netMonthly.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Standar Nisab Bulanan:</span>
                <span className="font-mono">Rp {Math.round(nisabMonthly).toLocaleString('id-ID')}</span>
              </div>
              <div className="border-t border-stone-200 pt-2 flex justify-between items-center">
                <span className="font-semibold text-stone-900">Kewajiban Zakat (2.5%):</span>
                <div className="text-right">
                  <div className="font-serif font-bold text-lg text-emerald-950">
                    Rp {calculatedZakat.toLocaleString('id-ID')} / bulan
                  </div>
                  <span className="text-[10px] text-stone-500">
                    {isObligatedZakat ? 'Wajib Zakat Maal' : 'Belum Mencapai Nisab (Dianjurkan Infaq/Sedekah)'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenDonateModal('camp-2')}
              className="w-full py-3 px-4 bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-semibold rounded-lg text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4" />
              <span>Tunaikan Zakat / Infaq Sekarang</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Pendaftaran Relawan */}
      {activeTab === 'relawan' && (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 animate-in fade-in duration-200 shadow-xs">
          <div className="space-y-2 border-b border-stone-200 pb-4">
            <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold font-mono">
              Khidmat Kemanusiaan
            </span>
            <h3 className="font-serif font-bold text-xl text-stone-900">
              Formulir Pendaftaran Relawan YPI Arief Fabrianto
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Bergabunglah bersama barisan relawan yang mendistribusikan kebaikan Jumat Berkah, mengajar adik-adik dhuafa, atau mendampingi posko kesehatan.
            </p>
          </div>

          {!volSuccess ? (
            <form onSubmit={handleVolunteerSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-stone-800 block mb-1">Nama Lengkap Relawan:</label>
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap Anda"
                  value={volName}
                  onChange={(e) => setVolName(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-800 block mb-1">No. WhatsApp / HP:</label>
                <input
                  type="tel"
                  required
                  placeholder="0812xxxxxxxx"
                  value={volPhone}
                  onChange={(e) => setVolPhone(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-stone-800 block mb-1">Bidang Minat Pengabdian:</label>
                <select
                  value={volInterest}
                  onChange={(e) => setVolInterest(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                >
                  <option value="sosial">Sosial (Jumat Berkah & Santunan Yatim)</option>
                  <option value="pendidikan">Pendidikan (Guru Pengajar / Asisten Belajar)</option>
                  <option value="kesehatan">Kesehatan & P3K Posko Darurat</option>
                  <option value="dakwah">Dakwah & Pengorganisasian Majelis / Silat</option>
                  <option value="media">Dokumentasi Media & Desain Grafis</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-stone-800 block mb-1">Keahlian / Pengalaman Pendukung:</label>
                <textarea
                  rows={2}
                  placeholder="Cth: Mahasiswa keguruan, berpengalaman memasak dapur umum, atau pernah ikut PMI..."
                  value={volSkill}
                  onChange={(e) => setVolSkill(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-semibold rounded-lg text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>Kirim Formulir Relawan</span>
              </button>
            </form>
          ) : (
            <div className="py-6 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7 text-emerald-700" />
              </div>
              <h4 className="font-serif font-bold text-lg text-stone-900">
                Terima Kasih, Sahabat Relawan!
              </h4>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Data Anda telah diterima tim koordinator relawan YPI Arief Fabrianto. Kami akan menghubungi Anda melalui WhatsApp saat ada aksi kegiatan sesuai minat Anda.
              </p>
              <button
                onClick={() => setVolSuccess(false)}
                className="mt-2 text-xs font-semibold text-emerald-800 hover:underline"
              >
                Kirim Pendaftaran Lain
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
