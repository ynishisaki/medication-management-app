import { StyleSheet, Text, View } from "react-native";
import { recordType } from "../App";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export const WeeklyCheckBox = ({
	recordProps,
}: // onPressTookMedicine,
// onPressHaveBleeding,
{
	recordProps: recordType;
	// onPressTookMedicine: () => void;
	// onPressHaveBleeding: () => void;
}) => {
	const date = new Date();

	const week = date.getDay();
	const weekArr = ["日", "月", "火", "水", "木", "金", "土"];

	const recentWeekArr = [...weekArr.slice(week), ...weekArr.slice(0, week)];

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.weekTextLayout}>{recentWeekArr[0]}</Text>
				{/* 最近一週間のdailyRecordをみて、
        曜日をTextで。tookMedicineとhaveBleedingをそれぞれBouncyCheckBoxで7日分作成する */}
				{recordProps.dailyRecord.length >= 7
					? // 直近一週間
					  [...recordProps.dailyRecord]
							.slice(7)
							.reverse()
							.map((record, index) => {
								return (
									<View>
										<Text>{weekArr.at(index)}</Text>
										<BouncyCheckbox
											size={25}
											fillColor='#F1E789'
											unfillColor='#F6EFB5'
											isChecked={record.tookMedicine} // must set
											disableText={true}
											disabled={true}
											disableBuiltInState={
												record.tookMedicine
											}
										/>
										<BouncyCheckbox
											size={25}
											fillColor='#F1E789'
											unfillColor='#F6EFB5'
											isChecked={record.haveBleeding} // must set
											disableText={true}
											disabled={true}
											disableBuiltInState={
												record.haveBleeding
											}
										/>
									</View>
								);
							})
					: undefined}
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 16,
		marginHorizontal: 20,
		height: 26,
		borderBottomColor: "#fff",
		borderBottomWidth: 0.5,
	},
	weekTextLayout: {
		fontSize: 12,
		// textAlign: "center",
		color: "#fff",
		// lineHeight: 50,
	},
	// checkBoxLayout: {
	// 	flexDirection: "row",
	// 	justifyContent: "space-around",
	// 	marginTop: 16,
	// },
});
