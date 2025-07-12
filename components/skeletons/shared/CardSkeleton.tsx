import { Box } from "@/components/ui/box";
import { SkeletonText } from "@/components/ui/skeleton";
import React from "react";

interface CardSkeletonProps {
  lines?: number[];
  className?: string;
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({
  lines = [1, 1, 1, 1],
  className = "",
}) => (
  <Box className={`mb-4 p-5 rounded-2xl bg-background-50 shadow-md ${className}`}>
    {lines.map((_, i) => (
      <SkeletonText
        key={i}
        _lines={1}
        className={`h-4 mb-2 ${i === 0 ? "h-5 w-1/2 mb-2" : i === lines.length - 1 ? "w-1/3" : "w-2/3"}`}
      />
    ))}
  </Box>
);

export default CardSkeleton;