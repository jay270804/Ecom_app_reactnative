import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from "expo-router";

export default function ProductScreen() {
  const { id } = useLocalSearchParams();

  return(
    <Box className="flex-1 justify-center items-center">
        <Text>ProductScreen and product Id: {id}</Text>
    </Box>
  )
}