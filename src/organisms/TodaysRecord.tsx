import { StyleSheet, View } from "react-native";
import { recordState } from "../../App";
import Title from "../molecules/TodaysTitle";
import Message from "../molecules/TodaysMessage";
import CheckBox from "../molecules/TodaysCheckBox";
import { useRecoilState } from "recoil";

export const TodaysRecord = () => {
	const [record, setRecord] = useRecoilState(recordState);
	console.log(record);

	function onPressTookMedicine(nextBoolean: boolean) {
		setRecord({
			...record,
			dailyRecord: [
				{
					...record.dailyRecord[0],
					tookMedicine: nextBoolean,
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
				{record.isAsyncStorageLoaded && (
					<>
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
					</>
				)}
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
