import { brands } from "@/assets/brands";
import { promoProducts } from "@/assets/promo";
import { BrandsCarousel } from "@/components/BrandsCarousel";
import ProductCard from "@/components/ProductCard";
import { PromoCarousel } from "@/components/PromoCarousel";
import { Box } from "@/components/ui/box";
import { Header } from "@/components/ui/header";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import TopicHeader from "@/components/ui/TopicHeader";
import { useTheme } from "@/hooks/useTheme";
import { useProducts } from "@/lib/query/hooks";
import { useRouter } from "expo-router";
import { FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const { theme } = useTheme();
  const { data, isLoading, isError, error } = useProducts();
  const products = data || [];

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
          <BrandsCarousel brands={brands} />
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

