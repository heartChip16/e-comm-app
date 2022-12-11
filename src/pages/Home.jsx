import { css } from '@emotion/react'
import { ExpandMore } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Card } from '@mui/material';
import { Rating } from '@mui/material';
import { Collapse } from '@mui/material';
import { CardMedia, CardContent, Typography, CardActions } from '@mui/material';
import { Container, Grid } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { Button } from '@mui/material';
import { IconButton } from '@mui/material';
import { ShoppingCartSharp } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../feature/cart-slice';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import { fetchAllProducts } from '../feature/products-slice';
import { useSearchParams } from 'react-router-dom';

export default function Home() {
    const [searchParams] = useSearchParams();
    const category = searchParams.get("category");
    const theme = useTheme();
    // const [products, setProducts] = useState([]);
    const state = useSelector(state => state.products);
    const { value: products, loading } = state ?? {};
    const [expanded, setExpanded] = React.useState(false);
    const dispatch = useDispatch();
    const searchTerm = searchParams.get("searchterm");


    // useEffect(() => {
    //     fetchAllProducts();
    // }, [])


    // return <div>
    //     <pre>
    //         {JSON.stringify(products, null, 2)}
    //     </pre>
    // </div>

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    if (!products?.length) {
        dispatch(fetchAllProducts());
    }

    function addProductToCart(product) {
        //dispatch an action
        let quantity = 1;

        // const prodInCart = cart.filter(({ prod, quantity }) => { cart.product.title === prod.title });
        // if (prodInCart) {
        //     quantity = prodInCart.quantity + 1;
        // }
        dispatch(addToCart({ product, quantity }));
    }

    let filteredProducts = category && (category !== "all") ? products.filter(prod => prod.category === category) : products;
    filteredProducts = searchTerm ? filteredProducts.filter(prod => prod.title.toLowerCase().includes(searchTerm.toLowerCase())) : filteredProducts;

    return < Container sx={{ py: 8 }
    } maxWidth="lg" >
        <Grid container spacing={2} sx={{ alignContent: "space-evenly", justifyContent: "center" }}>
            {/* <h1>{products.category}</h1> */}
            {filteredProducts?.map(({ title, id, image, price, rating, description }) => (
                <Grid item key={id} xs={12} sm={6} md={3} sx={{ margin: "10px" }}>
                    <Card sx={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "white", padding: "10px" }}>
                        <CardMedia component="img"
                            height="270"
                            width="100"
                            image={image}
                            alt={title}
                            sx={{ objectFit: "contain", backgroundColor: "white" }}
                        />
                        <CardContent>
                            <Typography variant="h6" component="h2" sx={{ color: "darkgreen", fontSize: "16px" }}>
                                {title}
                            </Typography>
                            <CardContent sx={{ display: "flex", justifyContent: "flex-start", paddingBottom: "5px", paddingLeft: "0", paddingTop: "3px" }}>
                                <Rating value={rating.rate} size="small" readOnly precision={0.5} emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} />
                                <Typography sx={{ fontSize: "10px", transform: "translateY(3px)", }}>{rating.count} Reviews</Typography>
                            </CardContent>
                            <Typography variant="h6" color="text.secondary" gutterBottom sx={{ color: "black", fontSize: "12px" }}>
                                USD {price}
                            </Typography>
                            <CardContent sx={{ display: "flex", flexDirection: "row", flexGrow: "1", padding: "0", justifyContent: "flex-start", alignItems: "center" }}>
                                <Typography variant="h6" color="text.secondary" gutterBottom sx={{ color: "black", fontSize: "12px" }}>
                                    Product ID: {id}
                                </Typography>
                                <CardActions disableSpacing>
                                    <ExpandMore
                                        expand={expanded}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                        sx={{ color: "black" }}>
                                        <ExpandMoreIcon />
                                    </ExpandMore>
                                    <IconButton color="success" sx={{ fontSize: "12px", borderRadius: "4px", color: "white", backgroundColor: "green" }} onClick={() => addProductToCart({ title, id, image, price, rating, description })}>
                                        <ShoppingCartSharp title="Add to cart" sx={{ color: "white" }} />
                                        <Typography sx={{ fontSize: "12px" }} color="success" variant='contained'>Add to cart</Typography>
                                    </IconButton>
                                </CardActions>
                            </CardContent>
                            {/* <Typography variant="body2" color="text.secondary" sx={{ color: "black  " }}> */}

                            <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ padding: "0" }}>
                                <CardContent sx={{ padding: "0" }}>
                                    <Typography variant="h6" color="text.secondary" sx={{ color: "black", fontSize: "12px" }} paragraph>Description:</Typography>
                                    <Typography sx={{ color: "black", fontSize: "12px" }} paragraph>
                                        {description}
                                    </Typography>
                                </CardContent>
                            </Collapse>

                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Container >
}

