import { Box } from "@/components/ui/box";
import { Skeleton } from "@/components/ui/skeleton";
import { VStack } from "@/components/ui/vstack";

const ProductCardSkeleton = () => (
  <Box className="w-1/2">
    <Box className="p-3 rounded-lg flex-1 mx-1 my-2 flex flex-col justify-between border border-outline-100 min-h-[260px] shadow-md bg-background-0">
      <Box className="flex-1">
        <Skeleton className="mb-4 h-[160px] w-full rounded-md" speed={4} />
        <VStack className="mb-4 gap-2">
          <Skeleton className="h-4 w-3/4 rounded-md" speed={4} />
          <Skeleton className="h-3 w-1/2 rounded-md" speed={4} />
        </VStack>
      </Box>
      <Box className="flex flex-col gap-2">
        <Skeleton className="h-8 w-full rounded-md" speed={4} />
        <Skeleton className="h-8 w-full rounded-md" speed={4} />
      </Box>
    </Box>
  </Box>
);

export default ProductCardSkeleton;