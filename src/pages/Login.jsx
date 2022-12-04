import React from 'react'
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material'
import { LockOutlined } from "@mui/icons-material"
import { ThemeContext } from '@emotion/react';
import { useTheme } from '@emotion/react';
import { useAuth } from '../firebase/Auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { signIn } = useAuth();

    async function login(event) {
        event.preventDefault();
        const { email, password } = event.target;
        await signIn(email.value, password.value);
        navigate("/");
    }

    return <Container component={"main"} maxWidth="xs">
        <CssBaseline />
        <Box sx={{
            mt: "8px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",

        }}>
            <Avatar sx={{
                m: 1,
                backgroundColor: "green",
            }}>
                <LockOutlined />
            </Avatar>
            <Typography component={"h1"} variant="h5">
                Sign In
            </Typography>
            <form onSubmit={login}
                sx={{
                    width: "100%",
                    mt: 1,
                }}>
                <TextField color="success" variant="outlined" margin="normal" required fullWidth name="email" id="email" type="email" autoFocus
                    autoComplete='off' label="Email"
                ></TextField>
                <TextField color="success" variant="outlined" margin="normal" required fullWidth name="password" id="password" type="password" autoFocus
                    autoComplete='current-password' label="Password"
                ></TextField>
                <Button type="submit" variant="contained" fullWidth color="success" sx={{
                    mt: "15px"
                }} >
                    Sign In
                </Button>
            </form>
        </Box>
    </Container>
}
