import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, Text, View } from "react-native";
import React, { useState } from "react";

export default function App() {
    const today = new Date();

    const month = today.getMonth() + 1;
    const day = today.getDate();
    const weekArray = ["日", "月", "火", "水", "木", "金", "土"];
    const week = weekArray[today.getDay()];

    const [isTookMedicine, setIsTookMedicine] = useState(false);

    function onPressTookMedicine() {
        setIsTookMedicine(!isTookMedicine);
    }
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
                        ? "I took my medicine today."
                        : "take medicine"
                }
                color={isTookMedicine ? "gray" : "#841584"}
                accessibilityLabel='if you took medicine, push this button'
            />
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
