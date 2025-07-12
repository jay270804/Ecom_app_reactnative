import { Box } from "@/components/ui/box";
import { Skeleton } from "@/components/ui/skeleton";

const BrandCardSkeleton = () => (
  <Box className="flex-1 mx-1 my-2 rounded-lg border border-outline-100 items-center shadow-lg justify-between bg-background-50" style={{ minWidth: 100, maxWidth: "50%" }}>
    <Box className="bg-background-0 w-full rounded-lg">
      <Skeleton className="h-[144px] w-full rounded-lg" speed={4} />
    </Box>
  </Box>
);

export default BrandCardSkeleton;