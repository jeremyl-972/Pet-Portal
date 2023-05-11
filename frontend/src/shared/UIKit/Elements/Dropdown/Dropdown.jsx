import { useEffect, useState } from "react";
import { Icon, Line } from "../../../UIKit";
import "./Dropdown.css";

const Dropdown = ({ list, width, text, selectedItem, onSelect }) => {
  const [isOpen, setisOpen] = useState(false);

  useEffect(() => {
    document.body.addEventListener("click", handleBodyClick);
    return () => {
      //triggers once on unmount
      document.body.removeEventListener("click", handleBodyClick);
    };
  }, []); //[] triggers once on mount

  const handleBodyClick = () => {
    setisOpen(false);
  };

  const triggerHandler = (e) => {
    console.log(e.type);

    e.nativeEvent.stopImmediatePropagation();
    setisOpen(!isOpen);
  };

  const selectHandler = (i) => {
    onSelect(i);
    setisOpen(false);
  };

  const getSelected = () => {
    if (selectedItem) {
      const selected = list.find((i) => i.id === selectedItem.id);
      return selected.value;
    }
    return text;
  };

  const clearSelection = () => {
    onSelect("");
  };

  return (
    <div className="Dropdown" style={width}>
      <div className="trigger" onClick={triggerHandler}>
        <Line between className="trigger-line">
          <div className="selector-text">{getSelected()}</div>
          <Icon i="chevron-down" />
        </Line>
      </div>
      {isOpen && selectedItem && (
        <div className="list">
          <div onClick={clearSelection}>--clear selection--</div>
          {list.map((i) => (
            <div
              className={i.id === selectedItem.id ? "selected" : ""}
              key={i.id}
              onClick={() => {
                selectHandler(i);
              }}
            >
              {i.value}
            </div>
          ))}
        </div>
      )}
      {isOpen && !selectedItem && (
        <div className="list">
          <div onClick={clearSelection}>--clear--</div>
          {list.map((i) => (
            <div
              key={i.id}
              onClick={() => {
                selectHandler(i);
              }}
            >
              {i.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
