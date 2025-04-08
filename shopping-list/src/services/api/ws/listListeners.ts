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

export const listenForListRoomEvents = (
  listId: string,
  onListUpdated: () => void,
  onListDeleted: () => void,
  onListProductsUpdated: () => void = () => {},
) => {
  socket.on(`listUpdated:${listId}`, () => {
    console.log(`List ${listId} updated`);
    onListUpdated();
  });

  socket.on(`listDeleted:${listId}`, () => {
    console.log(`List ${listId} deleted`);
    onListDeleted();
  });

  socket.on(`listProductsUpdated:${listId}`, () => {
    console.log(`List ${listId} products updated`);
    onListProductsUpdated();
  });
};

export const removeListRoomListeners = (listId: string) => {
  socket.off(`listUpdated:${listId}`);
  socket.off(`listDeleted:${listId}`);
  socket.off(`listProductsUpdated:${listId}`);
};
