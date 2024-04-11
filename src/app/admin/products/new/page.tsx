import React from "react";
import PageHeader from "../../_components/PageHeader";
import ProductForm from "../../_components/ProductForm";

function NewProduct() {
  return (
    <div>
      <PageHeader>Add Product</PageHeader>
      <ProductForm />
    </div>
  );
}

export default NewProduct;
