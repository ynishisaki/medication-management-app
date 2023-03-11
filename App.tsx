import { ImageBackground, StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MenuIcon } from "./src/atoms/Icons";
import { TodaysRecord } from "./src/layouts/TodaysRecord";
import { WeeklyRecord } from "./src/layouts/WeeklyRecord";
import { CurrentSheet } from "./src/layouts/CurrentSheet";
import { atom, RecoilRoot, selector, useRecoilState } from "recoil";

export type recordType = {
	initialSheetSettings: initialSheetSettingsType;
	dailyRecord: Array<dailyRecordType>;
};

export interface initialSheetSettingsType {
	numOfPillsPerSheet: number;
	beginSheetIndex: number;
}

export interface dailyRecordType {
	date: string;
	tookMedicine: boolean;
	haveBleeding: boolean;
}

export type getDateStringsType = (selectedDate: Date) => string;

function getDateStrings(selectedDate: Date) {
	const offset = selectedDate.getTimezoneOffset();
	selectedDate = new Date(selectedDate.getTime() - offset * 60 * 1000);

	return selectedDate.toISOString().split("T")[0];
}

const today = getDateStrings(new Date()); // YYYY-DD-MM

export const recordState = atom({
	key: "1", // unique ID (with respect to other atoms/selectors)
	default: {
		initialSheetSettings: {
			numOfPillsPerSheet: 24,
			beginSheetIndex: 1,
		},
		dailyRecord: [
			{
				date: today,
				tookMedicine: false, // 今日薬を飲んだか
				haveBleeding: false, // 今日出血があったか
			},
		],
	},
});

export default function App() {
	return (
		<RecoilRoot>
			<AppHome />
		</RecoilRoot>
	);
}

function AppHome() {
	const [record, setRecord] = useRecoilState<recordType>(recordState);

	// AsyncStorageから記録を取得
	useEffect(() => {
		(async () => {
			const storedRecordAsString: string | null =
				await AsyncStorage.getItem("record");
			// AsyncStorageに記録がないので、デフォルトのrecordを利用する
			if (storedRecordAsString === null) {
			}
			// AsyncStorageから記録取得、stateにsetする
			else {
				const storedRecord = JSON.parse(storedRecordAsString);
				const latestDailyRecord = storedRecord.dailyRecord[0];

				// アプリ起動日が、前回起動日と同日の場合
				if (latestDailyRecord.date === today) {
					setRecord({
						...storedRecord,
					});
				}

				// アプリ起動日が、前回起動日と異なる日だったら、前回から今日までの記録を追加
				else {
					let latestDate = new Date(latestDailyRecord.date);
					let todayDate = new Date(today);

					let lapsedDailyRecords: Array<dailyRecordType> = [];
					// 時刻まで比較すると、左項は0時0分0秒、右項は現在時刻になることに注意
					while (latestDate.getTime() < todayDate.getTime()) {
						latestDate.setDate(latestDate.getDate() + 1);
						lapsedDailyRecords = [
							{
								date: getDateStrings(latestDate),
								tookMedicine: false,
								haveBleeding: false,
							},
							...lapsedDailyRecords,
						];
					}

					setRecord({
						...storedRecord,
						dailyRecord: [
							...lapsedDailyRecords,
							...storedRecord.dailyRecord,
						],
					});
				}
			}
		})();
		// 上記の括弧をつけることで即時関数を実行
	}, []);

	// AsyncStorageに記録を保存
	useEffect(() => {
		AsyncStorage.setItem("record", JSON.stringify(record));
		console.log("stored");
	}, [record]);

	// 注意！AsyncStorageを初期化
	// useEffect(() => {
	// 	(async () => {
	// 		await AsyncStorage.clear();
	// 	})();
	// }, []);

	// for check
	console.log(JSON.stringify(record));
	console.log();

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
						<TodaysRecord />
					</View>
					<View style={styles.weeklyRecord}>
						<WeeklyRecord />
					</View>
					<View style={styles.sheetRecord}>
						<CurrentSheet />
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
