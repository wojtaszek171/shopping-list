import socket from "../socket";

export const joinListRoom = (listId: string) => {
  socket.emit("joinList", listId);
};

export const leaveListRoom = (listId: string) => {
  socket.emit("leaveList", listId);
};

export const listenForListsChanges = (onListsChanged: () => void) => {
  socket.on("listUpdated", () => {
    console.log("List updated");
    onListsChanged();
  });

  socket.on("listDeleted", () => {
    console.log("List deleted");
    onListsChanged();
  });
};

export const removeListsListeners = () => {
  socket.off("listUpdated");
  socket.off("listDeleted");
};
