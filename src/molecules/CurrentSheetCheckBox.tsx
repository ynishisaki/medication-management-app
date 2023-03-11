import { StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export const CurrentSheetCheckBox = ({ isChecked }: { isChecked: boolean }) => {
	return (
		<>
			<BouncyCheckbox
				style={styles.container}
				size={15}
				fillColor='#848484'
				unfillColor='#F6B69A'
				isChecked={isChecked} // must set
				disableText={true}
				disabled={true}
				disableBuiltInState={isChecked}
			/>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
