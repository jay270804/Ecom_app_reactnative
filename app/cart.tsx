import { dummyProducts } from "@/assets/products";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RegisterHeader } from "@/components/ui/header/RegisterHeader";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

// Dummy cart items: 3 distinct products with different quantities
const initialCart = [
  { product: dummyProducts[0], quantity: 2 },
  { product: dummyProducts[1], quantity: 1 },
  { product: dummyProducts[2], quantity: 3 },
];

export default function Cart() {
  const [cart, setCart] = useState(initialCart);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Pricing calculations
  const subtotalRaw = cart.reduce(
    (sum, item) =>
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
    Alert.alert(
      "Remove Item",
      `Are you sure you want to remove \"${cart[idx].product.name}\" from the cart?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => setCart((c) => c.filter((_, i) => i !== idx)),
        },
      ]
    );
  };

  // Quantity controls
  const updateQty = (idx: number, newQty: number) => {
    setCart((c) =>
      c.map((item, i) =>
        i === idx ? { ...item, quantity: Math.max(1, newQty) } : item
      )
    );
  };

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
            {cart.map((item, idx) => (
              <Card
                key={item.product.id}
                className="flex-row items-center bg-background-0 shadow-md rounded-xl px-4 py-4"
              >
                {/* Product Image */}
                <Image
                  source={item.product.image}
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
                    <Box className="flex-row items-center  py-1 px-4 gap-3
                    border border-tertiary-700 rounded-full">
                      <Pressable
                        onPress={() => updateQty(idx, item.quantity - 1)}
                        className="rounded-full items-center justify-center"
                      >
                        <Text className="text-xl text-tertiary-900">-</Text>
                      </Pressable>
                      <Text className="mx-2 text-lg font-semibold text-tertiary-950 min-w-[16px] text-center">
                        {item.quantity}
                      </Text>
                      <Pressable
                        onPress={() => updateQty(idx, item.quantity + 1)}
                        className="rounded-full items-center justify-center"
                      >
                        <Text className="text-xl text-tertiary-900">+</Text>
                      </Pressable>
                    </Box>
                  </Box>
                </Box>
              </Card>
            ))}
          </VStack>
          {/* Pricing Details */}
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
        </ScrollView>
        {/* Absolute Place Order Button */}
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
            onPress={() => router.push("/checkout")}
          >
            <Text className="text-typography-0 text-base font-bold">
            Place Order
            </Text>
          </Pressable>
        </Box>
      </Box>
    </SafeAreaView>
  );
}
