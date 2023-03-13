import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { useRecoilValue } from "recoil";

import { recordState } from "../../App";
import { CurrentSheetStatus } from "../molecules/CurrentSheetStatus";
import EstimatedEndDate from "../atoms/CurrentSheetEstimatedEndDate";
import { RightIcon } from "../atoms/Icons";

export const CurrentSheet = () => {
	const record = useRecoilValue(recordState);

	// シートの終了日を計算
	// シート１枚目、シート開始index0の場合：
	// 今日の日付 + (numOfPillsPerSheet - recordLength)日
	// シート1枚目、シート開始index20の場合：
	// 今日の日付 + (numOfPillsPerSheet - (recordLength + index))日
	// シート2枚目、シート開始index0の場合：
	// 今日の日付 + ((numOfPillsPerSheet -(recordLength % numOfPillsPerSheet)日
	// シート2枚目、シート開始index20の場合：
	// 今日の日付 + ((numOfPillsPerSheet -(recordLength + index) % numOfPillsPerSheet)日

	const numOfPillsPerSheet = record.initialSheetSettings.numOfPillsPerSheet;
	const beginSheetIndex = record.initialSheetSettings.beginSheetIndex;

	const recordLength = record.dailyRecord.length; // 今日の分を含めてOK

	const currentSheetTookMedicineLength =
		(recordLength + beginSheetIndex) % numOfPillsPerSheet;

	const remainingDays = numOfPillsPerSheet - currentSheetTookMedicineLength;

	const today = new Date();
	const todayDate = today.getDate();
	const calculateSheetEndDate = today.setDate(todayDate + remainingDays);

	const estimatedEndDate = getDateStrings(new Date(calculateSheetEndDate));

	function getDateStrings(selectedDate: Date) {
		const month = selectedDate.getMonth() + 1;
		const day = selectedDate.getDate();

		return `${month}月${day}日`;
	}

	return (
		<>
			<TouchableHighlight
				onPress={() => {
					console.log("test: pressed");
				}}>
				<View style={styles.titleContainer}>
					<Text style={styles.titleText}>現在のシート</Text>
					<RightIcon />
				</View>
			</TouchableHighlight>

			<View style={styles.bodyContainer}>
				<EstimatedEndDate estimatedEndDate={estimatedEndDate} />
				<CurrentSheetStatus
					record={record}
					currentSheetTookMedicineLength={
						currentSheetTookMedicineLength
					}
					remainingDays={remainingDays}
				/>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 10,
		marginHorizontal: 20,
		height: 30,
		borderBottomColor: "#fff",
		borderBottomWidth: 0.5,
	},
	titleText: {
		fontSize: 14,
		lineHeight: 30,
		color: "#fff",
	},
	bodyContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
		marginHorizontal: 20,
	},
	bodyTextLayout: {
		marginTop: 8,
	},

	subtitleText: {
		fontSize: 10,
		color: "#CCCCCC",
	},
	numberOfDaysText: {
		fontSize: 16,
		fontWeight: "600", // semibold
		color: "#fff",
		marginBottom: 4,
	},
});
