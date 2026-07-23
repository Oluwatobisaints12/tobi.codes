import localFont from 'next/font/local';

// Local Ampher Font
export const ampherFont = localFont({
  src: './Ampher.ttf',
  variable: '--font-ampher',
  display: 'swap',
});

// Local Object Sans Font
export const objectSansFont = localFont({
  src: [
    {
      path: './ObjectSansRegular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './ObjectSansHeavy.otf',
      weight: '800',
      style: 'normal',
    },
    {
      path: './ObjectSansSlanted.otf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './ObjectSansHeavySlanted.otf',
      weight: '800',
      style: 'italic',
    },
  ],
  variable: '--font-object-sans',
  display: 'swap',
});

// Local Neue Machina Font
export const neueMachinaFont = localFont({
  src: [
    {
      path: './NeueMachina-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './NeueMachina-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './NeueMachina-Ultrabold.otf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-neue-machina',
  display: 'swap',
});
