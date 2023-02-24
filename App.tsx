import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TodaysRecord } from "./components/TodaysRecord";
import { WeeklyRecord } from "./components/WeeklyRecord";

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
				{
					date: selectedDate,
					tookMedicine: !isTookMedicine, // isTookMedicineは前回の値であることに注意
					haveBleeding: isHaveBleeding,
				},
				...record.dailyRecord.slice(1),
			],
		});

		// jsonから全日数分のtrueを数える
		// タスク：これは連続で飲んだ日数を数えるよう、修正する必要がある
		const trueDays = record.dailyRecord.filter(
			(record) => record.tookMedicine === true
		).length;

		setCountDays(!isTookMedicine ? trueDays + 1 : trueDays); // isTookMedicineは前回の値であることに注意
	}

	function onPressHaveBleeding() {
		setIsHaveBleeding(!isHaveBleeding);

		setRecord({
			...record,
			dailyRecord: [
				{
					date: selectedDate,
					tookMedicine: isTookMedicine,
					haveBleeding: !isHaveBleeding,
				},
				...record.dailyRecord.slice(1),
			],
		});

		// jsonから、今日から直近で出血が何日連続しているか数える
		let count = 0;
		for (let i = 0; i < record.dailyRecord.length; i++) {
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
				const latestDailyRecord = record.dailyRecord[0];

				// アプリ起動日が、前回起動日と同日だったら、記録を取得
				if (
					latestDailyRecord.date === selectedDate // 左辺プロパティ名を取得するもの
				) {
					setIsTookMedicine(latestDailyRecord.tookMedicine);
					setIsHaveBleeding(latestDailyRecord.haveBleeding);
					setRecord(record);
				}
				// アプリ起動日が、前回起動日と異なる日だったら、前回から今日までの記録を追加
				else {
					let latestDate = new Date(latestDailyRecord.date);
					let todayDate = new Date(today);

					let lapsedRecords: Array<dailyRecordType> = [];
					// 時刻まで比較すると、左項は0時0分0秒、右項は現在時刻になることのに注意
					while (latestDate.getTime() < todayDate.getTime()) {
						latestDate.setDate(latestDate.getDate() + 1);
						lapsedRecords = [
							{
								date: getDateStrings(latestDate),
								tookMedicine: false,
								haveBleeding: false,
							},
							...lapsedRecords,
						];
					}

					setRecord({
						...record,
						dailyRecord: [...lapsedRecords, ...record.dailyRecord],
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
			<ImageBackground
				source={require("./assets/bgimage.png")}
				resizeMode='cover'
				style={styles.bgimage}>
				<View style={styles.header}></View>
				<View style={styles.contentsLayout}>
					<View style={styles.todaysRecord}>
						<TodaysRecord
							recordProps={record}
							onPressTookMedicine={onPressTookMedicine}
							onPressHaveBleeding={onPressHaveBleeding}
						/>
					</View>
					<View style={styles.weeklyRecord}>
						<WeeklyRecord recordProps={record} />
					</View>
					<View style={styles.sheetRecord}></View>
					<Text>{JSON.stringify(record)}</Text>
					{record.dailyRecord.filter(
						(rcd) => rcd.date === selectedDate
					)[0].tookMedicine ? undefined : (
						<Text>{`Today is my ${countDays}th medication.`}</Text>
					)}

					{/* for check */}
					{record.dailyRecord.filter(
						(rcd) => rcd.date === selectedDate
					)[0].tookMedicine ? (
						<Text>{`I took ${countDays} times.`}</Text>
					) : undefined}
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: "center",
	},
	bgimage: {
		flex: 1,
		// justifyContent: "center",
	},
	header: {
		height: 47,
		width: 47,
		alignSelf: "flex-start",
		backgroundColor: "gray",
		marginTop: 25,
		marginHorizontal: 16,
	},
	contentsLayout: {
		flex: 1,
		marginTop: 16,
		marginHorizontal: 16,
		justifyContent: "center",
		alignItems: "center",
		gap: 16,
		flexWrap: "wrap",
		alignContent: "flex-start",
	},
	todaysRecord: {
		height: 182,
		width: 243,
		marginBottom: 32,
		backgroundColor: "white",
		borderRadius: 32,
	},
	weeklyRecord: {
		height: 126,
		width: 330,
		marginBottom: 24,
		backgroundColor: "#63769C",
		borderRadius: 18,
	},
	sheetRecord: {
		height: 196,
		width: 330,
		backgroundColor: "#63769C",
		borderRadius: 18,
	},
	// dateText: {
	// 	fontSize: 40,
	// 	// lineHeight: 50,
	// 	borderBottomColor: "black",
	// 	borderBottomWidth: 1,
	// },
});
