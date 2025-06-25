import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable } from "../pressable";

export function Header() {
  const router = useRouter();
  return (
    <Box
      className={`w-full flex-row items-center justify-between px-5 py-4 bg-transparent border-b-2 border-secondary-500 overflow-hidden`}
    >
      {/* Left: Brand */}
      <Text className="text-primary-950 font-bold text-[12px] leading-[11.64px] tracking-tight">
        Brand
      </Text>
      <Box className="w-2/3 flex flex-row items-center justify-between gap-4">
        <Input className="flex-1 flex-row items-center bg-secondary-500 rounded-2xl h-9 mx-2 px-3 border-2 border-secondary-700">
          <InputSlot className="pl-0 pr-2">
            {/* If you have a vector icon, use: <InputIcon as={SearchIcon}/> */}
            <Image
              source={require("@/assets/images/search_icon.png")}
              className="w-5 h-5"
              alt="search_icon"
            />
          </InputSlot>
          <InputField
            placeholder="Search"
            type="text"
            className="text-secondary-800 text-[12px] font-light"
          />
        </Input>
        {/* TODO: get a high definition svg */}
        <Pressable
          onPress={() => router.push('/cart')}
        >
          <Image
            source={require("@/assets/images/cart_icon.png")}
            className="w-5 h-5"
            alt="cart_icon"
          />
        </Pressable>
      </Box>
    </Box>
  );
}
