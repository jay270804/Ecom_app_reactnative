import ProductCarousel from "@/components/ProductCarousel";
import ProductDetailsSkeleton from "@/components/skeletons/ProductDetailsSkeleton";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { ProductHeader } from "@/components/ui/header";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { useProduct } from "@/lib/query/hooks";
import { useAuthStore } from "@/store/slices/authSlice";
import { useCartStore } from "@/store/slices/cartSlice";
import { useWishlistStore } from "@/store/slices/wishlistSlice";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Dimensions } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProductScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data, isLoading, isError, error } = useProduct(id ? String(id) : '');
  const product = data?.data;
  const { width: screenWidth } = Dimensions.get("window");
  const insets = useSafeAreaInsets();

  // Zustand stores
  const { addToCart, removeFromCart, updateQuantity, items: cartItems, isInCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();

  // Cart state for this product
  const cartItem = cartItems.find((item) => item.product.id === product?.id);
  const cartQty = cartItem ? cartItem.quantity : 0;
  const inCart = !!cartItem;
  const wishlisted = product?.id ? isWishlisted(product.id) : false;

  // Wishlist handler with auth check
  const handleWishlistPress = () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    } else if (product?.id) {
      wishlisted ? removeFromWishlist(product.id) : addToWishlist(product.id);
    }
  };

  // Use coverImage as the first image, then the rest from images[]
  const images = product
    ? [product.coverImage, ...(product.images || [])]
        .filter((img): img is string => typeof img === "string")
    : [];

  const hasDiscount = product?.discountPercentage && product.discountPercentage > 0;

  if (isError || !product) {
    return <Text>Error loading product: {error?.message || 'Not found'}</Text>;
  }

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1, backgroundColor: "transparent" }}>
      {/* Consistent Product Header */}
      <ProductHeader
        onWishlistPress={handleWishlistPress}
        wishlisted={wishlisted}
      />
      {/* Main Content Box */}
      <Box className="flex-1 items-center justify-start px-0 pt-4">
        {isLoading ? (
          <ProductDetailsSkeleton />
        ) : (
          <Box className="w-full max-w-md rounded-lg px-6 py-2 items-center">
            {/* Product Image Carousel */}
            <ProductCarousel images={images} alt={product.name} />
            {/* Product Info Card */}
            <Card className="w-full bg-background-0 mt-4 p-4 rounded-xl">
              <Text className="text-2xl tracking-tight font-bold text-typography-950 mb-2">{product.name}</Text>
              <Box className="flex-row items-center mb-2 gap-2">
                <Text className="text-xl font-bold text-tertiary-500">
                  Rs. {hasDiscount ? product.discountedPrice : product.price}/-
                </Text>
                {hasDiscount && (
                  <Text className="text-base text-typography-400 line-through">Rs. {product.price}/-</Text>
                )}
              </Box>
              {hasDiscount && (
                <Box className="mb-2 w-[72px]">
                  <Text className=" bg-tertiary-500 text-typography-0 px-2 py-2 rounded-md text-xs font-semibold">
                    -{product.discountPercentage}% OFF
                  </Text>
                </Box>
              )}
              <Text className="text-base font-semibold text-typography-900 mb-1">Description</Text>
              <Text className="text-xs text-typography-700 mb-2 line-clamp-4">{product.description}</Text>
            </Card>
          </Box>
        )}
      </Box>
      {/* Floating Add to Cart / Quantity Control - styled like CustomTabBar */}
      <FloatingActionButton>
        {cartQty === 0 ? (
          <Pressable
            className="flex-1 bg-tertiary-500 rounded-full py-4 mx-2 items-center justify-center"
            onPress={() => addToCart(product)}
          >
            <Text className="text-typography-0 text-base font-bold">
              Add to Cart
            </Text>
          </Pressable>
        ) : (
          <>
            <Pressable
              className="bg-background-0 rounded-full w-1/4 py-4 items-center justify-center mx-2"
              onPress={() => removeFromCart(product.id)}
            >
              <MaterialIcons name="delete-outline" size={22} color="#68686B" />
            </Pressable>
            <Box className="flex-row flex-1 items-center justify-between py-2 px-4 border-2 rounded-full border-outline-800 mx-2">
              <Pressable
                className="w-8 rounded-full items-center justify-center"
                onPress={() => {
                  if (cartQty === 1) {
                    removeFromCart(product.id);
                  } else {
                    updateQuantity(product.id, cartQty - 1);
                  }
                }}
              >
                <Text className="text-xl text-typography-900">-</Text>
              </Pressable>
              <Text className="mx-2 text-lg font-semibold text-typography-900">{cartQty}</Text>
              <Pressable
                className="w-8 rounded-full items-center justify-center"
                onPress={() => updateQuantity(product.id, cartQty + 1)}
              >
                <Text className="text-xl text-typography-900">+</Text>
              </Pressable>
            </Box>
          </>
        )}
      </FloatingActionButton>
    </SafeAreaView>
  );
}