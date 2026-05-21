import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getProductDetailAction } from '@/actions/products.action';
import PageContainer from '@/components/layout/PageContainer';
import SectionContainer from '@/components/layout/SectionContainer';

import { FlavorProfileSection } from './_components/FlavorProfileSection';
import { ProductDetailHero } from './_components/ProductDetailHero';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

// 동적 메타데이터 생성 (SEO)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: idParam } = await params;
  const id = parseInt(idParam, 10);

  if (isNaN(id) || idParam !== id.toString()) {
    return {
      title: '상품을 찾을 수 없습니다 | Baristation',
      description: '존재하지 않는 상품 페이지입니다.',
    };
  }

  const result = await getProductDetailAction(id);
  if (!result.success || !result.data) {
    return {
      title: '상품을 찾을 수 없습니다 | Baristation',
      description: '존재하지 않는 상품 페이지입니다.',
    };
  }

  const product = result.data;
  const title = `${product.beanSummary.beanNameKo} - Baristation`;
  const flavors = product.flavorNotes.map((f) => f.nameKo).join(', ');
  const description = `${product.beanSummary.origin}에서 온 ${flavors} 향미의 매력적인 원두입니다.`;
  const imageUrl = product.beanSummary.productImage?.imageUrl || '/images/default-product.png';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: imageUrl,
          alt: `${product.beanSummary.beanNameKo} 이미지`,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id: idParam } = await params;
  const id = parseInt(idParam, 10);

  if (isNaN(id) || idParam !== id.toString()) {
    notFound();
  }

  const result = await getProductDetailAction(id);
  if (!result.success || !result.data) {
    notFound();
  }

  const product = result.data;

  return (
    <PageContainer>
      <ProductDetailHero
        beanSummary={product.beanSummary}
        roaster={product.roaster}
        agtronMin={product.agtronMin}
        agtronMax={product.agtronMax}
        additionalImages={product.images}
        flavorNotes={product.flavorNotes}
        productUrl={product.productUrl}
      />
      <SectionContainer className="py-6 md:py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col justify-center lg:col-span-8">
            <h2 className="font-playfair mb-6 text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-gray-900">
              Bean Details
            </h2>
            {product.description ? (
              <p className="text-[clamp(1rem,2vw,1.125rem)] leading-relaxed whitespace-pre-wrap text-gray-600">
                {product.description}
              </p>
            ) : (
              <p className="text-gray-400 italic">상세 설명이 준비되지 않았습니다.</p>
            )}
          </div>

          <div className="h-fit rounded-2xl border border-gray-100 bg-gray-50 p-8 lg:col-span-4">
            <ul className="space-y-6">
              {[
                { label: '국가', value: product.beanSummary.origin },
                { label: '지역', value: product.beanSummary.region },
                { label: '가공 방식', value: product.beanSummary.process },
              ]
                .filter(
                  (item) => item.value !== undefined && item.value !== null && item.value !== '',
                )
                .map((item) => (
                  <li
                    key={item.label}
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
        </div>
      </SectionContainer>
      <FlavorProfileSection
        balance={product.balance}
        sweetness={product.sweetness}
        acidity={product.acidity}
        body={product.body}
        roastingType={product.roastingType}
      />
    </PageContainer>
  );
}
