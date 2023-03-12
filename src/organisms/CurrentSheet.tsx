import { StyleSheet, Text, View } from "react-native";
import { useRecoilValue } from "recoil";
import { getDateStrings, recordState } from "../../App";
import { RightIcon } from "../atoms/Icons";
import { CurrentSheetCheckBox } from "../molecules/CurrentSheetCheckBox";

export const CurrentSheet = () => {
	const record = useRecoilValue(recordState);

	const recordLength =
		// record.dailyRecord.length >= 7 ? 7 : record.dailyRecord.length;
		record.dailyRecord.length;

	// シートの終了日を計算
	// シート１枚目、シート開始index0の場合：
	// 今日の日付 + (numOfPillsPerSheet - recordLength)日
	// シート1枚目、シート開始index20の場合：
	// 今日の日付 + (numOfPillsPerSheet - (recordLength + index))日
	// シート2枚目、シート開始index0の場合：
	// 今日の日付 + ((numOfPillsPerSheet -(recordLength % numOfPillsPerSheet)日
	// シート2枚目、シート開始index20の場合：
	// 今日の日付 + ((numOfPillsPerSheet -(recordLength + index) % numOfPillsPerSheet)日
	const calculateSheetEndDate = () => {
		// const recordLength = record.dailyRecord.length; // 今日の分は飲んでいようといまいとも含める
		const numOfPillsPerSheet =
			record.initialSheetSettings.numOfPillsPerSheet;
		const beginSheetIndex = record.initialSheetSettings.beginSheetIndex;

		const today = new Date();
		const todayDate = today.getDate();
		const remainingDays =
			numOfPillsPerSheet -
			((recordLength + beginSheetIndex) % numOfPillsPerSheet);

		const endDate = today.setDate(todayDate + remainingDays);

		return getDateStrings(new Date(endDate));
	};

	function getDateStrings(selectedDate: Date) {
		const month = selectedDate.getMonth() + 1;
		const day = selectedDate.getDate();

		return `${month}月${day}日`;
	}

	const estimatedEndDate = calculateSheetEndDate();

	return (
		<>
			<View style={styles.titleContainer}>
				<Text style={styles.titleText}>現在のシート</Text>
				<RightIcon />
			</View>
			<View style={styles.bodyContainer}>
				<View style={styles.bodyTextLayout}>
					<Text
						style={
							styles.subtitleText
						}>{`シート終了日(推定)`}</Text>
					<Text style={styles.numberOfDaysText}>
						{estimatedEndDate}
					</Text>
				</View>
				<View style={styles.bodyRecordContainer}>
					<View style={styles.bodyRecordLayout}>
						{[...record.dailyRecord]
							.slice(0, recordLength)
							.reverse()
							.map((record, index) => (
								<>
									<View style={styles.checkBoxLayout}>
										<CurrentSheetCheckBox
											isChecked={record.tookMedicine}
										/>
									</View>
								</>
							))}
					</View>
				</View>
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
	bodyRecordContainer: {
		flex: 1,
		// height: 196,
		// width: 330,

		borderColor: "#fff",
		borderWidth: 2,
		borderRadius: 16,
	},
	bodyRecordLayout: {
		flexDirection: "row",
	},
	checkBoxLayout: {
		alignItems: "center",
		marginHorizontal: 5,
	},
});
