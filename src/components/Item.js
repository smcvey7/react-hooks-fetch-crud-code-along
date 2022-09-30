import React from "react";

function Item({ item, onUpdate, onItemDeleted }) {

  function handleAddToCartClick(){
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
    .then(res=>res.json())
    .then(updatedItem=>onUpdate(updatedItem))
  }

  function handleDelete(){
    fetch(`http://localhost:4000/items/${item.id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
      }
    })
    .then(r=>r.json())
    .then(()=>onItemDeleted(item.id))
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button onClick={handleAddToCartClick} className={item.isInCart ? "remove" : "add"}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button onClick={handleDelete} className="remove">Delete</button>
    </li>
  );
}

export default Item;
