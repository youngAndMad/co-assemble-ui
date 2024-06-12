import {
  Modal as NextUIModal,
  ModalBody,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import React from "react";

type ModalSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "full";

type ModalProps = {
  size?: ModalSize;
  title: string;
  body: React.ReactNode;
  displayButtons?: boolean;
  rejectText?: string;
  acceptText?: string;
};

export default function Modal({
  size,
  title,
  body,
  acceptText,
  rejectText,
  displayButtons,
}: Readonly<ModalProps>) {
  const { isOpen, onClose } = useDisclosure();
  console.log("Modal rendered");
  return (
    <NextUIModal size={size} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
        <ModalBody>{body}</ModalBody>
        <ModalFooter>
          {displayButtons === true && (
            <>
              <Button color="danger" variant="light" onPress={onClose}>
                {rejectText || "Cancel"}
              </Button>
              <Button color="primary" onPress={onClose}>
                {acceptText || "Ok"}
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </NextUIModal>
  );
}
