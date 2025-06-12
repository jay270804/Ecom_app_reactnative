import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useColorScheme } from 'nativewind';
import React from 'react';
import { Image as RNImage } from 'react-native';
import { headerStyle } from './styles';

interface HeaderProps {
  title?: string;
  showLogo?: boolean;
  logoSource?: any;
  rightAction?: {
    label: string;
    onPress: () => void;
    variant?: 'solid' | 'outline';
    action?: 'primary' | 'secondary' | 'positive' | 'negative';
  };
}

export function Header({
  title = "Header",
  showLogo = true,
  logoSource,
  rightAction
}: HeaderProps) {
  const { colorScheme } = useColorScheme();

  return (
    <Box
      className={headerStyle({
        theme: colorScheme === 'dark' ? 'dark' : 'light'
      })}
    >
      <Box className="flex-row items-center gap-3">
        {showLogo && (
          <RNImage
            source={logoSource || require("@/assets/images/favicon.png")}
            style={{ width: 40, height: 40, resizeMode: "contain" }}
          />
        )}
        <Text
          className="font-light text-primary-500"
          size="md"
        >
          {title}
        </Text>
      </Box>

      {rightAction && (
        <Button
          onPress={rightAction.onPress}
          variant={rightAction.variant || "outline"}
          action={rightAction.action || "primary"}
          size="md"
        >
          <ButtonText>{rightAction.label}</ButtonText>
        </Button>
      )}
    </Box>
  );
}