import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { useRecoilValue } from "recoil";
import { recordState } from "../../App";
import { RightIcon } from "../atoms/Icons";
import CountRecord from "../molecules/WeeklyCountRecord";
import CheckBox from "../molecules/WeeklyCheckBox";

export const WeeklyRecord = ({ onPress }: { onPress: () => void }) => {
	const record = useRecoilValue(recordState);

	// タスク：これは連続で飲んだ日数を数えるよう、修正する必要がある
	const countTakeMedicineDays = () => {
		let count = 0;
		for (let i = record.dailyRecord.length - 1; i >= 0; i--) {
			if (record.dailyRecord[i].tookMedicine === true) {
				count++;
			} else {
				break;
			}
		}
		return count;
	};

	const countHaveBleedingDays = () => {
		// jsonから、今日から直近で出血が何日連続しているか数える
		let count = 0;
		for (let i = 0; i < record.dailyRecord.length; i++) {
			if (record.dailyRecord[i].haveBleeding === true) {
				count++;
			} else {
				break;
			}
		}
		return count;
	};

	const date = new Date();
	const week = date.getDay();
	const weekArr = ["日", "月", "火", "水", "木", "金", "土"];

	const recentWeekArr = [
		...weekArr.slice((week + 1) % 7),
		...weekArr.slice(0, (week + 1) % 7),
	];

	const recordLength =
		record.dailyRecord.length >= 7 ? 7 : record.dailyRecord.length;

	return (
		<>
			<TouchableHighlight
				// onPress={() => {
				// 	console.log("test: pressed");
				// }}
				onPress={onPress}>
				<View style={styles.titleContainer}>
					<Text style={styles.titleText}>直近一週間の記録</Text>
					<RightIcon />
				</View>
			</TouchableHighlight>
			<View style={styles.bodyContainer}>
				<View style={styles.bodyTextLayout}>
					<CountRecord
						title='服薬'
						countDays={countTakeMedicineDays()}></CountRecord>
					<CountRecord
						title='出血'
						countDays={countHaveBleedingDays()}></CountRecord>
				</View>

				<View style={styles.bodyRecordLayout}>
					{recordLength === 7
						? [...record.dailyRecord]
								.slice(0, recordLength)
								.reverse()
								.map((record, index) => (
									<>
										<View style={styles.checkBoxLayout}>
											<Text style={styles.weekTextLayout}>
												{recentWeekArr[index]}
											</Text>
											<CheckBox
												title='服薬'
												isChecked={record.tookMedicine}
											/>
											<CheckBox
												title='出血'
												isChecked={record.haveBleeding}
											/>
										</View>
									</>
								))
						: [...record.dailyRecord]
								.reverse()
								.map((record, index) => (
									<>
										<View style={styles.checkBoxLayout}>
											<Text style={styles.weekTextLayout}>
												{
													recentWeekArr[
														(index +
															(7 -
																recordLength)) %
															7
													]
												}
											</Text>
											<CheckBox
												title='服薬'
												isChecked={record.tookMedicine}
											/>
											<CheckBox
												title='出血'
												isChecked={record.haveBleeding}
											/>
										</View>
									</>
								))}
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
	bodyRecordLayout: {
		flexDirection: "row",
		// alignItems: "center",
		// marginTop: 16,
		// marginHorizontal: 20,
	},
	checkBoxLayout: {
		alignItems: "center",
		marginHorizontal: 5,
	},
	weekTextLayout: {
		fontSize: 8,
		color: "#fff",
		marginBottom: 4,
	},
});
