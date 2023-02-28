import { StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export const WeeklyCheckBox = ({ isChecked }: { isChecked: boolean }) => {
	return (
		<>
			<BouncyCheckbox
				style={styles.container}
				size={25}
				fillColor='#F1E789'
				unfillColor='#fcfae8'
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
