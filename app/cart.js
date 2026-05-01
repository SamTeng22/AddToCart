import { FlatList, Text, TextInput, TouchableOpacity, View, Image, Touchable } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { useCart } from "./context/CartContext";
import { useState, useEffect } from "react";

const images = {
  chocolate_cake: require("../assets/chocolate_cake.png"),
  blueberry_cheesecake: require("../assets/blueberry_cheesecake.png"),
  ube_cake: require("../assets/ube_cake.png"),
  red_velvet_cake: require("../assets/red_velvet_cake.png"),
};

const CartCard = ({ item }) => {
    const { addToCart, removeFromCart, getQuantity} = useCart();
    const quantity = getQuantity(item.id);
    return (
        <View className="flex-row bg-white rounded-xl border border-amber-800 mx-4 my-1.5 overflow-auto">
            <Image
                source={images[item.image]}
                className="w-24 h-24"
                resizeMode="cover"
            />
            <View className="flex-1 p-3 justify-between">
                <View>
                    <Text className="text-amber-950 font-medium text-sm">{item.productName}</Text>
                    <Text className="text-gray-400 text-xs mt-0.5">₱{item.price.toLocaleString()}</Text>
                </View>
                <View className="flex-row justify-between items-center">
                    <Text className="text-amber-950 font-medium text-sm">
                        ₱{(item.price * item.quantity).toLocaleString()}
                    </Text>
                    <View className="flex-row items-center gap-2">
                        <TouchableOpacity
                            className="bg-amber-950 rounded-md w-6 h-6 items-center justify-center"
                            onPress={() => removeFromCart(item.id)}
                        >
                            <Text className="text-amber-50 text-base leading-tight">-</Text>
                        </TouchableOpacity>
                        <Text className="text-amber-950 font-medium text-sm">{item.quantity}</Text>
                        <TouchableOpacity 
                            className="bg-amber-950 rounded-md w-6 h-6 items-center justify-center"
                            onPress={() => addToCart(item)}
                        >
                            <Text className="text-amber-50 text-base leading-tight">+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default function CartScreen() {
    const navigation = useNavigation();
    const { cart, totalItems } = useCart();
    const [ voucherCode, setVoucherCode ] = useState("");

    const baseTotal= cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = voucherCode === "discount10" ? baseTotal*0.1 : 0; 
    const totalPrice = baseTotal - discount;

    return(
        <View className="flex-1 bg-white">
            <View className="bg-amber-950 px-4 pt-8 flex-row items-center gap-3">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-3">
                    <Text className="text-amber-50 text-lg">←</Text>
                </TouchableOpacity>
                <Text className="text-amber-50 text-xl font-medium">Cart {totalItems > 0 && `(${totalItems})`}</Text>
            </View>
            {cart.length === 0 ? (
                <View className="flex-1 items-center justify-center">
                    <Text className="text-gray-400 text-base">Your cart is empty</Text>
                    <TouchableOpacity
                        className="mt-4 bg-amber-950 px-6 py-2.5 rounded-xl"
                        onPress={() => navigation.goBack()}
                    >
                        <Text className="text-amber-50 font-medium">Browse items</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <FlatList
                        data={cart}
                        keyExtractor={(item)=>item.id}
                        contentContainerStyle={{paddingVertical: 12}}
                        renderItem={({ item}) => <CartCard item={item} />}
                    />
                    <View className="bg-white px-4 pb-3">
                        <Text className="text-amber-950 text-sm">Enter Voucher Code</Text>
                        <TextInput 
                            value={voucherCode}
                            onChangeText={setVoucherCode}
                            placeholder="Voucher Code"
                            className="border p-2 rounded w-full"
                        />
                    </View>
                    <View className="bg-white border-t border-amber-800 px-4 pt-3 pb-6">
                        <View className="flex-row justify-between mb-1">
                            <Text className="text-gray-500 text-sm">Subtotal</Text>
                            <Text className="text-amber-950 text-sm">₱{baseTotal.toLocaleString()}</Text>
                        </View>
                        <View className="flex-row justify-between mb-1">
                            <Text className="text-gray-500 text-sm">Discount</Text>
                            <Text className="text-amber-950 text-sm">₱{discount.toLocaleString()}</Text>
                        </View>
                        <View className="flex-row justify-between mb-4">
                            <Text className="text-amber-950 font-medium">Total</Text>
                            <Text className="text-amber-950 font-bold text-lg">₱{totalPrice.toLocaleString()}</Text>
                        </View>
                        <TouchableOpacity className="bg-amber-950 rounded-xl py-3 items-center">
                            <Text className="text-amber-50 font-medium text-base">Place order</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </View>
    );
}