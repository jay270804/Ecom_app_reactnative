import { tva } from '@gluestack-ui/nativewind-utils/tva';

export const tabBarStyle = tva({
  base: 'flex-row border-t border-outline-200 px-2 py-1',
  variants: {
    theme: {
      light: 'bg-background-300',
      dark: 'bg-background-300',
    },
  },
});