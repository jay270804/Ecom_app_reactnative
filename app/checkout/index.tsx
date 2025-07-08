import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import {
    useCreateRazorpayOrder,
    useVerifyPaymentAndCreateOrder,
} from "@/lib/query/hooks";
import { useCartStore } from "@/store/slices/cartSlice";
import { useRouter } from "expo-router";
import React from "react";
import { Alert } from "react-native";
import RazorpayCheckout from "react-native-razorpay";

export default function Checkout() {
  const { items: cart, selectedAddressId, clearCart } = useCartStore();
  const createRazorpayOrder = useCreateRazorpayOrder();
  const verifyPaymentAndCreateOrder = useVerifyPaymentAndCreateOrder();
  const router = useRouter();

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
    <Box className="flex-1 justify-center items-center">
      <Text className="mb-4 text-lg font-bold">Checkout</Text>
      <Text className="mb-2">Total: Rs. {total}/-</Text>
      <Pressable
        className="bg-tertiary-500 px-6 py-3 rounded-full"
        onPress={handlePay}
      >
        <Text className="text-white font-bold">Pay with Razorpay</Text>
      </Pressable>
    </Box>
  );
}
