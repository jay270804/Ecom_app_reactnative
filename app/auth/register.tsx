import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RegisterHeader } from "@/components/ui/header/RegisterHeader";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Toast, ToastDescription, ToastTitle, useToast } from "@/components/ui/toast";
import TopicHeader from "@/components/ui/TopicHeader";
import { useAuthStore } from "@/store/slices/authSlice";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const router = useRouter();
  const { register, login, isAuthenticated, isLoading } = useAuthStore();
  const toast = useToast();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
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

  const validateForm = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password || !form.confirmPassword || !form.mobile) {
      setError("Please fill in all fields");
      toast.show({
        render: ({ id }) => {
          return (
            <Toast nativeID={id} action="error" variant="solid">
              <ToastTitle>Error</ToastTitle>
              <ToastDescription>Please fill in all fields</ToastDescription>
            </Toast>
          );
        },
      });
      return false;
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
      return false;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters long");
      toast.show({
        render: ({ id }) => {
          return (
            <Toast nativeID={id} action="error" variant="solid">
              <ToastTitle>Error</ToastTitle>
              <ToastDescription>Password must be at least 6 characters long</ToastDescription>
            </Toast>
          );
        },
      });
      return false;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      toast.show({
        render: ({ id }) => {
          return (
            <Toast nativeID={id} action="error" variant="solid">
              <ToastTitle>Error</ToastTitle>
              <ToastDescription>Passwords do not match</ToastDescription>
            </Toast>
          );
        },
      });
      return false;
    }

    if (form.mobile.length < 10) {
      setError("Please enter a valid mobile number");
      toast.show({
        render: ({ id }) => {
          return (
            <Toast nativeID={id} action="error" variant="solid">
              <ToastTitle>Error</ToastTitle>
              <ToastDescription>Please enter a valid mobile number</ToastDescription>
            </Toast>
          );
        },
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    console.log('🔍 [REGISTER] Starting registration process...');
    console.log('📤 [REGISTER] Request data:', {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: '[HIDDEN]',
      phoneNumber: parseInt(form.mobile),
    });

    try {
      console.log('🌐 [REGISTER] Making API call to register endpoint...');

      // Register the user
      const registerResult = await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        phoneNumber: parseInt(form.mobile),
      });

      console.log('📥 [REGISTER] Register API response received:', registerResult);

      if (registerResult.success) {
        console.log('✅ [REGISTER] Registration successful!');

        // If registration is successful but no tokens provided, login automatically
        if (!registerResult.error) {
          console.log('🔄 [REGISTER] No tokens provided, attempting auto-login...');

          toast.show({
            render: ({ id }) => {
              return (
                <Toast nativeID={id} action="success" variant="solid">
                  <ToastTitle>Success</ToastTitle>
                  <ToastDescription>Registration successful! Logging you in...</ToastDescription>
                </Toast>
              );
            },
          });

          // Auto-login after successful registration
          console.log('🔐 [REGISTER] Attempting auto-login with credentials...');
          const loginResult = await login({
            email: form.email,
            password: form.password,
          });

          console.log('📥 [REGISTER] Auto-login response:', loginResult);

          if (loginResult.success) {
            console.log('✅ [REGISTER] Auto-login successful!');
            toast.show({
              render: ({ id }) => {
                return (
                  <Toast nativeID={id} action="success" variant="solid">
                    <ToastTitle>Welcome!</ToastTitle>
                    <ToastDescription>You're now logged in.</ToastDescription>
                  </Toast>
                );
              },
            });
          } else {
            console.log('⚠️ [REGISTER] Auto-login failed:', loginResult.error);
            toast.show({
              render: ({ id }) => {
                return (
                  <Toast nativeID={id} action="info" variant="solid">
                    <ToastTitle>Login Required</ToastTitle>
                    <ToastDescription>Registration successful! Please login with your credentials.</ToastDescription>
                  </Toast>
                );
              },
            });
            router.replace("/auth/login");
          }
        } else {
          console.log('ℹ️ [REGISTER] Registration successful but requires manual login');
          toast.show({
            render: ({ id }) => {
              return (
                <Toast nativeID={id} action="info" variant="solid">
                  <ToastTitle>Success</ToastTitle>
                  <ToastDescription>Registration successful! Please login with your credentials.</ToastDescription>
                </Toast>
              );
            },
          });
          router.replace("/auth/login");
        }
      } else {
        console.log('❌ [REGISTER] Registration failed:', registerResult.error);
        setError(registerResult.error || "Registration failed");
        toast.show({
          render: ({ id }) => {
            return (
              <Toast nativeID={id} action="error" variant="solid">
                <ToastTitle>Error</ToastTitle>
                <ToastDescription>{registerResult.error || "Registration failed"}</ToastDescription>
              </Toast>
            );
          },
        });
      }
    } catch (err: any) {
      console.log('💥 [REGISTER] Exception caught during registration:');
      console.log('   Error type:', typeof err);
      console.log('   Error message:', err?.message);
      console.log('   Error stack:', err?.stack);
      console.log('   Full error object:', err);

      // Check for specific error types
      if (err?.response) {
        console.log('📡 [REGISTER] Server response error:');
        console.log('   Status:', err.response.status);
        console.log('   Status text:', err.response.statusText);
        console.log('   Headers:', err.response.headers);
        console.log('   Data:', err.response.data);
      } else if (err?.request) {
        console.log('🌐 [REGISTER] Network request error:');
        console.log('   Request object:', err.request);
        console.log('   No response received from server');
      } else {
        console.log('🔧 [REGISTER] Other error (not network related):');
        console.log('   Error details:', err);
      }

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
      <RegisterHeader />
      <Box className="flex-1 pt-4 gap-4">
        <TopicHeader title="Create Your Account" />
        <Box className="flex-1 items-center justify-start px-6 py-2">
          <Card className="w-full max-w-md bg-background-0 p-4 rounded-lg">
            {/* Error Message */}
            {error && (
              <Box className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
                <Text className="text-red-600 text-sm">{error}</Text>
              </Box>
            )}

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
                    className="text-typography-900 text-sm placeholder:text-typography-400"
                    onFocus={() => setFocus("firstName")}
                    onBlur={() => setFocus(null)}
                    editable={!isLoading}
                    placeholder="Jay"
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
                    className="text-typography-900 text-sm placeholder:text-typography-400"
                    onFocus={() => setFocus("lastName")}
                    onBlur={() => setFocus(null)}
                    editable={!isLoading}
                    placeholder="Patel"
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
                  placeholder="Create a password"
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
                  className="text-typography-900 text-sm placeholder:text-typography-400"
                  secureTextEntry
                  onFocus={() => setFocus("confirmPassword")}
                  onBlur={() => setFocus(null)}
                  editable={!isLoading}
                  placeholder="Confirm your password"
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
                  className="text-typography-900 text-sm placeholder:text-typography-400"
                  keyboardType="phone-pad"
                  onFocus={() => setFocus("mobile")}
                  onBlur={() => setFocus(null)}
                  editable={!isLoading}
                  placeholder="Enter 10 digit Mobile no."
                />
              </Input>
            </Box>

            {/* Sign up Button */}
            <Button
              className="bg-tertiary-500 rounded mt-2 mb-1"
              onPress={handleSubmit}
              isDisabled={isLoading}
            >
              <ButtonText className="text-typography-0 font-semibold">
                {isLoading ? "Creating account..." : "Sign up"}
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
