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
      style={{ minWidth: 100, maxWidth: 120 }}
    >
      <Image
        source={brand.image}
        className="h-24 w-full rounded-t-lg object-cover border-b-2 border-outline-500"
        alt={`${brand.name}-logo`}
      />
      <Box className={`w-full py-2 rounded-b-lg items-center`}>
        <Text className={`text-xs font-semibold ${pressed ? "text-tertiary-500" : "text-typography-900"}`}>
          {brand.name}
        </Text>
      </Box>
    </Pressable>
  );
}