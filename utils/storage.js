import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
    try {
        const strVal = JSON.stringify(value);
        await AsyncStorage.setItem(key, strVal);
    } catch (error) {
        console.log("Store error:", error);
    }
};

export const getData = async (key) => {
    try {
        const strVal = await AsyncStorage.getItem(key);
        return strVal !== null ? JSON.parse(strVal) : null;
    } catch (error) {
        console.log("Get error:", error);
    }
};