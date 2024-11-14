'use client';

import * as React from 'react';
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react';
import type { EmblaPluginType } from 'embla-carousel';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>[0];

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: UseCarouselParameters;
  plugins?: EmblaPluginType[];
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      orientation = 'horizontal',
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === 'horizontal' ? 'x' : 'y',
      },
      plugins
    );

    const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);

    React.useEffect(() => {
      if (emblaApi) {
        setApi?.(emblaApi);
      }
    }, [emblaApi, setApi]);

    React.useEffect(() => {
      if (emblaApi) {
        const onSelect = () => {
          setPrevBtnDisabled(!emblaApi.canScrollPrev());
          setNextBtnDisabled(!emblaApi.canScrollNext());
        };

        emblaApi.on('select', onSelect);
        onSelect();

        return () => {
          emblaApi.off('select', onSelect);
        };
      }
    }, [emblaApi]);

    return (
      <div
        ref={ref}
        className={cn('relative', className)}
        {...props}
      >
        <div ref={emblaRef} className='overflow-hidden'>
          <div className={cn(
            'flex',
            orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          )}>
            {React.Children.map(children, (child) => (
              <div className={cn(
                'min-w-0 flex-[0_0_100%]',
                orientation === 'horizontal' ? 'pl-4' : 'pt-4',
              )}>
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
Carousel.displayName = 'Carousel';

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'absolute h-8 w-8 rounded-full',
        'left-12 top-1/2 -translate-y-1/2',
        className
      )}
      {...props}
    >
      <ArrowLeft className='h-4 w-4' />
      <span className='sr-only'>Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        'absolute h-8 w-8 rounded-full',
        'right-12 top-1/2 -translate-y-1/2',
        className
      )}
      {...props}
    >
      <ArrowRight className='h-4 w-4' />
      <span className='sr-only'>Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = 'CarouselNext';

export { type CarouselApi, Carousel, CarouselPrevious, CarouselNext };
