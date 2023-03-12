import { StyleSheet, Text } from "react-native";

export default ({ takeRestPeriod }: { takeRestPeriod: boolean }) => {
	return (
		<Text style={styles.restPeriodMessage}>
			{takeRestPeriod ? "今日は休薬日です。" : null}
		</Text>
	);
};

const styles = StyleSheet.create({
	restPeriodMessage: {
		marginTop: 6,
		fontSize: 10,
		textAlign: "center",
	},
});
