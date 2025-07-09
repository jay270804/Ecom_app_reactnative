import { useAuthStore } from "@/store/slices/authSlice";
import { useCartStore } from "@/store/slices/cartSlice";
import { useWishlistStore } from "@/store/slices/wishlistSlice";
import { Product } from "@/store/types";
import { useRouter } from "expo-router";
import { Box } from "./ui/box";
import { Button, ButtonText } from "./ui/button";
import { Card } from "./ui/card";
import { Heading } from "./ui/heading";
import { Image } from "./ui/image";
import { Pressable } from "./ui/pressable";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

interface ProductCardProps {
    product : Product
    onPress?: () => void;
}

export default function ProductCard({product, onPress}: ProductCardProps){
    const { addToCart, isInCart } = useCartStore();
    const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlistStore();
    const { isAuthenticated } = useAuthStore();
    const router = useRouter();

    const inCart = isInCart(product?.id ?? "");
    const wishlisted = isWishlisted(product?.id ?? "");
    const hasDiscount = !!product?.discountPercentage && product.discountPercentage > 0 && product.discountedPrice;

    // Defensive fallback values
    const name = product?.name || "Unnamed Product";
    const price = product?.price != null ? product.price : "-";
    const discountedPrice = product?.discountedPrice != null ? product.discountedPrice : price;
    const image = product?.coverImage
        ? { uri: product.coverImage }
        : { uri: "https://ecommerce-react-native-app.s3.ap-south-1.amazonaws.com/products/default.jpg" };

    const handleWishlistPress = () => {
        if (!isAuthenticated) {
            router.push('/auth/login');
        } else {
            wishlisted ? removeFromWishlist(product.id) : addToWishlist(product.id);
        }
    };

    return(
        <Pressable onPress={onPress} className="w-1/2">
          <Card className="p-3 rounded-lg flex-1 mx-1 my-2 flex flex-col justify-between border border-outline-100 min-h-[260px] shadow-md">
            <Box className="flex-1">
              <Image
                source={image}
                className="mb-4 h-[160px] w-full rounded-md aspect-[4/3] object-fill"
                alt={`${name}-image`}
              />
              <VStack className="mb-4">
                <Heading size="sm" className="mb-2">
                  {name}
                </Heading>
                {/* Price Section */}
                <Box className="mt-2">
                  {hasDiscount ? (
                    <VStack className="gap-1">
                      {/* Discount Badge */}
                      <Box className="self-start">
                        <Text size="xs" className="bg-tertiary-500 text-typography-0 px-2 py-1 rounded-md">
                          -{product.discountPercentage}% OFF
                        </Text>
                      </Box>
                      {/* Original Price (Strikethrough) */}
                      <Text size="xs" className="line-clamp-2" strikeThrough>
                        Rs. {price}/-
                      </Text>
                      {/* Discounted Price */}
                      <Text size="sm" className="text-tertiary-600 font-semibold">
                        Rs. {discountedPrice}/-
                      </Text>
                    </VStack>
                  ) : (
                    <Text size="sm" className="font-semibold">
                      Rs. {price}/-
                    </Text>
                  )}
                </Box>
              </VStack>
            </Box>
            <Box className="flex flex-col">
              <Button
                className="px-3 py-2 mb-2 bg-primary-600"
                onPress={() => addToCart(product)}
                disabled={inCart}
              >
                <ButtonText size="xs" className="text-typography-0">
                  {inCart ? "Added" : "Add to cart"}
                </ButtonText>
              </Button>
              <Button
                variant={wishlisted ? "solid" : "outline"}
                action="default"
                className="px-3 py-2 border-outline-300"
                onPress={handleWishlistPress}
              >
                <ButtonText size="xs" className={wishlisted ? "text-tertiary-600" : "text-typography-700"}>
                  {wishlisted ? "Wishlisted" : "Wishlist"}
                </ButtonText>
              </Button>
            </Box>
          </Card>
        </Pressable>
    )
}