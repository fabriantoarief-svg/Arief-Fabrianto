import React, { useState } from 'react';
import { DonationCampaign, DonationRecord } from '../types';
import { FOUNDATION_INFO } from '../data/initialData';
import { X, Heart, CheckCircle2, QrCode, Building2, Copy, Check } from 'lucide-react';

interface QuickDonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaigns: DonationCampaign[];
  onDonateSuccess: (record: DonationRecord) => void;
  defaultCampaignId?: string;
}

export const QuickDonateModal: React.FC<QuickDonateModalProps> = ({
  isOpen,
  onClose,
  campaigns,
  onDonateSuccess,
  defaultCampaignId,
}) => {
  const [selectedCampaignId, setSelectedCampaignId] = useState(defaultCampaignId || campaigns[0]?.id || '');
  const [selectedAmount, setSelectedAmount] = useState<number>(100000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'BSI' | 'BCA' | 'Mandiri' | 'QRIS'>('BSI');
  const [donorName, setDonorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [phone, setPhone] = useState('');
  const [doaHarapan, setDoaHarapan] = useState('');
  const [isCopied, setIsCopied] = useState<string | null>(null);
  const [step, setStep] = useState<'form' | 'transfer' | 'success'>('form');
  const [createdRecord, setCreatedRecord] = useState<DonationRecord | null>(null);

  if (!isOpen) return null;

  const quickAmounts = [50000, 100000, 250000, 500000, 1000000, 2500000];

  const effectiveAmount = customAmount ? parseInt(customAmount.replace(/\D/g, ''), 10) || 0 : selectedAmount;

  const currentCampaign = campaigns.find(c => c.id === selectedCampaignId) || campaigns[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(text);
    setTimeout(() => setIsCopied(null), 2000);
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!effectiveAmount || effectiveAmount < 10000) {
      alert('Nominal infaq/donasi minimal adalah Rp 10.000');
      return;
    }

    const uniqueCode = Math.floor(Math.random() * 899) + 100;
    const finalAmount = effectiveAmount + (paymentMethod !== 'QRIS' ? uniqueCode : 0);
    const donationCode = `YPI-${Date.now().toString().slice(-6)}`;

    const newRecord: DonationRecord = {
      id: `don-${Date.now()}`,
      donationCode,
      donorName: isAnonymous ? 'Hamba Allah' : donorName.trim() || 'Hamba Allah',
      isAnonymous,
      donorPhone: phone.trim() || '-',
      campaignId: currentCampaign?.id || 'camp-general',
      campaignTitle: currentCampaign?.title || 'Program Umum YPI Arief Fabrianto',
      amount: finalAmount,
      paymentMethod,
      doaHarapan: doaHarapan.trim() || undefined,
      date: new Date().toISOString().split('T')[0],
      status: 'confirmed',
    };

    setCreatedRecord(newRecord);
    setStep('transfer');
  };

  const handleFinalConfirm = () => {
    if (createdRecord) {
      onDonateSuccess(createdRecord);
      setStep('success');
    }
  };

  const handleFinish = () => {
    setStep('form');
    setCustomAmount('');
    setDonorName('');
    setIsAnonymous(false);
    setPhone('');
    setDoaHarapan('');
    onClose();
  };

  const selectedBankInfo = FOUNDATION_INFO.bankAccounts.find(b => 
    paymentMethod === 'BSI' ? b.bank.includes('BSI') :
    paymentMethod === 'BCA' ? b.bank.includes('BCA') :
    b.bank.includes('Mandiri')
  ) || FOUNDATION_INFO.bankAccounts[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-emerald-950 text-white px-6 py-4 flex items-center justify-between border-b border-emerald-900">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-amber-400" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base leading-tight">Donasi & Kepedulian Umat</h3>
              <p className="text-[11px] text-emerald-200">Amanah, Transparan, Langsung Disalurkan</p>
            </div>
          </div>
          <button
            onClick={handleFinish}
            className="p-1 rounded-md text-stone-300 hover:text-white hover:bg-emerald-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-stone-700">
          {step === 'form' && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              {/* Campaign Picker */}
              <div>
                <label className="font-semibold text-stone-800 block mb-1">Pilih Program Kebaikan:</label>
                <select
                  value={selectedCampaignId}
                  onChange={(e) => setSelectedCampaignId(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs font-medium focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                >
                  {campaigns.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount Selection */}
              <div>
                <label className="font-semibold text-stone-800 block mb-1.5">Pilih Nominal Infaq / Sedekah:</label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {quickAmounts.map((amt) => {
                    const isSelected = selectedAmount === amt && !customAmount;
                    return (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => {
                          setSelectedAmount(amt);
                          setCustomAmount('');
                        }}
                        className={`py-2 px-2 text-center rounded-lg border text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-emerald-900 text-amber-300 border-emerald-900 shadow-2xs'
                            : 'bg-white hover:bg-stone-100 text-stone-800 border-stone-200'
                        }`}
                      >
                        Rp {amt.toLocaleString('id-ID')}
                      </button>
                    );
                  })}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-stone-400 font-medium">Rp</span>
                  <input
                    type="text"
                    placeholder="Atau ketik nominal lain (cth: 75.000)"
                    value={customAmount}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setCustomAmount(val ? parseInt(val, 10).toLocaleString('id-ID') : '');
                    }}
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="font-semibold text-stone-800 block mb-1.5">Metode Pembayaran Amanah:</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['BSI', 'Mandiri', 'BCA', 'QRIS'] as const).map((method) => {
                    const isSelected = paymentMethod === method;
                    return (
                      <button
                        type="button"
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`py-2 text-center rounded-lg border text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-emerald-800 text-white border-emerald-800'
                            : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-200'
                        }`}
                      >
                        {method}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Donor Data */}
              <div className="space-y-2 pt-1 border-t border-stone-100">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-stone-800">Nama Donatur / Muhsinin:</label>
                  <label className="inline-flex items-center gap-1.5 text-[11px] text-stone-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded text-emerald-800 focus:ring-emerald-600"
                    />
                    <span>Sembunyikan Nama (Hamba Allah)</span>
                  </label>
                </div>

                {!isAnonymous && (
                  <input
                    type="text"
                    required={!isAnonymous}
                    placeholder="Nama Lengkap Anda"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                  />
                )}

                <div>
                  <label className="font-semibold text-stone-800 block mb-1">No. WhatsApp / HP (Opsional untuk bukti salur):</label>
                  <input
                    type="tel"
                    placeholder="0812xxxxxxx"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-800 block mb-1">Untaian Doa & Niat (Akan dibacakan tim yayasan):</label>
                  <textarea
                    rows={2}
                    placeholder="Semoga Allah melapangkan rezeki keluarga kami dan memberi barakah..."
                    value={doaHarapan}
                    onChange={(e) => setDoaHarapan(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-emerald-700 focus:outline-none resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-sm transition-all text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white/80" />
                <span>Lanjutkan Pembayaran · Rp {effectiveAmount.toLocaleString('id-ID')}</span>
              </button>
            </form>
          )}

          {step === 'transfer' && createdRecord && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-amber-900 text-xs">
                <span className="font-semibold block mb-0.5">Instruksi Penyaluran Donasi:</span>
                Silakan transfer nominal persis ke rekening resmi atas nama yayasan di bawah ini.
              </div>

              {/* Total Amount Box */}
              <div className="bg-stone-100 p-4 rounded-xl border border-stone-200 text-center">
                <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Total Nominal Infaq</span>
                <div className="text-2xl font-bold font-serif text-emerald-950 mt-1">
                  Rp {createdRecord.amount.toLocaleString('id-ID')}
                </div>
                <span className="text-[10px] text-stone-500 mt-1 block">Kode Registrasi Donasi: {createdRecord.donationCode}</span>
              </div>

              {paymentMethod === 'QRIS' ? (
                <div className="text-center p-4 bg-white border border-stone-200 rounded-xl space-y-3">
                  <div className="w-48 h-48 mx-auto bg-stone-100 rounded-lg flex flex-col items-center justify-center border border-dashed border-stone-300 p-2">
                    <QrCode className="w-32 h-32 text-stone-800" />
                    <span className="text-[10px] text-stone-600 font-mono mt-1">NMID: ID102209188241</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-emerald-900 text-xs">QRIS Standar Bank Indonesia</h5>
                    <p className="text-[11px] text-stone-500">Scan menggunakan BCA Mobile, Livin, GoPay, OVO, ShopeePay, LinkAja, atau BSI Mobile</p>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-4 border border-stone-200 rounded-xl space-y-3">
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-5 h-5 text-emerald-800" />
                    <span className="font-semibold text-stone-900 text-xs">{selectedBankInfo.bank}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg border border-stone-200">
                    <div>
                      <span className="text-[10px] text-stone-500 block">Nomor Rekening Resmi:</span>
                      <span className="font-mono font-bold text-sm text-stone-900">{selectedBankInfo.accountNumber}</span>
                      <span className="text-[11px] text-emerald-800 block mt-0.5">a.n. {selectedBankInfo.accountName}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(selectedBankInfo.accountNumber)}
                      className="px-2.5 py-1.5 bg-white border border-stone-300 rounded text-[11px] font-medium text-stone-700 hover:bg-stone-100 flex items-center gap-1"
                    >
                      {isCopied === selectedBankInfo.accountNumber ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied === selectedBankInfo.accountNumber ? 'Tersalin' : 'Salin'}</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="w-1/3 py-2.5 px-3 border border-stone-300 text-stone-700 rounded-lg font-medium hover:bg-stone-50 text-xs"
                >
                  Kembali
                </button>
                <button
                  type="button"
                  onClick={handleFinalConfirm}
                  className="w-2/3 py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg font-semibold shadow-xs text-xs flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  <span>Saya Sudah Transfer / Scan</span>
                </button>
              </div>
            </div>
          )}

          {step === 'success' && createdRecord && (
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-emerald-700" />
              </div>

              <div>
                <h4 className="font-serif font-bold text-lg text-emerald-950">Jazakumullah Khairan Katsiran</h4>
                <p className="text-xs text-stone-600 mt-1 max-w-sm mx-auto">
                  Terima kasih kepada <strong>{createdRecord.donorName}</strong>. Infaq Anda sebesar <strong>Rp {createdRecord.amount.toLocaleString('id-ID')}</strong> untuk <em>{createdRecord.campaignTitle}</em> telah tercatat di sistem buku kas yayasan.
                </p>
              </div>

              <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-left text-xs space-y-1 font-mono">
                <div className="flex justify-between text-stone-500">
                  <span>Kode Resi:</span>
                  <span className="font-semibold text-stone-900">{createdRecord.donationCode}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Waktu:</span>
                  <span className="text-stone-900">{createdRecord.date}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Metode:</span>
                  <span className="text-stone-900">{createdRecord.paymentMethod}</span>
                </div>
              </div>

              <p className="text-[11px] text-stone-500 italic">
                "Semoga Allah memberkahi harta yang Anda berikan, menjadikannya pembersih bagi jiwa, serta menumbuhkan pahala yang tiada terputus. Aamiin."
              </p>

              <button
                onClick={handleFinish}
                className="w-full py-2.5 px-4 bg-emerald-900 hover:bg-emerald-800 text-white font-semibold rounded-lg text-xs"
              >
                Selesai & Tutup Jendela
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
