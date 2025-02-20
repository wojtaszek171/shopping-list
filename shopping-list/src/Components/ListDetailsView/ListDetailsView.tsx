import { useParams } from "react-router-dom";
import { useGetProductsByListIdQuery } from "../../services/api/product.api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetListQuery } from "../../services/api/list.api";
import { useEffect } from "react";

interface ListDetailsViewProps {
  setTitle: (title?: string) => void;
}

const ListDetailsView = ({ setTitle }: ListDetailsViewProps) => {
  const { id } = useParams();
  const { data: listData } = useGetListQuery(id ?? skipToken);
  const { data: productsData } = useGetProductsByListIdQuery(id ?? skipToken);

  useEffect(() => {
    setTitle(listData?.name);

    return () => {
      setTitle("");
    };
  }, [listData?.name, setTitle]);

  return (
    <div className="list-details-component">{JSON.stringify(productsData)}</div>
  );
};

export default ListDetailsView;
