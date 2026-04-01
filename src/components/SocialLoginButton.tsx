import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

interface Props {
  provider: 'google' | 'kakao' | 'naver';
}

const buttonVariants = cva(
  'relative flex h-11 w-full cursor-pointer items-center justify-center rounded-xl border text-base font-bold transition-colors',
  {
    variants: {
      provider: {
        google: 'border-[#DADCE0] bg-[#FFFFFF] text-[#1F1F1F] hover:bg-[#F8F9FA] font-roboto',
        kakao: 'border-transparent bg-[#FEE500] text-[#000000]/85 hover:bg-[#FEE500]/80',
        naver: 'border-transparent bg-[#03C75A] text-[#FFFFFF] hover:bg-[#03C75A]/80',
      },
    },
    defaultVariants: {
      provider: 'google',
    },
  },
);

const PROVIDER_CONFIG = {
  google: {
    label: 'Google 계정으로 로그인',
  },
  kakao: {
    label: '카카오 로그인',
  },
  naver: {
    label: '네이버 로그인',
  },
} as const;

export default function SocialLoginButton({ provider }: Props) {
  const config = PROVIDER_CONFIG[provider];

  return (
    <button className={buttonVariants({ provider })}>
      <img
        src={`/logo/brand/${provider}/${provider}-logo.svg`}
        alt=""
        className={cn(
          'absolute top-1/2 left-4 flex size-[18px] -translate-y-1/2 items-center justify-center object-contain',
        )}
        data-slot="icon"
      />
      <span>{config.label}</span>
    </button>
  );
}
