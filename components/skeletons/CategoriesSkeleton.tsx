import { Box } from "@/components/ui/box";
import { RegisterHeader } from "@/components/ui/header/RegisterHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BrandCardSkeleton, ExtrasBrandCardSkeleton, ProductCardSkeleton, TopicHeaderSkeleton } from "./shared";

// Skeleton Components
const CategoryCardSkeleton = () => (
  <Box className="flex-1 mx-2 my-2 border-b-2 border-outline-100 items-center justify-center bg-background-0" style={{ minWidth: 100, height: 48 }}>
    <Skeleton className="h-6 w-24 rounded-md" speed={4} />
  </Box>
);

const ProductCatalogueSkeleton = () => (
  <Box className="flex-1">
    <Box className="px-4">
      <Box className="flex-row flex-wrap justify-between">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </Box>
    </Box>
  </Box>
);

const CategoriesSkeleton = () => (
  <SafeAreaView edges={["top", "left", "right"]} style={{ backgroundColor: "transparent" }}>
    <RegisterHeader title="Categories" />
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Brands Row (Apple & Samsung) */}
      <Box className="flex-row justify-between px-5 pt-3">
        {[1, 2].map((index) => (
          <BrandCardSkeleton key={index} />
        ))}
      </Box>

      {/* Extras Brands FlatList */}
      <Box className="px-4 mb-4">
        <Box className="flex-row justify-between mb-2">
          {[1, 2].map((index) => (
            <ExtrasBrandCardSkeleton key={index} />
          ))}
        </Box>
      </Box>

      {/* Categories Horizontal List */}
      <TopicHeaderSkeleton />
      <Box className="px-4 py-4">
        <Box className="flex-row">
          {Array.from({ length: 6 }).map((_, index) => (
            <CategoryCardSkeleton key={index} />
          ))}
        </Box>
      </Box>

      {/* Product Catalogue */}
      <ProductCatalogueSkeleton />
    </ScrollView>
  </SafeAreaView>
);

export default CategoriesSkeleton;