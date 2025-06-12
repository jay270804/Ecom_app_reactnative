import { Button, ButtonText } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

/**
 * Example component showing the simplified theme system using Zustand
 */
export function ThemeExample() {
  const { theme, mode, isDark, setTheme, toggleTheme } = useTheme();

  return (
    <ThemedView style={styles.container}>
      {/* Main content */}
      <ThemedView style={styles.section}>
        <ThemedText variant="title">Simplified Theme System</ThemedText>
        <ThemedText>Current theme: {theme}</ThemedText>
        <ThemedText>User preference: {mode}</ThemedText>
        <ThemedText>Is dark mode: {isDark ? 'Yes' : 'No'}</ThemedText>
      </ThemedView>

      {/* Different text variants */}
      <ThemedView variant="secondary" style={styles.section}>
        <ThemedText variant="subtitle">Text Variants</ThemedText>
        <ThemedText variant="default">Default text</ThemedText>
        <ThemedText variant="primary">Primary colored text</ThemedText>
        <ThemedText variant="secondary">Secondary colored text</ThemedText>
        <ThemedText variant="muted">Muted text</ThemedText>
        <ThemedText variant="link">Link text</ThemedText>
      </ThemedView>

      {/* Theme controls */}
      <View style={styles.buttonContainer}>
        <Button
          variant="outline"
          onPress={() => setTheme('light')}
          style={{ marginBottom: 10 }}
        >
          <ButtonText>Light Mode</ButtonText>
        </Button>

        <Button
          variant="outline"
          onPress={() => setTheme('dark')}
          style={{ marginBottom: 10 }}
        >
          <ButtonText>Dark Mode</ButtonText>
        </Button>

        <Button
          variant="outline"
          onPress={() => setTheme('system')}
          style={{ marginBottom: 10 }}
        >
          <ButtonText>System Mode</ButtonText>
        </Button>

        <Button
          variant="outline"
          onPress={toggleTheme}
        >
          <ButtonText>Toggle Theme</ButtonText>
        </Button>
      </View>

      {/* Color examples using Gluestack tokens */}
      <ThemedView variant="muted" style={styles.section}>
        <ThemedText variant="subtitle">Gluestack Color Tokens</ThemedText>
        <View style={styles.colorRow}>
          <View style={[styles.colorSwatch, { backgroundColor: 'rgb(var(--color-primary-500))' }]} />
          <ThemedText>Primary 500</ThemedText>
        </View>
        <View style={styles.colorRow}>
          <View style={[styles.colorSwatch, { backgroundColor: 'rgb(var(--color-error-500))' }]} />
          <ThemedText>Error 500</ThemedText>
        </View>
        <View style={styles.colorRow}>
          <View style={[styles.colorSwatch, { backgroundColor: 'rgb(var(--color-success-500))' }]} />
          <ThemedText>Success 500</ThemedText>
        </View>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  section: {
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  buttonContainer: {
    gap: 8,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  colorSwatch: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
});