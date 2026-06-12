import React from 'react';
import { ShieldCheck, Target, Award, Milestone } from 'lucide-react';
import { Clinic } from '../../types';

interface ClinicAboutProps {
  clinic: Clinic;
}

export const ClinicAbout: React.FC<ClinicAboutProps> = ({ clinic }) => {
  return (
    <section className="bg-white border border-[#2E7D32]/10 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="flex items-center space-x-2.5">
        <div className="w-9 h-9 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
          <ShieldCheck className="w-5 h-5 text-accent" />
        </div>
        <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">About the Clinic</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Overview & Core Mappings */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-primary text-sm uppercase tracking-wide">Overview</h4>
            <p className="text-xs text-text-secondary leading-relaxed font-semibold">
              {clinic.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Our Mission */}
            <div className="bg-[#FAF9F6] border border-primary/5 p-5 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-wide">
                <Target className="w-4 h-4 text-accent" />
                <span>Our Mission</span>
              </div>
              <p className="text-[11px] text-text-secondary leading-relaxed font-medium">
                {clinic.mission || 'To guide individuals towards holistic rejuvenation using customized, traditional Panchakarma purges and healing backwater therapies.'}
              </p>
            </div>

            {/* Our History */}
            <div className="bg-[#FAF9F6] border border-primary/5 p-5 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-wide">
                <Milestone className="w-4 h-4 text-accent" />
                <span>Our History</span>
              </div>
              <p className="text-[11px] text-text-secondary leading-relaxed font-medium">
                {clinic.history || 'Tracing legacy origins, this center started consultation services and grew into a specialized wellness registry.'}
              </p>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Specializations & Credentials */}
        <div className="bg-[#FAF9F6] border border-primary/5 p-5 rounded-2xl space-y-4">
          <div className="flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-wide">
            <Award className="w-4 h-4 text-accent" />
            <span>Specializations & Care</span>
          </div>

          <div className="space-y-2.5">
            <span className="text-[10px] text-text-secondary uppercase font-bold block tracking-wider">Clinical Mappings</span>
            <div className="flex flex-wrap gap-1.5">
              {clinic.services.map((serv, index) => (
                <span 
                  key={index} 
                  className="bg-white text-primary text-[9px] font-bold py-1 px-2.5 rounded-lg border border-primary/5 shadow-sm uppercase"
                >
                  {serv}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-primary/5 text-[10px] font-bold text-text-secondary space-y-2">
            <div className="flex justify-between">
              <span>NABH Accredited</span>
              <span className="text-primary">Yes, Verified</span>
            </div>
            <div className="flex justify-between">
              <span>Standard Diagnostics</span>
              <span className="text-primary">Pulse & Doshic</span>
            </div>
            <div className="flex justify-between">
              <span>Compounding Lab</span>
              <span className="text-primary">Organic In-House</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClinicAbout;
