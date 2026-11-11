import React, { useState } from 'react';
import { ContactMessage } from '../types';
import { FOUNDATION_INFO } from '../data/initialData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

interface ContactSectionProps {
  onSendMessage: (msg: ContactMessage) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onSendMessage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
      sentAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'unread',
    };

    onSendMessage(newMsg);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
  };

  const faqs = [
    {
      q: 'Bagaimana cara mendaftarkan anak saya pada program bimbingan belajar gratis?',
      a: 'Pendaftaran dapat dilakukan secara langsung melalui menu Pendidikan di website ini atau datang langsung ke sekretariat yayasan pada jam kerja dengan membawa fotokopi kartu keluarga.'
    },
    {
      q: 'Apakah donasi yang disalurkan melalui YPI Arief Fabrianto memiliki tanda terima resmi?',
      a: 'Ya, seluruh transaksi donasi baik melalui transfer bank syariah maupun QRIS akan menerima nomor kode resi unik serta konfirmasi resmi dari tim bendahara yayasan.'
    },
    {
      q: 'Kapan jadwal latihan Perguruan Silat Sin Lam Ba diselenggarakan?',
      a: 'Latihan rutin diadakan setiap malam Jumat (Kamis malam) pukul 21.00 WIB dan malam Minggu (Sabtu malam) pukul 20.30 WIB di aula serbaguna yayasan.'
    },
    {
      q: 'Apakah masyarakat umum di luar Tebet/Menteng Dalam boleh mengikuti pengajian umum mingguan?',
      a: 'Tentu saja. Majelis taklim dan pengajian umum malam Jumat terbuka untuk seluruh kaum muslimin dan muslimat tanpa dipungut biaya apapun.'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      
      {/* Title */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold font-mono">
          Sekretariat & Hubungan Masyarakat
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
          Kontak & Informasi Lokasi Yayasan
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Silakan hubungi kami untuk informasi kegiatan, pendaftaran santri, konfirmasi donasi, atau kunjungan silaturahmi ke kantor sekretariat.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Contact Cards & Office Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-5">
            <h3 className="font-serif font-bold text-xl text-stone-900">
              Kantor Sekretariat Utama
            </h3>

            <div className="space-y-4 text-xs text-stone-600">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-stone-800 block text-xs">Alamat Resmi Lembaga:</span>
                  <p className="text-stone-600 mt-0.5 leading-relaxed">
                    {FOUNDATION_INFO.address}
                  </p>
                  <span className="text-[11px] text-emerald-800 font-mono mt-1 block">
                    (Dekat kawasan Menteng Dalam & Tebet Barat)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-stone-800 block text-xs">Telepon & WhatsApp:</span>
                  <p className="text-stone-600 mt-0.5 font-mono">
                    {FOUNDATION_INFO.phone} / {FOUNDATION_INFO.whatsapp}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-stone-800 block text-xs">Email Korespondensi:</span>
                  <p className="text-stone-600 mt-0.5 font-mono">
                    {FOUNDATION_INFO.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-stone-800 block text-xs">Jam Layanan Sekretariat:</span>
                  <p className="text-stone-600 mt-0.5">
                    Senin – Sabtu: 08.30 – 17.00 WIB <br />
                    Ahad / Hari Libur: Sesuai Jadwal Kegiatan Majelis
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Map Embed Container */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="p-4 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
              <span className="text-xs font-semibold text-stone-800">Peta Lokasi Menteng Dalam, Tebet</span>
              <a
                href="https://maps.google.com/?q=Menteng+Dalam+Tebet+Jakarta+Selatan"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-emerald-800 hover:underline font-medium"
              >
                Buka di Google Maps
              </a>
            </div>
            <div className="h-56 bg-stone-100 w-full relative">
              <iframe
                title="Peta Lokasi YPI Arief Fabrianto"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15864.71715024466!2d106.840742!3d-6.239908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f394464c8c7f%3A0x6b09bb995ec0a0cf!2sMenteng%20Dalam%2C%20Tebet%2C%20South%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Message Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <div className="space-y-2 border-b border-stone-200 pb-4 mb-6">
              <h3 className="font-serif font-bold text-2xl text-stone-900">
                Kirim Pesan / Pertanyaan
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Tuliskan pesan, saran, atau pertanyaan Anda. Tim sekretariat yayasan akan membaca dan membalas melalui email atau WhatsApp.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-stone-800 block mb-1">
                      Nama Lengkap Anda:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nama Lengkap"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-800 block mb-1">
                      No. WhatsApp / HP Aktif:
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0812xxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-stone-800 block mb-1">
                      Alamat Email (Opsional):
                    </label>
                    <input
                      type="email"
                      placeholder="nama@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-stone-800 block mb-1">
                      Subjek Pesan:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Cth: Pertanyaan Infaq / Kelas Tahsin"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-stone-800 block mb-1">
                    Isi Pesan:
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tuliskan uraian pesan atau pertanyaan Anda di sini..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-semibold rounded-lg text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan Sekarang</span>
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7 text-emerald-700" />
                </div>
                <h4 className="font-serif font-bold text-lg text-stone-900">
                  Pesan Anda Telah Terkirim!
                </h4>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Terima kasih, {name}. Pesan Anda telah tersimpan di kotak masuk sekretariat YPI Arief Fabrianto dan akan segera ditanggapi.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-2 text-xs font-semibold text-emerald-800 hover:underline"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            )}
          </div>

          {/* FAQ Accordion */}
          <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 space-y-3">
            <h4 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-800" />
              <span>Pertanyaan yang Kerap Diajukan (FAQ)</span>
            </h4>

            <div className="space-y-2 pt-1 text-xs">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} className="bg-white rounded-lg border border-stone-200 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full p-3.5 text-left font-semibold text-stone-800 flex items-center justify-between gap-2 hover:bg-stone-50 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-3.5 pt-0 text-stone-600 leading-relaxed border-t border-stone-100 text-[11px] bg-stone-50/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
