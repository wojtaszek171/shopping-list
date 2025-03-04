import { useParams } from "react-router-dom";
import { useGetProductsByListIdQuery } from "../../services/api/product.api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetListQuery } from "../../services/api/list.api";
import { useEffect, useState } from "react";
import AddIcon from "../../assets/icons/add.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import MultiSelectIcon from "../../assets/icons/multi-select.svg";
import Button from "../Button";
import { useHeader } from "../AppHeader/HeaderProvider";
import ProductsBrowser from "../ProductsBrowser/ProductsBrowser";
import "./ListDetailsView.scss";
import ProductItem from "./ProductItem/ProductItem";
import { useContextMenu } from "../ContextMenu/useContextMenu";
import useIsTouch from "../../hooks/useIsTouch";

const ListDetailsView = () => {
  const { id } = useParams();
  const { data: listData } = useGetListQuery(id ?? skipToken);
  const { data: productsData } = useGetProductsByListIdQuery(id ?? skipToken);
  const { setTitle, setButtons } = useHeader();
  const [isProductsBrowserOpen, setProductsBrowserOpen] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const isTouchDevice = useIsTouch();
  const { openMenu, closeMenu } = useContextMenu();

  useEffect(() => {
    if (listData?.name) {
      setTitle(listData?.name);
    }

    return () => {
      setTitle("");
    };
  }, [listData?.name, setTitle]);

  const handleCreateProduct = () => {
    setProductsBrowserOpen(true);
  };

  const handleCloseProductsBrowser = () => {
    setProductsBrowserOpen(false);
  };

  const handleSelectProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((productd) => productd !== id)
        : [...prev, id],
    );
  };

  const handleLongPress = (id: string) => {
    handleSelectProduct(id);
    setIsSelecting(true);
  };

  useEffect(() => {
    setButtons([
      {
        action: () => {},
        icon: <DeleteIcon />,
        hidden: !selectedProducts.length,
        color: "#e33939",
      },
      {
        action: () => {
          setIsSelecting((prev) => {
            if (prev) {
              setSelectedProducts([]);
            }
            return !prev;
          });
        },
        icon: <MultiSelectIcon />,
        active: isSelecting,
        hidden: isTouchDevice,
      },
    ]);

    return () => {
      setButtons([]);
    };
  }, [isSelecting, isTouchDevice, selectedProducts.length, setButtons]);

  useEffect(() => {
    if (!selectedProducts.length) {
      setIsSelecting(false);
    }
  }, [selectedProducts]);

  if (!id) {
    return;
  }

  return (
    <div className="list-details-component">
      {productsData?.map((product) => (
        <ProductItem
          key={product._id}
          {...product}
          isSelecting={isSelecting}
          isSelected={selectedProducts.includes(product._id)}
          onSelect={() => handleSelectProduct(product._id)}
          onLongPress={() => handleLongPress(product._id)}
        />
      ))}
      <Button
        onClick={handleCreateProduct}
        size="icon"
        className="add-product-button"
      >
        <AddIcon />
      </Button>
      {isProductsBrowserOpen && (
        <ProductsBrowser listId={id} onClose={handleCloseProductsBrowser} />
      )}
    </div>
  );
};

export default ListDetailsView;
