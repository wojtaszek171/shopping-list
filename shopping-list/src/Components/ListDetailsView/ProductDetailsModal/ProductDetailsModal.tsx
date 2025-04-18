import { useState, useEffect } from "react";
import { Product, UpdateProductDto } from "../../../services/types";
import { useUpdateProductMutation } from "../../../services/api/product.api";
import Input from "../../Input";
import { useTranslation } from "react-i18next";
import Button from "../../Button";
import GoBackIcon from "../../../assets/icons/goback.svg";
import Select from "../../Select";
import { CategoriesEnum, UnitsEnum } from "../../../utils/consts";

import "./ProductDetailsModal.scss";
import useCategories from "./useCategories";

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
}

const ProductDetailsModal = ({
  product,
  onClose,
}: ProductDetailsModalProps) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<UpdateProductDto>({
    name: product.name,
    quantity: product.quantity,
    category: product.category,
    unit: product.unit,
  });
  const { getCategory } = useCategories();

  const [updateProductDetails] = useUpdateProductMutation();
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setFormData({
      name: product.name,
      quantity: product.quantity,
      category: product.category,
      unit: product.unit,
    });
  }, [product]);

  useEffect(() => {
    setIsChanged(
      formData.name !== product.name ||
        formData.quantity !== product.quantity ||
        formData.category !== product.category ||
        formData.unit !== product.unit,
    );
  }, [formData, product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (key: string) => {
    setFormData((prev) => ({ ...prev, category: key }));
  };

  const handleUnitChange = (key: string) => {
    setFormData((prev) => ({ ...prev, unit: key }));
  };

  const handleClose = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isChanged) {
      await updateProductDetails({
        listId: product.list,
        id: product._id,
        data: formData,
      });
    }

    onClose();
  };

  const categoryOptions = Object.entries(CategoriesEnum).map(([key, value]) => {
    const c = getCategory(value);
    return {
      key: key,
      optionLabel: (
        <div className="category-option">
          <div className="category-icon">{c.icon}</div>
          <span className="category-title">{t(c.key)}</span>
        </div>
      ),
      value: <div className="category-icon">{c.icon}</div>,
    };
  });

  const unitsOptions = Object.entries(UnitsEnum).map(([key, value]) => ({
    key,
    value: t(`${value}Unit`),
  }));

  return (
    <div className="product-details-modal">
      <div className="row">
        <Button onClick={handleClose} size="icon" className="close-button">
          <GoBackIcon />
        </Button>
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <Select
          className="category-select"
          name="category"
          value={formData.category}
          options={categoryOptions}
          onChange={handleCategoryChange}
        />
      </div>
      <div className="row">
        <Input
          type="number"
          name="quantity"
          placeholder={t("quantity")}
          value={formData.quantity}
          onChange={handleChange}
        />
        <Select
          name="unit"
          value={formData.unit}
          options={unitsOptions}
          onChange={handleUnitChange}
        />
      </div>
    </div>
  );
};

export default ProductDetailsModal;
