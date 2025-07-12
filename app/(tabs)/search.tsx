import ProductCatalogue from "@/components/ProductCatalogue";
import SearchSkeleton from "@/components/skeletons/SearchSkeleton";
import { Box } from "@/components/ui/box";
import ErrorAlert from "@/components/ui/error-alert";
import { SearchHeader } from "@/components/ui/header";
import { Image } from "@/components/ui/image";
import { useProducts } from "@/lib/query/hooks";
import { useRouter } from "expo-router";
import Fuse from 'fuse.js';
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const searchIllustration = require("@/assets/images/search-screen-illustration.png");
const noMatchIllustration = require("@/assets/images/search-screen-no-match-found-illustration.png");

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
  }, [products]);

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
      {query ? (
        filtered.length > 0 ? (
          <ProductCatalogue
            products={filtered}
            onProductPress={(product) => router.push(`/product/${product.id}`)}
          />
        ) : (
          <Box className="flex items-center py-5">
            <Image
              source={noMatchIllustration}
              alt="No matches found"
              className="w-72 h-72 rounded-md"
              resizeMode="cover"
            />
          </Box>
        )
      ) : (
        <Box className="flex items-center py-5">
          <Image
            source={searchIllustration}
            alt="Search our spare parts"
            className="w-72 h-72 rounded-md"
            resizeMode="cover"
          />
        </Box>
      )}
    </SafeAreaView>
  );
}