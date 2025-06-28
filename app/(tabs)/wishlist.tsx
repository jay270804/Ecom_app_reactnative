import { dummyProducts } from "@/assets/products";
import ProductCatalogue from "@/components/ProductCatalogue";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { RegisterHeader } from "@/components/ui/header/RegisterHeader";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { useAuthStore } from "@/store/slices/authSlice";
import { useWishlistStore } from "@/store/slices/wishlistSlice";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Wishlist() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const toast = useToast();
  const wishlisted = useWishlistStore((state) => state.items);
  const products = dummyProducts.filter((p) => wishlisted.includes(p.id));

  const handleLoginPress = () => {
    router.push("/auth/login");
  };

  const handleRegisterPress = () => {
    router.push("/auth/register");
  };

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1, backgroundColor: "transparent" }}>
        <RegisterHeader title="Wishlist" />
        <Box className="flex-1 items-center justify-center px-6">
          <Box className="items-center">
            <Text className="text-xl font-bold text-center mb-4">
              Sign in to access your wishlist
            </Text>
            <Text className="text-base text-center text-gray-600 mb-8">
              Create an account or sign in to save your favorite products and access them anytime.
            </Text>

            <Box className="w-full max-w-sm space-y-4 gap-4">
              <Button
                className="bg-tertiary-500 rounded-full"
                onPress={handleLoginPress}
              >
                <ButtonText className="text-typography-0 font-semibold">
                  Sign In
                </ButtonText>
              </Button>

              <Button
                className="bg-transparent border border-tertiary-500 rounded-full"
                onPress={handleRegisterPress}
              >
                <ButtonText className="text-tertiary-500 font-semibold">
                  Create Account
                </ButtonText>
              </Button>
            </Box>
          </Box>
        </Box>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1, backgroundColor: "transparent" }}>
      <RegisterHeader title="Wishlist" />
      <ProductCatalogue
        products={products}
        onProductPress={(product) => router.push(`/product/${product.id}`)}
        emptyText="No products in your wishlist."
      />
    </SafeAreaView>
  );
}