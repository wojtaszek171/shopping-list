import { useNavigate } from "react-router-dom";
import {
  useEditListMutation,
  useRemoveListMutation,
} from "../../../services/api/list.api";
import Button from "../../Button";
import MenuIcon from "../../../assets/icons/menu.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import { User } from "../../../services/types";
import { MouseEventHandler } from "react";
import { useContextMenu } from "../../ContextMenu/useContextMenu";
import { useTranslation } from "react-i18next";
import EditIcon from "../../../assets/icons/edit.svg";
import { useDialog } from "../../Dialog/useDialog";
import "./ListItem.scss";

interface ListItemProps {
  list: {
    _id: string;
    name: string;
    createdDate: Date;
    users: User[];
    __v: number;
    totalProducts: number;
    boughtProducts: number;
  };
}

const ListItem = ({ list }: ListItemProps) => {
  const navigate = useNavigate();
  const [deleteList] = useRemoveListMutation();
  const { openMenu } = useContextMenu();
  const [editList] = useEditListMutation();
  const { openDialog, closeDialog, updateDialog } = useDialog();
  const { t } = useTranslation();

  const handleDelete = () => {
    deleteList(list.name)
      .unwrap()
      .then(() => {
        closeDialog();
      });
  };

  const deleteAction: MouseEventHandler<HTMLElement> = () => {
    openDialog({
      closeButton: true,
      title: t("removeListConfirmation", { listName: list.name }),
      primaryButtonText: t("delete"),
      onPrimaryButtonClick: handleDelete,
      secondaryButtonText: t("cancel"),
      onSecondaryButtonClick: closeDialog,
      content: t("removeListDescription"),
    });
  };

  const handleRename: MouseEventHandler<HTMLElement> = () => {};

  const handleClick = () => {
    if (!list._id) {
      alert("List ID not found");
      return;
    }
    navigate(`/lists/${list._id}`);
  };

  const handleMenuOpen: MouseEventHandler<HTMLElement> = (e) => {
    e.stopPropagation();
    openMenu(
      list.name,
      [
        {
          text: t("rename"),
          icon: <EditIcon />,
          action: handleRename,
        },
        {
          text: t("delete"),
          icon: <DeleteIcon />,
          action: deleteAction,
        },
      ],
      { x: e.clientX, y: e.clientY },
    );
  };

  const handleContextMenu: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    handleMenuOpen(e);
  };

  return (
    <div
      className="list-item"
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      <div className="list-header">
        <span className="list-name">{list.name}</span>
        <Button onClick={handleMenuOpen} size="icon" className="menu-button">
          <MenuIcon />
        </Button>
      </div>
      <div className="list-content"></div>
    </div>
  );
};

export default ListItem;
