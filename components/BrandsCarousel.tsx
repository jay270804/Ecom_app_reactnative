import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { BrandCard } from "./BrandCard";

export function BrandsCarousel({ brands }: { brands: any[] }) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const { width: screenWidth } = Dimensions.get("window");

  // Group brands into slides of 3
  const slides = [];
  for (let i = 0; i < brands.length; i += 3) {
    slides.push(brands.slice(i, i + 3));
  }

  return (
    <VStack className="w-full items-center py-4">
      <Carousel
        width={screenWidth - 48}
        height={140}
        data={slides}
        onSnapToItem={setActiveIndex}
        renderItem={({ item: slide }) => (
          <Box className="flex-row justify-between w-full ">
            {slide.map((brand) => (
              <BrandCard
                key={brand.id}
                brand={brand}
                // TODO: Add appropriate filter (brand here) and navigate to Catalog
                // onPress={() => router.push({ pathname: "/productCatalogScreen", params: { brand: brand.id } })}
                onPress={() => {}}
              />
            ))}
          </Box>
        )}
        style={{ borderRadius: 16, overflow: "hidden" }}
        loop={false}
      />
      {/* Dots */}
      <Box className="flex-row justify-center mt-2">
        {slides.map((_, i) => (
          <Box
            key={i}
            className={`w-2 h-2 mx-1 rounded-full ${i === activeIndex ? "bg-tertiary-500" : "bg-outline-200"}`}
          />
        ))}
      </Box>
    </VStack>
  );
}