import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
  },
  reducers: {
    fetchProducts: (state, action) => {
      state.data = action.payload;
    },

    createProduct: (state, action) => {
      state.data.push(action.payload);
    },

    updateProduct: (state, action) => {
      const { id, name, image, description, price, id_categorie } =
        action.payload;
      const foundProduct = state.data.find((pro) => pro.id == id);
      if (foundProduct) {
        foundProduct.name = name;
        foundProduct.image = image;
        foundProduct.description = description;
        foundProduct.price = price;
        foundProduct.id_categorie = id_categorie;
      }
    },

    deleteProduct: (state, action) => {
      const id = action.payload;
      const productFound = state.data.filter((pro) => pro.id !== id);
      state.data = productFound;
    },
  },
});

export const { fetchProducts, createProduct, updateProduct, deleteProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
