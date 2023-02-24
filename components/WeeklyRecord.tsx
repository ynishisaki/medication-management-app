import { StyleSheet, Text, View } from "react-native";
import { recordType } from "../App";
import { WeeklyCheckBox } from "./WeeklyCheckBox";

// 薬飲んだかと、出血したかチェックボックス
export const WeeklyRecord = ({ recordProps }: { recordProps: recordType }) => {
	return (
		<>
			<View style={styles.titleContainer}>
				<Text style={styles.titleText}>
					{/* {setWeekArr(recordProps.dailyRecord[0].date)} */}
					直近一週間の記録
				</Text>
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
				{/* 最近一週間のdailyRecordをみて、
        曜日をTextで。tookMedicineとhaveBleedingをそれぞれBouncyCheckBoxで7日分作成する */}
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
		// textAlign: "center",
		color: "#fff",
		// lineHeight: 50,
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
