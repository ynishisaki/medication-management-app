import { StyleSheet, Text, View } from "react-native";
import { recordType } from "../App";
import { CheckBox } from "./TodaysCheckBox";

export const TodaysRecord = ({
	recordProps,
	onPressTookMedicine,
	onPressHaveBleeding,
}: {
	recordProps: recordType;
	onPressTookMedicine: () => void;
	onPressHaveBleeding: () => void;
}) => {
	function showDate(dateStrings: string) {
		const date = new Date(dateStrings);

		const month = date.getMonth() + 1;
		const day = date.getDate();
		const week = date.getDay();
		const weekArr = ["日", "月", "火", "水", "木", "金", "土"];

		return `${month}月${day}日(${weekArr[week]})`;
	}

	return (
		<>
			<View style={styles.titleContainer}>
				<Text style={styles.titleText}>
					{showDate(recordProps.dailyRecord[0].date)}
				</Text>
			</View>
			<Text style={styles.restPeriodMessage}>{"今日は休薬日です。"}</Text>
			<View style={styles.checkBoxLayout}>
				<CheckBox
					isChecked={recordProps.dailyRecord[0].tookMedicine}
					type='服薬'
					onPress={onPressTookMedicine}
				/>
				<CheckBox
					isChecked={recordProps.dailyRecord[0].haveBleeding}
					type='出血'
					onPress={onPressHaveBleeding}
				/>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	titleContainer: {
		marginTop: 12,
		marginHorizontal: 20,
		height: 28,
		borderBottomColor: "#848484",
		borderBottomWidth: 0.5,
	},
	titleText: {
		fontSize: 18,
		textAlign: "center",
	},
	restPeriodMessage: {
		marginTop: 6,
		fontSize: 10,
		textAlign: "center",
	},
	checkBoxLayout: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 16,
	},
});
