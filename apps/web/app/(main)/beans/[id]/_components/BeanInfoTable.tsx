'use client';

import { motion } from 'framer-motion';

interface BeanInfoTableProps {
  origin: string;
  category?: string;
  blend?: boolean;
  processing?: string;
  variety?: string;
  altitude?: string;
  description?: string;
}

export function BeanInfoTable({
  origin,
  category,
  blend,
  processing,
  variety,
  altitude,
  description,
}: BeanInfoTableProps) {
  const infoItems = [
    { label: 'Origin', value: origin },
    { label: 'Category', value: category },
    { label: 'Type', value: blend === undefined ? undefined : blend ? 'Blend' : 'Single Origin' },
    { label: 'Processing', value: processing },
    { label: 'Variety', value: variety },
    { label: 'Altitude', value: altitude },
  ].filter((item) => item.value !== undefined && item.value !== null && item.value !== '');

  return (
    <section className="mx-auto w-full px-4 py-8 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16"
      >
        <div className="flex flex-col justify-center lg:col-span-8">
          <h2 className="font-playfair mb-6 text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-gray-900">
            About the Bean
          </h2>
          {description ? (
            <p className="text-[clamp(1rem,2vw,1.125rem)] leading-relaxed text-gray-600">
              {description}
            </p>
          ) : (
            <p className="text-gray-400 italic">상세 설명이 준비되지 않았습니다.</p>
          )}
        </div>

        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8 lg:col-span-4">
          <ul className="space-y-6">
            {infoItems.map((item, i) => (
              <li
                key={i}
                className="flex flex-col border-b border-gray-200 pb-4 last:border-0 last:pb-0"
              >
                <span className="font-outfit mb-1 text-xs font-semibold tracking-widest text-amber-600 uppercase">
                  {item.label}
                </span>
                <span className="font-medium text-gray-900">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
