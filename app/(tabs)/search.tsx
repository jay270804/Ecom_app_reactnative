import ProductCatalogue from "@/components/ProductCatalogue";
import SearchSkeleton from "@/components/skeletons/SearchSkeleton";
import { Box } from "@/components/ui/box";
import ErrorAlert from "@/components/ui/error-alert";
import { SearchHeader } from "@/components/ui/header";
import { Text } from "@/components/ui/text";
import { useProducts } from "@/lib/query/hooks";
import { useRouter } from "expo-router";
import Fuse from 'fuse.js';
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  let inputRef: any = null;

  const { data: allProducts, isLoading, isError, error, refetch: refetchProducts } = useProducts();
  const products = allProducts || [];

  useEffect(() => {
    setTimeout(() => {
      inputRef?.focus();
    }, 200);
  }, []);

  const handleRetry = async () => {
    try {
      await refetchProducts();
    } catch (error) {
      console.error('Error refetching products:', error);
    }
  };

  const fuse = useMemo(() => {
    const options = {
      keys: [
        { name: 'name', weight: 0.7 },
        { name: 'description', weight: 0.3 }
      ],
      includeScore: true,
      threshold: 0.4,
    };
    return new Fuse(products, options);
  }, [products]); // Re-initialize only when products data changes

  const filtered = query
    ? fuse.search(query).map(result => result.item)
    : [];

  if (isLoading) {
    return <SearchSkeleton />;
  }

  if (isError) {
    return (
      <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1, backgroundColor: "transparent" }}>
        <SearchHeader query={query} setQuery={setQuery} inputRef={(ref) => { inputRef = ref; }} />
        <ErrorAlert
          title="Failed to load products"
          message={error?.message || "Unable to fetch products. Please check your connection and try again."}
          onRetry={handleRetry}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1, backgroundColor: "transparent" }}>
      <SearchHeader query={query} setQuery={setQuery} inputRef={(ref) => { inputRef = ref; }} />
      {/* Product Catalogue or Empty State */}
      {query ? (
        <ProductCatalogue
          products={filtered}
          onProductPress={(product) => router.push(`/product/${product.id}`)}
          emptyText={"No products found."}
        />
      ) : (
        <Box className="flex-1 items-center justify-center">
          <Text className="text-base text-typography-700 mt-12">search our product catalogue</Text>
        </Box>
      )}
    </SafeAreaView>
  );
}