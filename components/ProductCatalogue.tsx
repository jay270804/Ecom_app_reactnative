import { Product } from "@/store/types";
import React from "react";
import { FlatList } from "react-native";
import ProductCard from "./ProductCard";
import { Box } from "./ui/box";
import { Text } from "./ui/text";
import { router, useRouter } from "expo-router";

interface ProductCatalogueProps {
  products: Product[];
  onProductPress?: (product: Product) => void;
  emptyText?: string;
}

export default function ProductCatalogue({
  products,
  onProductPress,
  emptyText = "No products found.",
}: ProductCatalogueProps) {
  const displayProducts = products;

      const router = useRouter()

  return (
    <Box className="flex-1">
      <FlatList
        data={displayProducts}
        renderItem={({ item }) =>
          <ProductCard
          product={item}
          onPress={() => router.push(`/product/${item.id}`)}
        />
        }
        numColumns={2}
        horizontal={false}
        contentContainerStyle={{ padding: 16 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Box className="flex-1 items-center justify-center py-12">
            <Text className="text-base text-typography-700">{emptyText}</Text>
          </Box>
        }
      />
    </Box>
  );
}