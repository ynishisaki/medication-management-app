import { StyleSheet, Text, View } from "react-native";
import { recordType } from "../App";
import Title from "./TodaysTitle";
import Message from "./TodaysMessage";
import CheckBox from "./TodaysCheckBox";

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

	const takeRestPeriod = true;

	return (
		<>
			<Title title={showDate(recordProps.dailyRecord[0].date)} />
			<Message takeRestPeriod={takeRestPeriod} />
			<View style={styles.checkBoxLayout}>
				<CheckBox
					title='服薬'
					isChecked={recordProps.dailyRecord[0].tookMedicine}
					onPress={onPressTookMedicine}
				/>
				<CheckBox
					title='出血'
					isChecked={recordProps.dailyRecord[0].haveBleeding}
					onPress={onPressHaveBleeding}
				/>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	checkBoxLayout: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
	},
});
