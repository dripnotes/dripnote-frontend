'use client';

import { motion } from 'framer-motion';
import { RatingScale } from '@coffee-service/ui-library';

interface FlavorProfileProps {
  bitterness: number;
  sweetness: number;
  acidity: number;
  body: number;
  roasting: number;
}

function ProfileIndicator({
  label,
  value,
  max = 5,
}: {
  label: string;
  value: number;
  max?: number;
}) {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-outfit text-sm font-semibold tracking-wider text-gray-900 uppercase">
          {label === 'Roast' ? 'Roasting' : label}
        </span>
        <span className="font-outfit text-xs font-medium text-gray-500">
          {value} / {max}
        </span>
      </div>
      <RatingScale max={max} value={value} readOnly className="w-full" />
    </div>
  );
}

export function FlavorProfileSection({
  bitterness,
  sweetness,
  acidity,
  body,
  roasting,
}: FlavorProfileProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="mb-12">
          <h2 className="font-playfair text-3xl font-bold text-gray-900">Flavor Profile</h2>
          <p className="mt-2 text-gray-500">원두가 가진 고유의 향미 특성</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          <ProfileIndicator label="Acidity" value={acidity} />
          <ProfileIndicator label="Sweetness" value={sweetness} />
          <ProfileIndicator label="Bitterness" value={bitterness} />
        </div>

        <div className="mt-12 mb-12 h-px w-full bg-gray-100" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          <ProfileIndicator label="Body" value={body} max={3} />
          <ProfileIndicator label="Roast" value={roasting} max={3} />
        </div>
      </motion.div>
    </section>
  );
}
