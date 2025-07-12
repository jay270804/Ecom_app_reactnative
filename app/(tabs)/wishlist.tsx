import ProductCatalogue from "@/components/ProductCatalogue";
import SignInRegisterPrompt from "@/components/SignInRegisterPrompt";
import { Box } from "@/components/ui/box";
import { RegisterHeader } from "@/components/ui/header/RegisterHeader";
import { Image } from "@/components/ui/image";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { useProducts } from "@/lib/query/hooks";
import { useAuthStore } from "@/store/slices/authSlice";
import { useWishlistStore } from "@/store/slices/wishlistSlice";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const wishlistIllustration = require("@/assets/images/wishlist-screen-illustration.png");

export default function Wishlist() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const toast = useToast();
  const wishlisted = useWishlistStore((state) => state.items);
  const { data: allProducts, isLoading, isError, error } = useProducts();
  const products = (allProducts || []).filter((p) => wishlisted.includes(p.id));

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
        <SignInRegisterPrompt
          title="Sign in to access your wishlist"
          description="Create an account or sign in to save your favorite products and access them anytime."
        />
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner size="large" />
      </SafeAreaView>
    );
  }
  if (isError) {
    return (
      <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {error?.message || "Failed to fetch products"}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1, backgroundColor: "transparent" }}>
      <RegisterHeader title="Wishlist" />
      {products.length === 0 ? (
        <Box className="flex items-center py-5">
          <Image
            source={wishlistIllustration}
            alt="Your wishlist is feeling lonely"
            className="w-72 h-72 rounded-md"
            resizeMode="cover"
          />
        </Box>
      ) : (
        <ProductCatalogue
          products={products}
          onProductPress={(product) => router.push(`/product/${product.id}`)}
        />
      )}
    </SafeAreaView>
  );
}