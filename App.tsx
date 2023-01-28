import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
    // 今日の日付を取得
    const today = new Date();

    const month = today.getMonth() + 1;
    const day = today.getDate();
    const weekArray = ["日", "月", "火", "水", "木", "金", "土"];
    const week = weekArray[today.getDay()];

    // 今日薬を飲んだか
    const [isTookMedicine, setIsTookMedicine] = useState(false);

    function onPressTookMedicine() {
        setIsTookMedicine(!isTookMedicine);
    }

    // アプリ起動時に今日の薬の記録を取得
    useEffect(() => {
        (async () => {
            const booleanAsString = await AsyncStorage.getItem(
                "isTookMedicine"
            );
            setIsTookMedicine(booleanAsString === "true" ? true : false);
        })();
        // 上記の括弧をつけることで即時関数を実行
    }, []);

    // AsyncStorageに記録を保存
    useEffect(() => {
        AsyncStorage.setItem("isTookMedicine", String(isTookMedicine));
    }, [isTookMedicine]);

    return (
        <View style={styles.container}>
            <Text>today</Text>
            <Text>
                {month}月{day}日({week})
            </Text>
            <Button
                onPress={onPressTookMedicine}
                title={
                    isTookMedicine
                        ? "I took my medicine today!"
                        : "take medicine"
                }
                color={isTookMedicine ? "gray" : "#841584"}
                accessibilityLabel='if you took medicine today, push this button'
            />
            <Text>{`${isTookMedicine}`}</Text>
            <StatusBar style='auto' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
