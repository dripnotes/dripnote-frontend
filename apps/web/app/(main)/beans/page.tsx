'use client';

import { SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useMemo, useState, useEffect } from 'react';

import BeanCardList from '@/components/beans/BeanCardList';
import BeanFilterDrawer from '@/components/beans/BeanFilterDrawer';
import BeanFilterPanel from '@/components/beans/BeanFilterPanel';
import PageContainer from '@/components/layout/PageContainer';
import {
  applyBeanFilters,
  DEFAULT_FILTERS,
  type BeanFilterState,
  mockBeansData,
  getAromaById,
  AromaType,
} from '@/lib/api/beans';

function BeansPageContent() {
  const searchParams = useSearchParams();
  const aromaId = searchParams.get('aromaId');

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<BeanFilterState>(DEFAULT_FILTERS);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // URL 파라미터(aromaId)가 있을 경우 초기 필터 반영
  useEffect(() => {
    if (aromaId) {
      const aromaDef = getAromaById(aromaId);
      if (aromaDef) {
        setFilters((prev) => ({
          ...prev,
          aromas: [aromaDef.ko as AromaType],
        }));
      }
    }
  }, [aromaId]);

  const filteredBeans = useMemo(
    () => applyBeanFilters(mockBeansData, filters, searchQuery),
    [filters, searchQuery],
  );

  const handleReset = () => setFilters(DEFAULT_FILTERS);

  return (
    <PageContainer>
      {/* ── 본문 ── */}
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
        <div className="flex w-full items-start gap-8">
          {/* 좌측 필터 패널 (Desktop/Tablet) */}
          <BeanFilterPanel
            filters={filters}
            onChange={setFilters}
            onReset={handleReset}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* 우측 카드 목록 */}
          <div className="w-full min-w-0 flex-1">
            {/* 검색 및 필터 정보 영역 */}
            <div className="mb-6 flex items-center justify-between">
              {/* 로고 및 결과 수 */}
              <div className="flex flex-col gap-0.5">
                <Link
                  href="/"
                  className="font-playfair text-2xl font-bold tracking-tighter text-gray-900"
                >
                  Dripnote
                </Link>
                <div className="font-outfit shrink-0 text-xs text-gray-400">
                  {filteredBeans.length}개의 원두
                </div>
              </div>

              {/* 모바일 필터 버튼 */}
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="flex shrink-0 items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-3 text-xs text-gray-600 transition-colors hover:border-amber-300 hover:text-amber-600 md:hidden"
                aria-label="필터 열기"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </button>
            </div>

            <BeanCardList beans={filteredBeans} isLoading={false} />
          </div>
        </div>
      </div>

      {/* 모바일 필터 Drawer */}
      <BeanFilterDrawer
        isOpen={isDrawerOpen}
        filters={filters}
        onChange={setFilters}
        onReset={handleReset}
        onClose={() => setIsDrawerOpen(false)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
    </PageContainer>
  );
}

export default function BeansPage() {
  return (
    <Suspense>
      <BeansPageContent />
    </Suspense>
  );
}
