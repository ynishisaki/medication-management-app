import { StyleSheet, Text, View } from "react-native";
import { recordState, recordType } from "../../App";
import Title from "../TodaysTitle";
import Message from "../TodaysMessage";
import CheckBox from "../TodaysCheckBox";
import { useRecoilState } from "recoil";

export const TodaysRecord = ({}: // record,
// onPressTookMedicine,
// onPressHaveBleeding,
{
	// record: recordType;
	// onPressTookMedicine: () => void;
	// onPressHaveBleeding: () => void;
}) => {
	const [record, setRecord] = useRecoilState(recordState);

	function onPressTookMedicine() {
		setRecord({
			...record,
			dailyRecord: [
				{
					...record.dailyRecord[0],
					tookMedicine: !record.dailyRecord[0].tookMedicine, // isTookMedicineは前回の値であることに注意
				},
				...record.dailyRecord.slice(1),
			],
		});
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
	}

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
			<Title title={showDate(record.dailyRecord[0].date)} />
			<Message takeRestPeriod={takeRestPeriod} />
			<View style={styles.checkBoxLayout}>
				<CheckBox
					title='服薬'
					isChecked={record.dailyRecord[0].tookMedicine}
					onPress={onPressTookMedicine}
				/>
				<CheckBox
					title='出血'
					isChecked={record.dailyRecord[0].haveBleeding}
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
