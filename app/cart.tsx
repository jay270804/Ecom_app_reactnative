import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { RegisterHeader } from "@/components/ui/header/RegisterHeader";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { Toast, ToastDescription, ToastTitle, useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { ANDROID_BASE_URL } from "@/lib/constant";
import { useProducts } from "@/lib/query/hooks";
import { useAuthStore } from "@/store/slices/authSlice";
import { CartItem, useCartStore } from "@/store/slices/cartSlice";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, ScrollView } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Cart() {
  const router = useRouter();
  const toast = useToast();
  const { isAuthenticated } = useAuthStore();
  const { items: cart, removeFromCart, updateQuantity } = useCartStore();
  const insets = useSafeAreaInsets();
  const { data: productsData, isLoading: isProductsLoading, isError: isProductsError } = useProducts();

  // Pricing calculations
  const subtotalRaw = cart.reduce(
    (sum: number, item: CartItem) =>
      sum +
      (item.product.discountedPrice ?? item.product.price) * item.quantity,
    0
  );
  const subtotal = Math.round(subtotalRaw);
  const shipping = 50;
  const gst = Math.round(subtotal * 0.05);
  const total = Math.round(subtotal + shipping + gst);

  // Remove item with confirmation
  const handleRemove = (idx: number) => {
    const product = cart[idx]?.product;
    if (!product) return;

    toast.show({
      render: ({ id }) => {
        return (
          <Toast nativeID={id} action="warning" variant="solid">
            <ToastTitle>Remove Item</ToastTitle>
            <ToastDescription>
              Are you sure you want to remove "{product.name}" from the cart?
            </ToastDescription>
          </Toast>
        );
      },
    });

    // For now, we'll remove directly. In a real app, you might want a confirmation dialog
    removeFromCart(product.id);
  };

  // Quantity controls
  const updateQty = (idx: number, newQty: number) => {
    const product = cart[idx]?.product;
    if (!product) return;
    updateQuantity(product.id, newQty);
  };

  // Handle checkout with authentication check
  const handleCheckout = () => {
    if (!isAuthenticated) {
      Alert.alert(
        "Authentication Required",
        "Please login or register to complete your order.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Login",
            onPress: () => router.push("/auth/login")
          },
          {
            text: "Register",
            onPress: () => router.push("/auth/register")
          },
        ]
      );
      return;
    }

    // Proceed to checkout if authenticated
    router.push("/checkout");
  };

  const isEmpty = cart.length === 0;

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ flex: 1, backgroundColor: "transparent" }}
    >
      <RegisterHeader title="Cart" />
      <Box className="flex-1">
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
          <VStack space="md">
            {/* Cart Items */}
            {isEmpty ? (
              <Box className="items-center justify-center mt-16">
                <Text className="text-lg font-semibold mb-4">Cart is empty</Text>
              </Box>
            ) : (
              cart.map((item: CartItem, idx: number) => (
                <Card
                  key={item.product.id}
                  className="flex-row items-center bg-background-0 shadow-md rounded-xl px-4 py-4"
                >
                  {/* Product Image */}
                  <Image
                    source={
                      item.product.coverImage
                        ? { uri: `${ANDROID_BASE_URL}${item.product.coverImage}` }
                        : { uri: `${ANDROID_BASE_URL}/uploads/products/e4fedf3a-714c-43e5-8d18-e229fd6483b8_original.jpg` }
                    }
                    size="lg"
                    className="rounded-md mr-3 bg-background-0"
                    alt={item.product.name}
                  />
                  {/* Product Info & Controls */}
                  <Box className="flex-1 justify-between gap-2">
                    <Box className="flex-row items-start justify-between">
                      <Text
                        className="font-bold text-base text-typography-900 max-w-[60%]"
                        numberOfLines={1}
                      >
                        {item.product.name}
                      </Text>
                      {/* Remove (cross) icon */}
                      <Pressable
                        onPress={() => handleRemove(idx)}
                        className="p-1 ml-2"
                      >
                        <MaterialIcons name="close" size={22} color="#68686B" />
                      </Pressable>
                    </Box>
                    {/* Price & Quantity Controls */}
                    <Box className="flex flex-row justify-between items-center">
                      <Text className="text-tertiary-500 font-semibold text-md tracking-tight my-2 ">
                        Rs. {item.product.discountedPrice ?? item.product.price}/-
                      </Text>
                      {/* Quantity Controls - match [id].tsx style */}
                      <Box className="flex-row items-center  py-1 px-2 gap-1
                    border border-tertiary-700 rounded-full">
                        <Pressable
                          onPress={() => updateQty(idx, item.quantity - 1)}
                          className="rounded-full items-center justify-center w-9"
                        >
                          <Text className="text-xl text-tertiary-900">-</Text>
                        </Pressable>
                        <Text className="mx-2 text-lg font-semibold text-tertiary-950 min-w-[16px] text-center">
                          {item.quantity}
                        </Text>
                        <Pressable
                          onPress={() => updateQty(idx, item.quantity + 1)}
                          className="rounded-full items-center justify-center w-9"
                        >
                          <Text className="text-xl text-tertiary-900">+</Text>
                        </Pressable>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              ))
            )}
          </VStack>
          {/* Pricing Details */}
          {!isEmpty && (
            <Card className="mt-8 p-5 bg-background-0 rounded-2xl">
              <Box className="flex-row justify-between mb-2">
                <Text className="text-base text-typography-700">Sub total</Text>
                <Text className="text-base text-typography-900">
                  Rs. {subtotal}/-
                </Text>
              </Box>
              <Box className="flex-row justify-between mb-2">
                <Text className="text-base text-typography-700">Shipping</Text>
                <Text className="text-base text-typography-900">
                  Rs. {shipping}/-
                </Text>
              </Box>
              <Box className="flex-row justify-between mb-2">
                <Text className="text-base text-typography-700">Gst Tax</Text>
                <Text className="text-base text-typography-900">Rs. {gst}/-</Text>
              </Box>
              <Box className="flex-row justify-between mt-4">
                <Text className="text-lg font-bold text-typography-900">
                  Total
                </Text>
                <Text className="text-lg font-bold text-tertiary-700">
                  Rs. {total}/-
                </Text>
              </Box>
            </Card>
          )}
        </ScrollView>
        {/* Absolute Place Order/Browse Products Button */}
        <Box
          className="flex-row items-center bg-background-300 mx-4 rounded-full shadow-lg"
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
            className="flex-1 bg-tertiary-500 rounded-full py-3 mx-2 items-center justify-center"
            onPress={() => isEmpty ? router.push("/") : handleCheckout()}
          >
            <Text className="text-typography-0 text-base font-bold">
              {isEmpty ? "Browse Products" : "Place Order"}
            </Text>
          </Pressable>
        </Box>
      </Box>
    </SafeAreaView>
  );
}
