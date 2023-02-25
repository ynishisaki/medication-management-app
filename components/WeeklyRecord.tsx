import { StyleSheet, Text, View } from "react-native";
import { recordType } from "../App";
import { WeeklyCheckBox } from "./WeeklyCheckBox";

export const WeeklyRecord = ({ recordProps }: { recordProps: recordType }) => {
	const date = new Date();
	const week = date.getDay();
	const weekArr = ["日", "月", "火", "水", "木", "金", "土"];

	const recentWeekArr = [...weekArr.slice(week), ...weekArr.slice(0, week)];

	const recordLength =
		recordProps.dailyRecord.length >= 7
			? 7
			: recordProps.dailyRecord.length;

	return (
		<>
			<View style={styles.titleContainer}>
				<Text style={styles.titleText}>直近一週間の記録</Text>
			</View>
			<View style={styles.bodyContainer}>
				<View style={styles.bodyTextLayout}>
					<View style={styles.weekTextLayout}>
						{recentWeekArr.map((week) => (
							<Text>{week}</Text>
						))}
					</View>
					<Text style={styles.subtitleText}>服薬</Text>
					<Text style={styles.numberOfDaysText}>{`${2}2日目`}</Text>
					<Text style={styles.subtitleText}>出血</Text>
					<Text style={styles.numberOfDaysText}>{`${2}2日目`}</Text>
				</View>

				<View style={styles.checkBoxLayout}>
					{recordLength === 7 ? (
						<Text>{"直近一週間の記録があります。"}</Text>
					) : (
						<Text>{"直近一週間の記録がありません。"}</Text>
					)}
					<Text style={styles.weekTextLayout}>
						{recentWeekArr[0]}
					</Text>
					<WeeklyCheckBox
						isChecked={recordProps.dailyRecord[0].tookMedicine}
					/>
					<WeeklyCheckBox
						isChecked={recordProps.dailyRecord[0].haveBleeding}
					/>
					{/* </View> */}
				</View>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	titleContainer: {
		marginTop: 12,
		marginHorizontal: 20,
		height: 24,
		borderBottomColor: "#fff",
		borderBottomWidth: 0.5,
	},
	titleText: {
		fontSize: 14,
		color: "#fff",
	},
	bodyContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 10,
		marginHorizontal: 20,
	},
	bodyTextLayout: {},
	checkBoxLayout: {
		flexDirection: "row",
		// justifyContent: "space-around",
		// marginTop: 16,
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
	weekTextLayout: {
		flexDirection: "row",
		fontSize: 8,
		// textAlign: "center",
		color: "#fff",
		// lineHeight: 50,
		marginBottom: 4,
	},
});
