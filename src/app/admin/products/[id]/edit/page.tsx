import React from "react";
import PageHeader from "../../../_components/PageHeader";
import ProductForm from "../../../_components/ProductForm";
import db from "@/db/db";

interface EditProductProps {
  params: {
    id: string;
  };
}

async function EditProduct({ params }: EditProductProps) {
  const product = await db.product.findUnique({ where: { id: params.id } });

  return (
    <div>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </div>
  );
}

export default EditProduct;
