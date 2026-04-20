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
    <section className="mx-auto mb-20 w-full px-4 py-16 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#2A2522] p-8 text-white shadow-2xl md:p-12"
      >
        {/* Lab aesthetic subtle grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10">
          <div className="mb-10 flex flex-col justify-between text-center md:flex-row md:items-center md:text-left">
            <div>
              <h2 className="font-playfair text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-[#F5E6D3]">
                Lab Recipe
              </h2>
              <p className="font-outfit mt-2 text-[clamp(0.6rem,1.5vw,0.75rem)] tracking-widest text-white/50 uppercase">
                Recommended Brewing Guide
              </p>
            </div>
          </div>

          <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col rounded-2xl border border-white/5 bg-white/5 p-6">
              <div className="mb-4 flex items-center space-x-3">
                <div className="rounded-lg bg-amber-500/20 p-2 text-amber-500">
                  <Beaker className="h-5 w-5" />
                </div>
                <span className="font-outfit text-xs font-semibold tracking-widest text-white/60 uppercase">
                  Method
                </span>
              </div>
              <span className="text-xl font-medium text-white/90">{recipe.method}</span>
            </div>

            <div className="flex flex-col rounded-2xl border border-white/5 bg-white/5 p-6">
              <div className="mb-4 flex items-center space-x-3">
                <div className="rounded-lg bg-amber-500/20 p-2 text-amber-500">
                  <Droplets className="h-5 w-5" />
                </div>
                <span className="font-outfit text-xs font-semibold tracking-widest text-white/60 uppercase">
                  Ratio
                </span>
              </div>
              <span className="text-xl font-medium text-white/90">{recipe.ratio}</span>
            </div>

            <div className="flex flex-col rounded-2xl border border-white/5 bg-white/5 p-6">
              <div className="mb-4 flex items-center space-x-3">
                <div className="rounded-lg bg-amber-500/20 p-2 text-amber-500">
                  <Thermometer className="h-5 w-5" />
                </div>
                <span className="font-outfit text-xs font-semibold tracking-widest text-white/60 uppercase">
                  Temp
                </span>
              </div>
              <span className="text-xl font-medium text-white/90">{recipe.temp}</span>
            </div>

            <div className="flex flex-col rounded-2xl border border-white/5 bg-white/5 p-6">
              <div className="mb-4 flex items-center space-x-3">
                <div className="rounded-lg bg-amber-500/20 p-2 text-amber-500">
                  <ArrowDownToLine className="h-5 w-5" />
                </div>
                <span className="font-outfit text-xs font-semibold tracking-widest text-white/60 uppercase">
                  Grind
                </span>
              </div>
              <span className="text-xl font-medium text-white/90">{recipe.grind}</span>
            </div>
          </div>

          <div className="flex items-start space-x-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-6 md:items-center">
            <Info className="mt-0.5 h-6 w-6 shrink-0 text-amber-500 md:mt-0" />
            <p className="leading-relaxed text-[#F5E6D3]/90">
              <span className="mr-2 font-semibold text-amber-500">Tip:</span>
              {recipe.notes}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
