import { css } from '@emotion/react';
import { ShoppingCartSharp } from '@mui/icons-material';
import { Toolbar } from '@mui/material';
import { Typography } from '@mui/material';
import { alpha } from '@mui/material';
import { TextField } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { styled } from '@mui/material';
import { AppBar } from '@mui/material';
import { Box, Button, Badge, IconButton } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import { getItemCount } from '../../utils';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchAllCategories } from '../feature/categories-slice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import { useAuth } from '../firebase/Auth';
import { Menu } from '@mui/material';


const Search = styled("section")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    display: "flex",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: "0",
    width: "100%"
}))

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiTextField-root": {
        paddingRight: `calc(1em +${theme.spacing(4)})`
    },
    "& .MuiInputBase-input": {
        color: theme.palette.common.white,
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: "none",
    }, "& .MuiOutlinedInput-root": {
        padding: "0",
    }
}));

const SearchIconWrapper = styled("section")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    right: 0,
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledLink = styled(Link)(({ theme }) => ({
    color: theme.palette.common.white,
    textDecoration: "none",
}));

function SearchBar() {
    const theme = useTheme();
    const products = useSelector(state => state.products?.value);
    const categories = useSelector(state => state.categories?.value);
    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState("all");

    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");
    const searchTerm = searchParams.get("searchTerm");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setSelectedCategory(category ? category : "all");
        // setSelectedCategory(category);
    }, [category]);

    if (!categories.length) {
        dispatch(fetchAllCategories());
    }
    function handleCategoryChange(e) {
        const { value } = e.target;

        navigate(value === "all" ? "/" : `/?category=${value}${searchTerm ? "&searchterm=" + searchTerm : ""}`);
    }
    function handleSearchChange(searchText) {
        if (searchText) {
            navigate(selectedCategory === "all" ? `?searchterm=${searchText}` :
                `/?category=${selectedCategory}&searchterm=${searchText}`);
        } else {
            navigate(selectedCategory === "all" ? `/` :
                `/?category=${selectedCategory}`);

        }
    }

    return <Search>
        <Select
            value={selectedCategory}

            onChange={handleCategoryChange}
            size="small"
            sx={{
                mx: 1,
                py: 0,
                "&": {
                    "::before": {
                        ":hover": {
                            border: "none",
                            color: "white",
                        }
                    },
                    "::before, &::after": {
                        border: "none",
                    },
                    ".MuiSelect-standard, .MuiSelect-icon": {
                        color: "common.white",
                    },
                    ".MuiInput-underline:hover": {
                        border: "none",
                        color: "white",
                    }
                },

                textTransform: "capitalize"
            }}

            variant="standard" labelId='selected-category' id='selected-category-id'>
            <MenuItem value="all" >All</MenuItem>
            {categories?.map(category => {
                {/* function capitalize(str) {
                    return str.charAt(0).toUpperCase() + str.slice(1);
                } */}
                {/* return <MenuItem key={category} value={capitalize(category)}>{capitalize(category)}</MenuItem> */ }
                return <MenuItem key={category} value={category} sx={{ textTransform: "capitalize", padding: "0" }}>{category}</MenuItem>

            })}
        </Select>
        <StyledAutocomplete
            freeSolo
            id="selected-product"
            value={selectedProduct}
            onChange={(e, value) => {
                console.log(value);
                handleSearchChange(value?.label);
            }}
            disablePortal
            options={Array.from(selectedCategory === "all" ? products : products.filter(prod => prod.category === selectedCategory), prod => ({
                id: prod.id, label: prod.title
            }))}
            sx={{
                width: "80%",
                ".MuiSelect-standard, .MuiSelect-icon, .MuiSvgIcon-root": {
                    color: "common.white",
                },
            }}
            renderInput={(params) => <TextField {...params} />}
        />
        <SearchIconWrapper>
            <SearchIcon />
        </SearchIconWrapper>
    </Search>
}


export default function Header() {
    const { user, signOutUser, signIn } = useAuth();
    const cartItems = useSelector(state => state.cart?.value);
    const count = getItemCount(cartItems);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    function navigateToCart() {
        navigate("/cart");
    }

    function handleProfileMenuOpen(e) {
        setAnchorEl(e.currentTarget);
    }

    function handleMenuClose() {
        setAnchorEl(null);
    }
    async function logout() {
        await signOutUser();
        navigate("/login");
    }

    function login() {
        navigate("/login");
    }

    const renderMenu = (
        <Menu anchorEl={anchorEl} id="user-profile-menu" keepMounted transformOrigin={{
            horizontal: "right", vertical: "top",
        }} anchorOrigin={{
            horizontal: "right", vertical: "bottom",
        }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
    )

    return <>
        <AppBar position="sticky" sx={{
            backgroundColor: "green",
        }}>
            <Toolbar sx={{ background: "green", justifyContent: "space-between", display: "flex" }}>
                <Typography variant="h6" color="inherit" noWrap sx={{ marginRight: "30px", flexGrow: "2", overflow: "visible", }}>
                    <StyledLink to="/">
                        Ingrid's Store
                    </StyledLink>
                </Typography>
                {/* <Box sx={{ display: { xs: "none", md: "flex" } }}> */}
                <SearchBar sx={{ flexGrow: 1, }} />
                <Box sx={{ display: "flex" }}>
                    <Box sx={{
                        display: "flex"
                    }}>
                        <IconButton onClick={navigateToCart} size="large" aria-label="shows cart items count" color="inherit" >
                            {/* <Badge badgeContent={1} color="primary"> */}
                            <Badge badgeContent={count} color="info">
                                <ShoppingCartSharp ></ShoppingCartSharp>
                            </Badge>
                        </IconButton>
                        {user ?
                            <Button onClick={handleProfileMenuOpen} sx={{ color: "white", textTransform: "lowercase" }}>{user?.displayName ?? user.email}</Button>
                            : <Button color="inherit" onClick={login}>Login</Button>
                        }
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
        {renderMenu}
    </>

}
