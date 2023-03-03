import { ImageBackground, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MenuIcon } from "./components/Icons";
import { TodaysRecord } from "./components/TodaysRecord";
import { WeeklyRecord } from "./components/WeeklyRecord";
import { CurrentSheet } from "./components/CurrentSheet";

export type recordType = Array<dailyRecordType>;

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

	// 薬を飲み始めて何日目か
	let countDays = 0;
	let countBleedingDays = 0;

	const [record, setRecord] = useState<recordType>([
		{
			date: today,
			tookMedicine: false, // 今日薬を飲んだか
			haveBleeding: false, // 今日出血があったか
		},
	]);

	function onPressTookMedicine() {
		setRecord([
			{
				...record[0],
				tookMedicine: !record[0].tookMedicine, // isTookMedicineは前回の値であることに注意
			},
			...record.slice(1),
		]);

		// jsonから全日数分のtrueを数える
		// タスク：これは連続で飲んだ日数を数えるよう、修正する必要がある
		const trueDays = record.dailyRecord.filter(
			(record) => record.tookMedicine === true
		).length;

		countDays = !record.dailyRecord[0].tookMedicine
			? trueDays + 1
			: trueDays; // isTookMedicineは前回の値であることに注意
	}

	function onPressHaveBleeding() {
		setRecord({
			...record,
			dailyRecord: [
				{
					...record.dailyRecord[0],
					haveBleeding: !record.dailyRecord[0].haveBleeding,
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
		countBleedingDays = !record.dailyRecord[0].haveBleeding ? count + 1 : 0;
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
					latestDailyRecord.date === today // 左辺プロパティ名を取得するもの
				) {
					setRecord({
						...record,
						dailyRecord: [
							{
								...record.dailyRecord[0],
								tookMedicine: latestDailyRecord.tookMedicine,
								haveBleeding: latestDailyRecord.haveBleeding,
							},
							...record.dailyRecord.slice(1),
						],
					});
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

	// for check
	console.log(JSON.stringify(record));
	console.log("countDays: " + countDays);
	console.log("countBleedingDays: " + countBleedingDays);

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require("./assets/bgimage.png")}
				resizeMode='cover'
				style={styles.bgimage}>
				<View style={styles.header}>
					<MenuIcon />
				</View>
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
					<View style={styles.sheetRecord}>
						<CurrentSheet
							countDays={countDays}
							recordProps={record}
						/>
					</View>
				</View>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bgimage: {
		flex: 1,
	},
	header: {
		height: 47,
		width: 47,
		alignSelf: "flex-start",
		// backgroundColor: "gray",
		marginTop: 25,
		marginHorizontal: 16,
	},
	contentsLayout: {
		flex: 1,
		marginTop: 16,
		marginHorizontal: 16,
		justifyContent: "center",
		alignItems: "center",
		flexWrap: "wrap",
		alignContent: "flex-start",
	},
	todaysRecord: {
		height: 200,
		width: 260,
		marginBottom: 32,
		backgroundColor: "white",
		borderRadius: 40,
	},
	weeklyRecord: {
		height: 150,
		width: 330,
		marginBottom: 24,
		backgroundColor: "#63769C",
		borderRadius: 16,
	},
	sheetRecord: {
		height: 196,
		width: 330,
		backgroundColor: "#63769C",
		borderRadius: 16,
	},
	// dateText: {
	// 	fontSize: 40,
	// 	// lineHeight: 50,
	// 	borderBottomColor: "black",
	// 	borderBottomWidth: 1,
	// },
});
