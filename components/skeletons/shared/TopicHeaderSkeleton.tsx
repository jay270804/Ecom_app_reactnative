import { Box } from "@/components/ui/box";
import { Skeleton } from "@/components/ui/skeleton";

const TopicHeaderSkeleton = () => (
  <Box className="border-b border-background-100 py-1 min-w-1/3 mx-auto">
    <Skeleton className="h-8 w-32 mx-auto rounded-md" speed={4} />
  </Box>
);

export default TopicHeaderSkeleton;