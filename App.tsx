import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Buttons } from "./components/Buttons";
import { DateList } from "./components/DateList";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
    type recordType = {
        [key: string]: {
            tookMedicine: Boolean;
            haveBleeding: Boolean;
        };
    };

    // 今日の日付を取得
    const today = new Date();

    const month = today.getMonth() + 1;
    const day = today.getDate();
    const weekArray = ["日", "月", "火", "水", "木", "金", "土"];
    const week = weekArray[today.getDay()];

    type datePropertyNameType = (selectedDate: Date) => string;
    const datePropertyName: datePropertyNameType = (selectedDate) => {
        const offset = selectedDate.getTimezoneOffset();
        selectedDate = new Date(selectedDate.getTime() - offset * 60 * 1000);
        return selectedDate.toISOString().split("T")[0];
    };

    // 薬を飲み始めて何日目か
    const [countDays, setCountDays] = useState<number>(0);

    // 今日薬を飲んだか
    const [isTookMedicine, setIsTookMedicine] = useState(false);
    // 今日出血があったか
    const [isHaveBleeding, setIsHaveBleeding] = useState(false);

    // const d = `${month}-${day}-${week}`;
    const d = datePropertyName(today);

    const [selectedDatePropertyName, setSelectedDatePropertyName] =
        useState<string>(d);

    const [dailyRecord, setDailyRecord] = useState<recordType>({
        [selectedDatePropertyName]: {
            tookMedicine: false,
            haveBleeding: false,
        },
    });

    function onPressTookMedicine() {
        setIsTookMedicine(!isTookMedicine);
        setDailyRecord({
            ...dailyRecord,
            // 今日の記録だけ更新
            [selectedDatePropertyName]: {
                tookMedicine: !isTookMedicine, // この時点でisTookMedicineはsetStateされていないことに注意
                haveBleeding: isHaveBleeding, // 変更なし
            },
        });
        // let trueDays = dailyRecord.filter(
        //     (record: eachDayRecordType) => record.tookMedicine === true
        // ).length;
        const asArray = Object.entries(dailyRecord);

        const trueDays = asArray.filter(
            ([key, value]) => value.tookMedicine === true
        ).length;

        // jsonから全日数分のtrueを数える
        setCountDays(
            !isTookMedicine ? trueDays + 1 : trueDays // この時点でisTookMedicineはsetStateされていないことに注意
        );
    }

    function onPressHaveBleeding() {
        setIsHaveBleeding(!isHaveBleeding);
        setDailyRecord({
            ...dailyRecord,
            [selectedDatePropertyName]: {
                tookMedicine: isTookMedicine,
                haveBleeding: !isHaveBleeding,
            },
        });
        // jsonから今日から直近でtrueで何日連続しているか数える
        setCountDays(4);
    }

    // AsyncStorageから記録を取得
    useEffect(() => {
        (async () => {
            const recordAsString: string | null = await AsyncStorage.getItem(
                "record"
            );
            // AsyncStorageに記録がないので、デフォルトのdailyRecordを利用する
            if (recordAsString === null) {
            }
            // AsyncStorageから記録取得、stateにsetする
            else {
                const record = JSON.parse(recordAsString);
                const latestProperty = Object.keys(record).at(-1); // 最後のプロパティ名を取得
                const latestRecord =
                    record[latestProperty as keyof typeof record];

                // アプリ起動日が、前回起動日と同日だったら、記録を取得
                if (
                    latestRecord.day === day // 左辺プロパティ名を取得するもの
                ) {
                    setIsTookMedicine(latestRecord.tookMedicine);
                    setIsHaveBleeding(latestRecord.haveBleeding);
                    setDailyRecord(record);
                }
                // アプリ起動日が、前回起動日と異なる日だったら、前回から今日までの記録を追加
                else {
                    const latestDate = new Date(
                        latestRecord.year,
                        latestRecord.month,
                        latestRecord.day
                    );
                    let lapsedRecord = {};
                    // 時刻まで比較すると、左項は0時0分0秒、右項は現在時刻になることのに注意
                    while (latestDate.getTime() < today.getTime()) {
                        latestDate.setDate(latestDate.getDate() + 1);
                        latestRecord.concat({
                            month: latestDate.getMonth(),
                            day: latestDate.getDate(),
                            week: weekArray[latestDate.getDay()],
                            tookMedicine: false,
                        });
                    }

                    setDailyRecord({
                        ...record,
                        [selectedDatePropertyName]: {
                            tookMedicine: false,
                            haveBleeding: false,
                        },
                    });
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
            <DateList />
            <Text
                style={
                    styles.dateText
                }>{`today is ${month}月${day}日(${week})`}</Text>

            <Text>{JSON.stringify(dailyRecord)}</Text>
            <Text>{selectedDatePropertyName}</Text>

            {dailyRecord[selectedDatePropertyName]?.tookMedicine ? undefined : (
                <Text>{`Today is my ${countDays}th medication.`}</Text>
            )}

            {dailyRecord[selectedDatePropertyName]?.tookMedicine ? (
                <Text>{`I took ${countDays} times.`}</Text>
            ) : undefined}

            <Buttons
                onPressTookMedicine={onPressTookMedicine}
                onPressHaveBleeding={onPressHaveBleeding}
                isTookMedicine={isTookMedicine}
            />

            <StatusBar style='auto' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: "center",
        justifyContent: "center",
        // marginTop: 50,
        // marginBottom: 500,
    },
    dateText: {
        fontSize: 40,
        // lineHeight: 50,
        borderBottomColor: "black",
        borderBottomWidth: 1,
    },
});
