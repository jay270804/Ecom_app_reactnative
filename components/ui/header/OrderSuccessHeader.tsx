import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import React from "react";

export function OrderSuccessHeader({ title = "Order Success" }: { title?: string }) {
  return (
    <Box className="w-full flex-row items-center justify-center px-5 py-4 bg-transparent border-b-2 border-secondary-500 overflow-hidden h-[56px]">
      <Text className="text-primary-950 font-bold text-lg text-center flex-1">{title}</Text>
    </Box>
  );
}