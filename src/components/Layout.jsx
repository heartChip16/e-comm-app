import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
    const theme = createTheme({
        palette: {
            mode: "light",
            // mode: "dark",

        }
    });
    return <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <main>
            <Outlet />
        </main>
        <footer>

        </footer>
    </ThemeProvider>


}
