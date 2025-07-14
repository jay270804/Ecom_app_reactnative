import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { OrderSuccessHeader } from "@/components/ui/header/OrderSuccessHeader";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderSuccess() {
  const router = useRouter();
  const navigation = useNavigation();
  const { orderId } = useLocalSearchParams();

  const handleViewOrders = () => {
    navigation.reset({
      index: 1,
      routes: [
        { name: "(tabs)" as never },
        { name: "orders/index" as never },
      ],
    });
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1, backgroundColor: "transparent" }}>
      <OrderSuccessHeader title="Order Success" />
      <Box className="flex  px-4 py-8 items-center justify-center">
        <Card className="items-center p-5 rounded-2xl bg-background-50 shadow-md w-full max-w-md">
          <Text className="text-5xl mb-4">🎉</Text>
          <Text className="text-2xl font-bold text-tertiary-500 mb-2">Order Placed!</Text>
          <Text className="text-base text-typography-700 mb-5 text-center">
            Thank you for your purchase.
          </Text>
          {orderId && (
            <Text className="text-base text-typography-900 mb-4 text-center">
              Order ID: <Text className="font-bold">{orderId}</Text>
            </Text>
          )}
          <Button
            className="bg-tertiary-500 rounded-md mb-2 w-full"
            onPress={handleViewOrders}
          >
            <ButtonText className="text-base font-bold text-typography-0">View My Orders</ButtonText>
          </Button>
          <Button
            className="bg-transparent border border-secondary-600 rounded-md w-full"
            onPress={() => router.replace('/')}
          >
            <ButtonText className="text-base font-bold text-primary-400">Continue Shopping</ButtonText>
          </Button>
        </Card>
      </Box>
    </SafeAreaView>
  );
}