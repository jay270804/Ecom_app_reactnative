import { View, type ViewProps } from 'react-native';
import { useColorScheme } from 'nativewind';

export type ThemedViewProps = ViewProps & {
  variant?: 'primary' | 'secondary' | 'muted' | 'background';
};

export function ThemedView({
  style,
  variant = 'background',
  ...otherProps
}: ThemedViewProps) {
  const { colorScheme } = useColorScheme();

  // Use Gluestack UI color tokens
  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return 'rgb(var(--color-primary-500))';
      case 'secondary':
        return 'rgb(var(--color-secondary-100))';
      case 'muted':
        return 'rgb(var(--color-background-muted))';
      case 'background':
      default:
        return 'rgb(var(--color-background-0))';
    }
  };

  return (
    <View
      style={[
        { backgroundColor: getBackgroundColor() },
        style
      ]}
      {...otherProps}
    />
  );
}
