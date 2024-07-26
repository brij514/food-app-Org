import { createContext, useEffect, useState } from "react";
export const StoreContext = createContext(null);
import axios from "axios";


const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "https://food-app-org.onrender.com";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async(itemId) => {
    if (!cartItems[itemId]) {
      //In Cart if we are adding new element then we have to create it
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      //Already present so we just add count in already present item.
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    //By below code cart will be added to DB also
    if(token){
      console.log("Token is present")
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };
  const removeFromCart = async(itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      await axios.post(url+'/api/cart/remove',{itemId},{headers:{token}})
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async(token)=>{
            const response = await axios.post(url+'/api/cart/get',{},{headers:{token}})
            setCartItems(response.data.cartData)
  }

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
