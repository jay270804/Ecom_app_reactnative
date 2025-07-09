import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { RegisterHeader } from "@/components/ui/header/RegisterHeader";
import { Pressable } from "@/components/ui/pressable";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { useOrders } from "@/lib/query/hooks";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Orders() {
  const router = useRouter();
  const { data: orders, isLoading, isError, error } = useOrders();

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1, backgroundColor: "transparent" }}>
      <RegisterHeader title="My Orders" />
      <Box className="flex-1 bg-transparent px-4 py-8">
        {isLoading ? (
          <Box className="flex-1 justify-center items-center">
            <Spinner size="large" />
          </Box>
        ) : isError ? (
          <Text className="text-red-500">{error?.message || "Failed to fetch orders."}</Text>
        ) : !orders || orders.length === 0 ? (
          <Text className="text-base text-typography-700 mt-12">No orders found.</Text>
        ) : (
          <Box className="gap-4">
            {orders.map((order: any) => (
              <Pressable
                key={order._id}
                onPress={() => router.push({ pathname: "/orders/[id]", params: { id: order._id } } as any)}
              >
                <Card className="p-5 rounded-2xl bg-background-50 shadow-md mb-2">
                  <Text className="text-base font-bold text-typography-900 mb-1">
                    Order #{order._id.slice(-6).toUpperCase()}
                  </Text>
                  <Text className="text-sm text-typography-700 mb-1">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </Text>
                  <Text className="text-sm text-typography-700 mb-1">
                    Total: Rs. {order.orderTotal}/-
                  </Text>
                  <Text className="text-sm font-semibold text-tertiary-500">
                    Status: {order.orderStatus}
                  </Text>
                </Card>
              </Pressable>
            ))}
          </Box>
        )}
      </Box>
    </SafeAreaView>
  );
}
