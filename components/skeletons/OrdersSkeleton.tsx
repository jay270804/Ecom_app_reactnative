import { Box } from "@/components/ui/box";
import React from "react";
import { CardSkeleton } from "./shared";

const OrdersSkeleton = () => (
  <Box className="flex-1 bg-transparent">
    {[...Array(4)].map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </Box>
);

export default OrdersSkeleton;