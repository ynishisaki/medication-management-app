import { StyleSheet, Text, View } from "react-native";
import { recordType } from "../App";
import { WeeklyCheckBox } from "./WeeklyCheckBox";

export const WeeklyRecord = ({ recordProps }: { recordProps: recordType }) => {
	return (
		<>
			<View style={styles.titleContainer}>
				<Text style={styles.titleText}>直近一週間の記録</Text>
			</View>
			<View style={styles.bodyContainer}>
				<Text>服薬</Text>
				<Text>{"2日目"}</Text>
			</View>
			<View>
				<Text>出血</Text>
				<Text>{"2日目"}</Text>
			</View>
			<View style={styles.checkBoxLayout}>
				<WeeklyCheckBox recordProps={recordProps} />
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	titleContainer: {
		marginTop: 16,
		marginHorizontal: 20,
		height: 26,
		borderBottomColor: "#fff",
		borderBottomWidth: 0.5,
	},
	titleText: {
		fontSize: 12,
		color: "#fff",
	},
	bodyContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 20,
	},
	checkBoxLayout: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 16,
	},
});
