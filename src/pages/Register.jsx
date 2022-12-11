// import React from 'react'
import * as React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { useAuth } from '../firebase/Auth';
import { useNavigate } from 'react-router-dom';


export default function Register() {
    const { signUp } = useAuth();
    const navigate = useNavigate();
    async function registerUser(e) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        await signUp(data.get("email"), data.get("password", data.get("name")));
        navigate("/login");
    }

    return <Container component={"main"} maxWidth="xs">
        <CssBaseline />
        <Box sx={{ mt: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar sx={{
                m: 1,
                bgcolor: "green"
            }}>
                <LockOutlined />
            </Avatar>
            <Typography component={"h1"} variant="h5">Sign Up</Typography>
            <Box component="form" sx={{ mt: 3 }} onSubmit={registerUser}>
                <Grid container spacing={2} >
                    <Grid item xs={12}>
                        <TextField autoComplete='given-name' color="success" name="name" id="name" autoFocus label="Name" fullWidth required sx={{}}>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField autoComplete='email' color="success" name="email" id="email" label="Email" fullWidth required sx={{}}>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField type="password" autoComplete='new-password' color="success" name="password" id="password" label="Password" fullWidth required sx={{}}>
                        </TextField>
                    </Grid>
                </Grid>
                <Button type="submit" color="success" fullWidth variant="contained" sx={{ mt: 2, mb: 2 }}>Register</Button>
                <Grid container justifyContent={'flex-end'} color="success">
                    <Grid item>
                        <Link href="/login" sx={{ color: "green", textDecorationColor: "green" }} variant="body2">Already have an account?</Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </Container>
}
