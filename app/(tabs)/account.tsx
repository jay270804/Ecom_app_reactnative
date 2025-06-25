import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";

export default function Account(){
    const router = useRouter()
    return(
        <Box className="flex-1 justify-center items-center gap-8">
            <Text>
                This is Account's Page
            </Text>
            <Button onPress={()=> router.push('/auth/register')}>
                <ButtonText>Register</ButtonText>
            </Button>
            <Button onPress={()=> router.push('/auth/login')}>
                <ButtonText>Login</ButtonText>
            </Button>
        </Box>
    )
}