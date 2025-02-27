import React, { ChangeEventHandler } from "react";
import Input from "../../Input";
import { useUpdateProductMutation } from "../../../services/api/product.api";
import { Product } from "../../../services/types";
import "./ProductItem.scss";

const ProductItem: React.FC<Product> = ({
  list: listId,
  _id: id,
  name,
  quantity,
  completed,
}) => {
  const [updateProduct] = useUpdateProductMutation();

  const handleComplete: ChangeEventHandler<HTMLInputElement> = (e) => {
    updateProduct({ listId, id, data: { completed: e.target.checked } });
  };

  return (
    <div className="product-item">
      <Input
        type="checkbox"
        className="product-completion-checkbox"
        onChange={handleComplete}
        checked={completed}
      />
      <span className="product-name">{name}</span>
      <span className="product-quantity">{quantity}</span>
    </div>
  );
};

export default ProductItem;
