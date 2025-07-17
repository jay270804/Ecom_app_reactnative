import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { AlertDialog, AlertDialogBackdrop, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from ".";
import { Box } from "../box";
import { Button, ButtonText } from "../button";
import { Heading } from "../heading";
import { Spinner } from "../spinner";
import { Text } from "../text";

interface RemoveAddressAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onRemove: () => void;
  addressTitle?: string;
  loading?: boolean;
}

const RemoveAddressAlert: React.FC<RemoveAddressAlertProps> = ({ isOpen, onClose, onRemove, addressTitle, loading }) => (
  <AlertDialog isOpen={isOpen} onClose={onClose}>
    <AlertDialogBackdrop />
    <AlertDialogContent className="w-4/5 max-w-[415px] gap-4 px-5 items-center">
      <Box className="rounded-full h-[52px] w-[52px] bg-background-error items-center justify-center">
        <MaterialIcons name="delete-outline" size={24} color="#EF4444" />
      </Box>
      <AlertDialogHeader className="mb-2">
        <Heading size="md">Delete Address</Heading>
      </AlertDialogHeader>
      <AlertDialogBody>
        <Text size="sm" className="text-center text-typography-700">
          Are you sure you want to delete{addressTitle ? ` address "${addressTitle}"` : " this address"}?
        </Text>
      </AlertDialogBody>
      <AlertDialogFooter className="mt-5 flex-row gap-2">
        <Button
          size="sm"
          action="negative"
          onPress={onRemove}
          className="px-[30px]"
          disabled={loading}
        >
          {loading ? <Spinner size="small" color="text-typography-0" /> : <ButtonText>Delete</ButtonText>}
        </Button>
        <Button
          variant="outline"
          action="secondary"
          onPress={onClose}
          size="sm"
          className="px-[30px] border-tertiary-500"
          disabled={loading}
        >
          <ButtonText className="text-tertiary-500">Cancel</ButtonText>
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

export default RemoveAddressAlert;