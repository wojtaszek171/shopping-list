import React from "react";
import {
  useCreateListMutation,
  useGetAllListsQuery, // Import the remove list mutation
} from "../../services/api/list.api";
import { useTranslation } from "react-i18next";
import Button from "../Button";
import ListItem from "./ListItem/ListItem";
import AddIcon from "../../assets/icons/add.svg";
import "./ListsView.scss";
import Loader from "../Loader";

const ListsView: React.FC = () => {
  const { t } = useTranslation();

  const { data: lists, error, isLoading } = useGetAllListsQuery();
  const [createList] = useCreateListMutation();

  if (error) return <div>Error loading lists</div>;

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
          <img src={AddIcon} />
        </Button>
      </div>
    </div>
  );
};

export default ListsView;
