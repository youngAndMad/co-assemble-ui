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

export default function Modal({}: Readonly<ModalProps>) {
    console.log("Modal rendered");
    return (
        <></>
    );
}
