import React, { useState } from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from '../../types';

interface GalleryGridProps {
  gallery: GalleryImage[];
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({ gallery }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % gallery.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length);
    }
  };

  if (gallery.length === 0) return null;

  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="flex items-center space-x-2.5">
        <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
          <ImageIcon className="w-5 h-5 text-accent" />
        </div>
        <div>
          <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">Visual Tour</span>
          <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">Clinic & Healing Gallery</h3>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gallery.map((img, index) => (
          <div 
            key={img.id}
            onClick={() => openLightbox(index)}
            className="group relative h-40 md:h-48 rounded-2xl overflow-hidden border border-primary/5 cursor-pointer shadow-sm"
          >
            <img 
              src={img.url} 
              alt={img.caption} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Hover Caption Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
              <span className="text-[10px] text-white font-bold leading-tight uppercase tracking-wider block">
                {img.caption}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div 
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
        >
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full border border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 shrink-0" />
          </button>

          {/* Navigation Controls */}
          {gallery.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-6 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full border border-white/10 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5 shrink-0" />
              </button>

              <button 
                onClick={nextImage}
                className="absolute right-6 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full border border-white/10 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 shrink-0" />
              </button>
            </>
          )}

          {/* Center Image Container */}
          <div className="max-w-4xl max-h-[80vh] flex flex-col items-center space-y-4">
            <img 
              src={gallery[lightboxIndex].url} 
              alt="" 
              className="max-w-full max-h-[70vh] object-contain rounded-2xl border border-white/10 shadow-2xl"
            />
            <span className="text-white text-xs font-bold uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full border border-white/5">
              {gallery[lightboxIndex].caption}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default GalleryGrid;
