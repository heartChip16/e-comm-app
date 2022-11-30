import { css } from '@emotion/react';
import { ShoppingCartSharp } from '@mui/icons-material';
import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';
import { AppBar } from '@mui/material';
import { Box, Button, Badge, IconButton } from '@mui/material';
import React from 'react'

export default function Header() {
    return <AppBar position="sticky">
        <Toolbar sx={{ background: "green" }}>
            <Typography variant="h6" color="inherit" sx={{
                flexGrow: 1,
            }}>Ecomm</Typography>
            {/* <Box sx={{ display: { xs: "none", md: "flex" } }}> */}
            <Box>
                <IconButton size="large" aria-label="shows cart items count" color="inherit">
                    {/* <Badge badgeContent={1} color="primary"> */}
                    <Badge badgeContent={1} color="info">
                        <ShoppingCartSharp ></ShoppingCartSharp>
                    </Badge>
                </IconButton>
            </Box>
            <Button color="inherit">Login</Button>
        </Toolbar>
    </AppBar>;
}
