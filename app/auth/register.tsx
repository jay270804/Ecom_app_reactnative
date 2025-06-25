import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RegisterHeader } from "@/components/ui/header/RegisterHeader";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import TopicHeader from "@/components/ui/TopicHeader";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  // TODO: Add appropriate app validation before submitting form.
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
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
      style={{ flex: 1, backgroundColor: "#f5f5f5" }}
    >
      <RegisterHeader />
      <Box className="flex-1 pt-4 gap-4">
        <TopicHeader title="Create Your Account" />
        <Box className="flex-1 items-center justify-start px-6 py-2">
          <Card className="w-full max-w-md bg-background-0 p-4 rounded-lg">
            {/* First/Last Name Row */}
            <Box className="flex-row gap-2 mb-2">
              <Box className="flex-1">
                <Text
                  className={`mb-1 text-xs font-semibold ${
                    focus === "firstName"
                      ? "text-tertiary-500"
                      : "text-typography-900"
                  }`}
                >
                  First name
                </Text>
                <Input
                  className={`h-9 px-2 bg-transparent border ${
                    focus === "firstName"
                      ? "border-tertiary-500"
                      : "border-outline-200"
                  } rounded`}
                >
                  <InputField
                    value={form.firstName}
                    onChangeText={(v) => handleChange("firstName", v)}
                    className="text-typography-900 text-sm"
                    onFocus={() => setFocus("firstName")}
                    onBlur={() => setFocus(null)}
                  />
                </Input>
              </Box>
              <Box className="flex-1">
                <Text
                  className={`mb-1 text-xs font-semibold ${
                    focus === "lastName"
                      ? "text-tertiary-500"
                      : "text-typography-900"
                  }`}
                >
                  Last name
                </Text>
                <Input
                  className={`h-9 px-2 bg-transparent border ${
                    focus === "lastName"
                      ? "border-tertiary-500"
                      : "border-outline-200"
                  } rounded`}
                >
                  <InputField
                    value={form.lastName}
                    onChangeText={(v) => handleChange("lastName", v)}
                    className="text-typography-900 text-sm"
                    onFocus={() => setFocus("lastName")}
                    onBlur={() => setFocus(null)}
                  />
                </Input>
              </Box>
            </Box>
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
            {/* Confirm Password */}
            <Box className="mb-2">
              <Text
                className={`mb-1 text-xs font-semibold ${
                  focus === "confirmPassword"
                    ? "text-tertiary-500"
                    : "text-typography-900"
                }`}
              >
                Confirm Password
              </Text>
              <Input
                className={`h-9 px-2 bg-transparent border ${
                  focus === "confirmPassword"
                    ? "border-tertiary-500"
                    : "border-outline-200"
                } rounded`}
              >
                <InputField
                  value={form.confirmPassword}
                  onChangeText={(v) => handleChange("confirmPassword", v)}
                  className="text-typography-900 text-sm"
                  secureTextEntry
                  onFocus={() => setFocus("confirmPassword")}
                  onBlur={() => setFocus(null)}
                />
              </Input>
            </Box>
            {/* Mobile Number */}
            <Box className="mb-4">
              <Text
                className={`mb-1 text-xs font-semibold ${
                  focus === "mobile"
                    ? "text-tertiary-500"
                    : "text-typography-900"
                }`}
              >
                Mobile Number
              </Text>
              <Input
                className={`h-9 px-2 bg-transparent border ${
                  focus === "mobile"
                    ? "border-tertiary-500"
                    : "border-outline-200"
                } rounded`}
              >
                <InputField
                  value={form.mobile}
                  onChangeText={(v) => handleChange("mobile", v)}
                  className="text-typography-900 text-sm"
                  keyboardType="phone-pad"
                  onFocus={() => setFocus("mobile")}
                  onBlur={() => setFocus(null)}
                />
              </Input>
            </Box>
            {/* Sign up Button */}
            <Button
              className="bg-tertiary-500 rounded mt-2 mb-1"
              onPress={handleSubmit}
              isDisabled={loading}
            >
              <ButtonText className="text-typography-0 font-semibold">
                Sign up
              </ButtonText>
            </Button>
            {/* Log in Link */}
            <Box className="flex-row justify-center my-2">
              <Text className="text-xs text-typography-700">
                Already have an account ?{" "}
              </Text>
              <Text
                className="text-xs text-tertiary-500 font-semibold ml-1"
                onPress={() => router.replace("/auth/login")}
              >
                Log in
              </Text>
            </Box>
          </Card>
        </Box>
      </Box>
    </SafeAreaView>
  );
}
