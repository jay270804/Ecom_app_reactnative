import { tva } from '@gluestack-ui/nativewind-utils/tva';

export const headerStyle = tva({
  base: 'w-full flex-row items-center justify-between px-5 py-4 rounded-b-3xl ',
  variants: {
    theme: {
      light: 'bg-background-200',
      dark: 'bg-background-200',
    },
  },
});