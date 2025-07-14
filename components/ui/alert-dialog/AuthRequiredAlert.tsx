import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from ".";
import { Box } from "../box";
import { Button, ButtonText } from "../button";
import { Heading } from "../heading";
import { Text } from "../text";

interface AuthRequiredAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

const AuthRequiredAlert: React.FC<AuthRequiredAlertProps> = ({ isOpen, onClose, onLogin, onRegister }) => (
  <AlertDialog isOpen={isOpen} onClose={onClose}>
    <AlertDialogBackdrop />
    <AlertDialogContent className="w-4/5 max-w-[415px] gap-4 px-5 items-center">
      <Box className="rounded-full h-[52px] w-[52px] bg-background-warning items-center justify-center">
        <MaterialIcons name="warning" size={24} color="#FB9D4B" />
      </Box>
      <AlertDialogHeader className="mb-2">
        <Heading size="md">Authentication Required</Heading>
      </AlertDialogHeader>
      <AlertDialogBody>
        <Text size="sm" className="text-center text-typography-700">
          Please login or register to complete your order.
        </Text>
      </AlertDialogBody>
      <AlertDialogFooter className="mt-5 flex-row gap-2">
        <Button
          size="sm"
          variant="outline"
          action="secondary"
          onPress={onClose}
          className="px-[20px] border-tertiary-500"
        >
          <ButtonText className="text-tertiary-500">Cancel</ButtonText>
        </Button>
        <Button
          size="sm"
          action="primary"
          onPress={onLogin}
          className="px-[20px]"
        >
          <ButtonText>Login</ButtonText>
        </Button>
        <Button
          size="sm"
          action="primary"
          onPress={onRegister}
          className="px-[20px]"
        >
          <ButtonText>Register</ButtonText>
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default AuthRequiredAlert;