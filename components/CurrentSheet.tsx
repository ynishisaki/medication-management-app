import { StyleSheet, Text, View } from "react-native";
import { recordType } from "../App";
import { RightIcon } from "./Icons";
import { CurrentSheetCheckBox } from "./CurrentSheetCheckBox";

export const CurrentSheet = ({
	countDays,
	recordProps,
}: {
	countDays: number;
	recordProps: recordType;
}) => {
	const recordLength =
		recordProps.dailyRecord.length >= 7
			? 7
			: recordProps.dailyRecord.length;

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
					<Text
						style={styles.numberOfDaysText}>{`${3}月${2}日`}</Text>
				</View>
				<View style={styles.bodyRecordContainer}>
					<View style={styles.bodyRecordLayout}>
						{[...recordProps.dailyRecord]
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
