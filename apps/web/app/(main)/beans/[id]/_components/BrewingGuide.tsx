'use client';

import { motion } from 'framer-motion';
import { Beaker, Thermometer, Droplets, ArrowDownToLine, Info } from 'lucide-react';

import SectionContainer from '@/components/layout/SectionContainer';

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
    <SectionContainer className="mb-10 py-10 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#2A2522] p-5 text-white shadow-2xl md:p-12"
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
          <div className="mb-6 flex flex-col justify-between text-center md:mb-10 md:flex-row md:items-center md:text-left">
            <div>
              <h2 className="font-playfair text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-[#F5E6D3]">
                Lab Recipe
              </h2>
              <p className="font-outfit mt-2 text-[clamp(0.6rem,1.5vw,0.75rem)] tracking-widest text-white/50 uppercase">
                Recommended Brewing Guide
              </p>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-3 md:mb-10 md:gap-6 lg:grid-cols-4">
            <div className="flex flex-col rounded-2xl border border-white/5 bg-white/5 p-3 md:p-6">
              <div className="mb-2 flex items-center space-x-2 md:mb-4 md:space-x-3">
                <div className="rounded-lg bg-amber-500/20 p-1.5 text-amber-500 md:p-2">
                  <Beaker className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <span className="font-outfit text-[10px] font-semibold tracking-widest text-white/60 uppercase md:text-xs">
                  Method
                </span>
              </div>
              <span className="text-sm font-medium text-white/90 md:text-xl">{recipe.method}</span>
            </div>

            <div className="flex flex-col rounded-2xl border border-white/5 bg-white/5 p-3 md:p-6">
              <div className="mb-2 flex items-center space-x-2 md:mb-4 md:space-x-3">
                <div className="rounded-lg bg-amber-500/20 p-1.5 text-amber-500 md:p-2">
                  <Droplets className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <span className="font-outfit text-[10px] font-semibold tracking-widest text-white/60 uppercase md:text-xs">
                  Ratio
                </span>
              </div>
              <span className="text-sm font-medium text-white/90 md:text-xl">{recipe.ratio}</span>
            </div>

            <div className="flex flex-col rounded-2xl border border-white/5 bg-white/5 p-3 md:p-6">
              <div className="mb-2 flex items-center space-x-2 md:mb-4 md:space-x-3">
                <div className="rounded-lg bg-amber-500/20 p-1.5 text-amber-500 md:p-2">
                  <Thermometer className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <span className="font-outfit text-[10px] font-semibold tracking-widest text-white/60 uppercase md:text-xs">
                  Temp
                </span>
              </div>
              <span className="text-sm font-medium text-white/90 md:text-xl">{recipe.temp}</span>
            </div>

            <div className="flex flex-col rounded-2xl border border-white/5 bg-white/5 p-3 md:p-6">
              <div className="mb-2 flex items-center space-x-2 md:mb-4 md:space-x-3">
                <div className="rounded-lg bg-amber-500/20 p-1.5 text-amber-500 md:p-2">
                  <ArrowDownToLine className="h-4 w-4 md:h-5 md:w-5" />
                </div>
                <span className="font-outfit text-[10px] font-semibold tracking-widest text-white/60 uppercase md:text-xs">
                  Grind
                </span>
              </div>
              <span className="text-sm font-medium text-white/90 md:text-xl">{recipe.grind}</span>
            </div>
          </div>

          <div className="flex items-start space-x-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 md:items-center md:p-6">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-amber-500 md:mt-0 md:h-6 md:w-6" />
            <p className="text-sm leading-relaxed text-[#F5E6D3]/90 md:text-base">
              <span className="mr-2 font-semibold text-amber-500">Tip:</span>
              {recipe.notes}
            </p>
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
