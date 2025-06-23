import { tva } from '@gluestack-ui/nativewind-utils/tva';

export const headerStyle = tva({
  base: 'w-full flex-row items-center justify-between px-5 py-4',
  variants: {
    theme: {
      light: 'bg-transparent',
      dark: 'bg-transparent',
    },
  },
});

export const brandTextStyle = tva({
  base: 'font-bold text-[12px] leading-[11.64px] font-poppins mr-2',
});

export const searchBarStyle = tva({
  base: 'flex-1 flex-row items-center bg-primary-200 rounded-2xl h-9 mx-2 px-3',
});

export const searchIconStyle = tva({
  base: 'w-5 h-5 mr-2 tint-primary-950',
});

export const searchInputStyle = tva({
  base: 'flex-1 text-primary-950 font-poppins text-[14px] bg-transparent p-0 border-0',
});

export const cartIconStyle = tva({
  base: 'w-6 h-6 tint-[#FF7300]',
});