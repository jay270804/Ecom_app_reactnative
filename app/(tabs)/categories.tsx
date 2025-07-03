const AppleLogo = require("@/assets/images/apple_logo.png");
const SamsungLogo = require("@/assets/images/samsung_logo.png");
import { BrandCard, CategoryCard, ExtrasBrandCard } from "@/components/BrandCard";
import ProductCatalogue from "@/components/ProductCatalogue";
import { Box } from "@/components/ui/box";
import { RegisterHeader } from "@/components/ui/header/RegisterHeader";
import { Spinner } from "@/components/ui/spinner";
import TopicHeader from "@/components/ui/TopicHeader";
import { useBrands, useCategories, useProducts } from "@/lib/query/hooks";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoriesScreen() {
  const { data: brandsData = [], isLoading: brandsLoading } = useBrands();
  const brands = Array.isArray(brandsData) ? brandsData : [];
  const { brandId } = useLocalSearchParams();
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(brands[0]?.id || null);

  // Update selectedBrandId when brandId param changes
  React.useEffect(() => {
    if (brandId) {
      setSelectedBrandId(brandId as string);
    }
  }, [brandId]);

  // Find the selected brand object
  const selectedBrand = brands.find((b: any) => b.id === selectedBrandId);

  // Get categories for the selected brand
  const { data: categoriesRes = [], isLoading: categoriesLoading } = useCategories({limit:40});
  let categories: any[] = [];
  if (Array.isArray(categoriesRes)) {
    categories = categoriesRes;
  } else if (categoriesRes && Array.isArray((categoriesRes as any).data)) {
    categories = (categoriesRes as any).data;
  } else {
    categories = [];
  }

  const filteredCategories = !selectedBrand
    ? []
    : categories.filter((cat: any) =>
        Array.isArray(selectedBrand.categories) &&
        selectedBrand.categories.includes(cat.id)
      );

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(filteredCategories[0]?.id || null);

  // Set selectedCategoryId to the first filtered category when brand changes
  React.useEffect(() => {
    if (filteredCategories.length > 0) {
      setSelectedCategoryId(filteredCategories[0].id);
    } else {
      setSelectedCategoryId(null);
    }
  }, [selectedBrandId, categoriesRes]);

  // Fetch all products and filter by selected category
  const { data: allProducts = [], isLoading: productsLoading } = useProducts({ limit: 100 });

  const products = Array.isArray(allProducts)
    ? allProducts.filter(
        (product: any) =>
          product.categoryId &&
          (product.categoryId._id === selectedCategoryId || product.categoryId === selectedCategoryId)
      )
    : [];

  // Separate apple/samsung and other brands
  const appleSamsungBrands = brands.filter((b: any) => ["apple", "samsung"].includes(b.name?.toLowerCase()));
  const otherBrands = brands.filter((b: any) => !["apple", "samsung"].includes(b.name?.toLowerCase()));

  // Show spinner if any loading state is true
  if (brandsLoading || categoriesLoading || productsLoading) {
    return (
      <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1, backgroundColor: "transparent" }}>
        <RegisterHeader title="Categories" />
        <Box className="flex-1 justify-center items-center">
          <Spinner size="large" />
        </Box>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ backgroundColor: "transparent" }}>
      <RegisterHeader title="Categories" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Brands Row (Apple & Samsung) */}
        <Box className="flex-row justify-between px-5 pt-3 ">
          {appleSamsungBrands.map((brand: any) => (
            <BrandCard
              key={brand.id}
              brand={{ ...brand, image: brand.name?.toLowerCase() === "apple" ? AppleLogo : SamsungLogo }}
              onPress={() => setSelectedBrandId(brand.id)}
              selected={selectedBrandId === brand.id}
            />
          ))}
        </Box>
        {/* Extras Brands FlatList */}
        <FlatList
          data={otherBrands}
          renderItem={({ item }) => (
            <ExtrasBrandCard
              brand={item}
              onPress={() => setSelectedBrandId(item.id)}
              selected={selectedBrandId === item.id}
            />
          )}
          numColumns={2}
          horizontal={false}
          contentContainerStyle={{ paddingHorizontal: 16, marginBottom: 16 }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
        {/* Categories Horizontal List */}
        <TopicHeader title="Sub Categories" />
        <FlatList
          data={filteredCategories}
          renderItem={({ item }) => (
            <CategoryCard
              category={item}
              onPress={() => setSelectedCategoryId(item.id)}
              selected={selectedCategoryId === item.id}
            />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 16 }}
          style={{ minHeight: 60 }}
        />
        {/* Product Catalogue */}
        <Box className="flex-1">
          <ProductCatalogue products={products} emptyText={productsLoading ? "Loading..." : "No products found."} />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}