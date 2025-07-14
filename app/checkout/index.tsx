import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { RegisterHeader } from "@/components/ui/header/RegisterHeader";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { useAddresses, useCreateRazorpayOrder, useVerifyPaymentAndCreateOrder } from "@/lib/query/hooks";
import { useCartStore } from "@/store/slices/cartSlice";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, ScrollView } from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function Checkout() {
  const { items: cart, selectedAddressId, clearCart } = useCartStore();
  const createRazorpayOrder = useCreateRazorpayOrder();
  const verifyPaymentAndCreateOrder = useVerifyPaymentAndCreateOrder();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { data: addresses, isLoading: isAddressesLoading } = useAddresses();

  // Calculate total
  const subtotal = cart.reduce(
    (sum, item) =>
      sum +
      (item.product.discountedPrice ?? item.product.price) * item.quantity,
    0
  );
  const shipping = 50;
  const gst = Math.round(subtotal * 0.05);
  const total = Math.round(subtotal + shipping + gst);

  // Prepare orderItems for API
  const orderItems = cart.map((item) => ({
    product: item.product.id,
    quantity: item.quantity,
    price: item.product.discountedPrice ?? item.product.price,
  }));

  // Find selected address
  const selectedAddress = addresses?.find((a: any) => a._id === selectedAddressId);

  const handlePay = async () => {
    if (!selectedAddressId) {
      Alert.alert("No Address", "Please select a shipping address in cart.");
      return;
    }
    try {
      // 1. Create Razorpay order
      const razorpayOrder = await createRazorpayOrder.mutateAsync({
        amount: total,
        currency: "INR",
      });
      // 2. Open Razorpay Checkout
      const options = {
        key: process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: razorpayOrder.amount.toString(),
        currency: "INR",
        name: "My App",
        description: "Order Payment",
        order_id: razorpayOrder.id,
        prefill: {},
      };
      RazorpayCheckout.open(options)
        .then(async (data) => {
          // 3. Verify payment and create order
          const order = await verifyPaymentAndCreateOrder.mutateAsync({
            razorpay_order_id: data.razorpay_order_id,
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_signature: data.razorpay_signature,
            orderItems,
            shippingAddress: selectedAddressId,
          });
          clearCart();
          router.push({ pathname: '/checkout/order-success', params: { orderId: order?.order?._id || order?._id || "" } } as any);
        })
        .catch((error) => {
          Alert.alert(
            "Payment Failed",
            error.description || "Payment was not completed."
          );
        });
    } catch (err: any) {
      Alert.alert("Error", err.message || "Something went wrong.");
    }
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1, backgroundColor: "transparent" }}>
      <RegisterHeader title="Checkout" />
      <Box className="flex-1 bg-transparent px-4 pt-4 pb-0">
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
          {/* Selected Address */}
          <Card className="mb-6 p-4 bg-background-0 rounded-2xl">
            <Text className="text-lg font-semibold mb-2">Shipping Address</Text>
            {isAddressesLoading ? (
              <Text>Loading address...</Text>
            ) : !selectedAddress ? (
              <Text className="text-base text-typography-700">No address selected. Please select one in cart.</Text>
            ) : (
              <Box>
                <Text className="text-base font-bold text-typography-900 mb-1">{selectedAddress.title}</Text>
                <Text className="text-sm text-typography-700 mb-1">{selectedAddress.AddrLine1}{selectedAddress.AddrLine2 ? `, ${selectedAddress.AddrLine2}` : ""}</Text>
                <Text className="text-sm text-typography-700 mb-1">{selectedAddress.city}, {selectedAddress.state} - {selectedAddress.PIN}</Text>
                {selectedAddress.landmark && <Text className="text-sm text-typography-700 mb-1">Landmark: {selectedAddress.landmark}</Text>}
              </Box>
            )}
          </Card>
          {/* Payable Amount Only */}
          <Card className="mb-6 p-4 bg-background-0 rounded-2xl">
            <Text className="text-lg font-semibold mb-2">Payable Amount</Text>
            <Box className="flex-row justify-between items-center mt-2">
              <Text className="text-lg font-bold text-typography-900">Total</Text>
              <Text className="text-lg font-bold text-tertiary-700">Rs. {total}/-</Text>
            </Box>
          </Card>
        </ScrollView>
        {/* Floating Pay Button */}
        <Box
          className="flex-row items-center bg-background-100 mx-4 rounded-full shadow-lg"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            marginHorizontal: 16,
            marginBottom: 24 + insets.bottom,
            zIndex: 10,
            paddingBottom: insets.bottom,
            height: 64 + insets.bottom,
            justifyContent: "center",
          }}
        >
          <Pressable
            className="flex-1 bg-tertiary-500 rounded-full py-4 mx-2 items-center justify-center"
            onPress={handlePay}
          >
            <Text className="text-typography-0 text-base font-bold">Pay with Razorpay</Text>
          </Pressable>
        </Box>
      </Box>
    </SafeAreaView>
  );
}
