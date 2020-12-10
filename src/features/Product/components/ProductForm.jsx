import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

ProductForm.propTypes = {
  categories: PropTypes.array,
  editedProduct: PropTypes.object,
  onFormSubmit: PropTypes.func,
  onFormClose: PropTypes.func,
};

ProductForm.defaultProps = {
  categories: [],
  editedProduct: {},
  onFormSubmit: null,
  onFormClose: null,
};

const initialProduct = {
  id: "",
  name: "",
  price: 0,
  stock: 0,
  categoryId: "",
};

function ProductForm({ categories, editedProduct, onFormSubmit, onFormClose }) {
  const idAddMode = !editedProduct.id;
  const [product, setProduct] = useState(initialProduct);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(editedProduct).length) {
      setProduct(editedProduct);
    } else {
      setProduct(initialProduct);
    }
  }, [editedProduct]);

  const handleInputChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!onFormSubmit) return;
    onFormSubmit(product);
  };

  const handleFormClose = () => {
    if (!onFormClose) return;
    onFormClose();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="d-flex justify-content-between">
        <h3>{idAddMode ? "Create product" : "Edit product"}</h3>
        <button onClick={handleFormClose} className="btn btn-sm btn-light">
          Close
        </button>
      </div>
      <div className="mb-3">
        <label htmlFor="product-name" className="form-label">
          Name
        </label>
        <input
          type="text"
          name="name"
          className="form-control"
          id="product-name"
          aria-describedby="product-name"
          value={product.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category-name" className="form-label">
          Category name
        </label>
        <select
          name="categoryId"
          className="form-select"
          id="category-name"
          aria-label="search category"
          value={product.categoryId}
          onChange={handleInputChange}
        >
          <option value="">Select category</option>
          {categories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="product-price" className="form-label">
          Price
        </label>
        <input
          type="number"
          name="price"
          min="0"
          className="form-control"
          id="product-price"
          value={product.price}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="product-stock" className="form-label">
          Stock
        </label>
        <input
          type="number"
          name="stock"
          min="0"
          className="form-control"
          id="product-stock"
          value={product.stock}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className="btn btn-success">
        Save
      </button>
      <button
        type="reset"
        disabled={isSubmitting}
        className="btn btn-primary ms-2"
      >
        Clear
      </button>
    </form>
  );
}

export default ProductForm;
