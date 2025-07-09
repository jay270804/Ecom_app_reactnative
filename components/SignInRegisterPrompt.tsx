import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import React from "react";

interface SignInRegisterPromptProps {
  title: string;
  description: string;
  className?: string;
}

export default function SignInRegisterPrompt({ title, description, className }: SignInRegisterPromptProps) {
  const router = useRouter();
  return (
    <Box className={`flex-1 items-center justify-center px-6 ${className || ''}`.trim()}>
      <Box className="items-center">
        <Text className="text-xl font-bold text-center mb-4">
          {title}
        </Text>
        <Text className="text-base text-center text-gray-600 mb-8">
          {description}
        </Text>
        <Box className="w-full max-w-sm space-y-4 gap-4">
          <Button
            className="bg-tertiary-500 rounded"
            onPress={() => router.push('/auth/login')}
          >
            <ButtonText className="text-typography-0 font-semibold">
              Sign In
            </ButtonText>
          </Button>
          <Button
            className="bg-transparent border border-tertiary-500 rounded"
            onPress={() => router.push('/auth/register')}
          >
            <ButtonText className="text-tertiary-500 font-semibold">
              Create Account
            </ButtonText>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}