import { Product } from "@/store/types";
import React from "react";
import { FlatList } from "react-native";
import ProductCard from "./ProductCard";
import { Box } from "./ui/box";
import { Text } from "./ui/text";

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
  // If odd, add a dummy item for layout
  const displayProducts =
    products.length % 2 === 1
      ? [...products, { id: "__dummy__" } as Product]
      : products;

  return (
    <Box className="flex-1">
      <FlatList
        data={displayProducts}
        renderItem={({ item }) =>
          item.id === "__dummy__" ? (
            <Box
              style={{ width: "50%", aspectRatio: 0.75 }}
              pointerEvents="none"
            />
          ) : (
            <Box style={{ width: "50%" }}>
              <ProductCard
                product={item}
                onPress={() => onProductPress?.(item)}
              />
            </Box>
          )
        }
        numColumns={2}
        horizontal={false}
        contentContainerStyle={{ padding: 16, flexGrow: 1 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, idx) => item.id || String(idx)}
        ListEmptyComponent={
          <Box className="flex-1 items-center justify-center py-12">
            <Text className="text-base text-typography-700">{emptyText}</Text>
          </Box>
        }
      />
    </Box>
  );
}