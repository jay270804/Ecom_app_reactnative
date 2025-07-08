import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderSuccess() {
  const router = useRouter();
  const { orderId } = useLocalSearchParams();

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1, backgroundColor: "transparent" }}>
      <Box className="flex-1 justify-center items-center bg-background-0 px-4">
        <Card className="items-center p-8 rounded-2xl bg-background-0 shadow-lg">
          <Text className="text-5xl mb-4">🎉</Text>
          <Text className="text-2xl font-bold text-tertiary-500 mb-2">Order Placed!</Text>
          <Text className="text-base text-typography-700 mb-4">
            Thank you for your purchase.
          </Text>
          {orderId && (
            <Text className="text-base text-typography-900 mb-4">
              Order ID: <Text className="font-bold">{orderId}</Text>
            </Text>
          )}
          <Button
            className="bg-tertiary-500 rounded-full mb-2"
            onPress={() => router.replace("/orders")}
          >
            <ButtonText className="text-base font-bold text-typography-0">View My Orders</ButtonText>
          </Button>
          <Button
            className="bg-transparent border border-secondary-600 rounded-full"
            onPress={() => router.replace('/')}
          >
            <ButtonText className="text-base font-bold text-primary-400">Continue Shopping</ButtonText>
          </Button>
        </Card>
      </Box>
    </SafeAreaView>
  );
}