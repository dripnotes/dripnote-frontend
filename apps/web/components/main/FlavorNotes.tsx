'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

import { FlavorNote } from '@/lib/api/main';

interface FlavorNotesProps {
  tastings: FlavorNote[];
}

export default function FlavorNotes({ tastings }: FlavorNotesProps) {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="font-outfit text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            어느 향미를 선호하시나요?
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            선호하는 향과 맛(Tasting Notes)으로 나에게 꼭 맞는 원두를 찾아보세요.
          </p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {tastings.map((note, idx) => (
            <Link key={idx} href={note.tasting_link} className="group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: idx * 0.05,
                  duration: 0.5,
                  ease: 'easeOut',
                }}
                className="relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-gray-100 shadow-sm transition-shadow hover:shadow-xl"
              >
                {/* Background Image with Hover Zoom */}
                <motion.img
                  src={note.tasting_image_link}
                  alt={note.tasting_name}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />

                {/* Scrim Overlay (Gradient for text readability) */}
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                {/* Flavor Text (Bottom-Left) */}
                <div className="absolute bottom-4 left-4">
                  <span className="font-outfit text-lg font-bold text-[#F5E6D3]">
                    {note.tasting_name}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
