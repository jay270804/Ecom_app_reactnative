import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from ".";
import { Box } from "../box";
import { Button, ButtonText } from "../button";
import { Heading } from "../heading";
import { Text } from "../text";

interface SelectAddressAlertProps {
  isOpen: boolean;
  onClose: () => void;
}

const SelectAddressAlert: React.FC<SelectAddressAlertProps> = ({ isOpen, onClose }) => (
  <AlertDialog isOpen={isOpen} onClose={onClose}>
    <AlertDialogBackdrop />
    <AlertDialogContent className="w-4/5 max-w-[415px] gap-4 px-5 items-center">
      <Box className="rounded-full h-[52px] w-[52px] bg-background-warning items-center justify-center">
        <MaterialIcons name="location-on" size={24} color="#FB9D4B" />
      </Box>
      <AlertDialogHeader className="mb-2">
        <Heading size="md">Select Address</Heading>
      </AlertDialogHeader>
      <AlertDialogBody>
        <Text size="sm" className="text-center text-typography-700">
          Please select a shipping address before checkout.
        </Text>
      </AlertDialogBody>
      <AlertDialogFooter className="mt-5">
        <Button
          size="sm"
          action="primary"
          onPress={onClose}
          className="px-[30px]"
        >
          <ButtonText>OK</ButtonText>
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default SelectAddressAlert;