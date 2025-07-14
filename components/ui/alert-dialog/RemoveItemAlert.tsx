import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from ".";
import { Box } from "../box";
import { Button, ButtonText } from "../button";
import { Heading } from "../heading";
import { Text } from "../text";

interface RemoveItemAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onRemove: () => void;
  productName?: string;
}

const RemoveItemAlert: React.FC<RemoveItemAlertProps> = ({ isOpen, onClose, onRemove, productName }) => (
  <AlertDialog isOpen={isOpen} onClose={onClose}>
    <AlertDialogBackdrop />
    <AlertDialogContent className="w-4/5 max-w-[415px] gap-4 px-5 items-center">
      <Box className="rounded-full h-[52px] w-[52px] bg-background-error items-center justify-center">
        <MaterialIcons name="remove-shopping-cart" size={24} color="#EF4444" />
      </Box>
      <AlertDialogHeader className="mb-2">
        <Heading size="md">Remove Item</Heading>
      </AlertDialogHeader>
      <AlertDialogBody>
        <Text size="sm" className="text-center text-typography-700">
          Are you sure you want to remove "{productName}" from your cart?
        </Text>
      </AlertDialogBody>
      <AlertDialogFooter className="mt-5 flex-row gap-2">
        <Button
          size="sm"
          action="negative"
          onPress={onRemove}
          className="px-[30px]"
        >
          <ButtonText>Remove</ButtonText>
        </Button>
        <Button
          variant="outline"
          action="secondary"
          onPress={onClose}
          size="sm"
          className="px-[30px] border-tertiary-500"
        >
          <ButtonText className="text-tertiary-500">Cancel</ButtonText>
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default RemoveItemAlert;