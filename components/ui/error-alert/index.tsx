import { Alert, AlertText } from "@/components/ui/alert";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";

interface ErrorAlertProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  variant?: "solid" | "outline";
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({
  title = "Something went wrong",
  message,
  onRetry,
  variant = "solid",
}) => {
  return (
    <Box className="flex-1 justify-center items-center px-5">
      <Alert action="error" variant={variant} className="w-full">
        <Box className="flex-col items-center gap-5">
          <Box className="flex-row items-start justify-between gap-3">
            <MaterialIcons
              name="error-outline"
              size={30}
              color="rgb(231, 129, 40)"
            />
            <Box className="flex w-[90%]">
              <AlertText className="font-semibold text-base mb-1 text-typography-950">
                {title}
              </AlertText>
              <AlertText className="text-sm text-typography-700">
                {message}
              </AlertText>
            </Box>
          </Box>
          {onRetry && (
            <Box className="items-center">
              <Button
                size="lg"
                variant="outline"
                action="primary"
                onPress={onRetry}
                className="border-tertiary-500 "
              >
                <ButtonText className="text-tertiary-500 ">Try Again</ButtonText>
              </Button>
            </Box>
          )}
        </Box>
      </Alert>
    </Box>
  );
};

export default ErrorAlert;
