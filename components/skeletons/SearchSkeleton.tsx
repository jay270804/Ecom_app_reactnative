import { Box } from "@/components/ui/box";
import { Skeleton } from "@/components/ui/skeleton";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductCardSkeleton } from "./shared";

// Search Header Skeleton
const SearchHeaderSkeleton = () => (
  <Box className="w-full flex-row items-center justify-between px-5 py-4 border-b-2 border-secondary-500 h-[56px]">
    {/* Back arrow skeleton */}
    <Box className="w-8 items-start justify-center">
      <Skeleton className="w-7 h-7 rounded-md" speed={4} />
    </Box>
    {/* Search input skeleton */}
    <Box className="flex-1 mx-6">
      <Box className="flex-row items-center bg-secondary-500 rounded-2xl h-9 px-4 border-2 border-secondary-700">
        <Skeleton className="w-5 h-5 rounded-md mr-2" speed={4} />
        <Skeleton className="flex-1 h-4 rounded-md" speed={4} />
      </Box>
    </Box>
    {/* Empty box for centering */}
    <Box className="w-8" />
  </Box>
);

// Empty state skeleton
const EmptyStateSkeleton = () => (
  <Box className="flex-1 items-center justify-center">
    <Skeleton className="w-48 h-6 rounded-md mb-4" speed={4} />
  </Box>
);

// Product grid skeleton
const ProductGridSkeleton = () => (
  <Box className="px-4 py-4">
    <Box className="flex-row flex-wrap justify-between">
      {Array.from({ length: 8 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </Box>
  </Box>
);

const SearchSkeleton = () => (
  <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1, backgroundColor: "transparent" }}>
    <SearchHeaderSkeleton />
    <ProductGridSkeleton />
  </SafeAreaView>
);

export default SearchSkeleton;