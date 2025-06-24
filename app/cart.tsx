import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";

export default function Cart() {
  const router = useRouter();

  return (
    <Box className="flex-1 justify-center items-center gap-2.5">
      <Text>This is Cart's Page</Text>
      <Button
        variant="outline"
        action="positive"
        onPress={() => {
          router.push("/auth/register");
        }}
      >
        <ButtonText>Register</ButtonText>
      </Button>
    </Box>
  );
}