// src/pages/ProductList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { IoIosAdd } from "react-icons/io";
import { api } from "../api";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const ProductList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        setIsLoading(true);
        try {
            const res = await api.get("/api/products");
            setProducts(res.data.products);
        } catch (error) {
            console.log(error, "error fetch");
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <Styled.Wrapper>
                <Styled.Heading>
                    <h2>All Products</h2>
                    <NavLink to="/add"><IoIosAdd size={32} /></NavLink>
                </Styled.Heading>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
                    {isLoading ? <CircularProgress /> : <>
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </>}
                </div>
            </Styled.Wrapper>
        </>
    );
};

export default ProductList;

const Styled = {
    Wrapper: styled.div`
        padding: 0 50px;

        @media (width<900px) {
            padding: 0 15px;;
        }
    `,
    Heading: styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        margin-bottom: 30px;
    `,
};

