import React from "react";
import ReactDOM from "react-dom/client";
import { DnDMaker } from "dragdropme";

const rootelement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootelement);

const groups = [
  "group one",
  "group two",
  "group three",
  "group four",
  "group five",
];
const items = [
  { id: "1", group: groups[0], value: "Chicken" },
  { id: "2", group: groups[0], value: "Monkey" },
  { id: "3", group: groups[0], value: "Duck" },
  { id: "4", group: groups[1], value: "Rhino" },
  { id: "5", group: groups[1], value: "Sandwich" },
  { id: "6", group: groups[2], value: "Ostrich" },
  { id: "7", group: groups[2], value: "Flamingo" },
  { id: "8", group: groups[3], value: "Sandwich" },
  { id: "9", group: groups[3], value: "Ostrich" },
  { id: "10", group: groups[3], value: "Flamingo" },
  { id: "11", group: groups[4], value: "Ostrich" },
  { id: "12", group: groups[4], value: "Flamingo" },
];

root.render(
  <React.StrictMode>
    <DnDMaker
      defaultItems={items}
      groups={groups}
      onDrop={(items, movedItem) => console.log(items, movedItem)}
      onDragStart={(e, item) => console.log(e, item)}
      onDragOver={(e) => console.log(e, "over")}
      placeholder="Put me here plz!"
    />
  </React.StrictMode>
);
