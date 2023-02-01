import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, Text, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
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

    const [dailyRecord, setDailyRecord] = useState([
        {
            month: month,
            day: day,
            week: week,
            tookMedicine: false,
        },
    ]);

    function onPressTookMedicine() {
        setIsTookMedicine(!isTookMedicine);
        setDailyRecord([
            ...dailyRecord.slice(0, dailyRecord.length - 1),
            // 今日の記録だけ更新
            {
                month: month,
                day: day,
                week: week,
                tookMedicine: !isTookMedicine, // この時点でisTookMedicineはsetStateされていないことに注意
            },
        ]);
        // jsonから全日数分のtrueを数える
        setCountDays(
            dailyRecord.filter((record) => record.tookMedicine === !true).length // この時点でisTookMedicineはsetStateされていないことに注意
        );
    }

    // 薬を飲み始めて何日目か
    const [countDays, setCountDays] = useState<number>(0);

    // AsyncStorageから記録を取得
    useEffect(() => {
        (async () => {
            const recordAsString: string | null = await AsyncStorage.getItem(
                "record"
            );
            // AsyncStorageに記録がないので、デフォルトのdailyRecordを利用する
            if (recordAsString === null) {
            }
            //
            else {
                const record = JSON.parse(recordAsString);
                const latestRecord = record.at(-1); // 最後の要素を取得

                // アプリ起動日が、前回起動日と同日だったら、記録を取得
                if (latestRecord.day === day) {
                    setIsTookMedicine(latestRecord.tookMedicine);
                    setDailyRecord(record);
                }
                // アプリ起動日が、前回起動日と異なる日だったら、今日の記録を追加
                else {
                    setDailyRecord([
                        ...record,
                        {
                            month: month,
                            day: day,
                            week: week,
                            tookMedicine: false,
                        },
                    ]);
                }
            }
        })();
        // 上記の括弧をつけることで即時関数を実行
    }, []);

    // AsyncStorageに記録を保存
    useEffect(() => {
        AsyncStorage.setItem("record", JSON.stringify(dailyRecord));
    }, [dailyRecord]);

    // 注意！AsyncStorageを初期化
    // useEffect(() => {
    //     (async () => {
    //         await AsyncStorage.clear();
    //     })();
    // }, []);

    return (
        <View style={styles.container}>
            <Text
                style={
                    styles.dateText
                }>{`today is ${month}月${day}日(${week})`}</Text>

            <Text>{JSON.stringify(dailyRecord)}</Text>

            {dailyRecord[dailyRecord.length - 1].tookMedicine ? undefined : (
                <Text>{`Today is my ${countDays}th medication.`}</Text>
            )}

            {/* <View style={styles.separator} /> */}

            <Button
                onPress={onPressTookMedicine}
                title={
                    isTookMedicine
                        ? "I took my medicine today!"
                        : "take medicine"
                }
                color={isTookMedicine ? "gray" : "#F7CCBF"} //#f49da5
                accessibilityLabel='if you took medicine today, push this button'
            />
            {dailyRecord[dailyRecord.length - 1].tookMedicine ? (
                <Text>{`I took ${countDays} times.`}</Text>
            ) : undefined}
            <Button
                // onPress={}
                title='have bleeding'
                color='#f18690'
                accessibilityLabel='if you have some bleeding or spotting, push this button'
            />

            <StatusBar style='auto' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#DDE5FC",
        alignItems: "center",
        justifyContent: "center",
    },
    dateText: {
        fontSize: 40,
        // lineHeight: 50,
        borderBottomColor: "black",
        borderBottomWidth: 1,
    },
});
