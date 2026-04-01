import LoginCarousel from '@/components/LoginCarousel';
import SocialLoginButton from '@/components/SocialLoginButton';

export default function LoginPage() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center p-4 select-none md:p-8">
      <div className="flex h-full max-h-[580px] w-full max-w-[980px] flex-col overflow-hidden rounded-lg bg-white shadow-[0_20px_50px_rgba(139,69,19,0.15)] md:flex-row">
        {/* Left Side: Carousel (60%) */}
        <div className="hidden h-full w-full md:block md:w-[60%]">
          <LoginCarousel />
        </div>

        {/* Right Side: Login Form (40%) */}
        <div className="z-10 flex flex-1 flex-col justify-center bg-white px-10 shadow-[-20px_0_30px_rgba(0,0,0,0.03)]">
          <div className="mb-10 text-center md:text-left">
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-[#3D2B1F] md:text-4xl">
              로그인
            </h1>
            <p className="text-[#8C5A3C]/70">소셜 계정으로 간편하게 로그인하세요</p>
          </div>

          <div className="flex flex-col gap-3">
            <SocialLoginButton provider="google" />
            <SocialLoginButton provider="kakao" />
            <SocialLoginButton provider="naver" />
          </div>

          <div className="mt-8 flex justify-center gap-4 text-center text-xs leading-relaxed text-[#A67B5B]">
            <a
              href="#"
              className="underline-offset-4 transition-colors hover:text-[#6F4E37] hover:underline"
            >
              서비스 약관
            </a>
            <a
              href="#"
              className="underline-offset-4 transition-colors hover:text-[#6F4E37] hover:underline"
            >
              개인정보 처리방침
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
