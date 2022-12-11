import React from 'react'
import { Grid, Typography, TextField, FormControlLabel, Box } from "@mui/material"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { updateAddress } from '../feature/checkout-slice';

export default function AddressForm() {
    const address = useSelector(state => state.checkout?.address);
    const dispatch = useDispatch();

    function handleChange(event) {
        console.log(event.target);
        const { name, value } = event.target;
        console.log(name, value);
        dispatch(updateAddress({ [name]: value }));
    }

    return <>
        <Typography variant="h6" gutterBottom>
            Shipping Address
        </Typography>
        <Box component="form" onChange={handleChange}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField required id="firstName" name="firstName" label="First Name" fullWidth autoComplete='given-name' variant="standard" defaultValue={address.firstName ?? ""} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField required id="lastName" name="lastName" label="Last Name" fullWidth autoComplete='family-name' variant="standard" defaultValue={address.lastName ?? ""} />
                </Grid>
                <Grid item xs={12}>
                    <TextField required id="address1" name="address1" label="Address Line 1" fullWidth autoComplete='shipping address-line1' variant="standard" defaultValue={address.address1 ?? ""} />
                </Grid>
                <Grid item xs={12}>
                    <TextField required id="address2" name="address2" label="Address Line 2" fullWidth autoComplete='shipping address-line2' variant="standard" defaultValue={address.address2 ?? ""} />
                </Grid>
                <Grid item xs={12}>
                    <TextField required id="city" name="city" label="City" fullWidth variant="standard" defaultValue={address.city ?? ""} />
                </Grid>
                <Grid item xs={12}>
                    <TextField required id="zipCode" name="zipCode" label="Zip Code" fullWidth variant="standard" defaultValue={address.zipCode ?? ""} />
                </Grid>
                <Grid item xs={12} sx={{ mb: 2 }}>
                    <TextField required id="country" name="country" label="Country" fullWidth variant="standard" defaultValue={address.country ?? ""} />
                </Grid>
            </Grid>
        </Box>
    </>
}
