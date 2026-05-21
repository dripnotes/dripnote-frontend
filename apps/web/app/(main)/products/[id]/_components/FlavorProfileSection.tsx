'use client';

import { motion } from 'framer-motion';
import { Flame, Scale, Sparkles, Droplets, Layers } from 'lucide-react';
import * as React from 'react';
import { Pie, PieChart, Label, Tooltip, Cell, ResponsiveContainer } from 'recharts';

import SectionContainer from '@/components/layout/SectionContainer';
import { ChartContainer, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

interface FlavorProfileProps {
  balance: number | null;
  sweetness: number | null;
  acidity: number | null;
  body: number | null;
  roastingType: string;
}

const chartConfig = {
  sweetness: {
    label: '감미',
    color: 'var(--metric-sweetness)',
  },
  acidity: {
    label: '산미',
    color: 'var(--metric-acidity)',
  },
  body: {
    label: '바디감',
    color: 'var(--metric-body)',
  },
} satisfies ChartConfig;

const LEGEND_ITEMS = [
  {
    key: 'sweetness',
    label: '감미',
    Icon: Sparkles,
    colorClass: 'text-metric-sweetness',
    bgClass: 'bg-metric-sweetness/20',
    rawColor: 'var(--metric-sweetness)',
  },
  {
    key: 'acidity',
    label: '산미',
    Icon: Droplets,
    colorClass: 'text-metric-acidity',
    bgClass: 'bg-metric-acidity/20',
    rawColor: 'var(--metric-acidity)',
  },
  {
    key: 'body',
    label: '바디감',
    Icon: Layers,
    colorClass: 'text-metric-body',
    bgClass: 'bg-metric-body/20',
    rawColor: 'var(--metric-body)',
  },
  {
    key: 'balance',
    label: '밸런스',
    Icon: Scale,
    colorClass: 'text-metric-balance',
    bgClass: 'bg-metric-balance/20',
    rawColor: 'var(--metric-balance)',
  },
] as const;

const ROAST_MAP: Record<string, string> = {
  LIGHT: '라이트',
  LIGHTMEDIUM: '라이트 미디엄',
  MEDIUM: '미디엄',
  MEDIUMDARK: '미디엄 다크',
  DARK: '다크',
};

export function FlavorProfileSection({
  balance,
  sweetness,
  acidity,
  body,
  roastingType,
}: FlavorProfileProps) {
  const formattedRoast = ROAST_MAP[roastingType] || roastingType || 'N/A';

  const values = {
    sweetness: sweetness ?? 0,
    acidity: acidity ?? 0,
    body: body ?? 0,
    balance: balance ?? 0,
  };

  // 모든 값이 0이면 차트가 비어있으므로 placeholder 슬라이스 사용
  const total = values.sweetness + values.acidity + values.body;
  const chartData =
    total === 0
      ? [{ name: '데이터 없음', value: 5, fill: '#E5E7EB' }]
      : [
          { name: '감미', value: values.sweetness, fill: 'var(--metric-sweetness)' },
          { name: '산미', value: values.acidity, fill: 'var(--metric-acidity)' },
          { name: '바디감', value: values.body, fill: 'var(--metric-body)' },
        ];

  return (
    <SectionContainer className="border-t border-gray-100 py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-playfair text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-gray-900">
              Flavor Profile
            </h2>
            <p className="mt-2 text-[clamp(0.875rem,2vw,1.125rem)] text-gray-500">
              원두가 가진 고유의 향미 특성
            </p>
          </div>
          <div className="flex w-fit items-center gap-2 rounded-full bg-stone-100 px-4 py-1.5">
            <Flame className="h-4 w-4 text-stone-600" />
            <span className="font-outfit text-xs font-bold tracking-widest text-stone-800">
              {formattedRoast}
            </span>
          </div>
        </div>

        {/* Chart + Legend */}
        <div className="flex flex-col items-center gap-10">
          {/* Donut Chart */}
          <ChartContainer config={chartConfig} className="mx-auto w-full max-w-[260px] shrink-0">
            <ResponsiveContainer width="100%" aspect={1}>
              <PieChart>
                <Tooltip
                  cursor={false}
                  content={({ active, payload }) =>
                    total > 0 ? (
                      <ChartTooltipContent active={active} payload={payload as never} />
                    ) : null
                  }
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="55%"
                  outerRadius="80%"
                  strokeWidth={3}
                  stroke="white"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        const cx = viewBox.cx as number;
                        const cy = viewBox.cy as number;
                        return (
                          <text textAnchor="middle" dominantBaseline="middle">
                            <tspan
                              x={cx}
                              y={cy - 10}
                              className="fill-gray-900"
                              style={{
                                fontSize: '1.75rem',
                                fontWeight: 700,
                                fontFamily: 'Outfit, sans-serif',
                              }}
                            >
                              {balance !== null ? balance : 'N/A'}
                            </tspan>
                            <tspan
                              x={cx}
                              y={cy + 16}
                              style={{
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                fill: '#9CA3AF',
                                fontFamily: 'Outfit, sans-serif',
                              }}
                            >
                              밸런스
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Legend */}
          <div className="flex w-full max-w-[480px] flex-col gap-5">
            {LEGEND_ITEMS.map(({ key, label, Icon, colorClass, bgClass, rawColor }) => {
              const rawValue = values[key];
              return (
                <div key={key} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full ${bgClass}`}
                      >
                        <Icon className={`h-3.5 w-3.5 ${colorClass}`} />
                      </span>
                      <span className="font-outfit text-sm font-semibold tracking-wider text-gray-800 uppercase">
                        {label}
                      </span>
                    </div>
                    <span className={`font-outfit text-sm font-bold ${colorClass}`}>
                      {rawValue} <span className="text-xs font-normal text-gray-400">/ 5</span>
                    </span>
                  </div>
                  {/* 진행 바 */}
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: rawColor }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(rawValue / 5) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  );
}
