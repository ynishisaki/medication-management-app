import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Buttons } from "./components/Buttons";
import { DateList } from "./components/DateList";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface recordType {
	startDate: string;
	dailyRecord: dailyRecordType[]; // task: ここは複数の要素を持つ配列にしたい
}

export interface dailyRecordType {
	date: string;
	tookMedicine: boolean;
	haveBleeding: boolean;
}

export type getDateStringsType = (selectedDate: Date) => string;

export default function App() {
	function showDate(dateStrings: string) {
		const date = new Date(dateStrings);

		const day = date.getDate();
		const week = date.getDay();
		const weekArr = ["日", "月", "火", "水", "木", "金", "土"];

		return `${day}(${weekArr[week]})`;
	}

	function getDateStrings(selectedDate: Date) {
		const offset = selectedDate.getTimezoneOffset();
		selectedDate = new Date(selectedDate.getTime() - offset * 60 * 1000);

		return selectedDate.toISOString().split("T")[0];
	}

	const today = getDateStrings(new Date()); // YYYY-DD-MM

	const [selectedDate, setselectedDate] = useState<string>(today);

	// 薬を飲み始めて何日目か
	const [countDays, setCountDays] = useState<number>(0);
	const [countBleedingDays, setCountBleedingDays] = useState<number>(0);

	// 今日薬を飲んだか
	const [isTookMedicine, setIsTookMedicine] = useState(false);
	// 今日出血があったか
	const [isHaveBleeding, setIsHaveBleeding] = useState(false);

	const [record, setRecord] = useState<recordType>({
		startDate: today,
		dailyRecord: [
			{
				date: selectedDate,
				tookMedicine: false,
				haveBleeding: false,
			},
		],
	});

	function onPressTookMedicine() {
		setIsTookMedicine(!isTookMedicine);

		setRecord({
			...record,
			dailyRecord: [
				...record.dailyRecord, // task　今日の記録だけ更新したい。これでOK?
				{
					date: selectedDate,
					tookMedicine: !isTookMedicine, // isTookMedicineは前回の値であることに注意
					haveBleeding: isHaveBleeding,
				},
			],
		});

		//jsonから全日数分のtrueを数える;
		const asArray = Object.entries(record);
		const trueDays = asArray.filter(
			([key, value]) => value.tookMedicine === true
		).length;

		setCountDays(!isTookMedicine ? trueDays + 1 : trueDays); // isTookMedicineは前回の値であることに注意
	}

	function onPressHaveBleeding() {
		setIsHaveBleeding(!isHaveBleeding);

		setRecord({
			...record,
			dailyRecord: [
				...record.dailyRecord,
				{
					date: selectedDate,
					tookMedicine: isTookMedicine,
					haveBleeding: !isHaveBleeding,
				},
			],
		});

		// jsonから、今日から直近で出血が何日連続しているか数える
		let count = 0;
		for (let i = record.dailyRecord.length - 1; i > -1; i--) {
			if (record.dailyRecord[i].haveBleeding === true) {
				count++;
			} else {
				break;
			}
		}
		setCountBleedingDays(!isHaveBleeding ? count + 1 : 0);
	}

	// AsyncStorageから記録を取得
	useEffect(() => {
		(async () => {
			const recordAsString: string | null = await AsyncStorage.getItem(
				"record"
			);
			// AsyncStorageに記録がないので、デフォルトのrecordを利用する
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
					latestRecord.day === selectedDate.slice() // 左辺プロパティ名を取得するもの
				) {
					setIsTookMedicine(latestRecord.tookMedicine);
					setIsHaveBleeding(latestRecord.haveBleeding);
					setRecord(record);
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
					// while (latestDate.getTime() < today.getTime()) {
					//     latestDate.setDate(latestDate.getDate() + 1);
					//     latestRecord.concat({
					//         month: latestDate.getMonth(),
					//         day: latestDate.getDate(),
					//         week: weekArray[latestDate.getDay()],
					//         tookMedicine: false,
					//     });
					// }

					setRecord({
						...record,
						[selectedDate]: {
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
		AsyncStorage.setItem("record", JSON.stringify(record));
	}, [record]);

	// 注意！AsyncStorageを初期化
	// useEffect(() => {
	//     (async () => {
	//         await AsyncStorage.clear();
	//     })();
	// }, []);

	return (
		<View style={styles.container}>
			<DateList record={record} />
			<Text style={styles.dateText}>{selectedDate}</Text>

			<Text>{JSON.stringify(record)}</Text>

			<Text>{showDate(selectedDate)}</Text>

			{record.dailyRecord.filter((rcd) => rcd.date === selectedDate)[0]
				.tookMedicine ? undefined : (
				<Text>{`Today is my ${countDays}th medication.`}</Text>
			)}

			{record.dailyRecord.filter((rcd) => rcd.date === selectedDate)[0]
				.tookMedicine ? (
				<Text>{`I took ${countDays} times.`}</Text>
			) : undefined}

			<Buttons
				onPressTookMedicine={onPressTookMedicine}
				onPressHaveBleeding={onPressHaveBleeding}
				isTookMedicine={isTookMedicine}
			/>

			<Text>{countBleedingDays}</Text>
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
