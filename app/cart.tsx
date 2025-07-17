import AddressSelectSkeleton from "@/components/skeletons/AddressSelectSkeleton";
import AuthRequiredAlert from "@/components/ui/alert-dialog/AuthRequiredAlert";
import RemoveItemAlert from "@/components/ui/alert-dialog/RemoveItemAlert";
import SelectAddressAlert from "@/components/ui/alert-dialog/SelectAddressAlert";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { RegisterHeader } from "@/components/ui/header/RegisterHeader";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { useToast } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { useAddresses, useProducts } from "@/lib/query/hooks";
import { useAuthStore } from "@/store/slices/authSlice";
import { CartItem, useCartStore } from "@/store/slices/cartSlice";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Cart() {
  const router = useRouter();
  const toast = useToast();
  const { isAuthenticated } = useAuthStore();
  const { items: cart, removeFromCart, updateQuantity } = useCartStore();
  const insets = useSafeAreaInsets();
  const { data: productsData, isLoading: isProductsLoading, isError: isProductsError } = useProducts();
  const { data: addresses, isLoading: isAddressesLoading } = useAddresses();
  const { selectedAddressId, setSelectedAddressId } = useCartStore();

  // Alert dialog state
  const [showRemoveDialog, setShowRemoveDialog] = React.useState(false);
  const [itemToRemove, setItemToRemove] = React.useState<{ productId: string; productName: string } | null>(null);
  // New: Address selection alert dialog state
  const [showAddressDialog, setShowAddressDialog] = React.useState(false);
  const [showAuthDialog, setShowAuthDialog] = React.useState(false);

  // Pricing calculations
  const subtotalRaw = cart.reduce(
    (sum: number, item: CartItem) =>
      sum +
      (item.product.discountedPrice ?? item.product.price) * item.quantity,
    0
  );
  const subtotal = Math.round(subtotalRaw);
  const shipping = 50;
  const gst = Math.round(subtotal * 0.05);
  const total = Math.round(subtotal + shipping + gst);

  // Show remove confirmation dialog
  const showRemoveConfirmation = (productId: string, productName: string) => {
    setItemToRemove({ productId, productName });
    setShowRemoveDialog(true);
  };

  // Handle remove confirmation
  const handleRemoveConfirm = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove.productId);
      setShowRemoveDialog(false);
      setItemToRemove(null);
    }
  };

  // Handle remove cancel
  const handleRemoveCancel = () => {
    setShowRemoveDialog(false);
    setItemToRemove(null);
  };

  // Quantity controls
  const updateQty = (idx: number, newQty: number) => {
    const product = cart[idx]?.product;
    if (!product) return;

    // If quantity would become 0, show confirmation dialog
    if (newQty <= 0) {
      showRemoveConfirmation(product.id, product.name);
    } else {
      updateQuantity(product.id, newQty);
    }
  };

  // Handle checkout with authentication check
  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }
    if (!selectedAddressId) {
      setShowAddressDialog(true);
      return;
    }
    // Proceed to checkout if authenticated and address selected
    router.push("/checkout");
  };

  const isEmpty = cart.length === 0;

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      style={{ flex: 1, backgroundColor: "transparent" }}
    >
      <RegisterHeader title="Cart" />
      <Box className="flex-1">
        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
          {/* Address Selection */}
          {!isEmpty && (
            <Card className="mb-6 p-4 bg-background-0 rounded-2xl">
              <Heading className="text-lg font-semibold tracking-tighter mb-2">Select Shipping Address</Heading>
              {isAddressesLoading ? (
                <AddressSelectSkeleton />
              ) : addresses && addresses.length > 0 ? (
                addresses.map((address: any) => (
                  <Pressable
                    key={address._id}
                    className="flex-row items-center mb-2"
                    onPress={() => setSelectedAddressId(address._id)}
                  >
                    <Box
                      className={`w-5 h-5 rounded-full border-2 mr-2 ${selectedAddressId === address._id ? 'border-tertiary-500 bg-tertiary-500' : 'border-gray-400'}`}
                      style={{ justifyContent: 'center', alignItems: 'center' }}
                    >
                      {selectedAddressId === address._id && (
                        <Box className="w-3 h-3 rounded-full bg-white" />
                      )}
                    </Box>
                    <Text className="flex-1 text-sm">
                      <Text className="text-tertiary-500 text-sm">{address.title}:</Text>
                      {` ${address.AddrLine1}, ${address.city}, ${address.state} - ${address.PIN}`}
                    </Text>
                  </Pressable>
                ))
              ) : (
                <Text>No addresses found. Please add one in your profile.</Text>
              )}
              {/* Add address button */}
              <Button
                variant="outline"
                className="mt-3 border-tertiary-500"
                onPress={() => router.push("/addresses/add")}
              >
                <ButtonText className="text-sm text-tertiary-500">Add address</ButtonText>
              </Button>
            </Card>
          )}
          <VStack space="md">
            {/* Cart Items */}
            {isEmpty ? (
              <Box className="items-center justify-center mt-16">
                <Text className="text-lg font-semibold mb-4">Cart is empty</Text>
              </Box>
            ) : (
              cart.map((item: CartItem, idx: number) => (
                <Card
                  key={item.product.id}
                  className="flex-row items-center bg-background-0 shadow-md rounded-xl px-4 py-4"
                >
                  {/* Product Image */}
                  <Image
                    source={
                      item.product.coverImage
                        ? { uri: item.product.coverImage }
                        : { uri: "https://ecommerce-react-native-app.s3.ap-south-1.amazonaws.com/products/default.jpg" }
                    }
                    size="lg"
                    className="rounded-md mr-3 bg-background-0"
                    alt={item.product.name}
                  />
                  {/* Product Info & Controls */}
                  <Box className="flex-1 justify-between gap-2">
                    <Box className="flex-row items-start justify-between">
                      <Text
                        className="font-bold text-base text-typography-900 max-w-[60%]"
                        numberOfLines={1}
                      >
                        {item.product.name}
                      </Text>
                      {/* Remove (cross) icon */}
                      <Pressable
                        onPress={() => showRemoveConfirmation(item.product.id, item.product.name)}
                        className="p-1 ml-2"
                      >
                        <MaterialIcons name="close" size={22} color="#68686B" />
                      </Pressable>
                    </Box>
                    {/* Price & Quantity Controls */}
                    <Box className="flex flex-row justify-between items-center">
                      <Text className="text-tertiary-500 font-semibold text-md tracking-tight my-2 ">
                        Rs. {item.product.discountedPrice ?? item.product.price}/-
                      </Text>
                      {/* Quantity Controls - match [id].tsx style */}
                      <Box className="flex-row items-center  py-1 px-2 gap-1
                    border border-tertiary-700 rounded-full">
                        <Pressable
                          onPress={() => updateQty(idx, item.quantity - 1)}
                          className="rounded-full items-center justify-center w-9"
                        >
                          <Text className="text-xl text-tertiary-900">-</Text>
                        </Pressable>
                        <Text className="mx-2 text-lg font-semibold text-tertiary-950 min-w-[16px] text-center">
                          {item.quantity}
                        </Text>
                        <Pressable
                          onPress={() => updateQty(idx, item.quantity + 1)}
                          className="rounded-full items-center justify-center w-9"
                        >
                          <Text className="text-xl text-tertiary-900">+</Text>
                        </Pressable>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              ))
            )}
          </VStack>
          {/* Pricing Details */}
          {!isEmpty && (
            <Card className="mt-8 p-5 bg-background-0 rounded-2xl">
              <Box className="flex-row justify-between mb-2">
                <Text className="text-base text-typography-700">Sub total</Text>
                <Text className="text-base text-typography-900">
                  Rs. {subtotal}/-
                </Text>
              </Box>
              <Box className="flex-row justify-between mb-2">
                <Text className="text-base text-typography-700">Shipping</Text>
                <Text className="text-base text-typography-900">
                  Rs. {shipping}/-
                </Text>
              </Box>
              <Box className="flex-row justify-between mb-2">
                <Text className="text-base text-typography-700">Gst Tax</Text>
                <Text className="text-base text-typography-900">Rs. {gst}/-</Text>
              </Box>
              <Box className="flex-row justify-between mt-4">
                <Text className="text-lg font-bold text-typography-900">
                  Total
                </Text>
                <Text className="text-lg font-bold text-tertiary-700">
                  Rs. {total}/-
                </Text>
              </Box>
            </Card>
          )}
        </ScrollView>
        {/* Absolute Place Order/Browse Products Button */}
        <FloatingActionButton
          onPress={() => (isEmpty ? router.push("/") : handleCheckout())}
          text={isEmpty ? "Browse Products" : "Place Order"}
        />
      </Box>

      {/* Remove Item Confirmation Dialog */}
      <RemoveItemAlert
        isOpen={showRemoveDialog}
        onClose={handleRemoveCancel}
        onRemove={handleRemoveConfirm}
        productName={itemToRemove?.productName}
      />
      {/* Address Selection Required Dialog */}
      <SelectAddressAlert isOpen={showAddressDialog} onClose={() => setShowAddressDialog(false)} />
      {/* Authentication Required Dialog */}
      <AuthRequiredAlert
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        onLogin={() => {
          setShowAuthDialog(false);
          router.push("/auth/login");
        }}
        onRegister={() => {
          setShowAuthDialog(false);
          router.push("/auth/register");
        }}
      />
    </SafeAreaView>
  );
}
