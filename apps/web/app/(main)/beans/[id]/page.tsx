import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import PageContainer from '@/components/layout/PageContainer';
import RecommendedBeans from '@/components/main/RecommendedBeans';
import { mockBeansData } from '@/lib/api/beans';
import { mockMainData } from '@/lib/api/main';

import { BeanDetailHero } from './_components/BeanDetailHero';
import { BeanInfoTable } from './_components/BeanInfoTable';
import { BrewingGuide } from './_components/BrewingGuide';
import { FlavorProfileSection } from './_components/FlavorProfileSection';

interface Props {
  params: {
    id: string;
  };
}

// 동적 메타데이터 생성 (SEO)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = parseInt(params.id, 10);
  const bean = mockBeansData.find((b) => b.id === id);

  if (!bean) {
    return {
      title: '원두를 찾을 수 없습니다 | Dripnote',
      description: '존재하지 않는 원두 페이지입니다.',
    };
  }

  const title = `${bean.name} - ${bean.roastery || 'Dripnote'}`;
  const description =
    bean.description || `${bean.origin}에서 온 ${bean.primaryAroma} 향미의 매력적인 원두입니다.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: bean.aromaImageUrl,
          alt: `${bean.name} 이미지`,
        },
      ],
    },
  };
}

export default function BeanDetailPage({ params }: Props) {
  const id = parseInt(params.id, 10);
  const bean = mockBeansData.find((b) => b.id === id);

  if (!bean) {
    notFound();
  }

  return (
    <PageContainer>
      <BeanDetailHero
        name={bean.name}
        origin={bean.origin}
        roastery={bean.roastery}
        aromaImageUrl={bean.aromaImageUrl}
        primaryAroma={bean.primaryAroma}
        purchaseUrl={bean.purchaseUrl}
      />
      <BeanInfoTable
        origin={bean.origin}
        category={bean.category}
        blend={bean.blend}
        processing={bean.processing}
        variety={bean.variety}
        altitude={bean.altitude}
        description={bean.description}
      />
      <FlavorProfileSection
        bitterness={bean.bitterness || 0}
        sweetness={bean.sweetness || 0}
        acidity={bean.acidity || 0}
        body={bean.body || 0}
        roasting={bean.roasting || 0}
      />
      <BrewingGuide recipe={bean.recipe} />
      <RecommendedBeans beans={mockMainData.recommendedBeans} />
    </PageContainer>
  );
}
