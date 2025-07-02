import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import React, { useState } from "react";

export function BrandCard({ brand, onPress }: { brand: any; onPress: () => void }) {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      className={`flex-1 mx-1 my-2 rounded-lg border bg-background-0 items-center justify-between
        ${pressed ? "border-tertiary-500" : "border-outline-100"}`}
      style={{ minWidth: 100, maxWidth: "50%" }}
    >
      <Box className="bg-background-200 w-full rounded-t-lg">
      <Image
        source={brand.image}
        className="h-[144px] w-full border-b object-contain aspect-square mx-auto my-2"
        alt={`${brand.name}-logo`}
      />
      </Box>
      <Box className={`w-full py-3 rounded-b-lg items-center`}>
        <Text className={`text-xs font-semibold tracking-wider ${pressed ? "text-tertiary-500" : "text-typography-900"}`}>
          {brand.name}
        </Text>
      </Box>
    </Pressable>
  );
}