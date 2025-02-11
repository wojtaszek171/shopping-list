import { useRemoveListMutation } from "../../../services/api/list.api";
import Button from "../../Button";
import DeleteIcon from "../../../assets/icons/delete.svg";
import { User } from "../../../services/types";
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
  const [removeList] = useRemoveListMutation(); // Initialize the remove list mutation

  const handleRemove = () => {
    removeList(list._id); // Call the onRemove function with the list id
  };

  return (
    <div className="list-item">
      <div className="list-header">
        <span className="list-name">{list.name}</span>
        <Button onClick={handleRemove} size="icon" className="delete-button">
          <img src={DeleteIcon} alt="delete" />
        </Button>
      </div>
      <div className="list-content"></div>
    </div>
  );
};

export default ListItem;
