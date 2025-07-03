import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import React, { useState } from "react";

export function BrandCard({
  brand,
  onPress,
  selected = false,
}: {
  brand: any;
  onPress: () => void;
  selected?: boolean;
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      className={`flex-1 mx-1 my-2 rounded-lg border items-center shadow-lg justify-between
        ${
          selected
            ? "border-tertiary-500"
            : "border-outline-100"
        }
        ${pressed ? "border-tertiary-500" : ""}`}
      style={{ minWidth: 100, maxWidth: "50%" }}
    >
      <Box
        className={`bg-background-50 w-full rounded-lg ${
          selected
            ? "bg-tertiary-100"
            : "bg-background-0"
        }`}
      >
        <Image
          source={brand.image}
          className="h-[144px] w-full border-b object-contain aspect-square mx-auto my-4"
          alt={`${brand.name}-logo`}
        />
      </Box>
    </Pressable>
  );
}

export function ExtrasBrandCard({
  brand,
  onPress,
  selected = false,
}: {
  brand: any;
  onPress: () => void;
  selected?: boolean;
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      className={`flex-1 mx-1 my-2 rounded-lg border items-center shadow-lg justify-center
        ${
          selected
            ? "bg-tertiary-100 border-tertiary-500"
            : "bg-background-0 border-outline-100"
        }
        ${pressed ? "border-tertiary-500" : ""}`}
      style={{ minWidth: 100, maxWidth: "50%", height: 60 }}
    >
      <Box className="w-full rounded-lg items-center justify-center">
        <Text size="md" className="font-bold tracking-wide text-center">
          {brand.name}
        </Text>
      </Box>
    </Pressable>
  );
}

export function CategoryCard({ category, onPress, selected = false }: { category: any; onPress: () => void; selected?: boolean }) {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      className={`flex-1 mx-2 my-2 border-b-2 items-center justify-center
        ${selected ? "border-tertiary-500" : "border-outline-100"}
        ${pressed ? "border-tertiary-500" : ""}`}
      style={{ minWidth: 100, height: 48 }}
    >
      <Box className="w-full items-center justify-center px-3">
        <Text size="md" className="font-bold text-center">
          {category.name}
        </Text>
      </Box>
    </Pressable>
  );
}
