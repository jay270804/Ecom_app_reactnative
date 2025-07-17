import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { MaterialIcons } from "@expo/vector-icons";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TAB_ICONS: Record<string, string> = {
  index: "home",
  account: "person",
  search: "search",
  wishlist: "favorite-border",
  categories: "category"
};

const TAB_LABELS: Record<string, string> = {
  index: "Home",
  account: "Profile",
  search: "Search",
  wishlist: "Wishlist",
  categories: "Categories"
};

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <Box
      className="flex-row justify-between items-center bg-background-50 border-t border-outline-200 mx-4 rounded-full shadow-lg"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        // 👇 **APPLIED CHANGES HERE**
        bottom: insets.bottom,       // Positions the bar above the safe area (e.g., nav buttons)
        height: 64,                   // A fixed height for consistency
        marginBottom: 24,             // The space you want above the safe area
        marginHorizontal: 16,
        zIndex: 10,
      }}
    >
      {state.routes.map((route, idx) => {
        const isFocused = state.index === idx;
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            className="flex-1 items-center justify-center py-2" // py-2 helps vertically center content
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={descriptors[route.key]?.options.tabBarAccessibilityLabel}
          >
            <MaterialIcons
              name={TAB_ICONS[route.name] as any}
              size={24}
              color={isFocused ? "#FF7300" : "#A0A0A0"}
              style={{ marginBottom: 2 }}
            />
            <Text
              className={`text-xs ${isFocused ? "text-tertiary-500 font-semibold" : "text-typography-400 font-normal tracking-tighter"}`}
            >
              {TAB_LABELS[route.name] || route.name}
            </Text>
          </Pressable>
        );
      })}
    </Box>
  );
}