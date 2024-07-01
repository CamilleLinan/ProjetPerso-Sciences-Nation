import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../Shared/Layout/Layout";
import Home from "../../pages/Home";
import Cart from "../../pages/Cart";

const IndexRoutes:FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default IndexRoutes;