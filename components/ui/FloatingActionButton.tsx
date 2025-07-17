import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Box } from "./box";
import { Pressable } from "./pressable";
import { Text } from "./text";

interface FloatingActionButtonProps {
  onPress?: () => void;
  text?: string;
  children?: React.ReactNode;
}

export function FloatingActionButton({
  onPress,
  text,
  children,
}: FloatingActionButtonProps) {
  const insets = useSafeAreaInsets();

  return (
    <Box
      className="flex-row items-center bg-background-100 mx-4 rounded-full shadow-lg"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: insets.bottom,
        height: 64,
        marginBottom: 24,
        marginHorizontal: 16,
        zIndex: 10,
        justifyContent: "center",
      }}
    >
      {children ? (
        children
      ) : (
        <Pressable
          className="flex-1 bg-tertiary-500 rounded-full py-4 mx-2 items-center justify-center"
          onPress={onPress}
        >
          <Text className="text-typography-0 text-base font-bold">{text}</Text>
        </Pressable>
      )}
    </Box>
  );
}