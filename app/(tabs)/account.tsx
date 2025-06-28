import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAuthStore } from "@/store/slices/authSlice";
import { useRouter } from "expo-router";

export default function Account(){
    const router = useRouter();
    const { logout, isAuthenticated, user, isLoading } = useAuthStore();

    const handleLogout = async () => {
        try {
            await logout();
            // User will be automatically redirected by auth state change
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return(
        <Box className="flex-1 justify-center items-center gap-8">
            <Text className="text-xl font-bold">
                Account Page
            </Text>

            {isAuthenticated ? (
                <Box className="items-center gap-4">
                    <Text className="text-lg">
                        Welcome, {user?.firstName || user?.email || 'User'}!
                    </Text>
                    <Button
                        className="bg-red-500"
                        onPress={handleLogout}
                        isDisabled={isLoading}
                    >
                        <ButtonText>
                            {isLoading ? "Logging out..." : "Logout"}
                        </ButtonText>
                    </Button>
                </Box>
            ) : (
                <Box className="items-center gap-4">
                    <Text className="text-gray-600">
                        Please login to access your account
                    </Text>
                    <Button onPress={()=> router.push('/auth/register')}>
                        <ButtonText>Register</ButtonText>
                    </Button>
                    <Button onPress={()=> router.push('/auth/login')}>
                        <ButtonText>Login</ButtonText>
                    </Button>
                </Box>
            )}
        </Box>
    )
}