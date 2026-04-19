import { Slot } from '@radix-ui/react-slot';
import { motion, HTMLMotionProps } from 'framer-motion';
import * as React from 'react';
import { cn } from '../lib/utils';

/**
 * VisualCard Compound Component
 * - Root, ImageContainer, Image, Overlay, Content, Body, Title, Description, Footer
 */

interface VisualCardRootProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  asChild?: boolean;
  hoverEffect?: 'none' | 'translate' | 'glow';
  children?: React.ReactNode;
}

const MotionSlot = motion(Slot);

const Root = React.forwardRef<HTMLDivElement, VisualCardRootProps>(
  ({ className, asChild, hoverEffect = 'none', children, ...props }, ref) => {
    const Component = asChild ? MotionSlot : motion.div;

    return (
      <Component
        ref={ref}
        className={cn(
          'group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300',
          hoverEffect === 'translate' && 'hover:-translate-y-2',
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
Root.displayName = 'VisualCard.Root';

interface ImageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: 'square' | 'video' | '3/4' | '4/3' | string;
}

const ImageContainer = ({
  className,
  aspectRatio = 'square',
  children,
  ...props
}: ImageContainerProps) => {
  const aspectClass =
    {
      square: 'aspect-square',
      video: 'aspect-video',
      '3/4': 'aspect-[3/4]',
      '4/3': 'aspect-[4/3]',
    }[aspectRatio] || aspectRatio;

  return (
    <div
      className={cn('relative w-full overflow-hidden bg-gray-100', aspectClass, className)}
      {...props}
    >
      {children}
    </div>
  );
};
ImageContainer.displayName = 'VisualCard.ImageContainer';

interface VisualCardImageProps extends React.HTMLAttributes<HTMLElement> {
  hoverScale?: 1.05 | 1.1 | 1.15 | number;
  asChild?: boolean;
  src?: string;
  alt?: string;
}

const VisualImage = ({
  className,
  hoverScale = 1.1,
  asChild,
  children,
  ...props
}: VisualCardImageProps) => {
  const Component = asChild ? Slot : 'img';

  // Tailwind JIT를 위해 하드코딩된 클래스 매핑 사용
  const scaleClass =
    hoverScale === 1.05
      ? 'group-hover:scale-105'
      : hoverScale === 1.15
        ? 'group-hover:scale-115'
        : 'group-hover:scale-110'; // Default to 1.1

  return (
    <Component
      className={cn(
        'h-full w-full object-cover transition-transform duration-500',
        scaleClass,
        className,
      )}
      {...props}
    >
      {asChild && children}
    </Component>
  );
};
VisualImage.displayName = 'VisualCard.Image';

interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'bottom' | 'full' | 'none';
}

const Overlay = ({ className, variant = 'bottom', children, ...props }: OverlayProps) => {
  if (variant === 'none') return null;

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 z-10 transition-opacity duration-300',
        variant === 'bottom' && 'bg-linear-to-t from-black/80 via-black/30 to-transparent',
        variant === 'full' && 'bg-black/20 group-hover:bg-black/40',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
Overlay.displayName = 'VisualCard.Overlay';

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: 'bottom-left' | 'center' | 'top-right';
}

const Content = ({ className, position = 'bottom-left', children, ...props }: ContentProps) => {
  return (
    <div
      className={cn(
        'absolute z-20 w-full p-6',
        position === 'bottom-left' && 'bottom-0 left-0',
        position === 'center' && 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
Content.displayName = 'VisualCard.Content';

const Body = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('flex flex-1 flex-col p-6', className)} {...props}>
      {children}
    </div>
  );
};
Body.displayName = 'VisualCard.Body';

const Title = ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3 className={cn('text-xl font-bold text-gray-900', className)} {...props}>
      {children}
    </h3>
  );
};
Title.displayName = 'VisualCard.Title';

const Footer = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('mt-auto flex flex-wrap gap-2', className)} {...props}>
      {children}
    </div>
  );
};
Footer.displayName = 'VisualCard.Footer';

export const VisualCard = {
  Root,
  ImageContainer,
  Image: VisualImage,
  Overlay,
  Content,
  Body,
  Title,
  Footer,
};
