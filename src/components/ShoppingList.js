import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/items")
    .then(res=>res.json())
    .then(data=>setItems(data))
  }, [])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleAddItem(newItem){
    setItems([...items, newItem])
  }

  function handleUpdate(updatedValue){
    const updatedItems = items.map((item)=>{
      if (item.id === updatedValue.id){
        return updatedValue;
      } else return item;
    })
    setItems(updatedItems)
  }

  function handleDeletedItem(itemID){
    const updatedList = items.filter((item)=>{
      return item.id !== itemID
    })
    setItems(updatedList)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item onItemDeleted={handleDeletedItem} onUpdate={handleUpdate} key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
