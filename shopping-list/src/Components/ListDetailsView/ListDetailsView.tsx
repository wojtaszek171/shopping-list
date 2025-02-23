import { useParams } from "react-router-dom";
import { useGetProductsByListIdQuery } from "../../services/api/product.api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetListQuery } from "../../services/api/list.api";
import { useEffect } from "react";
import AddIcon from "../../assets/icons/add.svg";
import Button from "../Button";
import { useHeader } from "../AppHeader/HeaderProvider";
import "./ListDetailsView.scss";

const ListDetailsView = () => {
  const { id } = useParams();
  const { data: listData } = useGetListQuery(id ?? skipToken);
  const { data: productsData } = useGetProductsByListIdQuery(id ?? skipToken);
  const { setTitle, setButtons } = useHeader();

  useEffect(() => {
    if (listData?.name) {
      setTitle(listData?.name);
    }

    return () => {
      setTitle("");
    };
  }, [listData?.name, setTitle]);

  const handleCreateProduct = () => {};

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
    </div>
  );
};

export default ListDetailsView;
