import React, { useState } from "react";
import { menu_list } from "../../assets/assets.js";
import "./ExploreMenu.css";
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit,
        obcaecati mollitia ipsa aspernatur deserunt quaerat doloribus possimus
        blanditiis repellat quidem distinctio doloremque praesentium libero et
        nostrum atque aliquid! Corrupti quo laboriosam voluptatem modi? Illo
        veniam excepturi sint nam, minima corporis. Natus, voluptatum quibusdam.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="explore-menu-list-item"
            >
              <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
