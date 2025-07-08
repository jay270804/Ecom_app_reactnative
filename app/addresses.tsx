import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RegisterHeader } from "@/components/ui/header/RegisterHeader";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { useAddresses } from "@/lib/query/hooks";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Addresses() {
  const { data: addresses, isLoading, isError, error } = useAddresses();

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1, backgroundColor: "transparent" }}>
      <RegisterHeader title="Addresses" />
      <Box className="flex-1 bg-background-50 px-4 py-8">
        {isLoading ? (
          <Box className="flex-1 justify-center items-center">
            <Spinner size="large" />
          </Box>
        ) : isError ? (
          <Text className="text-red-500">{error?.message || "Failed to fetch addresses."}</Text>
        ) : !addresses || addresses.length === 0 ? (
          <Text className="text-base text-typography-700 mt-12">No addresses found.</Text>
        ) : (
          <Box className="gap-4 mb-8">
            {addresses.map((address: any) => (
              <Card key={address._id} className="p-5 rounded-2xl bg-background-0 shadow-md mb-2">
                <Text className="text-base font-bold text-typography-900 mb-1">{address.title}</Text>
                <Text className="text-sm text-typography-700 mb-1">{address.AddrLine1}{address.AddrLine2 ? `, ${address.AddrLine2}` : ""}</Text>
                <Text className="text-sm text-typography-700 mb-1">{address.city}, {address.state} - {address.PIN}</Text>
                {address.landmark && <Text className="text-sm text-typography-700 mb-1">Landmark: {address.landmark}</Text>}
              </Card>
            ))}
          </Box>
        )}
        {/* TODO: Post address api */}
        <Button className="bg-tertiary-500 rounded-full" onPress={() => {}}>
          <ButtonText className="text-base font-bold text-typography-0">Add New Address</ButtonText>
        </Button>
      </Box>
    </SafeAreaView>
  );
}