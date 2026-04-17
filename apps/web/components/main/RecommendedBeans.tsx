'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { RecommendedBean } from '@/lib/api/main';

interface RecommendedBeansProps {
  beans: RecommendedBean[];
}

export default function RecommendedBeans({ beans }: RecommendedBeansProps) {
  return (
    <section id="recommended" className="w-full bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col items-start justify-between sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              오늘의 추천 원두
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              전문가들이 매일 새롭게 엄선한, 지금 가장 맛있는 커피
            </p>
          </div>
          <Link
            href="/beans"
            className="text-primary group mt-4 flex items-center text-sm font-semibold transition-colors hover:text-black sm:mt-0"
          >
            전체 보기
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {beans.map((bean, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
            >
              <Link href={bean.link} className="group block h-full">
                <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 group-hover:-translate-y-2 hover:shadow-xl">
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-gray-200">
                    <Image
                      src={bean.imageUrl}
                      alt={bean.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-4 line-clamp-2 text-xl font-bold text-gray-900">
                      {bean.name}
                    </h3>
                    <div className="mt-auto flex flex-wrap gap-2">
                      {bean.aromas.map((aroma, tIdx) => (
                        <span
                          key={tIdx}
                          className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600"
                        >
                          {aroma}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
