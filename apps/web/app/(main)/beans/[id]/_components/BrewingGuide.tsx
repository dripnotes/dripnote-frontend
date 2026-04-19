'use client';

import { motion } from 'framer-motion';
import { Beaker, Thermometer, Droplets, ArrowDownToLine, Info } from 'lucide-react';

interface BrewingGuideProps {
  recipe?: {
    method: string;
    ratio: string;
    temp: string;
    grind: string;
    notes: string;
  };
}

export function BrewingGuide({ recipe }: BrewingGuideProps) {
  if (!recipe) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-3xl bg-[#2A2522] p-8 md:p-12 text-white border border-white/10 shadow-2xl"
      >
        {/* Lab aesthetic subtle grid background */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}
        />

        <div className="relative z-10">
          <div className="mb-10 text-center md:text-left flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h2 className="font-playfair text-3xl font-bold text-[#F5E6D3]">Lab Recipe</h2>
              <p className="mt-2 text-white/50 font-outfit uppercase tracking-widest text-xs">Recommended Brewing Guide</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="flex flex-col bg-white/5 rounded-2xl p-6 border border-white/5">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-amber-500/20 rounded-lg text-amber-500">
                  <Beaker className="w-5 h-5" />
                </div>
                <span className="font-outfit text-xs font-semibold tracking-widest text-white/60 uppercase">Method</span>
              </div>
              <span className="text-xl font-medium text-white/90">{recipe.method}</span>
            </div>

            <div className="flex flex-col bg-white/5 rounded-2xl p-6 border border-white/5">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-amber-500/20 rounded-lg text-amber-500">
                  <Droplets className="w-5 h-5" />
                </div>
                <span className="font-outfit text-xs font-semibold tracking-widest text-white/60 uppercase">Ratio</span>
              </div>
              <span className="text-xl font-medium text-white/90">{recipe.ratio}</span>
            </div>

            <div className="flex flex-col bg-white/5 rounded-2xl p-6 border border-white/5">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-amber-500/20 rounded-lg text-amber-500">
                  <Thermometer className="w-5 h-5" />
                </div>
                <span className="font-outfit text-xs font-semibold tracking-widest text-white/60 uppercase">Temp</span>
              </div>
              <span className="text-xl font-medium text-white/90">{recipe.temp}</span>
            </div>

            <div className="flex flex-col bg-white/5 rounded-2xl p-6 border border-white/5">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-amber-500/20 rounded-lg text-amber-500">
                  <ArrowDownToLine className="w-5 h-5" />
                </div>
                <span className="font-outfit text-xs font-semibold tracking-widest text-white/60 uppercase">Grind</span>
              </div>
              <span className="text-xl font-medium text-white/90">{recipe.grind}</span>
            </div>
          </div>

          <div className="flex items-start md:items-center space-x-4 bg-amber-500/10 rounded-2xl p-6 border border-amber-500/20">
            <Info className="w-6 h-6 text-amber-500 shrink-0 mt-0.5 md:mt-0" />
            <p className="text-[#F5E6D3]/90 leading-relaxed">
              <span className="font-semibold text-amber-500 mr-2">Tip:</span>
              {recipe.notes}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
