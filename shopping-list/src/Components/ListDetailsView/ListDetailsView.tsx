import { useParams } from "react-router-dom";
import { useGetProductsByListIdQuery } from "../../services/api/product.api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetListQuery } from "../../services/api/list.api";
import { useEffect, useState } from "react";
import AddIcon from "../../assets/icons/add.svg";
import Button from "../Button";
import { useHeader } from "../AppHeader/HeaderProvider";
import ProductsBrowser from "../ProductsBrowser/ProductsBrowser";
import "./ListDetailsView.scss";

const ListDetailsView = () => {
  const { id } = useParams();
  const { data: listData } = useGetListQuery(id ?? skipToken);
  const { data: productsData } = useGetProductsByListIdQuery(id ?? skipToken);
  const { setTitle, setButtons } = useHeader();
  const [isProductsBrowserOpen, setProductsBrowserOpen] = useState(false);

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

  if (!id) {
    return;
  }

  return (
    <div className="list-details-component">
      {JSON.stringify(productsData)}
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
