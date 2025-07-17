import AddressesSkeleton from "@/components/skeletons/AddressesSkeleton";
import RemoveAddressAlert from "@/components/ui/alert-dialog/RemoveAddressAlert";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { FloatingActionButton } from "@/components/ui/FloatingActionButton";
import { RegisterHeader } from "@/components/ui/header/RegisterHeader";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { useAddresses, useDeleteAddress } from "@/lib/query/hooks";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function Addresses() {
  const { data: addresses, isLoading, isError, error } = useAddresses();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const deleteAddress = useDeleteAddress();
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [showRemoveDialog, setShowRemoveDialog] = React.useState(false);
  const [addressToRemove, setAddressToRemove] = React.useState<{ id: string; title: string } | null>(null);

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1, backgroundColor: "transparent" }}>
      <RegisterHeader title="Addresses" />
      <Box className="flex-1 bg-transparent px-4 py-8">
        {isLoading ? (
          <AddressesSkeleton />
        ) : isError ? (
          <Text className="text-red-500">{error?.message || "Failed to fetch addresses."}</Text>
        ) : !addresses || addresses.length === 0 ? (
          <Text className="text-base text-typography-700">No addresses found.</Text>
        ) : (
          <ScrollView style={{ flexGrow: 0 }} contentContainerStyle={{ paddingBottom: 80 }}>
            <Box className="gap-4 mb-8">
              {addresses.map((address: any) => (
                <Card key={address._id} className="p-5 rounded-2xl bg-background-50 shadow-md mb-2">
                  <Pressable
                    onPress={() => {
                      setAddressToRemove({ id: address._id, title: address.title });
                      setShowRemoveDialog(true);
                    }}
                    style={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}
                    disabled={deletingId === address._id}
                  >
                    <MaterialIcons name="delete-outline" size={22} color="#d32f2f"/>
                  </Pressable>
                  <Text className="text-base font-bold text-typography-900 mb-1">{address.title}</Text>
                  <Text className="text-sm text-typography-700 mb-1">{address.AddrLine1}{address.AddrLine2 ? `, ${address.AddrLine2}` : ""}</Text>
                  <Text className="text-sm text-typography-700 mb-1">{address.city}, {address.state} - {address.PIN}</Text>
                  {address.landmark && <Text className="text-sm text-typography-700 mb-1">Landmark: {address.landmark}</Text>}
                </Card>
              ))}
            </Box>
          </ScrollView>
        )}
        {/* TODO: Post address api */}
        <FloatingActionButton
          onPress={() => router.push("/addresses/add")}
          text="Add New Address"
        />
        <RemoveAddressAlert
          isOpen={showRemoveDialog}
          onClose={() => setShowRemoveDialog(false)}
          onRemove={() => {
            if (addressToRemove) {
              setDeletingId(addressToRemove.id);
              deleteAddress.mutate(addressToRemove.id, {
                onSettled: () => {
                  setDeletingId(null);
                  setShowRemoveDialog(false);
                  setAddressToRemove(null);
                },
              });
            }
          }}
          addressTitle={addressToRemove?.title}
          loading={deletingId === addressToRemove?.id && deleteAddress.isPending}
        />
      </Box>
    </SafeAreaView>
  );
}