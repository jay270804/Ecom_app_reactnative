import { Box } from "@/components/ui/box";
import { Skeleton } from "@/components/ui/skeleton";

const ExtrasBrandCardSkeleton = () => (
  <Box className="flex-1 mx-1 my-2 rounded-lg border border-outline-100 items-center shadow-lg justify-center bg-background-0" style={{ minWidth: 100, maxWidth: "50%", height: 60 }}>
    <Skeleton className="h-6 w-20 rounded-md" speed={4} />
  </Box>
);

export default ExtrasBrandCardSkeleton;