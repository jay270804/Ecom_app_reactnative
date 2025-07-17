import { promoProducts } from "@/assets/promo";
import { BrandCard, ExtrasBrandCard } from "@/components/BrandCard";
import ProductCard from "@/components/ProductCard";
import { PromoCarousel } from "@/components/PromoCarousel";
import HomeSkeleton from "@/components/skeletons/HomeSkeleton";
import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import { Header } from "@/components/ui/header";
import { Text } from "@/components/ui/text";
import TopicHeader from "@/components/ui/TopicHeader";
import { useTheme } from "@/hooks/useTheme";
import { useBrands, useProducts } from "@/lib/query/hooks";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { BackHandler, FlatList, Platform, ScrollView } from "react-native";
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

  const [showExitDialog, setShowExitDialog] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setShowExitDialog(true);
        return true; // Prevent default back action
      };
      let subscription: any;
      if (Platform.OS === 'android') {
        subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      }
      return () => {
        if (subscription) subscription.remove();
      };
    }, [])
  );

  const handleExitConfirm = useCallback(() => {
    setShowExitDialog(false);
    if (Platform.OS === 'android') {
      BackHandler.exitApp();
    }
  }, []);

  const handleExitCancel = useCallback(() => {
    setShowExitDialog(false);
  }, []);

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
      {/* <Header hideSearchPressable /> */}
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
      {/* Exit App Confirmation Dialog */}
      <AlertDialog isOpen={showExitDialog} onClose={handleExitCancel}>
        <AlertDialogBackdrop />
        <AlertDialogContent className="w-4/5 max-w-[415px] gap-4 px-5 items-center">
          <Box className="rounded-full h-[52px] w-[52px] bg-background-error items-center justify-center">
            <MaterialIcons name="exit-to-app" size={24} color="#EF4444" />
          </Box>
          <AlertDialogHeader className="mb-2">
            <Text className="text-lg font-bold">Exit App</Text>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm" className="text-center text-typography-700">
              {Platform.OS === 'android'
                ? 'Are you sure you want to exit the app?'
                : 'Are you sure you want to leave the home screen?'}
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter className="mt-5">
            <Button
              size="sm"
              action="negative"
              onPress={handleExitConfirm}
              className="px-[30px]"
            >
              <ButtonText>{Platform.OS === 'android' ? 'Exit' : 'Leave'}</ButtonText>
            </Button>
            <Button
              variant="outline"
              action="secondary"
              onPress={handleExitCancel}
              size="sm"
              className="px-[30px] border-tertiary-500"
            >
              <ButtonText className="text-tertiary-500">Cancel</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SafeAreaView>
  );
}

