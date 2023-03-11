import { StyleSheet, Text, View } from "react-native";
import { useRecoilValue } from "recoil";
import { recordState, recordType } from "../../App";
import { RightIcon } from "../atoms/Icons";
import { WeeklyCheckBox } from "../molecules/WeeklyCheckBox";

export const WeeklyRecord = () => {
	const record = useRecoilValue(recordState);

	// タスク：これは連続で飲んだ日数を数えるよう、修正する必要がある
	const countTakeMedicineDays = () => {
		const trueDays = record.dailyRecord.filter(
			(dailyRecord) => dailyRecord.tookMedicine === true
		).length;

		return trueDays;
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
			<View style={styles.titleContainer}>
				<Text style={styles.titleText}>直近一週間の記録</Text>
				<RightIcon />
			</View>
			<View style={styles.bodyContainer}>
				<View style={styles.bodyTextLayout}>
					<Text style={styles.subtitleText}>服薬</Text>
					<Text
						style={
							styles.numberOfDaysText
						}>{`${countTakeMedicineDays()}日目`}</Text>
					<Text style={styles.subtitleText}>出血</Text>
					<Text
						style={
							styles.numberOfDaysText
						}>{`${countHaveBleedingDays()}日目`}</Text>
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
											<WeeklyCheckBox
												title='服薬'
												isChecked={record.tookMedicine}
											/>
											<WeeklyCheckBox
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
											<WeeklyCheckBox
												title='服薬'
												isChecked={record.tookMedicine}
											/>
											<WeeklyCheckBox
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
