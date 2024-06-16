"use client";
import {ReactNode} from "react";
import ClientProvider from "./ClientProvider";
import {createTheme, ThemeProvider} from '@mui/material/styles';

const defaultTheme = createTheme();

export function Providers({children}: { children: ReactNode }) {
    return (
        <ThemeProvider theme={defaultTheme}>
            <ClientProvider>
                {children}
            </ClientProvider>
        </ThemeProvider>
    );
}
