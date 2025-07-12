import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { VStack } from "@/components/ui/vstack";
import React from "react";

const ProductDetailsSkeleton = () => (
  <Box className="w-full max-w-md rounded-lg px-6 py-2 items-center">
    {/* Image Carousel Skeleton */}
    <Skeleton className="w-full h-64 rounded-lg mb-4" speed={4}/>
    {/* Product Info Card Skeleton */}
    <Card className="w-full bg-background-0 mt-4 p-4 rounded-xl">
      <VStack className="gap-2 mb-2">
        {/* Product Name */}
        <Skeleton className="h-8 w-2/3 rounded-md" speed={4}/>
        {/* Price Row */}
        <Box className="flex-row items-center gap-2 mb-2">
          <Skeleton className="h-6 w-24 rounded-md" speed={4}/>
          <Skeleton className="h-4 w-16 rounded-md" speed={4}/> {/* Discounted price */}
        </Box>
        {/* Discount Badge */}
        <Skeleton className="h-6 w-20 rounded-md mb-2" speed={4}/>
      </VStack>
      {/* Description Title */}
      <Skeleton className="h-4 w-24 rounded-md mb-1" speed={4}/>
      {/* Description Lines */}
      <VStack className="gap-1 mb-2">
        <Skeleton className="h-3 w-full rounded-md" speed={4}/>
        <Skeleton className="h-3 w-5/6 rounded-md" speed={4}/>
        <Skeleton className="h-3 w-4/6 rounded-md" speed={4}/>
        <Skeleton className="h-3 w-3/6 rounded-md" speed={4}/>
      </VStack>
    </Card>
  </Box>
);

export default ProductDetailsSkeleton;