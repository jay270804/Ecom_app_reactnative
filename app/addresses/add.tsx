import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RegisterHeader } from "@/components/ui/header/RegisterHeader";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Toast, ToastDescription, ToastTitle, useToast } from "@/components/ui/toast";
import { addressService } from '@/lib/api/services';
import { useAuthStore } from "@/store/slices/authSlice";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddAddress() {
  const router = useRouter();
  const toast = useToast();
  const { isLoading: isAuthLoading } = useAuthStore();
  const [form, setForm] = useState({
    title: "",
    AddrLine1: "",
    AddrLine2: "",
    city: "",
    state: "",
    PIN: "",
    landmark: "",
  });
  const [focus, setFocus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addressService.create,
    onSuccess: () => {
      toast.show({
        render: ({ id }) => (
          <Toast nativeID={id} action="success" variant="solid">
            <ToastTitle>Success</ToastTitle>
            <ToastDescription>Address added successfully!</ToastDescription>
          </Toast>
        ),
      });
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      router.replace('/addresses');
    },
    onError: (err: any) => {
      setError(err.message || "Failed to add address");
      toast.show({
        render: ({ id }) => (
          <Toast nativeID={id} action="error" variant="solid">
            <ToastTitle>Error</ToastTitle>
            <ToastDescription>{err.message || "Failed to add address"}</ToastDescription>
          </Toast>
        ),
      });
    },
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (error) setError(null);
  };

  const validateForm = () => {
    if (!form.title || !form.AddrLine1 || !form.city || !form.state || !form.PIN) {
      setError("Please fill in all required fields");
      toast.show({
        render: ({ id }) => (
          <Toast nativeID={id} action="error" variant="solid">
            <ToastTitle>Error</ToastTitle>
            <ToastDescription>Please fill in all required fields</ToastDescription>
          </Toast>
        ),
      });
      return false;
    }
    if (
      !form.PIN ||
      form.PIN.length !== 6 ||
      isNaN(Number(form.PIN)) ||
      Number(form.PIN) < 100000 ||
      Number(form.PIN) > 999999
    ) {
      setError("Please enter a valid PIN code");
      toast.show({
        render: ({ id }) => (
          <Toast nativeID={id} action="error" variant="solid">
            <ToastTitle>Error</ToastTitle>
            <ToastDescription>Please enter a valid PIN code</ToastDescription>
          </Toast>
        ),
      });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    mutation.mutate(form);
  };

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1, backgroundColor: "transparent" }}>
      <RegisterHeader title="Add Address" />
      <Box className="flex-1 pt-4 gap-4">
        <Box className="flex-1 items-center justify-start px-6 py-2">
          <Card className="w-full max-w-md bg-background-0 p-4 rounded-lg">
            {error && (
              <Box className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
                <Text className="text-red-600 text-sm">{error}</Text>
              </Box>
            )}
            {/* Title */}
            <Box className="mb-2">
              <Text className={`mb-1 text-xs font-semibold ${focus === "title" ? "text-tertiary-500" : "text-typography-900"}`}>Title</Text>
              <Input className={`h-9 px-2 bg-transparent border ${focus === "title" ? "border-tertiary-500" : "border-outline-200"} rounded`}>
                <InputField
                  value={form.title}
                  onChangeText={(v) => handleChange("title", v)}
                  className="text-typography-900 text-sm placeholder:text-typography-400"
                  onFocus={() => setFocus("title")}
                  onBlur={() => setFocus(null)}
                  editable={!isLoading}
                  placeholder="Home / Office / Other"
                />
              </Input>
            </Box>
            {/* AddrLine1 */}
            <Box className="mb-2">
              <Text className={`mb-1 text-xs font-semibold ${focus === "AddrLine1" ? "text-tertiary-500" : "text-typography-900"}`}>Address Line 1</Text>
              <Input className={`h-9 px-2 bg-transparent border ${focus === "AddrLine1" ? "border-tertiary-500" : "border-outline-200"} rounded`}>
                <InputField
                  value={form.AddrLine1}
                  onChangeText={(v) => handleChange("AddrLine1", v)}
                  className="text-typography-900 text-sm placeholder:text-typography-400"
                  onFocus={() => setFocus("AddrLine1")}
                  onBlur={() => setFocus(null)}
                  editable={!isLoading}
                  placeholder="123 Main St, Block A"
                />
              </Input>
            </Box>
            {/* AddrLine2 (optional) */}
            <Box className="mb-2">
              <Text className={`mb-1 text-xs font-semibold ${focus === "AddrLine2" ? "text-tertiary-500" : "text-typography-900"}`}>Address Line 2 (optional)</Text>
              <Input className={`h-9 px-2 bg-transparent border ${focus === "AddrLine2" ? "border-tertiary-500" : "border-outline-200"} rounded`}>
                <InputField
                  value={form.AddrLine2}
                  onChangeText={(v) => handleChange("AddrLine2", v)}
                  className="text-typography-900 text-sm placeholder:text-typography-400"
                  onFocus={() => setFocus("AddrLine2")}
                  onBlur={() => setFocus(null)}
                  editable={!isLoading}
                  placeholder="Apartment, Suite, etc. (optional)"
                />
              </Input>
            </Box>
            {/* City */}
            <Box className="mb-2">
              <Text className={`mb-1 text-xs font-semibold ${focus === "city" ? "text-tertiary-500" : "text-typography-900"}`}>City</Text>
              <Input className={`h-9 px-2 bg-transparent border ${focus === "city" ? "border-tertiary-500" : "border-outline-200"} rounded`}>
                <InputField
                  value={form.city}
                  onChangeText={(v) => handleChange("city", v)}
                  className="text-typography-900 text-sm placeholder:text-typography-400"
                  onFocus={() => setFocus("city")}
                  onBlur={() => setFocus(null)}
                  editable={!isLoading}
                  placeholder="Ahmedabad"
                />
              </Input>
            </Box>
            {/* State */}
            <Box className="mb-2">
              <Text className={`mb-1 text-xs font-semibold ${focus === "state" ? "text-tertiary-500" : "text-typography-900"}`}>State</Text>
              <Input className={`h-9 px-2 bg-transparent border ${focus === "state" ? "border-tertiary-500" : "border-outline-200"} rounded`}>
                <InputField
                  value={form.state}
                  onChangeText={(v) => handleChange("state", v)}
                  className="text-typography-900 text-sm placeholder:text-typography-400"
                  onFocus={() => setFocus("state")}
                  onBlur={() => setFocus(null)}
                  editable={!isLoading}
                  placeholder="Gujarat"
                />
              </Input>
            </Box>
            {/* PIN */}
            <Box className="mb-2">
              <Text className={`mb-1 text-xs font-semibold ${focus === "PIN" ? "text-tertiary-500" : "text-typography-900"}`}>PIN</Text>
              <Input className={`h-9 px-2 bg-transparent border ${focus === "PIN" ? "border-tertiary-500" : "border-outline-200"} rounded`}>
                <InputField
                  value={form.PIN}
                  onChangeText={(v) => handleChange("PIN", v)}
                  className="text-typography-900 text-sm placeholder:text-typography-400"
                  keyboardType="number-pad"
                  onFocus={() => setFocus("PIN")}
                  onBlur={() => setFocus(null)}
                  editable={!isLoading}
                  placeholder="380001"
                />
              </Input>
            </Box>
            {/* Landmark (optional) */}
            <Box className="mb-4">
              <Text className={`mb-1 text-xs font-semibold ${focus === "landmark" ? "text-tertiary-500" : "text-typography-900"}`}>Landmark (optional)</Text>
              <Input className={`h-9 px-2 bg-transparent border ${focus === "landmark" ? "border-tertiary-500" : "border-outline-200"} rounded`}>
                <InputField
                  value={form.landmark}
                  onChangeText={(v) => handleChange("landmark", v)}
                  className="text-typography-900 text-sm placeholder:text-typography-400"
                  onFocus={() => setFocus("landmark")}
                  onBlur={() => setFocus(null)}
                  editable={!isLoading}
                  placeholder="Near City Mall"
                />
              </Input>
            </Box>
            {/* Submit Button */}
            <Button
              className="bg-tertiary-500 rounded mt-2 mb-1"
              onPress={handleSubmit}
              isDisabled={mutation.isPending}
            >
              <ButtonText className="text-typography-0 font-semibold">
                {mutation.isPending ? "Adding..." : "Add Address"}
              </ButtonText>
            </Button>
            {/* Cancel Link */}
            <Box className="flex-row justify-center my-2">
              <Text
                className="text-xs text-tertiary-500 font-semibold "
                onPress={() => router.replace('/addresses')}
              >
                Cancel
              </Text>
            </Box>
          </Card>
        </Box>
      </Box>
    </SafeAreaView>
  );
}