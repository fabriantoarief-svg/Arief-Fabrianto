import React, { useState } from 'react';
import { ClassItem, StudentRegistration } from '../types';
import { 
  GraduationCap, 
  Clock, 
  UserCheck, 
  BookOpen, 
  CheckCircle2, 
  X, 
  FileText, 
  Download,
  Printer,
  Sparkles
} from 'lucide-react';

interface EducationSectionProps {
  classes: ClassItem[];
  onNewRegistration: (reg: StudentRegistration) => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  classes,
  onNewRegistration,
}) => {
  const [selectedClass, setSelectedClass] = useState<ClassItem | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Registration Form State
  const [fullName, setFullName] = useState('');
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [notes, setNotes] = useState('');
  const [registeredSuccess, setRegisteredSuccess] = useState<StudentRegistration | null>(null);

  const handleOpenRegister = (cls: ClassItem) => {
    setSelectedClass(cls);
    setRegisteredSuccess(null);
    setModalOpen(true);
  };

  const handleSubmitRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClass) return;

    const regNumber = `REG-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newReg: StudentRegistration = {
      id: `reg-${Date.now()}`,
      registrationNumber: regNumber,
      fullName: fullName.trim(),
      parentName: parentName.trim(),
      phone: phone.trim(),
      email: email.trim() || 'wali@santri.id',
      address: address.trim(),
      classId: selectedClass.id,
      className: selectedClass.title,
      dateOfBirth,
      notes: notes.trim() || undefined,
      registeredAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'pending',
    };

    onNewRegistration(newReg);
    setRegisteredSuccess(newReg);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setRegisteredSuccess(null);
    setFullName('');
    setParentName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setDateOfBirth('');
    setNotes('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      
      {/* Title */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold font-mono">
          Pusat Pembelajaran & Kaderisasi
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
          Pendidikan, Kursus & Bimbingan Belajar
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Mencetak generasi yang unggul dalam ilmu pengetahuan umum dan teguh memegang tuntunan syariah. Bimbingan belajar terbuka bagi santri, dhuafa, dan masyarakat luas.
        </p>
      </div>

      {/* Featured Banner / Information */}
      <div className="bg-emerald-950 text-white rounded-2xl p-6 sm:p-10 border border-emerald-900 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-300 font-semibold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pendaftaran Gelombang Semester Baru Dibuka</span>
          </div>
          <h3 className="font-serif text-2xl font-bold">
            Program Belajar Gratis Bagi Anak Yatim & Santri Prasejahtera
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-light">
            Yayasan menyediakan fasilitas modul gratis, pengajar berpengalaman, ruang kelas berpendingin, serta lab komputer.
          </p>
        </div>
        <div className="bg-emerald-900/80 border border-emerald-700/80 rounded-xl p-4 text-center shrink-0 w-full md:w-auto">
          <span className="text-xs text-emerald-200 block">Status Kuota Belajar:</span>
          <span className="font-serif font-bold text-xl text-amber-300">Tersedia Kuota Terbatas</span>
          <span className="text-[11px] text-emerald-300 block mt-1">Daftar sekarang sebelum ditutup</span>
        </div>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => {
          const quotaPercent = Math.min(100, Math.round((cls.enrolled / cls.capacity) * 100));
          const isFull = cls.enrolled >= cls.capacity;

          return (
            <div
              key={cls.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    {cls.code}
                  </span>
                  <span className="font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full text-[11px]">
                    {cls.fee}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 leading-snug">
                    {cls.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Tingkat: <strong className="text-stone-700">{cls.targetLevel}</strong>
                  </p>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {cls.description}
                </p>

                {/* Instructor & Schedule */}
                <div className="space-y-1.5 pt-2 text-xs text-stone-600 border-t border-stone-100">
                  <div className="flex items-start gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                    <span>Pengajar: <strong className="text-stone-800">{cls.instructor}</strong></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <span>Jadwal: {cls.schedule}</span>
                  </div>
                </div>

                {/* Syllabus Highlights */}
                <div className="pt-2 border-t border-stone-100">
                  <span className="text-[11px] font-semibold text-stone-700 block mb-1.5 uppercase tracking-wider">
                    Materi Silabus Inti:
                  </span>
                  <ul className="space-y-1 text-xs text-stone-600">
                    {cls.syllabus.map((syl, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{syl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Card Bar */}
              <div className="p-6 pt-0 space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-stone-500 font-mono">
                    <span>Terdaftar: {cls.enrolled} / {cls.capacity} Siswa</span>
                    <span>{quotaPercent}%</span>
                  </div>
                  <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isFull ? 'bg-red-500' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${quotaPercent}%` }}
                    />
                  </div>
                </div>

                <button
                  disabled={isFull}
                  onClick={() => handleOpenRegister(cls)}
                  className={`w-full py-2.5 px-4 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isFull
                      ? 'bg-stone-200 text-stone-500 cursor-not-allowed'
                      : 'bg-emerald-900 hover:bg-emerald-800 text-white shadow-xs'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 text-amber-300" />
                  <span>{isFull ? 'Kuota Penuh' : 'Daftar Kelas Ini'}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Registration Modal */}
      {modalOpen && selectedClass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="bg-emerald-950 text-white px-6 py-4 flex items-center justify-between border-b border-emerald-900">
              <div>
                <h3 className="font-serif font-bold text-base">Pendaftaran Santri / Siswa</h3>
                <p className="text-[11px] text-emerald-200">{selectedClass.title}</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-stone-300 hover:text-white p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs text-stone-700">
              {!registeredSuccess ? (
                <form onSubmit={handleSubmitRegistration} className="space-y-3.5">
                  <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
                    <span className="text-[11px] text-stone-500 block">Kelas yang dipilih:</span>
                    <strong className="text-stone-900 text-sm block">{selectedClass.title}</strong>
                    <span className="text-stone-600 block mt-0.5">{selectedClass.schedule} · Biaya: {selectedClass.fee}</span>
                  </div>

                  <div>
                    <label className="font-semibold text-stone-800 block mb-1">Nama Lengkap Siswa / Santri:</label>
                    <input
                      type="text"
                      required
                      placeholder="Cth: Muhammad Al-Fatih"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-stone-800 block mb-1">Tanggal Lahir:</label>
                      <input
                        type="date"
                        required
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-stone-800 block mb-1">Nama Orang Tua / Wali:</label>
                      <input
                        type="text"
                        required
                        placeholder="Nama Ayah / Ibu"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-stone-800 block mb-1">No. WhatsApp / HP Aktif:</label>
                      <input
                        type="tel"
                        required
                        placeholder="0812xxxxxxxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-stone-800 block mb-1">Email Wali (Opsional):</label>
                      <input
                        type="email"
                        placeholder="nama@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-stone-800 block mb-1">Alamat Tinggal Lengkap:</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Jl. ..., RT ... / RW ..., Kelurahan, Kecamatan"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-800 block mb-1">Catatan Khusus / Riwayat Pendidikan:</label>
                    <input
                      type="text"
                      placeholder="Cth: Pernah belajar iqro jilid 4 / butuh bimbingan ekstra matematika"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-semibold rounded-lg text-xs shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Kirim Formulir Pendaftaran</span>
                  </button>
                </form>
              ) : (
                <div className="space-y-4 py-3 text-center animate-in zoom-in-95 duration-200">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7 text-emerald-700" />
                  </div>

                  <div>
                    <h4 className="font-serif font-bold text-lg text-emerald-950">
                      Pendaftaran Berhasil Dikirim!
                    </h4>
                    <p className="text-stone-600 text-xs mt-1">
                      Data pendaftaran santri telah masuk ke sistem database YPI Arief Fabrianto.
                    </p>
                  </div>

                  {/* Digital Receipt Card */}
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-left space-y-2 font-mono text-xs">
                    <div className="flex justify-between border-b border-stone-200 pb-1.5">
                      <span className="text-stone-500">No. Pendaftaran:</span>
                      <strong className="text-emerald-900">{registeredSuccess.registrationNumber}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Nama Santri:</span>
                      <span className="text-stone-900 font-semibold">{registeredSuccess.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Nama Wali:</span>
                      <span className="text-stone-900">{registeredSuccess.parentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Kelas:</span>
                      <span className="text-stone-900 truncate max-w-[200px]">{registeredSuccess.className}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Status Awal:</span>
                      <span className="text-amber-700 font-semibold">Menunggu Verifikasi Sekretariat</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-stone-500">
                    Tim panitia penerimaan santri baru akan menghubungi nomor WhatsApp <strong>{registeredSuccess.phone}</strong> untuk jadwal penempatan kelas dan pengarahan perdana.
                  </p>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="w-1/2 py-2 px-3 border border-stone-300 rounded-lg text-stone-700 font-medium hover:bg-stone-100 flex items-center justify-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Cetak Bukti</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="w-1/2 py-2 px-3 bg-emerald-900 hover:bg-emerald-800 text-white rounded-lg font-semibold"
                    >
                      Selesai
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
