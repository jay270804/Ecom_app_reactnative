import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RegisterHeader } from "@/components/ui/header/RegisterHeader";
import { Image } from "@/components/ui/image";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import TopicHeader from "@/components/ui/TopicHeader";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [focus, setFocus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);
    router.replace("/");
  };

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ flex: 1, backgroundColor: "transparent" }}
    >
      <RegisterHeader title="Login" />
      <Box className="flex-1 pt-4 gap-4">
        <TopicHeader title="Welcome Back" />
        <Box className="flex-1 items-center justify-start px-6 py-2 ">
          <Card className="w-full max-w-md bg-background-0 p-4 rounded-lg">
            {/* Email */}
            <Box className="mb-2">
              <Text
                className={`mb-1 text-xs font-semibold ${
                  focus === "email"
                    ? "text-tertiary-500"
                    : "text-typography-900"
                }`}
              >
                Email
              </Text>
              <Input
                className={`h-9 px-2 bg-transparent border ${
                  focus === "email"
                    ? "border-tertiary-500"
                    : "border-outline-200"
                } rounded`}
              >
                <InputField
                  value={form.email}
                  onChangeText={(v) => handleChange("email", v)}
                  className="text-typography-900 text-sm"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => setFocus("email")}
                  onBlur={() => setFocus(null)}
                />
              </Input>
            </Box>
            {/* Password */}
            <Box className="mb-2">
              <Text
                className={`mb-1 text-xs font-semibold ${
                  focus === "password"
                    ? "text-tertiary-500"
                    : "text-typography-900"
                }`}
              >
                Password
              </Text>
              <Input
                className={`h-9 px-2 bg-transparent border ${
                  focus === "password"
                    ? "border-tertiary-500"
                    : "border-outline-200"
                } rounded`}
              >
                <InputField
                  value={form.password}
                  onChangeText={(v) => handleChange("password", v)}
                  className="text-typography-900 text-sm"
                  secureTextEntry
                  onFocus={() => setFocus("password")}
                  onBlur={() => setFocus(null)}
                />
              </Input>
            </Box>
            {/* Sign in Button */}
            <Button
              className="bg-tertiary-500 rounded mt-2 mb-1"
              onPress={handleSubmit}
              isDisabled={loading}
            >
              <ButtonText className="text-typography-0 font-semibold">
                Sign in
              </ButtonText>
            </Button>
            {/* Forgot Password Link */}
            <Box className="flex-row justify-center my-2">
              <Text
                className="text-xs text-tertiary-500 font-semibold "
                onPress={() => {}}
              >
                {/* TODO: add the redirection to reset pass screen */}
                Forgot Password ?
              </Text>
            </Box>
            {/* Register Link */}
            <Box className="flex-row justify-center mt-2">
              <Text className="text-xs text-typography-700">
                Don't have an account ?{" "}
              </Text>
              <Text
                className="text-xs text-tertiary-500 font-semibold ml-1"
                onPress={() => router.replace("/auth/register")}
              >
                Register
              </Text>
            </Box>
          </Card>
        </Box>
        {/* Illustration at the bottom */}
        <Box className="flex items-center justify-end  mt-4">
          <Image
            source={require("@/assets/images/login_screen_illustration.png")}
            className="w-2/3 h-1/2"
            alt="login-illustration"
            resizeMode="cover"
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
}
