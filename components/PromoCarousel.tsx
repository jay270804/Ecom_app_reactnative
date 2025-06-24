import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
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

export function PromoCarousel({ promos, intervalMs = 3000 }: PromoCarouselProps) {
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (promos.length === 0) return;
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % promos.length);
    }, intervalMs);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [promos.length, intervalMs]);

  if (!promos.length) return null;

  const handlePress = () => {
    router.push(`/product/${promos[index].product_id}`);
  };

  return (
    <Box className="px-6 py-4">
      <Pressable onPress={handlePress} className="w-full">
        <Image
          source={imageMap[promos[index].img]}
          className="w-full h-40 rounded-xl object-cover"
          alt="Promotion"
        />
      </Pressable>
    </Box>
  );
}