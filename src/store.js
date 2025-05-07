import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set) => ({
    theme: null,
    setTheme: (newTheme) => set(() => ({theme: newTheme})),
    viewDetails: null,
    setViewDetails: (newDetails) => set(() => ({viewDetails: newDetails})),
    categoryData: [],
    setCategoryData: (newCategory) => set(() => ({categoryData: newCategory})),
    categoryIndex: null,
    setCategoryIndex: (newIndex) => set(() => ({categoryIndex: newIndex})),
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    setNewCart: (data) => set((store)=>{
        
       const existingItem = store.cart.find((i) => i.id === data.id)

        if (existingItem) {
          // If item exists, increase quantity
          return {
            cart: store.cart.map((i) =>
              i.id === data.id ? { ...i, quantity: i.quantity + data.quantity } : i
            ),
          };
        } 
        else {
          return {
            cart: [...store.cart, data],
          };
        }
      }),
      removeCart: (id) => set((store)=> ({cart: store.cart.filter((item)=> item.id !== id)})),
      clearCart: ()=> set(() => ({cart: []})),
      isOrderFromCart: JSON.parse(localStorage.getItem("isOrderFromCart")) || false,
      setIsOrderFromCart: (value)=> set(()=> ({isOrderFromCart: value})),
      checkoutData: JSON.parse(localStorage.getItem("checkoutData")) || [0,0,0,0],
      clearCheckoutData: ()=> set(() => ({checkoutData: [0, 0, 0, 0]})),
      setCheckoutData: (newCheckoutData) => set(() => ({checkoutData: newCheckoutData}))
})

export const useStore = create(devtools(store))