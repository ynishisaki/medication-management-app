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

    // 薬を飲み始めて何日目か
    const [countDays, setCountDays] = useState(0);
    // jsonから全日数分のtrueを数える
    // setCountDays();

    let todayRecord = {
        month: month,
        day: day,
        week: week,
        isTookMedicine: isTookMedicine,
    };

    // let allDaysRecord = {
    //     countDays: 2,
    //     dailyRecord: [todayRecord],
    // };
    // アプリ起動時にAsyncStorageから記録を取得
    // アプリ起動時に、前回から日付が変わっていたら、今日の記録を追加

    // AsyncStorageから記録を取得
    useEffect(() => {
        (async () => {
            const recordAsString: string | null = await AsyncStorage.getItem(
                "record"
            );
            // AsyncStorageに記録がないので、新規作成
            if (recordAsString === null) {
                setIsTookMedicine(false);
                setCountDays(0);

                const record = {
                    countDays: 0,
                    dailyRecord: [todayRecord],
                };

                AsyncStorage.setItem("record", JSON.stringify(record));
            }
            //
            else {
                const record = JSON.parse(recordAsString);

                const latestRecord = record["dailyRecord"].at(-1);
                //

                // アプリ起動日が、前回起動日と同日だったら、記録を取得
                if (record.day === day) {
                    setIsTookMedicine(
                        record.isTookMedicine === "true" ? true : false
                    );
                } // アプリ起動が、前回起動日と異なる日だったら、記録を新規作成
                else {
                    setIsTookMedicine(false);
                    setCountDays(record.countDays + 1);
                }
            }
        })();
        // 上記の括弧をつけることで即時関数を実行
    }, []);

    // AsyncStorageに記録を保存
    useEffect(() => {
        AsyncStorage.setItem("record", JSON.stringify(todaysRecord));
        // AsyncStorage.setItem("isTookMedicine", String(isTookMedicine));
    }, [isTookMedicine]);

    return (
        <View style={styles.container}>
            <Text>today</Text>
            <Text>
                {month}月{day}日({week})
            </Text>
            {/* {isTookMedicine ? undefined : (
                <Text>{`Today is my ${countDays}th medication.`}</Text>
            )} */}
            <Text>{``}</Text>
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
            {/* {isTookMedicine ? (
                <Text>{`I took ${countDays} times.`}</Text>
            ) : undefined} */}
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
