import SearchIcon from "@/components/svg/SearchIcon";
import ShoppingCart from "@/components/svg/ShoppingCart";
import { Box } from "@/components/ui/box";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable } from "../pressable";

export function Header({ hideSearchPressable = false }: { hideSearchPressable?: boolean } = {}) {
  const router = useRouter();
  return (
    <Box
      className={`w-full flex-row items-center justify-between px-5 py-4 bg-transparent border-b-2 border-secondary-500 overflow-hidden`}
    >
      {/* Left: Brand */}
      <Text className="text-primary-950 font-bold text-[12px] leading-[11.64px] tracking-tight">
        Brand
      </Text>
      {/* 👇 **EDITED LINE HERE** 👇 */}
      <Box className="w-2/3 flex flex-row items-center justify-end gap-4">
        {/* Hide search bar and pressable if hideSearchPressable is true */}
        {!hideSearchPressable && (
          <Box className="relative flex-1 h-9">
            {/* The Input (search bar) */}
            <Input className="flex-1 flex-row items-center justify-center bg-secondary-400 rounded-2xl mx-2 px-3 border border-secondary-800">
              <InputSlot className="flex mt-1 pr-2">
                <SearchIcon height={20} width={20} />
              </InputSlot>
              <InputField
                placeholder="Search"
                type="text"
                className="text-secondary-500 text-[12px] font-light"
                editable={false}
                pointerEvents="none"
              />
            </Input>
            {/* The overlay Pressable */}
            <Pressable
              className="absolute left-0 top-0 right-0 bottom-0"
              onPress={() => router.push("/search")}
              style={{ backgroundColor: "transparent" }}
            />
          </Box>
        )}
        {/* Cart Icon */}
        <Pressable onPress={() => router.push("/cart")} hitSlop={24}>
          <ShoppingCart height={20} width={20} />
        </Pressable>
      </Box>
    </Box>
  );
}

export function ProductHeader({
  onWishlistPress,
  wishlisted,
}: {
  onWishlistPress?: () => void;
  wishlisted?: boolean;
}) {
  const router = useRouter();
  return (
    <Box className="w-full flex-row items-center justify-between px-5 py-4 border-b-2 border-secondary-500 overflow-hidden h-[56px]">
      {/* Back button */}
      <Pressable
        onPress={() => router.back()}
        className="w-8 items-start justify-center"
        hitSlop={24}
      >
        <MaterialIcons name="arrow-back" size={28} color="#68686B" />
      </Pressable>
      {/* Centered Title */}
      <Text className="text-primary-950 font-bold text-lg text-center flex-1">
        Product
      </Text>
      {/* Wishlist icon */}
      <Pressable
        onPress={onWishlistPress}
        className="w-8 items-end justify-center"
      >
        <MaterialIcons
          name={wishlisted ? "favorite" : "favorite-border"}
          size={26}
          color={wishlisted ? "#FB9D4B" : "#68686B"}
        />
      </Pressable>
    </Box>
  );
}

export function SearchHeader({
  query,
  setQuery,
  inputRef,
}: {
  query: string;
  setQuery: (q: string) => void;
  inputRef?: (ref: any) => void;
}) {
  const router = useRouter();
  return (
    <Box className="w-full flex-row items-center justify-between px-5 py-4 border-b-2 border-secondary-500 h-[56px]">
      {/* Back arrow */}
      <Pressable
        onPress={() => router.back()}
        className="w-8 items-start justify-center"
        hitSlop={24}
      >
        <MaterialIcons name="arrow-back" size={28} color="#68686B" />
      </Pressable>
      {/* Centered Search Input */}
      <Box className="flex-1 mx-6">
        <Input className="flex-row items-center bg-secondary-500 rounded-2xl h-9 px-4 border-2 border-secondary-700">
          <InputSlot className="flex mt-1 pr-2">
            <SearchIcon height={20} width={20} />
          </InputSlot>
          <InputField
            ref={inputRef}
            value={query}
            onChangeText={setQuery}
            placeholder="Search"
            className="text-secondary-800 text-[12px] font-light"
            returnKeyType="search"
            autoFocus
          />
        </Input>
      </Box>
      {/* Empty box for centering */}
      <Box className="w-8" />
    </Box>
  );
}
