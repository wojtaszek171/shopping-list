import React from "react";
import Input from "../../Input";
import "./ProductItem.scss";

interface ProductItemProps {
  name: string;
  quantity: number;
}

const ProductItem: React.FC<ProductItemProps> = ({ name, quantity }) => {
  return (
    <div className="product-item">
      <Input type="checkbox" />
      <span className="product-name">{name}</span>
      <span className="product-quantity">{quantity}</span>
    </div>
  );
};

export default ProductItem;
