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
import { useDialog } from "../../Dialog/useDialog";
import ProductDetailsModal from "../ProductDetailsModal/ProductDetailsModal";
import useCategories from "../ProductDetailsModal/useCategories";
import { CategoriesEnum } from "../../../utils/consts";
import "./ProductItem.scss";
import { useTranslation } from "react-i18next";

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
    unit,
    category,
    completed,
  } = product;

  const { t } = useTranslation();
  const [updateProduct] = useUpdateProductMutation();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTouchDevice = useIsTouch();
  const { openDialog, closeDialog } = useDialog();

  const { getCategory } = useCategories();

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

  return (
    <div
      className={`product-item-wrapper${completed ? " completed" : ""}`}
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
          onClick={(e) => e.stopPropagation()}
          checked={completed}
          disabled={isSelecting}
        />
        <span className="product-name">{name}</span>
        <span className="product-quantity">{quantity}</span>
        {unit !== "none" && (
          <span className="product-unit">{t(`${unit}ShortUnit`)}</span>
        )}
        <div className="product-category">
          {getCategory(category as CategoriesEnum).icon}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
