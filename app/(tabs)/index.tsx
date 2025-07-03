import { promoProducts } from "@/assets/promo";
import { BrandCard, ExtrasBrandCard } from "@/components/BrandCard";
import ProductCard from "@/components/ProductCard";
import { PromoCarousel } from "@/components/PromoCarousel";
import { Box } from "@/components/ui/box";
import { Header } from "@/components/ui/header";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import TopicHeader from "@/components/ui/TopicHeader";
import { useTheme } from "@/hooks/useTheme";
import { useBrands, useProducts } from "@/lib/query/hooks";
import { useRouter } from "expo-router";
import { FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const AppleLogo = require("@/assets/images/apple_logo.png");
const SamsungLogo = require("@/assets/images/samsung_logo.png");

export default function Index() {
  const router = useRouter();
  const { theme } = useTheme();
  const { data, isLoading, isError, error } = useProducts();
  const products = data || [];

  const { data: brandsData, isLoading: isBrandsLoading, isError: isBrandsError, error: brandsError } = useBrands();
  const brands = Array.isArray(brandsData)
    ? brandsData
        .filter((b) => b.name && (b.name.toLowerCase() === "samsung" || b.name.toLowerCase() === "apple"))
        .map((b) => ({
          ...b,
          image: b.name.toLowerCase() === "apple" ? AppleLogo : SamsungLogo
        }))
    : [];

  const extrasBrands = Array.isArray(brandsData)
    ? brandsData.filter((b) => b.name && !["samsung", "apple"].includes(b.name.toLowerCase()))
    : [];

  const handleBrandPress = (brandId: string) => {
    router.push({ pathname: '/categories', params: { brandId } });
  };

  if (isLoading) {
    return (
      <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner size="large"/>
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
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <Box>
          <PromoCarousel promos={promoProducts} />
          <TopicHeader title="Checkout Brands"/>
          <Box className="flex-row justify-between px-5 py-4 mb-2">
            {brands.map((brand: any) => (
              <BrandCard key={brand._id} brand={brand} onPress={() => handleBrandPress(brand._id)}/>
            ))}
          </Box>
          <TopicHeader title="Extras"/>
          <FlatList
            data={extrasBrands}
            renderItem={({item}) => (
              <ExtrasBrandCard
                brand={item}
                onPress={() => handleBrandPress(item._id)}
              />
            )}
            numColumns={2}
            horizontal={false}
            contentContainerStyle={{ padding: 16 }}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            scrollEnabled={false}
          />
          <TopicHeader title="Products"/>
          <FlatList
            data={products}
            renderItem={({item}) => (
              <ProductCard
                product={item}
                onPress={() => router.push(`/product/${item.id}`)}
              />
            )}
            numColumns={2}
            horizontal={false}
            contentContainerStyle={{ padding: 16 }}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </Box>
      </ScrollView>
    </SafeAreaView>
  );
}

