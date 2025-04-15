import { useNavigate } from "react-router-dom";
import {
  useEditListMutation,
  useRemoveListMutation,
} from "../../../services/api/list.api";
import Button from "../../Button";
import MenuIcon from "../../../assets/icons/menu.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import { ListResponse } from "../../../services/types";
import {
  MouseEvent,
  MouseEventHandler,
  useRef,
  KeyboardEventHandler,
} from "react";
import { useContextMenu } from "../../ContextMenu/useContextMenu";
import { useTranslation } from "react-i18next";
import EditIcon from "../../../assets/icons/edit.svg";
import InviteIcon from "../../../assets/icons/invite.svg";
import { useDialog } from "../../Dialog/useDialog";
import Input from "../../Input";
import ProgressBar from "../../ProgressBar/ProgressBar";
import "./ListItem.scss";

interface ListItemProps {
  list: ListResponse;
  isSelected: boolean;
  isSelecting: boolean;
  onSelect: () => void;
  onLongPress: () => void;
  isTouchDevice: boolean;
}

const ListItem = ({
  list,
  isSelected,
  isSelecting,
  onSelect,
  onLongPress,
  isTouchDevice,
}: ListItemProps) => {
  const navigate = useNavigate();
  const [deleteList] = useRemoveListMutation();
  const { openMenu } = useContextMenu();
  const [editList] = useEditListMutation();
  const { openDialog, closeDialog, updateDialog } = useDialog();
  const newName = useRef(list.name);
  const friendEmail = useRef("");
  const { t } = useTranslation();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleDelete = () => {
    updateDialog({
      loading: true,
    });
    deleteList(list._id)
      .unwrap()
      .then(() => {
        closeDialog();
      })
      .catch((e) => {
        updateDialog({
          error: e?.data?.message,
        });
      })
      .finally(() => {
        updateDialog({
          loading: false,
        });
      });
  };

  const handlRename = () => {
    editList({
      body: {
        name: newName.current,
      },
      id: list._id,
    })
      .unwrap()
      .then(() => {
        closeDialog();
      })
      .catch((e) => {
        updateDialog({
          error: e?.data?.message,
        });
      })
      .finally(() => {
        updateDialog({
          loading: false,
        });
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

  const renameAction: MouseEventHandler<HTMLElement> = () => {
    openDialog({
      closeButton: true,
      title: t("rename"),
      primaryButtonText: t("rename"),
      onPrimaryButtonClick: handlRename,
      secondaryButtonText: t("cancel"),
      onSecondaryButtonClick: closeDialog,
      content: (
        <Input
          type="text"
          defaultValue={newName.current}
          onChange={(e) => {
            newName.current = e.target.value;
          }}
          autoFocus
        />
      ),
    });
  };

  const handleClick = () => {
    if (!list._id) {
      alert("List ID not found");
      return;
    }
    navigate(`/lists/${list._id}`);
  };

  const handleInvite = () => {
    openDialog({
      closeButton: true,
      title: t("inviteFriend"),
      primaryButtonText: t("invite"),
      onPrimaryButtonClick: () => {
        closeDialog();
      },
      secondaryButtonText: t("cancel"),
      onSecondaryButtonClick: closeDialog,
      content: (
        <>
          <span>{t("shareListDescription")}</span>
          <Input
            type="email"
            defaultValue={friendEmail.current}
            onChange={(e) => {
              friendEmail.current = e.target.value;
            }}
            autoFocus
          />
        </>
      ),
    });
  };

  const handleMenuOpen = (
    e: MouseEvent<HTMLElement>,
    position?: { x: number; y: number },
  ) => {
    e.stopPropagation();
    const menuPosition = position || { x: e.clientX, y: e.clientY };
    openMenu(
      list.name,
      [
        {
          text: t("rename"),
          icon: <EditIcon />,
          action: renameAction,
        },
        {
          text: t("invite"),
          icon: <InviteIcon />,
          action: handleInvite,
        },

        {
          text: t("delete"),
          icon: <DeleteIcon />,
          action: deleteAction,
        },
      ],
      menuPosition,
    );
  };

  const handleContextMenu: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (isTouchDevice || isSelecting) {
      return;
    }
    handleMenuOpen(e);
  };

  const handleMouseDown = () => {
    if (isTouchDevice) {
      timerRef.current = setTimeout(onLongPress, 500);
    }
  };

  const handleMouseUp = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (!(e.key === "Enter" || e.key === " ")) {
      return;
    }
    if (isSelecting) {
      onSelect();
    } else {
      handleClick();
    }
  };

  const completedPercentage = list.allProductsCount
    ? (list.completedProductsCount / list.allProductsCount) * 100
    : 0;

  return (
    <div
      role="button"
      tabIndex={0}
      className={`list-item ${isSelected ? "selected" : ""}`}
      onClick={isSelecting ? onSelect : handleClick}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onContextMenu={handleContextMenu}
    >
      {isSelecting && !isTouchDevice && (
        <Input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="select-checkbox"
        />
      )}
      <div className="list-header">
        <span className="list-name">{list.name}</span>
        <Button
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            handleMenuOpen(e, { x: rect.left, y: rect.bottom });
          }}
          size="icon"
          className="menu-button"
        >
          <MenuIcon />
        </Button>
      </div>
      <div className="list-content">
        <ProgressBar percentage={completedPercentage} />
        <span className="products-count">
          {list.completedProductsCount}/{list.allProductsCount}
        </span>
      </div>
    </div>
  );
};

export default ListItem;
