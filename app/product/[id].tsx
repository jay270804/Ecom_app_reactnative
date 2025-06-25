import { dummyProducts } from "@/assets/products";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { ProductHeader } from "@/components/ui/header";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProductScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const product = dummyProducts.find((p) => p.id === id) || dummyProducts[0];
  const [activeIndex, setActiveIndex] = useState(0);
  const [cartQty, setCartQty] = useState(0);
  const { width: screenWidth } = Dimensions.get("window");
  const insets = useSafeAreaInsets();

  // For now, use the same image 3 times
  const images = [product.image, product.image, product.image];

  const hasDiscount = product.discountPercentage && product.discountPercentage > 0;

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1, backgroundColor: "transparent" }}>
      {/* Consistent Product Header */}
      <ProductHeader onWishlistPress={() => { /* TODO: connect to wishlist */ }} />
      {/* Main Content Box */}
      <Box className="flex-1 items-center justify-start px-0 pt-4">
        <Box className="w-full max-w-md rounded-lg px-6 py-2 items-center">
          {/* Product Image Carousel */}
          <VStack className="w-full items-center">
            <Carousel
              width={screenWidth - 48}
              height={180}
              data={images}
              onSnapToItem={setActiveIndex}
              renderItem={({ item }) => (
                <Image
                  source={item}
                  className="w-full h-full rounded-xl object-cover"
                  alt={product.name}
                />
              )}
              style={{ borderRadius: 16, overflow: "hidden" }}
              loop={false}
            />
            {/* Dots */}
            <Box className="flex-row justify-center mt-2">
              {images.map((_, i) => (
                <Box
                  key={i}
                  className={`w-2 h-2 mx-1 rounded-full ${i === activeIndex ? "bg-tertiary-500" : "bg-outline-200"}`}
                />
              ))}
            </Box>
          </VStack>
          {/* Product Info Card */}
          <Card className="w-full bg-background-0 mt-4 p-4 rounded-xl">
            <Text className="text-2xl tracking-tight font-bold text-typography-950 mb-2">{product.name}</Text>
            <Box className="flex-row items-center mb-2 gap-2">
              <Text className="text-xl font-bold text-tertiary-500">
                Rs. {hasDiscount ? product.discountedPrice : product.price}/-
              </Text>
              {hasDiscount && (
                <Text className="text-base text-typography-400 line-through">Rs. {product.price}/-</Text>
              )}
            </Box>
            {hasDiscount && (
              <Box className="mb-2 w-[72px]">
                <Text className=" bg-tertiary-500 text-typography-0 px-2 py-2 rounded-md text-xs font-semibold">
                  -{product.discountPercentage}% OFF
                </Text>
              </Box>
            )}
            <Text className="text-base font-semibold text-typography-900 mb-1">Description</Text>
            <Text className="text-xs text-typography-700 mb-2 line-clamp-4">{product.description}</Text>
          </Card>
        </Box>
      </Box>
      {/* Floating Add to Cart / Quantity Control - styled like CustomTabBar */}
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
        {cartQty === 0 ? (
          <Pressable
            className="flex-1 bg-tertiary-500 rounded-full py-3 mx-2 items-center justify-center"
            onPress={() => setCartQty(1)}
          >
            <Text className="text-typography-0 text-base font-bold">Add to Cart</Text>
          </Pressable>
        ) : (
          <>
            <Pressable
              className="bg-background-0 rounded-full w-1/4 py-3 items-center justify-center mx-2"
              onPress={() => setCartQty(0)}
            >
              <MaterialIcons name="delete-outline" size={22} color="#68686B" />
            </Pressable>
            <Box className="flex-row flex-1 items-center justify-between py-2 px-4 border-2 rounded-full border-outline-800 mx-2">
              <Pressable
                className="w-8 rounded-full items-center justify-center"
                onPress={() => setCartQty((q) => Math.max(1, q - 1))}
              >
                <Text className="text-xl text-typography-900">-</Text>
              </Pressable>
              <Text className="mx-2 text-lg font-semibold text-typography-900">{cartQty}</Text>
              <Pressable
                className="w-8 rounded-full items-center justify-center"
                onPress={() => setCartQty((q) => q + 1)}
              >
                <Text className="text-xl text-typography-900">+</Text>
              </Pressable>
            </Box>
          </>
        )}
      </Box>
    </SafeAreaView>
  );
}