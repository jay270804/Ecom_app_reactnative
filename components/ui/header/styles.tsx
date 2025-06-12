import { tva } from '@gluestack-ui/nativewind-utils/tva';

export const headerStyle = tva({
  base: 'w-full flex-row items-center justify-between px-4 py-2 border-b-[1px] border-primary-500',
  variants: {
    theme: {
      light: 'bg-secondary-300',
      dark: 'bg-secondary-500',
    },
  },
});