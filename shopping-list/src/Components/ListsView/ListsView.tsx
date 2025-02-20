import React from "react";
import {
  useCreateListMutation,
  useGetAllListsQuery,
} from "../../services/api/list.api";
import { useTranslation } from "react-i18next";
import Button from "../Button";
import ListItem from "./ListItem/ListItem";
import AddIcon from "../../assets/icons/add.svg";
import Loader from "../Loader";
import "./ListsView.scss";

const ListsView: React.FC = () => {
  const { t } = useTranslation();

  const { data: lists, isLoading } = useGetAllListsQuery();
  const [createList] = useCreateListMutation();

  const handleCreateList = () => {
    createList({ name: t("newList") });
  };

  return (
    <div className="lists-view-component">
      {isLoading && <Loader />}
      <div className="lists-container">
        {lists?.map((list) => <ListItem key={list._id} list={list} />)}
      </div>
      <div className="lists-footer">
        <Button
          onClick={handleCreateList}
          size="icon"
          className="add-list-button"
        >
          <AddIcon />
        </Button>
      </div>
    </div>
  );
};

export default ListsView;
