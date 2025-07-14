import { Box } from "@/components/ui/box";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const AddressSelectSkeleton = () => (
  <Box className="flex bg-transparent">
    {[...Array(3)].map((_, i) => (
      <Box key={i} className="flex-row items-center mb-3">
        {/* Circular skeleton for radio button */}
        <Skeleton className="w-6 h-6 rounded-full mr-2 bg-background-200" />
        {/* Rectangular skeleton for address text */}
        <Skeleton className="h-10 w-3/4 rounded bg-background-200" />
      </Box>
    ))}
  </Box>
);

export default AddressSelectSkeleton;