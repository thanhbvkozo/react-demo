import React, { useEffect, useState } from "react";
import ProductList from "./components/ProductList";
import ProductFilter from "./components/ProductFilter";
import ProductForm from "./components/ProductForm";
import { nanoid } from "nanoid";

const productList = [
  {
    id: 1,
    name: "Macbook Pro 2020",
    price: 1999,
    stock: 10,
    categoryId: 1,
  },
  {
    id: 2,
    name: "Iphone 12",
    price: 1500,
    stock: 20,
    categoryId: 2,
  },
  {
    id: 3,
    name: "Macbook Air 2017",
    price: 1000,
    stock: 0,
    categoryId: 1,
  },
];

const categoryList = [
  {
    id: 1,
    name: "Laptop",
  },
  {
    id: 2,
    name: "Mobile",
  },
];

const initialFilters = {
  productName: "",
  category: "",
};

function ProductFeature() {
  const [products, setProducts] = useState(productList);
  const [filteredProducts, setFilteredProducts] = useState(productList);
  const [editedProduct, setEditedProduct] = useState({});
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [filters, setFilters] = useState(initialFilters);

  const handleProductAddClick = () => {
    setIsOpenForm(true);
    setEditedProduct({});
  };

  const handleProductEditClick = (editedProduct) => {
    setIsOpenForm(true);
    setEditedProduct(editedProduct);
  };

  const handleProductDelClick = (deletedProductId) => {
    const newProducts = products.filter(
      (product) => product.id !== deletedProductId
    );
    setProducts(newProducts);
  };

  const handleFormSubmit = (product) => {
    let newProducts = [...products];
    if (product.id) {
      const index = newProducts.findIndex(
        (newProduct) => newProduct.id === product.id
      );
      newProducts[index] = product;
    } else {
      newProducts.push({
        ...product,
        id: nanoid(),
      });
    }
    setProducts(newProducts);
    setIsOpenForm(false);
    setFilters(initialFilters);
  };

  const handleFormClose = () => {
    setIsOpenForm(false);
    setEditedProduct({});
  };

  const handleFilters = (filters) => {
    setFilters(filters);
    let newProducts = products.filter(
      (product) =>
        product.name
          .toLowerCase()
          .indexOf(filters.productName.toLowerCase()) !== -1
    );
    if (+filters.category) {
      newProducts = newProducts.filter(
        (product) => +product.categoryId === +filters.category
      );
    }
    setFilteredProducts(newProducts);
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <div className="container">
      <h2 className="my-5 text-center">Product CRUD</h2>
      <div className="mb-1">
        <div className="row">
          <div className="col-11">
            <ProductFilter
              categories={categoryList}
              filters={filters}
              onFilters={handleFilters}
            />
          </div>
          <div className="col-1">
            <div className="d-flex justify-content-end">
              <button
                onClick={handleProductAddClick}
                className="btn btn-success"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className={isOpenForm ? "col-8" : "col-12"}>
          <ProductList
            products={filteredProducts}
            categories={categoryList}
            onProductEditClick={handleProductEditClick}
            onProductDelClick={handleProductDelClick}
          />
        </div>
        {isOpenForm && (
          <div className="col-4">
            <ProductForm
              categories={categoryList}
              editedProduct={editedProduct}
              onFormSubmit={handleFormSubmit}
              onFormClose={handleFormClose}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductFeature;
