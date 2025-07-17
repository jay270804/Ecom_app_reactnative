import OrderDetailsSkeleton from "@/components/skeletons/OrderDetailsSkeleton";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { RegisterHeader } from "@/components/ui/header/RegisterHeader";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { useOrder } from "@/lib/query/hooks";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderDetails() {
  const { id } = useLocalSearchParams();
  const { data: order, isLoading, isError, error } = useOrder(id as string);

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1, backgroundColor: "transparent" }}>
      <RegisterHeader title="Order" />
      <Box className="flex-1 px-4 py-8">
        {isLoading ? (
          <OrderDetailsSkeleton />
        ) : isError || !order ? (
          <Text className="text-red-500">{error?.message || "Failed to fetch order."}</Text>
        ) : (
          <Card className="p-5 rounded-2xl bg-background-50 shadow-md mb-4">
            <Text className="text-base font-bold text-typography-900 mb-1">
              Order #{order._id.slice(-6).toUpperCase()}
            </Text>
            <Text className="text-sm text-typography-700 mb-1">
              Date: {new Date(order.createdAt).toLocaleDateString()}
            </Text>
            <Text className="text-sm text-typography-700 mb-1">
              Status: {order.orderStatus}
            </Text>
            <Text className="text-sm text-typography-700 mb-1">
              Payment: {order.paymentStatus}
            </Text>
            <Text className="text-sm text-typography-700 mb-1">
              Total: Rs. {order.orderTotal}/-
            </Text>
            <Text className="text-sm text-typography-700 mb-1">
              Shipping Address: {typeof order.shippingAddress === 'string' ? order.shippingAddress : `${order.shippingAddress?.title}, ${order.shippingAddress?.AddrLine1}, ${order.shippingAddress?.city}`}
            </Text>
            <Box className="mt-4">
              <Text className="text-lg text-tertiary-600 font-bold mb-2">Items:</Text>
              {order.orderItems.map((item: any, idx: number) => {
                const product = item.product || {};
                const name = product.name || item.product?.name || item.product || 'Product';
                const coverImage = product.coverImage;
                const imageUrl = coverImage
                  ? coverImage
                  : "https://ecommerce-react-native-app.s3.ap-south-1.amazonaws.com/products/default.jpg";
                return (
                  <Card key={idx} className="flex-row items-center bg-background-100 border border-secondary-500 rounded-xl px-4 py-4 mb-2">
                    {/* Product Image */}
                    <Image
                      source={{ uri: imageUrl }}
                      size="lg"
                      className="rounded-md mr-3 bg-background-0"
                      alt={name}
                    />
                    {/* Product Info */}
                    <Box className="flex-1 justify-between gap-2">
                      <Text className="font-bold text-base text-typography-900 max-w-[60%]" numberOfLines={1}>
                        {name}
                      </Text>
                      <Box className="flex flex-row justify-between items-center mt-1">
                        <Text className="text-tertiary-500 font-semibold text-md tracking-tight">
                          Rs. {item.price}/-
                        </Text>
                        <Text className="text-sm text-typography-700 ml-4">Qty: {item.quantity}</Text>
                      </Box>
                    </Box>
                  </Card>
                );
              })}
            </Box>
          </Card>
        )}
      </Box>
    </SafeAreaView>
  );
}