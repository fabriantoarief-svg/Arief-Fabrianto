import React, { useState } from 'react';
import { Activity } from '../types';
import { X, CalendarCheck, CheckCircle2, MapPin, Clock, User } from 'lucide-react';

interface ActivityRegisterModalProps {
  activity: Activity | null;
  onClose: () => void;
  onSuccess: (updatedActivity: Activity) => void;
}

export const ActivityRegisterModal: React.FC<ActivityRegisterModalProps> = ({
  activity,
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [attendeesCount, setAttendeesCount] = useState(1);
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!activity) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: Activity = {
      ...activity,
      registeredCount: activity.registeredCount + attendeesCount,
    };
    onSuccess(updated);
    setIsSuccess(true);
  };

  const handleFinish = () => {
    setIsSuccess(false);
    setName('');
    setPhone('');
    setAttendeesCount(1);
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-emerald-950 text-white px-5 py-4 flex items-center justify-between border-b border-emerald-900">
          <div>
            <h3 className="font-serif font-bold text-base">Pendaftaran Kehadiran Agenda</h3>
            <p className="text-[11px] text-emerald-200">Konfirmasi Keikutsertaan Jamaah</p>
          </div>
          <button
            onClick={handleFinish}
            className="text-stone-300 hover:text-white p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 text-xs text-stone-700 space-y-4">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <span className="text-[10px] text-emerald-800 font-mono uppercase font-semibold">Agenda Kegiatan:</span>
                <h4 className="font-serif font-bold text-sm text-stone-900">{activity.title}</h4>
                <div className="text-[11px] text-stone-500 space-y-0.5 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-stone-400" />
                    <span>{activity.date} · {activity.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    <span className="truncate">{activity.location}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-800 block mb-1">Nama Lengkap Peserta / Jamaah:</label>
                <input
                  type="text"
                  required
                  placeholder="Nama Lengkap Anda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-stone-800 block mb-1">No. WhatsApp / HP:</label>
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
                  <label className="font-semibold text-stone-800 block mb-1">Jumlah Orang:</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={attendeesCount}
                    onChange={(e) => setAttendeesCount(parseInt(e.target.value, 10) || 1)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-stone-800 block mb-1">Catatan Tambahan (Opsional):</label>
                <input
                  type="text"
                  placeholder="Cth: Datang bersama keluarga / ingin membawa sedekah makanan"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-semibold rounded-lg text-xs shadow-xs transition-colors flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Konfirmasi Kehadiran Saya</span>
              </button>
            </form>
          ) : (
            <div className="py-4 text-center space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7 text-emerald-700" />
              </div>
              <h4 className="font-serif font-bold text-base text-stone-900">
                Pendaftaran Kehadiran Diterima!
              </h4>
              <p className="text-xs text-stone-600">
                Terima kasih, <strong>{name}</strong>. Anda terdaftar untuk kegiatan <em>"{activity.title}"</em> sejumlah <strong>{attendeesCount} orang</strong>.
              </p>
              <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg text-left text-[11px] font-mono text-stone-600">
                <div>Waktu: {activity.date} ({activity.time})</div>
                <div>Lokasi: {activity.location}</div>
                <div>PIC: {activity.pic}</div>
              </div>
              <button
                onClick={handleFinish}
                className="w-full py-2 px-3 bg-emerald-900 text-white rounded-lg font-semibold text-xs mt-2"
              >
                Selesai
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
