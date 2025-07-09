import React, { useState } from "react";
import { Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { Box } from "./ui/box";
import { Image } from "./ui/image";
import { VStack } from "./ui/vstack";

interface ProductCarouselProps {
  images: (string | undefined | null)[];
  alt?: string;
}

export default function ProductCarousel({ images, alt }: ProductCarouselProps) {
  const { width: screenWidth } = Dimensions.get("window");
  const [currentIndex, setCurrentIndex] = useState(0);
  // Filter and map images to full URLs (same logic as ProductCard)
  const imageUrls = images
    .filter((img): img is string => typeof img === "string" && !!img);

  return (
    <VStack className="w-full items-center">
      <Carousel
        width={screenWidth - 32}
        height={320} // Increased height
        data={imageUrls}
        onSnapToItem={setCurrentIndex}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item }}
            alt={alt}
            className="w-full h-[320px] rounded-xl bg-background-200 object-contain"
          />
        )}
        style={{ borderRadius: 16, overflow: "hidden" }}
        loop={false}
      />
      {/* Dots */}
      <Box className="flex-row justify-center mt-2">
        {imageUrls.map((_, i) => (
          <Box
            key={i}
            className={`w-2 h-2 mx-1 rounded-full ${i === currentIndex ? "bg-tertiary-500" : "bg-outline-200"}`}
          />
        ))}
      </Box>
    </VStack>
  );
}