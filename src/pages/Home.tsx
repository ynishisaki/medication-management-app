import { ImageBackground, StyleSheet, View } from "react-native";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getDateStrings, recordState, today } from "../../App";
import { MenuIcon } from "../atoms/Icons";
import { TodaysRecord } from "../organisms/TodaysRecord";
import { WeeklyRecord } from "../organisms/WeeklyRecord";
import { CurrentSheet } from "../organisms/CurrentSheet";
import { dailyRecordType, recordType } from "../types/types";

export const Home = ({ navigation }: { navigation: any }) => {
	const [record, setRecord] = useRecoilState<recordType>(recordState);

	// AsyncStorageから記録を取得
	useEffect(() => {
		(async () => {
			const storedRecordAsString: string | null =
				await AsyncStorage.getItem("record");
			// AsyncStorageに記録がないので、デフォルトのrecordを利用する
			if (storedRecordAsString === null) {
				setRecord((oldRecord) => ({
					...oldRecord,
					isAsyncStorageLoaded: true,
				}));
			}
			// AsyncStorageから記録取得、stateにsetする
			else {
				const storedRecord = JSON.parse(storedRecordAsString);
				const latestDailyRecord = storedRecord.dailyRecord[0];

				// アプリ起動日が、前回起動日と同日の場合
				if (latestDailyRecord.date === today) {
					setRecord({
						...storedRecord,
						isAsyncStorageLoaded: true,
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
						isAsyncStorageLoaded: true,
					});
				}
			}
		})();
		// 上記の括弧をつけることで即時関数を実行
	}, []);

	// AsyncStorageに記録を保存
	useEffect(() => {
		AsyncStorage.setItem("record", JSON.stringify(record));
		console.log(record);
		console.log("stored");
		console.log();
	}, [record]);

	// 注意！AsyncStorageを初期化
	// useEffect(() => {
	// 	(async () => {
	// 		await AsyncStorage.clear();
	// 	})();
	// }, []);

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require("../../assets/bgimage.png")}
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
						<WeeklyRecord
							onPress={() =>
								navigation.navigate("WeeklyRecordDetails")
							}
						/>
					</View>
					<View style={styles.sheetRecord}>
						<CurrentSheet />
					</View>
				</View>
			</ImageBackground>
		</View>
	);
};

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
		alignItems: "center",
	},
	todaysRecord: {
		// height: 200,
		flex: 43,
		width: 260,
		marginBottom: 32,
		backgroundColor: "white",
		borderRadius: 40,
	},
	weeklyRecord: {
		// height: 150,
		flex: 25,
		width: 330,
		marginBottom: 24,
		backgroundColor: "#63769C",
		borderRadius: 16,
	},
	sheetRecord: {
		// height: 196,
		flex: 32,
		width: 330,
		marginBottom: 24,
		backgroundColor: "#63769C",
		borderRadius: 16,
	},
});
