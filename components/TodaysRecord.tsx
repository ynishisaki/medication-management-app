import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { recordType } from "../App";
import { CheckBox } from "./CheckBox";

// 薬飲んだかと、出血したかチェックボックス
export const TodaysRecord = ({ props }: { props: recordType }) => {
	function showDate(dateStrings: string) {
		const date = new Date(dateStrings);

		const month = date.getMonth() + 1;
		const day = date.getDate();
		const week = date.getDay();
		const weekArr = ["日", "月", "火", "水", "木", "金", "土"];

		return `${month}月${day}日(${weekArr[week]})`;
	}

	// function getDateStrings(selectedDate: Date) {
	// 	const offset = selectedDate.getTimezoneOffset();
	// 	selectedDate = new Date(selectedDate.getTime() - offset * 60 * 1000);

	// 	return selectedDate.toISOString().split("T")[0];
	// }

	// const today = getDateStrings(new Date()); // YYYY-DD-MM

	return (
		<>
			<View style={styles.dateTextContainer}>
				<Text style={styles.dateText}>
					{showDate(props.dailyRecord[0].date)}
				</Text>
			</View>
			<Text style={styles.restPeriodMessage}>{"今日は休薬日です。"}</Text>
			<View style={styles.checkBoxLayout}>
				<CheckBox type='服薬' />
				<CheckBox type='出血' />
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	dateTextContainer: {
		marginTop: 16,
		marginHorizontal: 20,
		height: 26,
		borderBottomColor: "#848484",
		borderBottomWidth: 0.5,
	},
	dateText: {
		fontSize: 12,
		textAlign: "center",
		// lineHeight: 50,
	},
	restPeriodMessage: {
		marginTop: 6,
		fontSize: 10,
		textAlign: "center",
	},
	checkBoxLayout: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 16,
	},
});
