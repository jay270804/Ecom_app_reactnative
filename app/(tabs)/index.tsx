import { promoProducts } from "@/assets/promo";
import { BrandCard, ExtrasBrandCard } from "@/components/BrandCard";
import ProductCard from "@/components/ProductCard";
import { PromoCarousel } from "@/components/PromoCarousel";
import HomeSkeleton from "@/components/skeletons/HomeSkeleton";
import { Box } from "@/components/ui/box";
import ErrorAlert from "@/components/ui/error-alert";
import { Header } from "@/components/ui/header";
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
  const { data, isLoading, isError, error, refetch: refetchProducts } = useProducts();
  const products = data || [];

  const { data: brandsData, isLoading: isBrandsLoading, isError: isBrandsError, error: brandsError, refetch: refetchBrands } = useBrands();
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

  const handleRetry = async () => {
    try {
      // Refetch both products and brands data
      await Promise.all([
        refetchProducts(),
        refetchBrands()
      ]);
    } catch (error) {
      console.error('Error refetching data:', error);
    }
  };

  if (isLoading || isBrandsLoading) {
    return <HomeSkeleton />;
  }

  if (isError || isBrandsError) {
    return (
      <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1, backgroundColor: "transparent" }}>
        <Header />
        <ErrorAlert
          title="Failed to connect to server"
          message="Please check your connection and try again."
          onRetry={handleRetry}
          variant="outline"
        />
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

