import { StyleSheet } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export const CurrentSheetCheckBox = ({ isChecked }: { isChecked: boolean }) => {
	return (
		<BouncyCheckbox
			style={styles.checkBox}
			size={15}
			fillColor='#848484'
			unfillColor='#F6B69A'
			isChecked={isChecked} // must set
			disableText={true}
			disabled={true}
			disableBuiltInState={isChecked}
		/>
	);
};

const styles = StyleSheet.create({
	checkBox: {
		flex: 1,
	},
});
