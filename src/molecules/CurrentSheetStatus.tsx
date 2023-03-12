import { StyleSheet, View } from "react-native";
import { CurrentSheetCheckBox } from "../atoms/CurrentSheetCheckBox";
import { recordType } from "../types/types";

export const CurrentSheetStatus = ({
	record,
	currentSheetTookMedicineLength,
	remainingDays,
}: {
	record: recordType;
	currentSheetTookMedicineLength: number;
	remainingDays: number;
}) => {
	const checkBoxes = [];
	// 現在のシートの飲んだ分
	record.dailyRecord
		.slice(0, currentSheetTookMedicineLength)
		.reverse()
		.forEach((record, index) =>
			checkBoxes.push(
				<View key={index} style={styles.checkBoxLayout}>
					<CurrentSheetCheckBox isChecked={record.tookMedicine} />
				</View>
			)
		);

	// 現在のシートの残り分
	for (let i = 0; i < remainingDays + 1; i++) {
		checkBoxes.push(
			<View
				key={currentSheetTookMedicineLength + i}
				style={styles.checkBoxLayout}>
				<CurrentSheetCheckBox isChecked={false} />
			</View>
		);
	}

	// 空間を埋める用
	for (
		let i = 0;
		i < (currentSheetTookMedicineLength + (remainingDays + 1)) % 7;
		i++
	) {
		checkBoxes.push(
			<View
				key={currentSheetTookMedicineLength + (remainingDays + 1) + i}
				style={styles.checkBoxLayout}>
				<View style={styles.dammyCheckBox} />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.checkBoxesLayout}>{checkBoxes}</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// height: 196,
		// width: 330,
		// width: 185, // 5*2 + 25*7
		borderColor: "#fff",
		borderWidth: 2,
		borderRadius: 16,
	},
	checkBoxesLayout: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		padding: 5,
		justifyContent: "space-between",
	},
	checkBoxLayout: {
		alignItems: "center",
		marginHorizontal: 5,
		marginVertical: 5,
	},
	dammyCheckBox: {
		width: 15,
	},
});
