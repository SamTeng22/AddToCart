import { createContext, useContext, useState, useEffect } from "react";
import { storeData, getData } from "../../utils/storage"
const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([])
    console.log(getData);
    console.log(storeData);

    useEffect(() => {
        const loadCart = async () => {
            try {
                const savedCart = await getData("cart");
                if (savedCart) {
                    setCart(savedCart);
                }
            } catch (error) {
                console.log("Failed to load cart:", error);
            }
        };

        loadCart();
    }, []);

    useEffect(() => {
        storeData("cart", cart);
    }, [cart]);

   
    const addToCart = (item) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if(existing) {
                return prev.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                )
            }
            return [...prev, {...item, quantity: 1}]
        });
    };

    const removeFromCart = (itemId) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.id === itemId);
            if(existing?.quantity === 1) {
                return prev.filter((i) => i.id !== itemId);
            }
            return prev.map((i) => 
                i.id === itemId? {...i, quantity: i.quantity - 1} : i
            );
        });
    };

    const getQuantity = (itemId) => {
        return cart.find((i) => i.id === itemId)?.quantity || 0;
    };

    const totalItems = cart.reduce((sum,i) => sum + i.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, getQuantity, totalItems}}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}