import React from "react";
import ReactDOM from "react-dom/client";
import { DnDMaker } from "dragdropme";

const rootelement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootelement);

const Chicken = () => <div>React JSX Element</div>;

const items = {
  "group one": [
    { id: "1", value: <Chicken /> },
    { id: "2", value: "Javascript" },
    { id: "3", value: "Typescript" },
  ],

  "group two": [
    { id: "4", value: "Python" },
    { id: "5", value: "Django" },
  ],

  "group three": [
    { id: "6", value: "C#" },
    { id: "7", value: "C++" },
  ],

  "group four": [
    { id: "8", value: "PHP" },
    { id: "9", value: "Laravel" },
    { id: "10", value: "VueJs" },
  ],
  "group five": [
    { id: "11", value: "Golang" },
    { id: "12", value: "Andriod" },
  ],
};

root.render(
  <React.StrictMode>
    <DnDMaker
      items={items}
      onDrop={(items, movedItem) => console.log(items, movedItem)}
      onDragStart={(e, item) => console.log(e, item)}
      onDragOver={(e) => console.log(e, "over")}
      animation={{
        enable: true,
      }}
    />
  </React.StrictMode>
);
