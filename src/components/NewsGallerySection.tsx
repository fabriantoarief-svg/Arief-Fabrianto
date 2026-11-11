import React, { useState } from 'react';
import { NewsArticle, GalleryItem } from '../types';
import { 
  Search, 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Image as ImageIcon, 
  Film, 
  X, 
  Share2,
  BookOpen
} from 'lucide-react';

interface NewsGallerySectionProps {
  newsList: NewsArticle[];
  galleryList: GalleryItem[];
  selectedArticle: NewsArticle | null;
  onSelectArticle: (article: NewsArticle | null) => void;
}

export const NewsGallerySection: React.FC<NewsGallerySectionProps> = ({
  newsList,
  galleryList,
  selectedArticle,
  onSelectArticle,
}) => {
  const [activeTab, setActiveTab] = useState<'berita' | 'galeri'>('berita');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [galleryCategory, setGalleryCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewPhoto, setPreviewPhoto] = useState<GalleryItem | null>(null);

  const newsCategories = [
    { id: 'all', label: 'Semua Berita' },
    { id: 'Yayasan', label: 'Berita Yayasan' },
    { id: 'Pendidikan', label: 'Pendidikan' },
    { id: 'Dakwah', label: 'Dakwah' },
    { id: 'Sosial', label: 'Sosial' },
    { id: 'P.S. Sin Lam Ba', label: 'Kegiatan P.S. Sin Lam Ba' },
  ];

  const filteredNews = newsList.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const filteredGallery = galleryList.filter((item) => {
    if (galleryCategory === 'all') return true;
    return item.category === galleryCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      
      {/* Title */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs uppercase tracking-widest text-emerald-800 font-semibold font-mono">
          Publikasi & Dokumentasi
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900 leading-tight">
          Berita Kegiatan & Galeri Dokumentasi
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Kilas warta kegiatan belajar santri, khidmat sosial Jumat Berkah, pembinaan keagamaan, serta dokumentasi latihan Perguruan Silat Sin Lam Ba.
        </p>
      </div>

      {/* Main Switcher */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
        <button
          onClick={() => setActiveTab('berita')}
          className={`px-5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'berita'
              ? 'bg-emerald-900 text-amber-300 shadow-xs'
              : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          Warta & Artikel Berita
        </button>
        <button
          onClick={() => setActiveTab('galeri')}
          className={`px-5 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === 'galeri'
              ? 'bg-emerald-900 text-amber-300 shadow-xs'
              : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          Galeri Foto & Video
        </button>
      </div>

      {/* TAB 1: BERITA */}
      {activeTab === 'berita' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Filter and Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 scrollbar-none text-xs">
              {newsCategories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors cursor-pointer font-medium ${
                    selectedCategory === c.id
                      ? 'bg-emerald-900 text-white'
                      : 'bg-white hover:bg-stone-100 text-stone-600 border border-stone-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Cari berita atau artikel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-stone-300 rounded-lg text-xs focus:ring-1 focus:ring-emerald-700 focus:outline-none"
              />
            </div>
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((news) => (
              <article
                key={news.id}
                onClick={() => onSelectArticle(news)}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="h-48 overflow-hidden relative bg-stone-100">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-stone-900/80 text-amber-300 text-[10px] uppercase font-semibold px-2 py-0.5 rounded backdrop-blur-xs">
                      {news.category}
                    </div>
                  </div>

                  <div className="p-5 space-y-2.5">
                    <div className="text-[11px] text-stone-500 flex items-center gap-2 font-mono">
                      <span>{new Date(news.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      <span aria-hidden="true">·</span>
                      <span>{news.readTime}</span>
                    </div>

                    <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-emerald-900 transition-colors leading-snug">
                      {news.title}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                      {news.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-stone-400 font-medium">{news.author}</span>
                  <span className="text-emerald-800 font-semibold group-hover:text-emerald-950 inline-flex items-center gap-1">
                    <span>Baca Artikel</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </article>
            ))}
          </div>

        </div>
      )}

      {/* TAB 2: GALERI */}
      {activeTab === 'galeri' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Gallery Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {[
              { id: 'all', label: 'Semua Dokumentasi' },
              { id: 'pendidikan', label: 'Pendidikan & Kelas' },
              { id: 'sosial', label: 'Jumat Berkah & Yatim' },
              { id: 'sinlamba', label: 'P.S. Sin Lam Ba' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setGalleryCategory(f.id)}
                className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors cursor-pointer font-medium ${
                  galleryCategory === f.id
                    ? 'bg-emerald-900 text-amber-300'
                    : 'bg-white hover:bg-stone-100 text-stone-600 border border-stone-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setPreviewPhoto(item)}
                className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 overflow-hidden relative bg-stone-100">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 right-2.5 p-1 bg-black/60 rounded text-white">
                      <ImageIcon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="p-3.5 space-y-1">
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 line-clamp-1 group-hover:text-emerald-900 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 pt-0 text-[10px] text-stone-400 flex items-center justify-between border-t border-stone-100 font-mono">
                  <span>{item.date}</span>
                  <span className="truncate max-w-[120px]">{item.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span className="font-semibold text-emerald-900 uppercase tracking-wider">{selectedArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.readTime}</span>
              </div>
              <button
                onClick={() => onSelectArticle(null)}
                className="p-1 rounded-md text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 leading-snug">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-3 text-xs text-stone-500 border-b border-stone-100 pb-4">
                <span>Oleh: <strong className="text-stone-800">{selectedArticle.author}</strong></span>
                <span aria-hidden="true">·</span>
                <span>{new Date(selectedArticle.publishedAt).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>

              <div className="h-64 sm:h-80 rounded-xl overflow-hidden bg-stone-100">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="text-stone-700 text-sm leading-relaxed space-y-4 whitespace-pre-line font-sans">
                {selectedArticle.content}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
              <span className="text-xs text-stone-500">
                Yayasan Pendidikan Islam Arief Fabrianto · Publikasi Resmi
              </span>
              <button
                onClick={() => onSelectArticle(null)}
                className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Tutup Artikel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Photo Lightbox Modal */}
      {previewPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-stone-900 text-white w-full max-w-3xl rounded-2xl overflow-hidden border border-stone-800 flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-stone-800">
              <h4 className="font-serif font-semibold text-sm truncate pr-4">{previewPhoto.title}</h4>
              <button
                onClick={() => setPreviewPhoto(null)}
                className="text-stone-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[60vh] bg-black flex items-center justify-center">
              <img
                src={previewPhoto.imageUrl}
                alt={previewPhoto.title}
                className="max-h-[60vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="p-4 text-xs space-y-1 bg-stone-900 border-t border-stone-800">
              <p className="text-stone-300">{previewPhoto.description}</p>
              <div className="flex items-center gap-4 text-stone-500 font-mono text-[11px] pt-1">
                <span>Tanggal: {previewPhoto.date}</span>
                <span>Lokasi: {previewPhoto.location}</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
