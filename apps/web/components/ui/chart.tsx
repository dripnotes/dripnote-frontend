'use client';

import * as React from 'react';

export interface ChartConfig {
  [key: string]: {
    label: string;
    color?: string;
  };
}

interface ChartContainerProps {
  config: ChartConfig;
  className?: string;
  children: React.ReactNode;
}

const ChartContext = React.createContext<{ config: ChartConfig } | null>(null);

export function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error('useChart must be used within a ChartContainer');
  }
  return context;
}

export function ChartContainer({ config, className, children }: ChartContainerProps) {
  // CSS 변수로 색상 주입
  const style = Object.entries(config).reduce(
    (acc, [key, value]) => {
      if (value.color) {
        acc[`--color-${key}`] = value.color;
      }
      return acc;
    },
    {} as Record<string, string>,
  ) as React.CSSProperties;

  return (
    <ChartContext.Provider value={{ config }}>
      <div className={className} style={style}>
        {children}
      </div>
    </ChartContext.Provider>
  );
}

interface ChartTooltipContentProps {
  active?: boolean;
  payload?: ReadonlyArray<Partial<{ name: string; value: number; payload: { fill?: string } }>>;
}

export function ChartTooltipContent({ active, payload }: ChartTooltipContentProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-gray-100 bg-white px-3 py-2 shadow-lg">
      {payload.map((entry, index) => (
        <div key={entry?.name || index} className="flex items-center gap-2 text-sm">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: entry?.payload?.fill }}
          />
          <span className="font-medium text-gray-700">{entry?.name}</span>
          <span className="font-bold text-gray-900">{entry?.value} / 5</span>
        </div>
      ))}
    </div>
  );
}
