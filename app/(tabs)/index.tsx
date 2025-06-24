import { brands } from "@/assets/brands";
import { dummyProducts } from "@/assets/products";
import { promoProducts } from "@/assets/promo";
import { BrandsCarousel } from "@/components/BrandsCarousel";
import ProductCard from "@/components/ProductCard";
import { PromoCarousel } from "@/components/PromoCarousel";
import { Box } from "@/components/ui/box";
import TopicHeader from "@/components/ui/TopicHeader";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import { FlatList, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const { theme } = useTheme();
  const products = dummyProducts;

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1, backgroundColor: "transparent" }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <Box>
          <PromoCarousel promos={promoProducts} />
          <TopicHeader title="Checkout Brands"/>
          <BrandsCarousel brands={brands} />
          <TopicHeader title="Products"/>
          <FlatList
            data={products}
            renderItem={({item}) => <ProductCard product={item}/>}
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
