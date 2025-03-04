import { KeyboardEventHandler, useState } from "react";
import { useCreateProductMutation } from "../../services/api/product.api";
import { useTranslation } from "react-i18next";
import Button from "../Button";
import CloseIcon from "../../assets/icons/close.svg";
import "./ProductsBrowser.scss";

type ProductOption = {
  name: string;
};

interface ProductsBrowserProps {
  listId: string;
  onClose: () => void;
}

const ProductsBrowser = ({ listId, onClose }: ProductsBrowserProps) => {
  const [query, setQuery] = useState("");
  // const { data: suggestedProducts } = useGetSuggestedProductsQuery(query);
  const suggestedProducts = [];
  const [createProduct] = useCreateProductMutation();
  const { t } = useTranslation();

  const handleSelectProduct = async (product: ProductOption) => {
    await createProduct({ listId, data: { name: product.name } });
    onClose();
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      handleSelectProduct({ name: query });
    }
  };

  return (
    <div className="products-browser">
      <div className="products-browser-dialog">
        <div className="products-browser-header">
          <Button size="icon" onClick={onClose}>
            <CloseIcon />
          </Button>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("product")}
        />
        <ul>
          {[{ id: query, name: query }, ...suggestedProducts]?.map(
            (product) => (
              <li key={product.id} onClick={() => handleSelectProduct(product)}>
                {product.name}
              </li>
            ),
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductsBrowser;
