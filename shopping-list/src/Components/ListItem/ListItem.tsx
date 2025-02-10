import React from "react";
import { useRemoveListMutation } from "../../services/api/list.api";

interface ListItemProps {
  list: {
    _id: string;
    name: string;
    items: any[];
    ownerIds: string[];
  };
}

const ListItem: React.FC<ListItemProps> = ({ list }) => {
  const [removeList] = useRemoveListMutation(); // Initialize the remove list mutation

  const handleRemove = () => {
    removeList(list._id); // Call the onRemove function with the list id
  };

  return (
    <li>
      <h2>{list.name}</h2>
      <button onClick={handleRemove}>Remove</button> {/* Add remove button */}
    </li>
  );
};

export default ListItem;
