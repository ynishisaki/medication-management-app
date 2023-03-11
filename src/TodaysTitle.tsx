import { StyleSheet, Text, View } from "react-native";

export default ({ title }: { title: string }) => {
	return (
		<>
			<View style={styles.titleContainer}>
				<Text style={styles.titleText}>{title}</Text>
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	titleContainer: {
		marginTop: 16,
		marginHorizontal: 20,
		height: 32,
		borderBottomColor: "#848484",
		borderBottomWidth: 0.5,
	},
	titleText: {
		fontSize: 20,
		textAlign: "center",
	},
});
