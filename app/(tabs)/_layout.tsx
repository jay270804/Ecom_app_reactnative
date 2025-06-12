import { HapticTab } from "@/app-example/components/HapticTab";
import TabBarBackground from "@/app-example/components/ui/TabBarBackground";
import { Header } from "@/components/ui/header";
import { MaterialIcons } from "@expo/vector-icons";
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
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitle: () => (
            <Header
              title="Home"
              rightAction={{
                label: "404",
                onPress: () => router.push("/+not-found"),
                variant: "outline",
                action: "primary"
              }}
            />
          ),
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={30} color={color} name="home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={30} color={color} name="search" />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={30} color={color} name="account-circle" />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={30} color={color} name="shopping-cart" />
          ),
        }}
      />
    </Tabs>
  );
}
