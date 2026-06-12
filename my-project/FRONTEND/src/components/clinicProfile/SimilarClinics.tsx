import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Clinic } from '../../types';
import clinicApi from '../../services/clinicApi';

interface SimilarClinicsProps {
  currentClinic: Clinic;
}

export const SimilarClinics: React.FC<SimilarClinicsProps> = ({ currentClinic }) => {
  const [similar, setSimilar] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSimilar = async () => {
      setLoading(true);
      try {
        const response = await clinicApi.getClinics();
        if (response.data) {
          // Filter out current clinic
          const filtered = response.data.filter(c => c.id !== currentClinic.id);
          
          // Rank by similarity: same type gets highest weight, same city gets next weight
          const scored = filtered.map(c => {
            let score = 0;
            if (c.type === currentClinic.type) score += 3;
            if (c.city.toLowerCase() === currentClinic.city.toLowerCase()) score += 2;
            // Add slight rating bonus to keep recommendations high-quality
            score += c.rating / 5;
            return { clinic: c, score };
          });

          // Sort by score descending
          scored.sort((a, b) => b.score - a.score);

          // Take top 4
          setSimilar(scored.slice(0, 4).map(item => item.clinic));
        }
      } catch (err) {
        console.error('Failed to load similar clinics', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilar();
  }, [currentClinic]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse bg-white border border-[#2E7D32]/5 rounded-2xl h-80 shadow-sm" />
        ))}
      </div>
    );
  }

  if (similar.length === 0) {
    return null;
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-accent uppercase tracking-widest bg-amber-500/10 px-3 py-1.5 rounded-full inline-block mb-3 border border-amber-500/10">
            Recommendations
          </span>
          <h2 className="font-serif text-3xl font-black text-text-primary">
            Similar Wellness Centers
          </h2>
          <p className="text-xs text-text-secondary mt-1 font-medium">
            Explore other highly-rated Ayurveda and Panchakarma facilities nearby.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {similar.map((clinic, index) => (
          <motion.div
            key={clinic.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            whileHover={{ y: -5 }}
            className="bg-white border border-emerald-950/5 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group h-full shadow-sm"
          >
            {/* Cover Banner */}
            <div className="h-44 relative bg-gray-100 overflow-hidden shrink-0">
              <img 
                src={clinic.bannerImage} 
                alt={clinic.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[9px] font-extrabold uppercase tracking-wider text-primary px-2.5 py-1 rounded-lg shadow-sm border border-primary/5">
                {clinic.type}
              </span>
            </div>

            {/* Content Details */}
            <div className="p-5 flex flex-col flex-grow justify-between">
              <div>
                {/* Rating line */}
                <div className="flex items-center space-x-1 mb-2 text-xs font-bold text-text-primary">
                  <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                  <span>{clinic.rating}</span>
                  <span className="text-text-secondary text-[10px] font-semibold">({clinic.reviewCount} reviews)</span>
                </div>

                {/* Name */}
                <h3 className="font-serif font-black text-base text-text-primary line-clamp-1 group-hover:text-primary transition-colors">
                  {clinic.name}
                </h3>

                {/* Address */}
                <div className="flex items-center space-x-1 text-[11px] text-text-secondary font-semibold mt-2.5">
                  <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span className="truncate">{clinic.city}, {clinic.state}</span>
                </div>
              </div>

              {/* Action Trigger */}
              <button
                onClick={() => {
                  navigate(`/clinics/${clinic.id}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mt-5 w-full bg-[#F8FFF8] hover:bg-primary hover:text-white border border-primary/10 hover:border-transparent text-primary font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
              >
                <span>Explore Center</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SimilarClinics;
