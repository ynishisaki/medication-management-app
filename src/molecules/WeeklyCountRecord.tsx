import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default ({ title, countDays }: { title: string; countDays: number }) => {
	return (
		<>
			<Text style={styles.subtitleText}>{title}</Text>
			<Text style={styles.numberOfDaysText}>{`${countDays}日目`}</Text>
		</>
	);
};
const styles = StyleSheet.create({
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
});
