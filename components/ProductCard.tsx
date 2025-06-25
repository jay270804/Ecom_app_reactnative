import { Product } from "@/store/types";
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
    const hasDiscount = product.discountPercentage && product.discountPercentage > 0;

    return(
        <Pressable onPress={onPress} className="flex-1">
          <Card className="p-3 rounded-lg flex-1 mx-1 my-2 border border-outline-100">
            <Image
              source={product.image}
              className="mb-4 h-[160px] w-full rounded-md aspect-[4/3] object-fill"
              alt={`${product.name}-image`}
            />
            <VStack className="mb-4">
              <Heading size="sm" className="mb-2">
                {product.name}
              </Heading>
              {/* <Text size="xs" className="line-clamp-2">{product.description}</Text> */}

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
                      Rs. {product.price}/-
                    </Text>
                    {/* Discounted Price */}
                    <Text size="sm" className="text-tertiary-600 font-semibold">
                      Rs. {product.discountedPrice}/-
                    </Text>
                  </VStack>
                ) : (
                  <Text size="sm" className="font-semibold">
                    Rs. {product.price}/-
                  </Text>
                )}
              </Box>
            </VStack>
            <Box className="flex-col">
              <Button className="px-3 py-2 mb-2 bg-primary-600" onPress={() => { /* TODO: add button states and connect them with cart */ }}>
                <ButtonText size="xs" className="text-typography-0">Add to cart</ButtonText>
              </Button>
              <Button
                variant="outline"
                action="default"
                className="px-3 py-2 border-outline-300"
                onPress={() => { /* TODO: add button states and connect them with wishlist */ }}
              >
                <ButtonText size="xs" className="text-typography-700">
                  Wishlist
                </ButtonText>
              </Button>
            </Box>
          </Card>
        </Pressable>
    )
}