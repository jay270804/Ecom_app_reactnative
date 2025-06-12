import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Poppins: require("@/assets/fonts/poppins.medium.ttf"),

    // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  if (!loaded) {
    // Async font loading, for development.
    return null;
  }

  return (
    <GluestackUIProvider mode={colorScheme || 'light'}>
      <NavigationThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="auth/login" options={{ headerShown: false }} />
          <Stack.Screen name="auth/register" options={{ headerShown: false }} />
          <Stack.Screen name="checkout/index" options={{ headerShown: false }} />
          <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </NavigationThemeProvider>
    </GluestackUIProvider>
  );
}
