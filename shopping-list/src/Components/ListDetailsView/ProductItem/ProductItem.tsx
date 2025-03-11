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
import Alcohols from "../../../assets/categories/alcohols.svg";
import Medical from "../../../assets/categories/medical.svg";
import ReadyMeals from "../../../assets/categories/readyMeals.svg";
import PetSupplies from "../../../assets/categories/petSupplies.svg";
import HouseAndGarden from "../../../assets/categories/houseAndGarden.svg";
import BabyProducts from "../../../assets/categories/babyProducts.svg";
import Electronics from "../../../assets/categories/electronics.svg";
import Hygiene from "../../../assets/categories/hygiene.svg";
import TeaAndCoffee from "../../../assets/categories/teaAndCoffee.svg";
import CannedAndPreserved from "../../../assets/categories/cannedAndPreserved.svg";
import MeatAndColdCuts from "../../../assets/categories/meatAndColdCuts.svg";
import Frozen from "../../../assets/categories/frozen.svg";
import Dairy from "../../../assets/categories/dairy.svg";
import FruitsAndVegetables from "../../../assets/categories/fruitsAndVegetables.svg";
import Stationery from "../../../assets/categories/stationery.svg";
import Bakery from "../../../assets/categories/bakery.svg";
import SpicesSaucesOils from "../../../assets/categories/spicesSaucesOils.svg";
import FishAndSeafood from "../../../assets/categories/fishAndSeafood.svg";
import DryGoodsAndPasta from "../../../assets/categories/dryGoodsAndPasta.svg";
import Sweets from "../../../assets/categories/sweets.svg";
import Clothing from "../../../assets/categories/clothing.svg";
import Vege from "../../../assets/categories/vege.svg";
import WaterAndDrinks from "../../../assets/categories/waterAndDrinks.svg";
import CleaningSupplies from "../../../assets/categories/cleaningSupplies.svg";
import Other from "../../../assets/categories/other.svg";
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
    unit,
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

  const getIcon = () => {
    switch (category) {
      case "alcohols":
        return <Alcohols />;
      case "medical":
        return <Medical />;
      case "readyMeals":
        return <ReadyMeals />;
      case "petSupplies":
        return <PetSupplies />;
      case "houseAndGarden":
        return <HouseAndGarden />;
      case "babyProducts":
        return <BabyProducts />;
      case "electronics":
        return <Electronics />;
      case "hygiene":
        return <Hygiene />;
      case "teaAndCoffee":
        return <TeaAndCoffee />;
      case "cannedAndPreserved":
        return <CannedAndPreserved />;
      case "meatAndColdCuts":
        return <MeatAndColdCuts />;
      case "frozen":
        return <Frozen />;
      case "dairy":
        return <Dairy />;
      case "fruitsAndVegetables":
        return <FruitsAndVegetables />;
      case "stationery":
        return <Stationery />;
      case "bakery":
        return <Bakery />;
      case "spicesSaucesOils":
        return <SpicesSaucesOils />;
      case "fishAndSeafood":
        return <FishAndSeafood />;
      case "dryGoodsAndPasta":
        return <DryGoodsAndPasta />;
      case "sweets":
        return <Sweets />;
      case "clothing":
        return <Clothing />;
      case "vege":
        return <Vege />;
      case "waterAndDrinks":
        return <WaterAndDrinks />;
      case "cleaningSupplies":
        return <CleaningSupplies />;
      case "other":
        return <Other />;
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
        <span className="product-unit">{unit}</span>
        <div className="product-category">{getIcon()}</div>
      </div>
    </div>
  );
};

export default ProductItem;
