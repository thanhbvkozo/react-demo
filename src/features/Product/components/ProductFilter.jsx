import React from "react";
import PropTypes from "prop-types";

ProductFilter.propTypes = {
  categories: PropTypes.array,
  filters: PropTypes.object,
  onFilters: PropTypes.func,
};

ProductFilter.defaultProps = {
  categories: [],
  filters: {},
  onFilters: null,
};

function ProductFilter({ categories, filters, onFilters }) {
  const handleInputChange = (e) => {
    if (!onFilters) return;
    onFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="row">
      <div className="col">
        <input
          className="form-control mb-3"
          type="text"
          name="productName"
          placeholder="Search name"
          aria-label="search name"
          value={filters.productName}
          onChange={handleInputChange}
        />
      </div>
      <div className="col">
        <select
          name="category"
          className="form-select"
          aria-label="search category"
          value={filters.category}
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
    </div>
  );
}

export default ProductFilter;
