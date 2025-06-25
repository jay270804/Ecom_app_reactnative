import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";

export function RegisterHeader({ title = "Register" }: { title?: string }) {
  const router = useRouter();
  return (
    <Box className="w-full flex-row items-center justify-between px-5 py-4 bg-transparent border-b-2 border-secondary-500 overflow-hidden h-[56px]">
      {/* Back button */}
      <Pressable onPress={() => router.back()} className="w-8 items-start justify-center">
        <MaterialIcons name="arrow-back" size={28} color="#68686B" />
      </Pressable>
      {/* Centered Title */}
      <Text className="text-primary-950 font-bold text-lg text-center flex-1">{title}</Text>
      {/* Empty element for spacing */}
      <Box className="w-8" />
    </Box>
  );
}