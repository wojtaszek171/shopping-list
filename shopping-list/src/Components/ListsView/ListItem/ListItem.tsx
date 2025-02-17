import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [removeList] = useRemoveListMutation();

  const handleRemove = () => {
    removeList(list._id);
  };

  const handleClick = () => {
    navigate(`/lists/${list._id}`);
  };

  return (
    <div className="list-item" onClick={handleClick}>
      <div className="list-header">
        <span className="list-name">{list.name}</span>
        <Button
          onClick={handleRemove}
          size="icon"
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            handleRemove();
          }}
        >
          <img src={DeleteIcon} alt="delete" />
        </Button>
      </div>
      <div className="list-content"></div>
    </div>
  );
};

export default ListItem;
