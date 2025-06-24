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

export default function Index() {
  const router = useRouter();
  const { theme } = useTheme();
  const products = dummyProducts;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
  );
}
