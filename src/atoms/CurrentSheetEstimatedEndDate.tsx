import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default ({ estimatedEndDate }: { estimatedEndDate: string }) => {
	return (
		<View style={styles.bodyTextLayout}>
			<Text style={styles.subtitleText}>{`シート終了日(推定)`}</Text>
			<Text style={styles.numberOfDaysText}>{estimatedEndDate}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
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
});
