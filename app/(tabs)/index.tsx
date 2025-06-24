import { dummyProducts } from "@/assets/products";
import { promoProducts } from "@/assets/promo";
import ProductCard from "@/components/ProductCard";
import { PromoCarousel } from "@/components/PromoCarousel";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import { FlatList, ScrollView } from "react-native";
import TopicHeader from "@/components/ui/TopicHeader";

export default function Index() {
  const router = useRouter();
  const { theme } = useTheme();
  const products = dummyProducts;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Box>
        <PromoCarousel promos={promoProducts} />
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
