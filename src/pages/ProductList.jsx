// src/pages/ProductList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import { IoIosAdd } from "react-icons/io";
import { api } from "../api";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const res = await api.get("/api/products");
        setProducts(res.data.products);
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
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
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
        gap: 15px;
    `,
};

