import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function OrderDetailsSkeleton() {
  return (
      <Card className="p-5 rounded-2xl bg-background-50 shadow-md mb-4">
        {/* Order Info Skeletons */}
        <Skeleton className="h-5 w-32 mb-2 rounded" /> {/* Order ID */}
        <Skeleton className="h-4 w-24 mb-2 rounded" /> {/* Date */}
        <Skeleton className="h-4 w-20 mb-2 rounded" /> {/* Status */}
        <Skeleton className="h-4 w-20 mb-2 rounded" /> {/* Payment */}
        <Skeleton className="h-4 w-24 mb-2 rounded" /> {/* Total */}
        <Skeleton className="h-4 w-40 mb-4 rounded" /> {/* Shipping Address */}
        <Box className="mt-4">
          <Skeleton className="h-6 w-24 mb-3 rounded" /> {/* Items title */}
          {/* Item skeletons */}
          {[1, 2].map((_, idx) => (
            <Card key={idx} className="flex-row items-center bg-background-100 border border-secondary-500 rounded-xl px-4 py-4 mb-2">
              <Skeleton className="h-16 w-16 rounded-md mr-3 bg-background-0" /> {/* Product Image */}
              <Box className="flex-1 justify-between gap-2">
                <Skeleton className="h-4 w-32 mb-2 rounded" /> {/* Product Name */}
                <Box className="flex flex-row justify-between items-center mt-1">
                  <Skeleton className="h-4 w-16 rounded" /> {/* Price */}
                  <Skeleton className="h-4 w-10 ml-4 rounded" /> {/* Qty */}
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      </Card>
  );
}
