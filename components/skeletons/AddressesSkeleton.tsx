import { Box } from "@/components/ui/box";
import React from "react";
import { CardSkeleton } from "./shared";

const AddressesSkeleton = () => (
  <Box className="flex bg-transparent">
    {[...Array(3)].map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </Box>
);

export default AddressesSkeleton;