'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import React from 'react';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';

export default function RoasteryMapSection() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY || 'PLACEHOLDER_KEY',
  });

  return (
    <section id="classes" className="w-full border-t border-gray-100 bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="bg-primary/10 text-primary mb-6 inline-flex w-fit items-center rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-600">
              <MapPin className="mr-2 h-4 w-4" />
              Location-based
            </div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              내 주변 로스터리와
              <br />
              원데이 클래스 찾기
            </h2>
            <p className="mb-8 max-w-lg text-lg text-gray-600">
              현재 위치를 기반으로 실력 있는 커피 로스터리 숍과 배우기 좋은 원데이 바리스타 클래스를
              추천해 드립니다.
              <br />
              직접 경험하고 나만의 레시피를 만들어보세요.
            </p>

            <ul className="space-y-4 text-gray-700">
              <li className="flex items-center">
                <div className="mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black font-bold text-white">
                  1
                </div>
                사용자 위치 기반 가까운 로스터리 탐색
              </li>
              <li className="flex items-center">
                <div className="mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black font-bold text-white">
                  2
                </div>
                자세한 카페 및 매장 정보 제공
              </li>
              <li className="flex items-center">
                <div className="mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black font-bold text-white">
                  3
                </div>
                바리스타 클래스 실시간 예약(예정)
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] w-full overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 shadow-2xl lg:h-[500px]"
          >
            <div className="h-full w-full">
              {loading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100/80 text-gray-500 backdrop-blur-sm">
                  <MapPin className="mb-4 h-12 w-12 text-gray-400" />
                  <p>지도 로딩중이거나 설정이 필요합니다.</p>
                  <span className="mt-2 text-sm text-gray-400">Loading Kakao Maps...</span>
                </div>
              ) : error ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100/80 text-gray-500 backdrop-blur-sm">
                  <p>지도 로딩에 실패했습니다. (API 키 오류)</p>
                </div>
              ) : (
                <Map
                  center={{ lat: 37.5666805, lng: 126.9784147 }} // 서울시청 위경도 기준
                  style={{ width: '100%', height: '100%' }}
                  level={3}
                >
                  <MapMarker position={{ lat: 37.5666805, lng: 126.9784147 }} />
                </Map>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
