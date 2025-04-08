import React, { useState, useEffect, useCallback } from "react";
import {
  useCreateListMutation,
  useGetAllListsQuery,
  useRemoveListMutation,
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
import useIsTouch from "../../hooks/useIsTouch";
import {
  listenForListsChanges,
  removeListsListeners,
} from "../../services/api/ws/listListeners";
import { useCheckSessionQuery } from "../../services/api/user.api";
import "./ListsView.scss";

const ListsView: React.FC = () => {
  const { t } = useTranslation();
  const { data: lists, isLoading, refetch } = useGetAllListsQuery();
  const [createList] = useCreateListMutation();
  const [deleteList] = useRemoveListMutation();

  const [selectedLists, setSelectedLists] = useState<string[]>([]);
  const isTouchDevice = useIsTouch();
  const [isSelecting, setIsSelecting] = useState(false);
  const { setTitle, setButtons } = useHeader();
  const { openDialog, closeDialog, updateDialog } = useDialog();
  const { isSuccess } = useCheckSessionQuery();

  useEffect(() => {
    if (isSuccess) {
      listenForListsChanges(refetch);
    }

    return () => {
      removeListsListeners();
    };
  }, [isSuccess, refetch]);

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

  const handleBulkDelete = useCallback(() => {
    const deletePromises = selectedLists.map((listId) =>
      deleteList(listId).unwrap(),
    );
    Promise.allSettled(deletePromises).then((results) => {
      const failedDeletions = results.filter(
        (result) => result.status === "rejected",
      );
      if (failedDeletions.length) {
        updateDialog({
          title: t("someListsCouldNotBeRemoved"),
          content: (
            <ul>
              {failedDeletions.map((result, index) => (
                <li key={index}>{selectedLists[index]}</li>
              ))}
            </ul>
          ),
          onPrimaryButtonClick: closeDialog,
          primaryButtonText: t("ok"),
          secondaryButtonText: undefined,
        });
      } else {
        closeDialog();
      }
    });
    setSelectedLists([]);
  }, [closeDialog, deleteList, selectedLists, t, updateDialog]);

  useEffect(() => {
    if (!selectedLists.length) {
      setIsSelecting(false);
    }
  }, [selectedLists]);

  useEffect(() => {
    setTitle(t("yourLists"));
  }, [setTitle, t]);

  useEffect(() => {
    setButtons([
      {
        action: () => {
          openDialog({
            closeButton: true,
            title: t("removeListsConfirmation"),
            primaryButtonText: t("delete"),
            onPrimaryButtonClick: handleBulkDelete,
            secondaryButtonText: t("cancel"),
            onSecondaryButtonClick: closeDialog,
            content: (
              <ul>
                {selectedLists.map((id) => (
                  <li key={id}>{lists?.find((l) => l._id === id)?.name}</li>
                ))}
              </ul>
            ),
          });
        },
        icon: <DeleteIcon />,
        hidden: !selectedLists.length,
        color: "#e33939",
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
        hidden: isTouchDevice || !lists?.length,
      },
    ]);

    return () => {
      setButtons([]);
    };
  }, [
    closeDialog,
    handleBulkDelete,
    isSelecting,
    isTouchDevice,
    lists,
    openDialog,
    selectedLists,
    selectedLists.length,
    setButtons,
    t,
  ]);

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
