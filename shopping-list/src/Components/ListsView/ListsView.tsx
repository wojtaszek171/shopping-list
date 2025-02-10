import React from "react";
import {
  useCreateListMutation,
  useGetAllListsQuery,
  useRemoveListMutation, // Import the remove list mutation
} from "../../services/api/list.api";
import { useTranslation } from "react-i18next";
import Button from "../Button";
import ListItem from "../ListItem/ListItem";

const ListsView: React.FC = () => {
  const { t } = useTranslation();

  const { data: lists, error, isLoading } = useGetAllListsQuery();
  const [createList] = useCreateListMutation();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading lists</div>;

  const handleCreateList = () => {
    createList({ name: "New List" });
  };

  return (
    <div>
      <ul>
        {lists?.map((list) => (
          <ListItem key={list.id} list={list} /> // Pass the remove function to ListItem
        ))}
      </ul>
      <Button onClick={handleCreateList}>{t("createList")}</Button>
    </div>
  );
};

export default ListsView;
