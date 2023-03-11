import { StyleSheet, Text, View } from "react-native";
import { DropLgIcon, PillLgIcon } from "./components/Icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";

// 薬飲んだかと、出血したかチェックボックス
export default ({
	title,
	isChecked,
	onPress,
}: {
	title: string;
	isChecked: boolean;
	onPress: () => void;
}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.checkBoxText}>{title}</Text>
			<BouncyCheckbox
				size={80}
				fillColor='#F6B69A'
				unfillColor='#fff'
				isChecked={isChecked}
				textComponent={null}
				disableText={true}
				ImageComponent={title === "服薬" ? PillLgIcon : DropLgIcon}
				onPress={onPress}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
	checkBoxText: {
		fontSize: 12,
		fontWeight: "bold",
	},
});
