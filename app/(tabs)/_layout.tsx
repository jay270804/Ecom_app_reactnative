import { HapticTab } from "@/components/HapticTab";
import { CustomTabBar } from "@/components/ui/tab-bar/CustomTabBar";
import { Tabs, useRouter } from "expo-router";
import { Platform, useColorScheme } from "react-native";
import { Colors } from "../../constants/Colors";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="categories" />
      <Tabs.Screen name="search" />
      <Tabs.Screen name="account" />
      <Tabs.Screen name="wishlist" />
    </Tabs>
  );
}
