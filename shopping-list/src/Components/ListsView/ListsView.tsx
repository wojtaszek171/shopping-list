import React, { useState, useEffect } from "react";
import {
  useCreateListMutation,
  useGetAllListsQuery,
} from "../../services/api/list.api";
import { useTranslation } from "react-i18next";
import Button from "../Button";
import ListItem from "./ListItem/ListItem";
import AddIcon from "../../assets/icons/add.svg";
import MultiSelectIcon from "../../assets/icons/multi-select.svg";
import Loader from "../Loader";
import { useHeader } from "../AppHeader/HeaderProvider";
import DeleteIcon from "../../assets/icons/delete.svg";
import { useDialog } from "../Dialog/useDialog";
import "./ListsView.scss";

const ListsView: React.FC = () => {
  const { t } = useTranslation();
  const { data: lists, isLoading } = useGetAllListsQuery();
  const [createList] = useCreateListMutation();

  const [selectedLists, setSelectedLists] = useState<string[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const { setTitle, setButtons } = useHeader();
  const { openDialog, closeDialog, updateDialog } = useDialog();

  useEffect(() => {
    setTitle(t("yourLists"));

    const handleTouchStart = () => setIsTouchDevice(true);
    window.addEventListener("touchstart", handleTouchStart);
    return () => window.removeEventListener("touchstart", handleTouchStart);
  }, [setTitle, t]);

  useEffect(() => {
    setButtons([
      {
        action: () => {
          // Handle remove action
        },
        icon: <DeleteIcon />,
        hidden: !selectedLists.length,
      },
      {
        action: () => {
          setIsSelecting((prev) => {
            if (prev) {
              setSelectedLists([]);
            }
            return !prev;
          });
        },
        icon: <MultiSelectIcon />,
        active: isSelecting,
        hidden: isTouchDevice,
      },
    ]);
  }, [isSelecting, isTouchDevice, selectedLists.length, setButtons]);

  const handleCreateList = () => {
    createList({ name: t("newList") });
  };

  const handleSelectList = (id: string) => {
    setSelectedLists((prev) =>
      prev.includes(id)
        ? prev.filter((listId) => listId !== id)
        : [...prev, id],
    );
  };

  const handleLongPress = (id: string) => {
    handleSelectList(id);
    setIsSelecting(true);
  };

  useEffect(() => {
    if (!selectedLists.length) {
      setIsSelecting(false);
    }
  }, [selectedLists]);

  return (
    <div className="lists-view-component">
      {isLoading && <Loader />}
      <div className="lists-container">
        {lists?.map((list) => (
          <ListItem
            key={list._id}
            list={list}
            isSelected={selectedLists.includes(list._id)}
            isSelecting={isSelecting}
            onSelect={() => handleSelectList(list._id)}
            onLongPress={() => handleLongPress(list._id)}
            isTouchDevice={isTouchDevice}
          />
        ))}
        <div className="spacing" />
      </div>
      <Button
        onClick={handleCreateList}
        size="icon"
        className="add-list-button"
      >
        <AddIcon />
      </Button>
    </div>
  );
};

export default ListsView;
