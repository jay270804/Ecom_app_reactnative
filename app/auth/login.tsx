import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RegisterHeader } from "@/components/ui/header/RegisterHeader";
import { Image } from "@/components/ui/image";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Toast, ToastDescription, ToastTitle, useToast } from "@/components/ui/toast";
import TopicHeader from "@/components/ui/TopicHeader";
import { useAuthStore } from "@/store/slices/authSlice";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuthStore();
  const toast = useToast();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [focus, setFocus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async () => {
    // Validate form
    if (!form.email || !form.password) {
      setError("Please fill in both fields");
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          return (
            <Toast nativeID={id} action="error" variant="solid">
              <ToastTitle>Error</ToastTitle>
              <ToastDescription>Please fill in all fields</ToastDescription>
            </Toast>
          );
        },
      });
      return;
    }

    if (!form.email.includes("@")) {
      setError("Please enter a valid email address");
      toast.show({
        render: ({ id }) => {
          return (
            <Toast nativeID={id} action="error" variant="solid">
              <ToastTitle>Error</ToastTitle>
              <ToastDescription>Please enter a valid email address</ToastDescription>
            </Toast>
          );
        },
      });
      return;
    }

    try {
      const result = await login({
        email: form.email,
        password: form.password,
      });

      if (result.success) {
        // Login successful, user will be redirected by useEffect
        setError(null);
        toast.show({
          render: ({ id }) => {
            return (
              <Toast nativeID={id} action="success" variant="solid">
                <ToastTitle>Success</ToastTitle>
                <ToastDescription>Login successful!</ToastDescription>
              </Toast>
            );
          },
        });
      } else {
        setError(result.error || "Login failed");
        toast.show({
          render: ({ id }) => {
            return (
              <Toast nativeID={id} action="error" variant="solid">
                <ToastTitle>Error</ToastTitle>
                <ToastDescription>{result.error || "Login failed"}</ToastDescription>
              </Toast>
            );
          },
        });
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      toast.show({
        render: ({ id }) => {
          return (
            <Toast nativeID={id} action="error" variant="solid">
              <ToastTitle>Error</ToastTitle>
              <ToastDescription>{err.message || "An unexpected error occurred"}</ToastDescription>
            </Toast>
          );
        },
      });
    }
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
            {/* Error Message */}
            {error && (
              <Box className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
                <Text className="text-red-600 text-sm">{error}</Text>
              </Box>
            )}

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
                  className="text-typography-900 text-sm placeholder:text-typography-400"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => setFocus("email")}
                  onBlur={() => setFocus(null)}
                  editable={!isLoading}
                  placeholder="user123@example.com"
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
                  className="text-typography-900 text-sm placeholder:text-typography-400"
                  secureTextEntry
                  onFocus={() => setFocus("password")}
                  onBlur={() => setFocus(null)}
                  editable={!isLoading}
                  placeholder="Enter your password"
                />
              </Input>
            </Box>

            {/* Sign in Button */}
            <Button
              className="bg-tertiary-500 rounded mt-2 mb-1"
              onPress={handleSubmit}
              isDisabled={isLoading}
            >
              <ButtonText className="text-typography-0 font-semibold">
                {isLoading ? "Signing in..." : "Sign in"}
              </ButtonText>
            </Button>

            {/* Forgot Password Link */}
            <Box className="flex-row justify-center my-2">
              <Text
                className="text-xs text-tertiary-500 font-semibold "
                onPress={() => {
                  toast.show({
                    render: ({ id }) => {
                      return (
                        <Toast nativeID={id} action="info" variant="solid">
                          <ToastTitle>Coming Soon</ToastTitle>
                          <ToastDescription>Password reset functionality will be available soon!</ToastDescription>
                        </Toast>
                      );
                    },
                  });
                }}
              >
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
