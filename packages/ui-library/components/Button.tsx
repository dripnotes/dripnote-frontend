import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import * as React from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
        google:
          'bg-google text-google-foreground border border-google-border hover:bg-google-hover font-medium hover:-translate-y-0.5 shadow-sm hover:shadow-md duration-200 ease-linear',
        naver:
          'bg-naver text-naver-foreground hover:bg-naver-hover font-semibold border-none hover:-translate-y-0.5 shadow-sm hover:shadow-md duration-200 ease-linear',
        kakao:
          'bg-kakao text-kakao-foreground hover:bg-kakao-hover font-semibold border-none hover:-translate-y-0.5 shadow-sm hover:shadow-md duration-200 ease-linear',
      },
      size: {
        default: 'h-10 py-2 px-4 active:scale-[0.98]',
        sm: 'h-9 px-3 rounded-md active:scale-[0.98]',
        lg: 'h-11 px-8 rounded-md active:scale-[0.98]',
        xl: 'h-[52px] px-8 rounded-lg text-base active:scale-[0.98]',
        icon: 'h-10 w-10 p-1.5 rounded-full hover:scale-110 active:scale-90 transition-all duration-200',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
