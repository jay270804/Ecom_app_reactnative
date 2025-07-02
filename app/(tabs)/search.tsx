import ProductCatalogue from "@/components/ProductCatalogue";
import { Box } from "@/components/ui/box";
import { SearchHeader } from "@/components/ui/header";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { useProducts } from "@/lib/query/hooks";
import { useRouter } from "expo-router";
import React, { useEffect, useState, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Fuse from 'fuse.js';

export default function Search() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  let inputRef: any = null;

  const { data: allProducts, isLoading, isError, error } = useProducts();
  const products = allProducts || [];

  // Focus input on mount
  useEffect(() => {
    setTimeout(() => {
      inputRef?.focus();
    }, 200);
  }, []);

  const fuse = useMemo(() => {
    const options = {
      // Define which keys in your objects to search
      keys: [
        { name: 'name', weight: 0.7 },
        { name: 'description', weight: 0.3 }
      ],
      includeScore: true,
      // Adjust threshold for more or less strict search (0=perfect, 1=match anything)
      threshold: 0.4,
    };
    return new Fuse(products, options);
  }, [products]); // Re-initialize only when products data changes

  // Replace the .filter() method with fuse.search()
  const filtered = query
    ? fuse.search(query).map(result => result.item) // .map() to get the original items back
    : [];
  // 👆 End of Fuse.js implementation

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