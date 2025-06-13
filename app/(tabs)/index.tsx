import { dummyProducts } from "@/assets/products";
import ProductCard from "@/components/ProductCard";
import { Box } from "@/components/ui/box";
import { useTheme } from "@/hooks/useTheme";
import { useRouter } from "expo-router";
import { FlatList } from "react-native";

export default function Index() {
  const router = useRouter();
  const { theme } = useTheme();
  const products = dummyProducts;

  return (
    <Box className="flex-1 bg-background-0">
      <FlatList
        data={products}
        renderItem={({item}) => <ProductCard product={item}/>}
        numColumns={2}
        horizontal={false}
        contentContainerStyle={{ padding: 16 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
      />
    </Box>
  );
}
