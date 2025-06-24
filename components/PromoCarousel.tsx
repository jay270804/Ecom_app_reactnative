import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Pressable } from "./ui/pressable";

export type Promo = {
  img: string;
  product_id: string;
};

export type PromoCarouselProps = {
  promos: Promo[];
  intervalMs?: number;
};

// Local image map for dev/demo
const imageMap: Record<string, any> = {
  "@/assets/images/promo1.png": require("@/assets/images/promo1.png"),
  "@/assets/images/promo2.png": require("@/assets/images/promo2.png"),
  "@/assets/images/promo3.png": require("@/assets/images/promo3.png"),
};

const { width: screenWidth } = Dimensions.get("window");

export function PromoCarousel({ promos, intervalMs = 3000 }: PromoCarouselProps) {
  const router = useRouter();

  if (!promos.length) return null;

  const handlePress = (product_id: string) => {
    router.push(`/product/${product_id}`);
  };

  return (
    <Box className="px-6 py-4">
      <Carousel
        width={screenWidth - 48} // px-6 on both sides (12*2=24px each side)
        height={160}
        autoPlay
        autoPlayInterval={intervalMs}
        data={promos}
        scrollAnimationDuration={500}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePress(item.product_id)} className="w-full h-full">
            <Image
              source={imageMap[item.img]}
              className="w-full h-full rounded-xl object-cover"
              alt="Promotion"
            />
          </Pressable>
        )}
        style={{ borderRadius: 16, overflow: "hidden" }}
        // loop // uncomment if you want infinite loop
      />
    </Box>
  );
}