import React, { useState } from 'react';
import { FOUNDATION_INFO } from '../data/initialData';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Building, 
  Award, 
  Users, 
  Quote, 
  ChevronRight,
  Sparkles,
  FileText,
  Palette
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [activeSubmenu, setActiveSubmenu] = useState<
    'sejarah' | 'visi-misi' | 'struktur' | 'filosofi-logo' | 'legalitas' | 'sambutan'
  >('sejarah');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      
      {/* Title & Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold font-mono">
          Tentang Kami
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
          Mengenal Yayasan Pendidikan Islam Arief Fabrianto
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Lembaga nirlaba yang berkhidmat dalam mendidik generasi muda, membina dakwah keislaman, menghadirkan pelayanan sosial kemanusiaan, serta memberdayakan ekonomi umat.
        </p>
      </div>

      {/* Submenu Navigation Bar */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2 border-b border-stone-200 scrollbar-none text-xs font-medium">
        {[
          { id: 'sejarah', label: 'Sejarah & Profil' },
          { id: 'visi-misi', label: 'Visi & Misi' },
          { id: 'sambutan', label: 'Sambutan Ketua Yayasan' },
          { id: 'filosofi-logo', label: 'Filosofi Logo & Visual' },
          { id: 'struktur', label: 'Struktur Organisasi' },
          { id: 'legalitas', label: 'Legalitas Lembaga' },
        ].map((sub) => {
          const isActive = activeSubmenu === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => setActiveSubmenu(sub.id as any)}
              className={`px-4 py-2.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-emerald-900 text-amber-300 font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {sub.label}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-10 lg:p-12 shadow-xs">
        
        {/* Submenu 1: Sejarah & Profil */}
        {activeSubmenu === 'sejarah' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                  Sejarah Pendirian Lembaga
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  Lahir dari Kepedulian Nyata untuk Menteng Dalam dan Sekitarnya
                </h2>
                <div className="text-stone-600 text-sm leading-relaxed space-y-3">
                  <p>
                    Yayasan Pendidikan Islam Arief Fabrianto didirikan pada tahun 2022 di Menteng Dalam, Tebet, Jakarta Selatan. Kelahiran yayasan ini diprakarsai oleh Arief Fabrianto bersama para tokoh masyarakat, asatidz, dan relawan kemanusiaan yang memiliki visi bersama: menghadirkan wadah pendidikan dan pelayanan terpadu yang dapat diakses oleh semua lapisan masyarakat, terutama kalangan dhuafa dan anak-anak yatim.
                  </p>
                  <p>
                    Sejak awal berdirinya, yayasan tidak hanya berfokus pada ruang kelas bimbingan belajar, melainkan memadukan lima pilar utama: pendidikan formal & diniyah, dakwah ahlussunnah wal jamaah, kepedulian sosial seperti program Jumat Berkah dan santunan rutin, posko kesehatan preventif gratis, serta pendampingan kewirausahaan ekonomi keluarga.
                  </p>
                  <p>
                    Alhamdulillah, berkat izin Allah SWT serta kepercayaan para donatur dan masyarakat, kini YPI Arief Fabrianto terus melayani ratusan penerima manfaat setiap pekannya secara berkesinambungan.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="bg-stone-50 rounded-xl p-6 border border-stone-200 space-y-4">
                  <h3 className="font-serif font-bold text-lg text-emerald-950 border-b border-stone-200 pb-2">
                    Identitas Singkat Lembaga
                  </h3>
                  <dl className="text-xs space-y-3">
                    <div>
                      <dt className="text-stone-400 font-medium">Nama Resmi:</dt>
                      <dd className="font-semibold text-stone-900 mt-0.5">{FOUNDATION_INFO.name}</dd>
                    </div>
                    <div>
                      <dt className="text-stone-400 font-medium">Nama Singkat:</dt>
                      <dd className="font-semibold text-emerald-900 mt-0.5">{FOUNDATION_INFO.shortName}</dd>
                    </div>
                    <div>
                      <dt className="text-stone-400 font-medium">Slogan Yayasan:</dt>
                      <dd className="font-serif italic text-amber-700 font-semibold mt-0.5">"{FOUNDATION_INFO.slogan}"</dd>
                    </div>
                    <div>
                      <dt className="text-stone-400 font-medium">Tahun Berdiri:</dt>
                      <dd className="font-semibold text-stone-900 mt-0.5">{FOUNDATION_INFO.foundedYear}</dd>
                    </div>
                    <div>
                      <dt className="text-stone-400 font-medium">Ketua Umum:</dt>
                      <dd className="font-semibold text-stone-900 mt-0.5">{FOUNDATION_INFO.leader}</dd>
                    </div>
                    <div>
                      <dt className="text-stone-400 font-medium">Alamat Sekretariat:</dt>
                      <dd className="text-stone-700 mt-0.5">{FOUNDATION_INFO.address}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submenu 2: Visi & Misi */}
        {activeSubmenu === 'visi-misi' && (
          <div className="space-y-10 animate-in fade-in duration-200">
            {/* Visi */}
            <div className="bg-emerald-950 text-white rounded-xl p-8 sm:p-10 border border-emerald-900 space-y-3">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold font-mono">
                Visi Yayasan
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold leading-relaxed text-amber-100">
                "{FOUNDATION_INFO.vision}"
              </h2>
            </div>

            {/* Misi */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold font-mono">
                Tujuh Butir Misi Utama
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Pilar Langkah Strategis YPI Arief Fabrianto
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {FOUNDATION_INFO.missions.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex items-start gap-3"
                  >
                    <div className="w-7 h-7 rounded-full bg-emerald-900 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                      {m}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Submenu 3: Sambutan Ketua Yayasan */}
        {activeSubmenu === 'sambutan' && (
          <div className="space-y-6 max-w-4xl animate-in fade-in duration-200">
            <div className="flex items-center gap-4 border-b border-stone-200 pb-6">
              <div className="w-16 h-16 rounded-full bg-emerald-900 flex items-center justify-center text-amber-400 font-serif font-bold text-2xl border-2 border-amber-400/40">
                AF
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold text-stone-900">{FOUNDATION_INFO.leader}</h2>
                <p className="text-xs text-stone-500 font-medium">Ketua Umum Yayasan Pendidikan Islam Arief Fabrianto</p>
              </div>
            </div>

            <div className="text-stone-700 text-sm leading-relaxed space-y-4">
              <p className="italic text-emerald-900 font-serif text-base border-l-2 border-amber-500 pl-4 py-1">
                "Assalamu'alaikum Warahmatullahi Wabarakatuh. Segala puji bagi Allah Rabb semesta alam, shalawat serta salam senantiasa tercurah kepada junjungan kita Baginda Nabi Muhammad SAW, beserta keluarga, sahabat, dan pengikutnya hingga akhir zaman."
              </p>
              <p>
                Rasa syukur mendalam kami panjatkan atas terselenggaranya website resmi YPI Arief Fabrianto ini. Kehadiran portal ini kami niatkan sebagai jendela informasi yang transparan dan jembatan silaturahmi yang menghubungkan yayasan dengan para santri, jamaah, donatur dermawan, mitra kolaborasi, serta masyarakat luas.
              </p>
              <p>
                Tantangan zaman yang dihadapi generasi muda kian kompleks. Kemajuan teknologi informasi memerlukan benteng aqidah yang kokoh, adab yang luhur, serta kecakapan praktis agar mereka tidak hanya menjadi penonton, melainkan pelaku kebaikan yang mandiri dan berintegritas. Di YPI Arief Fabrianto, kami mengintegrasikan pembelajaran ilmu pengetahuan umum dengan dasar-dasar ilmu agama Islam, diimbangi dengan pembinaan jasmani melalui bela diri tradisional P.S. Sin Lam Ba, dan pembiasaan empati sosial lewat Jumat Berkah.
              </p>
              <p>
                Kami mengucapkan terima kasih setulus-tulusnya kepada para sesepuh, asatidz, pengurus, relawan, dan para muhsinin yang senantiasa menopang gerak langkah yayasan. Semoga setiap tetes peluh dan rupiah yang disedekahkan menjadi amal jariyah yang terus mengalir pahalanya.
              </p>
              <p className="font-serif font-semibold text-stone-900 pt-2">
                Wassalamu'alaikum Warahmatullahi Wabarakatuh.
              </p>
            </div>
          </div>
        )}

        {/* Submenu 4: Filosofi Logo & Visual */}
        {activeSubmenu === 'filosofi-logo' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                Identitas Visual Lembaga
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                Filosofi Logo Resmi & Harmoni Visual
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
                Identitas visual YPI Arief Fabrianto dirancang memadukan nilai keluhuran Islam, ketegasan amanah, kemuliaan ilmu, dan kesucian niat dalam mendidik generasi mandiri.
              </p>
            </div>

            {/* Official Logo Display & Anatomy Card */}
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Logo Image Showcase */}
                <div className="md:col-span-5 flex flex-col items-center justify-center">
                  <div className="w-64 h-64 sm:w-72 sm:h-72 bg-white rounded-2xl p-4 shadow-md border border-stone-200 flex items-center justify-center">
                    <img
                      src="/assets/aistudio/logo_dan_slogan_ab63ff9c.png"
                      alt="Logo Resmi YPI Arief Fabrianto"
                      className="w-full h-full object-contain filter drop-shadow-sm"
                    />
                  </div>
                  <span className="text-[11px] font-mono text-stone-500 mt-3">
                    Logo Resmi Yayasan Pendidikan Islam Arief Fabrianto
                  </span>
                </div>

                {/* Logo Anatomy Details */}
                <div className="md:col-span-7 space-y-4">
                  <h3 className="font-serif font-bold text-xl text-stone-900">
                    Makna Unsur Visual Logo:
                  </h3>

                  <div className="space-y-3 text-xs text-stone-700">
                    <div className="p-3 bg-white rounded-xl border border-stone-200">
                      <strong className="text-emerald-950 font-semibold block text-sm">
                        1. Bentuk Perisai (Shield) Berlapis
                      </strong>
                      <p className="text-stone-600 mt-0.5 leading-relaxed">
                        Melambangkan benteng pertahanan aqidah, perlindungan terhadap generasi muda dari pengaruh negatif zaman, serta keteguhan memegang amanah hukum dan syariah.
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-stone-200">
                      <strong className="text-emerald-950 font-semibold block text-sm">
                        2. Mahkota Bunga / Ornamen Putih Mekar di Tengah
                      </strong>
                      <p className="text-stone-600 mt-0.5 leading-relaxed">
                        Mencerminkan potensi fitrah manusia yang bertumbuh mekar melalui ilmu pengetahuan dan pendidikan Al-Qur'an, dilandasi niat yang suci dan tulus lillahi ta'ala.
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-stone-200">
                      <strong className="text-emerald-950 font-semibold block text-sm">
                        3. Slogan & Garis Lengkung Dinamis
                      </strong>
                      <p className="text-stone-600 mt-0.5 leading-relaxed">
                        Tulisan <em>"Bertumbuh Bersama Generasi Islami Mandiri"</em> diapit garis lengkung emas dan hijau menggambarkan gerakan yang dinamis, optimis, dan terus bergerak maju memandirikan umat.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* 4 Colors Meaning Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Hijau */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-900 flex items-center justify-center text-white">
                  <Palette className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-stone-900">Hijau Islami (Primer)</h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Warna dasar pada perisai melambangkan keteduhan syiar Islam, kedamaian hati, kelestarian kebaikan, serta komitmen mengakar pada nilai-nilai nubuwah.
                  </p>
                </div>
              </div>

              {/* Kuning Emas */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-white">
                  <Palette className="w-5 h-5 text-amber-100" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-stone-900">Kuning Emas (Aksen Mulia)</h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Bingkai kuning keemasan mencerminkan kemuliaan ilmu, keunggulan budi pekerti, serta keberkahan dalam muamalah dan pemberdayaan ekonomi umat.
                  </p>
                </div>
              </div>

              {/* Merah */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center text-white">
                  <Palette className="w-5 h-5 text-red-100" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-stone-900">Merah (List Pelindung)</h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Garis tepi merah melambangkan ketegasan memegang prinsip kebenaran, keberanian moral, serta kesiapsiagaan dalam tanggap kemanusiaan darurat.
                  </p>
                </div>
              </div>

              {/* Putih Bersih */}
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 space-y-3">
                <div className="w-10 h-10 rounded-lg bg-white border border-stone-300 flex items-center justify-center text-stone-800">
                  <Palette className="w-5 h-5 text-stone-600" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-stone-900">Putih Bersih (Kesucian)</h4>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Warna kelopak utama melambangkan ketulusan niat beramal, kebersihan hati, kejujuran dalam berorganisasi, serta transparansi laporan dana umat.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Submenu 5: Struktur Organisasi */}
        {activeSubmenu === 'struktur' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                Tata Kelola Profesional
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                Struktur Pengurus & Dewan Yayasan
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl">
                Pengelolaan yayasan dilaksanakan dengan prinsip amanah, pembagian tugas yang jelas, dan pengawasan berkala.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {FOUNDATION_INFO.structure.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-stone-200 bg-stone-50 hover:bg-white hover:border-emerald-600/60 transition-all shadow-2xs"
                >
                  <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-800 font-semibold block">
                    {item.role}
                  </span>
                  <h4 className="font-serif font-bold text-base text-stone-900 mt-1">
                    {item.name}
                  </h4>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submenu 6: Legalitas Lembaga */}
        {activeSubmenu === 'legalitas' && (
          <div className="space-y-6 max-w-3xl animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                Keabsahan Hukum Republik Indonesia
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                Legalitas dan Akreditasi Yayasan
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                YPI Arief Fabrianto adalah lembaga berbadan hukum sah yang diakui oleh Kementerian Hukum dan Hak Asasi Manusia Republik Indonesia.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-900 text-amber-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-stone-400 font-medium">SK Kemenkumham RI:</span>
                  <div className="font-mono font-bold text-sm text-stone-900 mt-0.5">
                    {FOUNDATION_INFO.legalDoc}
                  </div>
                  <p className="text-xs text-stone-600 mt-1">
                    Pengesahan Pendirian Badan Hukum Yayasan Pendidikan Islam Arief Fabrianto secara definitif.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-900 text-amber-400 flex items-center justify-center shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-stone-400 font-medium">Domisili Hukum & Sekretariat:</span>
                  <div className="font-semibold text-sm text-stone-900 mt-0.5">
                    Kelurahan Menteng Dalam, Kecamatan Tebet, Kota Jakarta Selatan 12870
                  </div>
                  <p className="text-xs text-stone-600 mt-1">
                    Terdata dan berkoordinasi aktif dengan pengurus RT 006 / RW 003 serta kelurahan setempat.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-900 text-amber-400 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-stone-400 font-medium">Pemisahan Rekening Amanah:</span>
                  <div className="font-semibold text-sm text-stone-900 mt-0.5">
                    Akun Rekening Bank Syariah Khusus Atas Nama Yayasan
                  </div>
                  <p className="text-xs text-stone-600 mt-1">
                    Seluruh aliran infaq, zakat, dan sedekah dipisahkan dari anggaran belanja operasional unit usaha untuk menjamin kesucian amanah donatur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
