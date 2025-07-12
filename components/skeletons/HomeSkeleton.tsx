import { Box } from "@/components/ui/box";
import { Header } from "@/components/ui/header";
import { Skeleton } from "@/components/ui/skeleton";
import { BrandCardSkeleton, ExtrasBrandCardSkeleton, ProductCardSkeleton, TopicHeaderSkeleton } from "./shared";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Skeleton Components
const PromoCarouselSkeleton = () => (
  <Box className="h-48 bg-background-100 rounded-lg mx-5 my-4">
    <Skeleton className="w-full h-full rounded-lg" speed={4} />
  </Box>
);

const HomeSkeleton = () => (
  <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1, backgroundColor: "transparent" }}>
    <Header />
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
      <Box>
        <PromoCarouselSkeleton />
        <TopicHeaderSkeleton />
        <Box className="flex-row justify-between px-5 py-4 mb-2">
          {[1, 2].map((index) => (
            <BrandCardSkeleton key={index} />
          ))}
        </Box>
        <TopicHeaderSkeleton />
        <Box className="px-4 py-4">
          <Box className="flex-row justify-between mb-2">
            {[1, 2].map((index) => (
              <ExtrasBrandCardSkeleton key={index} />
            ))}
          </Box>
        </Box>
        <TopicHeaderSkeleton />
        <Box className="px-4 py-4">
          <Box className="flex-row flex-wrap justify-between">
            {Array.from({ length: 10 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </Box>
        </Box>
      </Box>
    </ScrollView>
  </SafeAreaView>
);

export default HomeSkeleton;