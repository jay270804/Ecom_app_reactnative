import { dummyProducts } from "@/assets/products";
import ProductCatalogue from "@/components/ProductCatalogue";
import { RegisterHeader } from "@/components/ui/header/RegisterHeader";
import { useWishlistStore } from "@/store/slices/wishlistSlice";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Wishlist() {
  const router = useRouter();
  const wishlisted = useWishlistStore((state) => state.items);
  const products = dummyProducts.filter((p) => wishlisted.includes(p.id));

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