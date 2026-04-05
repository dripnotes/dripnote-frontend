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
    <section className="w-full overflow-hidden bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              어느 향미를 선호하시나요?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              선호하는 향과 맛(Tasting Notes)으로 나에게 꼭 맞는 원두를 찾아보세요.
            </p>
          </div>
        </div>

        {/* Horizontal scrollable tags */}
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="scrollbar-hide flex snap-x space-x-4 overflow-x-auto pt-2 pb-4">
            {tastings.map((note, idx) => (
              <Link key={idx} href={note.tasting_link}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  whileHover={{
                    y: -5,
                    boxShadow:
                      '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                  }}
                  className="hover:border-primary/50 hover:bg-primary/5 flex shrink-0 cursor-pointer snap-start items-center justify-center rounded-3xl border border-gray-200 bg-gray-50 px-8 py-4 text-lg font-medium text-gray-800 shadow-sm transition-all"
                >
                  <span className="mr-2 bg-linear-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">
                    #
                  </span>
                  {note.tasting_name}
                </motion.div>
              </Link>
            ))}
          </div>
          {/* Fading edge effect */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-linear-to-l from-white to-transparent sm:hidden"></div>
        </div>
      </div>
    </section>
  );
}
