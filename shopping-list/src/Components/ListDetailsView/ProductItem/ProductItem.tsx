import {
  ChangeEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useRef,
} from "react";
import Input from "../../Input";
import { useUpdateProductMutation } from "../../../services/api/product.api";
import { Product } from "../../../services/types";
import useIsTouch from "../../../hooks/useIsTouch";
import Unknown from "../../../assets/categories/unknown.svg";
import "./ProductItem.scss";
import { useDialog } from "../../Dialog/useDialog";
import ProductDetailsModal from "../ProductDetailsModal/ProductDetailsModal";

interface ProductItemComponentProps extends Product {
  isSelecting: boolean;
  isSelected: boolean;
  onSelect: () => void;
  onLongPress: () => void;
}

const ProductItem = ({
  isSelecting,
  isSelected,
  onLongPress,
  onSelect,
  ...product
}: ProductItemComponentProps) => {
  const {
    list: listId,
    _id: id,
    name,
    quantity,
    category,
    completed,
  } = product;

  const [updateProduct] = useUpdateProductMutation();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTouchDevice = useIsTouch();
  const { openDialog, closeDialog } = useDialog();

  const handleComplete: ChangeEventHandler<HTMLInputElement> = (e) => {
    updateProduct({ listId, id, data: { completed: e.target.checked } });
  };

  const handleMouseDown = () => {
    if (isTouchDevice) {
      timerRef.current = setTimeout(onLongPress, 500);
    }
  };

  const handleMouseUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (!(e.key === "Enter" || e.key === " ")) {
      return;
    }
    if (isSelecting) {
      onSelect();
    } else {
      handleOpenProductDetails();
    }
  };

  const handleContextMenu: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (isTouchDevice || isSelecting) {
      return;
    }
    // TODO: Implement context menu
  };

  const handleOpenProductDetails = () => {
    openDialog({
      content: <ProductDetailsModal product={product} onClose={closeDialog} />,
    });
  };

  const getIcon = (category?: string) => {
    switch (category) {
      default:
        return <Unknown />;
    }
  };

  return (
    <div
      className="product-item-wrapper"
      onClick={isSelecting ? onSelect : handleOpenProductDetails}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onContextMenu={handleContextMenu}
    >
      {isSelecting && (
        <Input
          type="checkbox"
          checked={isSelected}
          className="selection-checkbox"
        />
      )}
      <div className={`product-item${isSelecting ? " selecting" : ""}`}>
        <Input
          type="checkbox"
          className="product-completion-checkbox"
          onChange={handleComplete}
          checked={completed}
          disabled={isSelecting}
        />
        <span className="product-name">{name}</span>
        <span className="product-quantity">{quantity}</span>
        <div className="product-category">{getIcon(category)}</div>
      </div>
    </div>
  );
};

export default ProductItem;
