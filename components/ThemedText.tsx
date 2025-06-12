import { useColorScheme } from 'nativewind';
import { StyleSheet, Text, type TextProps } from 'react-native';

export type ThemedTextProps = TextProps & {
  variant?: 'default' | 'title' | 'subtitle' | 'caption' | 'link' | 'primary' | 'secondary' | 'muted';
};

export function ThemedText({
  style,
  variant = 'default',
  ...rest
}: ThemedTextProps) {
  const { colorScheme } = useColorScheme();

  // Use Gluestack UI color tokens
  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return 'rgb(var(--color-primary-500))';
      case 'secondary':
        return 'rgb(var(--color-typography-500))';
      case 'muted':
        return 'rgb(var(--color-typography-400))';
      case 'link':
        return 'rgb(var(--color-primary-500))';
      case 'title':
      case 'subtitle':
      case 'default':
      default:
        return 'rgb(var(--color-typography-900))';
    }
  };

  return (
    <Text
      style={[
        { color: getTextColor() },
        variant === 'default' ? styles.default : undefined,
        variant === 'title' ? styles.title : undefined,
        variant === 'subtitle' ? styles.subtitle : undefined,
        variant === 'caption' ? styles.caption : undefined,
        variant === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
