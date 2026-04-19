'use client';

import { motion } from 'framer-motion';

interface BeanInfoTableProps {
  origin: string;
  processing?: string;
  variety?: string;
  altitude?: string;
  description?: string;
}

export function BeanInfoTable({
  origin,
  processing,
  variety,
  altitude,
  description,
}: BeanInfoTableProps) {
  const infoItems = [
    { label: 'Origin', value: origin },
    { label: 'Processing', value: processing },
    { label: 'Variety', value: variety },
    { label: 'Altitude', value: altitude },
  ].filter(item => item.value);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16"
      >
        <div className="lg:col-span-8 flex flex-col justify-center">
          <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-6">About the Bean</h2>
          {description ? (
            <p className="text-gray-600 leading-relaxed text-lg">
              {description}
            </p>
          ) : (
            <p className="text-gray-400 italic">상세 설명이 준비되지 않았습니다.</p>
          )}
        </div>

        <div className="lg:col-span-4 bg-gray-50 rounded-2xl p-8 border border-gray-100">
          <ul className="space-y-6">
            {infoItems.map((item, i) => (
              <li key={i} className="flex flex-col border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <span className="font-outfit text-xs font-semibold tracking-widest text-amber-600 uppercase mb-1">
                  {item.label}
                </span>
                <span className="text-gray-900 font-medium">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
