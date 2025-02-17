import { useParams } from "react-router-dom";
import { useGetProductsByListIdQuery } from "../services/api/product.api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetListQuery } from "../services/api/list.api";

const ListDetails = () => {
  const { id } = useParams();
  const { data: listData } = useGetListQuery(id ?? skipToken);
  const { data: productsData } = useGetProductsByListIdQuery(id ?? skipToken);

  console.log(listData);

  return (
    <div>
      <h2>List Details for {listData?.name}</h2>
      {JSON.stringify(productsData)}
    </div>
  );
};

export default ListDetails;
