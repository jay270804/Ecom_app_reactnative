import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";

export default function Index() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <Box className="flex-1 justify-center items-center gap-5">
      <Text size="3xl" bold>
        This is Home Screen
      </Text>
      <Text size="xl" bold>
        Current theme: {theme}
      </Text>

      <Button
        variant="outline"
        action="primary"
        onPress={() => {
          router.push("/auth/login");
        }}
      >
        <ButtonText>Login</ButtonText>
      </Button>
      <Button
        variant="solid"
        action="secondary"
        onPress={() => {
          router.push("/product/1");
        }}
      >
        <ButtonText>Product</ButtonText>
      </Button>
    </Box>
  );
}
const sheets = StyleSheet.create({
  HomeView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});

