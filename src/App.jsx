import { Routes, Route, NavLink } from "react-router-dom";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import styled from "styled-components";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [menuIsActive, setMenuIsActive] = useState(false);
    const handleHamburgerClick = () => {
        setMenuIsActive(prev => !prev);
    }

    return (
        <>
            <Styled.Wrapper>

                <Styled.Header>
                    <div className="menu" onClick={handleHamburgerClick}>
                        <IoMenu
                            color={"#fff"}
                            size={32}
                            className="toggleMenuIcon"
                        />
                    </div>
                    <NavLink to="/" className="name">a2rp - MERN project</NavLink>
                </Styled.Header>

                <Styled.Navbar className={`${menuIsActive ? "active" : ""}`}>
                    <ul>
                        <li><NavLink to="/">Product List</NavLink></li>
                        <li><NavLink to="/add">Add Product</NavLink></li>
                    </ul>
                </Styled.Navbar>

                <Styled.Main>
                    <Routes>
                        <Route path="/" element={<ProductList />} />
                        <Route path="/add" element={<AddProduct />} />
                    </Routes>
                </Styled.Main>

                <ToastContainer />
            </Styled.Wrapper>
        </>
    );
}

export default App;

const Styled = {
    Wrapper: styled.div`
        position: relative;
        height: 100vh;;
        overflow: hidden;
        display: flex;
        z-index: 9999;
    `,
    Header: styled.header`
        position: fixed;
        height: 60px;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 9999;
        background-color: #000;;
        display: flex;
        align-items: center;

        .menu {
            /* border: 1px solid #fff; */
            display: flex;
            align-items: center;
            padding: 0 15px;
            cursor: pointer;
            padding: 0 15px;;

            .toggleMenuIcon {
            }
        }

        .name {
            color: #fff;
            text-decoration: none;
            &:hover {
                text-decoration: underline;
            }
        }
    `,
    Navbar: styled.div`
        height: 100vh;
        width: 0px;
        background-color: #111;
        transition: width 0.2s ease;
        padding: 14vh 0;
        overflow: hidden;
        overflow-y: auto;
        
        &.active {
            width: 300px;
        }

        @media (width<900px) {
            position: absolute;
            left: 0;
            top: 0;
        }

        ul {
            /* border: 1px solid #f00; */
            list-style: none;
            width: 300px;
            padding-left: 0;

            li {
                /* border: 1px solid #f00; */

                a {
                    /* border: 1px solid #f00; */
                    color: #fff;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    padding: 0 15px;
                    text-decoration: none;
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
        }
    `,
    Main: styled.main`
        min-height: 100vh;
        padding: 14vh 0;
        overflow: auto;
        width: 100%;
    `,
    Footer: styled.footer``,
};

