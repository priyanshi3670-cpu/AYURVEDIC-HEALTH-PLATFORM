import React from 'react';
import { DollarSign, FileSpreadsheet, ShieldCheck } from 'lucide-react';

interface CostBreakdownProps {
  totalEstimate: number;
}

export const CostBreakdown: React.FC<CostBreakdownProps> = ({ totalEstimate }) => {
  // Proportional breakdown calculation
  const consultationFee = totalEstimate > 10000 ? 1500 : 700;
  const medicineCost = Math.round(totalEstimate * 0.20);
  const followUpCost = Math.round(totalEstimate * 0.10);
  const therapyCost = totalEstimate - consultationFee - medicineCost - followUpCost;

  return (
    <section className="bg-white border border-[#2E7D32]/5 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
      <div className="space-y-1">
        <span className="text-accent text-[9px] font-bold uppercase tracking-widest block font-sans">financial details</span>
        <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">Treatment Cost Breakdown</h3>
        <p className="text-xs text-text-secondary leading-relaxed max-w-xl">
          An itemized estimate of clinical fees, herb supplies, and recovery checkups associated with a standard treatment course.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left item list - Receipt Table (2/3 size) */}
        <div className="md:col-span-2 border border-[#2E7D32]/10 rounded-2xl overflow-hidden text-xs">
          <table className="w-full text-left border-collapse font-medium">
            <thead>
              <tr className="bg-[#F8FFF8] border-b border-[#2E7D32]/10 font-bold text-primary text-[10px] uppercase">
                <th className="p-4">Billing Item</th>
                <th className="p-4 text-right">Estimated Charges</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-4 text-text-secondary font-bold">Initial Vaidya Consultation Fee</td>
                <td className="p-4 text-right text-text-primary font-black">₹{consultationFee.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td className="p-4 text-text-secondary font-bold">Therapy Room & Clinical Administration (Course)</td>
                <td className="p-4 text-right text-text-primary font-black">₹{therapyCost.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td className="p-4 text-text-secondary font-bold">Organic Herbal Compounding & Oils Supplies</td>
                <td className="p-4 text-right text-text-primary font-black">₹{medicineCost.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td className="p-4 text-text-secondary font-bold">Post-detox Follow-up Checkups (Samsarjana)</td>
                <td className="p-4 text-right text-text-primary font-black">₹{followUpCost.toLocaleString('en-IN')}</td>
              </tr>
              <tr className="bg-[#FAF9F6] border-t-2 border-primary/20 font-black text-primary text-sm">
                <td className="p-4 uppercase">Total Estimated Package Cost</td>
                <td className="p-4 text-right text-lg">₹{totalEstimate.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right Info Box (1/3 size) */}
        <div className="bg-[#FAF9F6] p-5 rounded-2xl border border-primary/5 flex flex-col justify-between space-y-4">
          <div className="space-y-3.5 text-xs text-text-secondary font-medium">
            <span className="text-[9.5px] uppercase font-bold text-primary tracking-widest block">Insurance & AYUSH</span>
            <p className="leading-relaxed text-[11px]">
              Ayurvedic therapies conducted at NABH-accredited centers fall under **AYUSH ministry guidelines**, making them eligible for complete cashless or reimbursement coverage under major insurance providers.
            </p>
          </div>

          <div className="bg-white p-3 rounded-xl border border-primary/5 flex items-center space-x-2 text-[10px] text-primary font-bold shadow-sm">
            <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
            <span>Package estimate is fully inclusive of taxes.</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CostBreakdown;
