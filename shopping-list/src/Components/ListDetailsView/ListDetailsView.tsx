import { useParams } from "react-router-dom";
import { useGetProductsByListIdQuery } from "../../services/api/product.api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetListQuery } from "../../services/api/list.api";
import { useEffect, useState } from "react";
import AddIcon from "../../assets/icons/add.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import SortIcon from "../../assets/icons/sort.svg";
import MultiSelectIcon from "../../assets/icons/multi-select.svg";
import Button from "../Button";
import { useHeader } from "../AppHeader/HeaderProvider";
import ProductsBrowser from "../ProductsBrowser/ProductsBrowser";
import ProductItem from "./ProductItem/ProductItem";
import useIsTouch from "../../hooks/useIsTouch";
import Dropdown from "../Dropdown/Dropdown";
import { useTranslation } from "react-i18next";
import {
  joinListRoom,
  leaveListRoom,
  listenForListRoomEvents,
  removeListRoomListeners,
} from "../../services/api/ws/listListeners";
import "./ListDetailsView.scss";

const ListDetailsView = () => {
  const { id } = useParams();
  const { data: listData, refetch: refetchList } = useGetListQuery(
    id ?? skipToken,
  );
  const { data: productsData, refetch: refetchProducts } =
    useGetProductsByListIdQuery(id ?? skipToken);
  const { setTitle, setButtons } = useHeader();
  const [isProductsBrowserOpen, setProductsBrowserOpen] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const isTouchDevice = useIsTouch();
  const [isSortDropdownOpen, setSortDropdownOpen] = useState(false);
  const { t } = useTranslation();
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("asc");

  useEffect(() => {
    if (listData?.name) {
      setTitle(listData?.name);
    }

    return () => {
      setTitle("");
    };
  }, [listData?.name, setTitle]);

  useEffect(() => {
    if (listData?._id) {
      joinListRoom(listData._id);

      const handleListDeleted = () => {
        console.log("List deleted, navigating away...");
        // Add logic to handle list deletion, e.g., navigate to another page
      };

      listenForListRoomEvents(
        listData._id,
        refetchList,
        handleListDeleted,
        refetchProducts,
      );
    }

    return () => {
      if (listData?._id) {
        removeListRoomListeners(listData._id);
        leaveListRoom(listData._id);
      }
    };
  }, [listData, refetchList, refetchProducts]);

  const handleCreateProduct = () => {
    setProductsBrowserOpen(true);
  };

  const handleCloseProductsBrowser = () => {
    setProductsBrowserOpen(false);
  };

  const handleSelectProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((productd) => productd !== id)
        : [...prev, id],
    );
  };

  const handleLongPress = (id: string) => {
    handleSelectProduct(id);
    setIsSelecting(true);
  };

  const handleSortClick = () => {
    setSortDropdownOpen((prev) => !prev);
  };

  const handleSortFieldClick = (field: string) => {
    setSortField(field);
  };

  const handleSortOrderClick = (order: string) => {
    setSortOrder(order);
  };

  const sortOptions = [
    {
      label: t("sortByName"),
      onClick: () => handleSortFieldClick("name"),
      active: sortField === "name",
    },
    {
      label: t("sortByDateAdded"),
      onClick: () => handleSortFieldClick("dateAdded"),
      active: sortField === "dateAdded",
    },
    {
      label: t("sortByCategory"),
      onClick: () => handleSortFieldClick("category"),
      active: sortField === "category",
    },
    { isSeparator: true },
    {
      label: t("ascending"),
      onClick: () => handleSortOrderClick("asc"),
      active: sortOrder === "asc",
    },
    {
      label: t("descending"),
      onClick: () => handleSortOrderClick("desc"),
      active: sortOrder === "desc",
    },
  ];

  const sortProducts = (products: any[]) => {
    if (!sortField) return products;

    const sortedProducts = [...products];
    sortedProducts.sort((a, b) => {
      const compare = (a[sortField] || "").localeCompare(b[sortField] || "");
      return sortOrder === "asc" ? compare : -compare;
    });
    return sortedProducts;
  };

  useEffect(() => {
    setButtons([
      {
        action: handleSortClick,
        icon: <SortIcon />,
      },
      {
        action: () => {},
        icon: <DeleteIcon />,
        hidden: !selectedProducts.length,
        color: "#e33939",
      },
      {
        action: () => {
          setIsSelecting((prev) => {
            if (prev) {
              setSelectedProducts([]);
            }
            return !prev;
          });
        },
        icon: <MultiSelectIcon />,
        active: isSelecting,
        hidden: isTouchDevice,
      },
    ]);

    return () => {
      setButtons([]);
    };
  }, [isSelecting, isTouchDevice, selectedProducts.length, setButtons]);

  useEffect(() => {
    if (!selectedProducts.length) {
      setIsSelecting(false);
    }
  }, [selectedProducts]);

  if (!id) {
    return;
  }

  return (
    <div className="list-details-component">
      {isSortDropdownOpen && (
        <Dropdown className="sort-dropdown" options={sortOptions} />
      )}
      <div className="product-list">
        {sortProducts(productsData)
          ?.slice()
          .sort((a, b) => Number(a.completed) - Number(b.completed))
          .map((product) => (
            <ProductItem
              key={product._id}
              {...product}
              isSelecting={isSelecting}
              isSelected={selectedProducts.includes(product._id)}
              onSelect={() => handleSelectProduct(product._id)}
              onLongPress={() => handleLongPress(product._id)}
            />
          ))}
      </div>
      <Button
        onClick={handleCreateProduct}
        size="icon"
        className="add-product-button"
      >
        <AddIcon />
      </Button>
      {isProductsBrowserOpen && (
        <ProductsBrowser listId={id} onClose={handleCloseProductsBrowser} />
      )}
    </div>
  );
};

export default ListDetailsView;
