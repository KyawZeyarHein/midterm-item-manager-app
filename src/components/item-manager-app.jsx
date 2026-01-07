import "./item-manager-app.css";

import { useState, useRef } from "react";

import deleteLogo from "../assets/delete.svg";
import stationaryLogo from "../assets/ink_pen.svg";
import kitchenwareLogo from "../assets/flatware.svg";
import applianceLogo from "../assets/electrical_services.svg";

function ItemManager() {
  /*
   * !!! IMPORTANT !!!
   * - You MUST use the given states and refs in your code.
   * - You MAY add additional state, refs, and variables if needed.
   */

  const [items, setItems] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  // You must use this ref for the item name input
  const itemName = useRef(null);

  // additional refs
  const categoryRef = useRef(null);
  const priceRef = useRef(null);

  const categories = ["Stationary", "Kitchenware", "Appliance"];

  const getCategoryIcon = (category) => {
    if (category === "Stationary") return stationaryLogo;
    if (category === "Kitchenware") return kitchenwareLogo;
    if (category === "Appliance") return applianceLogo;
  };

  const addItemHandler = () => {
    const name = itemName.current.value.trim();
    const category = categoryRef.current.value;
    const price = Number(priceRef.current.value);

    // validation
    if (name === "") {
      setErrorMsg("Item name must not be empty");
      return;
    }

    const duplicated = items.find(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
    if (duplicated) {
      setErrorMsg("Item must not be duplicated");
      return;
    }

    if (category === "") {
      setErrorMsg("Please select a category");
      return;
    }

    if (price < 0) {
      setErrorMsg("Price must not be less than 0");
      return;
    }

    const newItem = {
      id: items.length + 1,
      name,
      category,
      price
    };

    setItems([...items, newItem]);
    setErrorMsg("");

    // clear inputs
    itemName.current.value = "";
    categoryRef.current.value = "";
    priceRef.current.value = 0;
  };

  const deleteItemHandler = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  /*
   * !!! IMPORTANT !!!
   * - Implement your output based on the given sample layout.
   * - The id and className attributes below MUST be preserved.
   * - Your CSS MUST use the existing id and className selectors.
   */
  return (
    <>
      <div id="h1">Item Management</div>

      <div id="data-area">
        <table id="item-table" className="item-table">
          <thead>
            <tr>
              <th id="col-item-id">ID</th>
              <th id="col-item-name">Name</th>
              <th id="col-item-category">Category</th>
              <th id="col-item-price">Price</th>
              <th id="col-item-action">Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <img src={getCategoryIcon(item.category)} width="20" />
                </td>
                <td>{item.price}</td>
                <td>
                  <img
                    src={deleteLogo}
                    width="20"
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteItemHandler(item.id)}
                  />
                </td>
              </tr>
            ))}

            {/* FORM ROW (MUST BE LAST ROW) */}
            <tr>
              <td></td>
              <td>
                <input ref={itemName} />
              </td>
              <td>
                <select ref={categoryRef}>
                  <option value="">-- Select --</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input type="number" ref={priceRef} defaultValue={0} />
              </td>
              <td>
                <button onClick={addItemHandler}>Add Item</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="error-message">
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      </div>
    </>
  );
}

export default ItemManager;
