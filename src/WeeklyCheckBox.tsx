import { StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { DropSmIcon, PillSmIcon } from "./components/Icons";

export const WeeklyCheckBox = ({
	title,
	isChecked,
}: {
	title: string;
	isChecked: boolean;
}) => {
	return (
		<>
			<BouncyCheckbox
				style={styles.container}
				size={25}
				fillColor='#F6B69A'
				unfillColor='#fcfae8'
				isChecked={isChecked} // must set
				disableText={true}
				ImageComponent={title === "服薬" ? PillSmIcon : DropSmIcon}
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
