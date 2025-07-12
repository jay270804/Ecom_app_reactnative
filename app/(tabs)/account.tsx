import SignInRegisterPrompt from "@/components/SignInRegisterPrompt";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RegisterHeader } from "@/components/ui/header/RegisterHeader";
import { Text } from "@/components/ui/text";
import { useAuthStore } from "@/store/slices/authSlice";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Account() {
  const router = useRouter();
  const { logout, isAuthenticated, user, isLoading } = useAuthStore();

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1, backgroundColor: "transparent" }}>
      <RegisterHeader title="Profile" />
      <Box className="flex-1 bg-transparent px-4 py-8">
        {isAuthenticated && user ? (
          <>
            {/* User Info Card */}
            <Card className="mb-6 p-5 rounded-2xl bg-background-50 shadow-md">
              <Text className="text-lg font-semibold text-typography-900 mb-1">
                {user.firstName} {user.lastName}
              </Text>
              <Text className="text-base text-typography-700 mb-1">{user.email}</Text>
              {user.phoneNumber && (
                <Text className="text-base text-typography-700 mb-1">
                  +91 {user.phoneNumber}
                </Text>
              )}
            </Card>

            {/* Actions */}
            <Box className="gap-4">
              <Button
                className="bg-tertiary-500 rounded-full"
                onPress={() => router.push("/orders")}
              >
                <ButtonText className="text-base font-bold text-typography-0">My Orders</ButtonText>
              </Button>
              <Button
                className="border border-tertiary-500 rounded-full bg-transparent"
                onPress={() => router.push({ pathname: '/addresses' } as any)}
              >
                <ButtonText className="text-base font-bold text-tertiary-600">Manage Addresses</ButtonText>
              </Button>
              <Button
                className="bg-transparent rounded-full border border-outline-500"
                onPress={logout}
                isDisabled={isLoading}
              >
                <ButtonText className="text-base font-bold  text-typography-700">
                  {isLoading ? "Logging out..." : "Logout"}
                </ButtonText>
              </Button>
            </Box>
          </>
        ) : (
          <SignInRegisterPrompt
            title="Sign in to access your account"
            description="Create an account or sign in to manage your orders, addresses, and more."
          />
        )}
      </Box>
    </SafeAreaView>
  );
}