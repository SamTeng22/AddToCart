import { FlatList, Text, TouchableOpacity, View, Image } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { useCart } from "./context/CartContext";

const FOOD = [
    { id: "1", productName: "Chocolate Cake", description: "A chocolate cake", price: 400, image: "chocolate_cake"},
    { id: "2", productName: "Blueberry Cheesecake", description: "A blueberry cheesecake", price: 550, image: "blueberry_cheesecake"},
    { id: "3", productName: "Red Velvet Cake", description: "A red velvet cake", price: 500, image: "red_velvet_cake"},
    { id: "4", productName: "Ube Cake", description: "An ube cake", price: 450, image: "ube_cake"},
]

const images = {
  chocolate_cake: require("../assets/chocolate_cake.png"),
  blueberry_cheesecake: require("../assets/blueberry_cheesecake.png"),
  ube_cake: require("../assets/ube_cake.png"),
  red_velvet_cake: require("../assets/red_velvet_cake.png"),
};

const ProductCard = ({ item }) => {
    const { addToCart, removeFromCart, getQuantity} = useCart();
    const quantity = getQuantity(item.id);
    return (
        <View className="bg-white rounded-xl border border-amber-100 flex-1 m-1 overflow-auto">
            <View className="bg-red-50 h-28 items-center justify-center">
                <Image
                    source={images[item.image]}
                    className="w-full h-full rounded-lg"
                    resizeMode="cover"
                />
            </View>
            <View className="p-2.5">
                <Text className="text-amber-950 font-medium text-xs">{item.productName}</Text>
                <Text className="text-gray-400 text-xs mb-2">{item.description}</Text>
                <View className="flex-row justify-between items-center">
                    <Text className="text-amber-950 font-medium text-sm">₱{item.price.toLocaleString()}</Text>
                    {quantity === 0 ? (
                        <TouchableOpacity 
                            className="bg-amber-950 rounded-md w-6 h-6 items-center justify-center"
                            onPress={() => addToCart(item)}
                        >
                            <Text className="text-amber-50 text-base leading-tight">+</Text>
                        </TouchableOpacity>
                    ) : (
                        <View className="flex-row items-center gap-2">
                            <TouchableOpacity
                                className="bg-amber-950 rounded-md w-6 h-6 items-center justify-center"
                                onPress={() => removeFromCart(item.id)}
                            >
                                <Text className="text-amber-50 text-base leading-tight">-</Text>
                            </TouchableOpacity>
                            <Text className="text-amber-950 font-medium text-sm">{quantity}</Text>
                            <TouchableOpacity 
                                className="bg-amber-950 rounded-md w-6 h-6 items-center justify-center"
                                onPress={() => addToCart(item)}
                            >
                                <Text className="text-amber-50 text-base leading-tight">+</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </View>
    )

};

export default function HomeScreen() {
    const navigation = useNavigation();
    const { totalItems } = useCart();
    return(
        <View className="flex-1 bg-white">
            <View className="bg-amber-950 px-4 pt-8 flex-row justify-between items-center">
                <Text className="text-amber-50 text-xl font-medium">Cake Shop</Text>
                <TouchableOpacity
                    className="flex-row items-center gap-1.5 bg-amber-50/10 border border-amber-50/25 rounded-lg px-3 py-1.5 m-3"
                    onPress={() => navigation.navigate("Cart")}
                >
                    <Text className="text-amber-50 text-xs">Cart</Text>
                    {totalItems > 0 && (
                        <View className="bg-red-600 rounded-full w-5 h-5 items-center justify-center">
                            <Text className="text-white text-xs">{totalItems}</Text>
                         </View>
                    )}
                </TouchableOpacity>
            </View>
            <Text className="text-gray-700 font-bold px-4 pt-3 pb-1.5">Featured</Text>
            <FlatList
                data={FOOD}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 16}}
                renderItem={({ item}) => (
                    <ProductCard
                        item={item}
                    />
                )}
            />
        </View>
    )
}