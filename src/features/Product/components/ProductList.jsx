import React from "react";
import PropTypes from "prop-types";

ProductList.propTypes = {
  products: PropTypes.array,
  categories: PropTypes.array,
  onProductEditClick: PropTypes.func,
  onProductDelClick: PropTypes.func,
};

ProductList.defaultProps = {
  products: [],
  categories: [],
  onProductEdit: null,
  onProductDelete: null,
};

function ProductList({
  products,
  categories,
  onProductEditClick,
  onProductDelClick,
}) {
  const handleProductEditClick = (product) => {
    if (!onProductEditClick) return;
    onProductEditClick(product);
  };

  const handleProductDelClick = (productId) => {
    if (window.confirm("Are you sure you want to delete it?")) {
      if (!onProductDelClick) return;
      onProductDelClick(productId);
    }
  };

  return (
    <table className="table table-light table-striped caption-top">
      <caption>Total product is: {products.length}</caption>
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Category name</th>
          <th scope="col">Price</th>
          <th scope="col">Stock</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={product.id}>
            <th scope="row">{index + 1}</th>
            <td>{product.name}</td>
            <td>
              {categories.find(
                (category) => +category.id === +product.categoryId
              )?.name || ""}
            </td>
            <td>{product.price}</td>
            <td>{product.stock ? product.stock : "Out stock"}</td>
            <td>
              <button
                onClick={() => handleProductEditClick(product)}
                className="btn btn-sm btn-info"
              >
                Edit
              </button>
              <button
                onClick={() => handleProductDelClick(product.id)}
                className="btn btn-sm btn-danger ms-1"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductList;
