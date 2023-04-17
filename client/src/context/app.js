import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  const [product, setProduct] = useState(null);

  const getProducts = async () => {
    const res = await axios.get(
      "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74&fbclid=IwAR0T2ANMxEaga0WAuaZRfp0tHsJFOmDJB5jVcEPsvW4ugr7HK70RyYP6S6s"
    );
    
    setProduct(res.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const valueContext = { product };
  return (
    <>
      <ShopContext.Provider value={valueContext}>
        {children}
      </ShopContext.Provider>
    </>
  );
};
export default ShopProvider;