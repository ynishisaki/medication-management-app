import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

// 薬飲んだかと、出血したかチェックボックス
export const CheckBox = ({
	isChecked,
	onPress,
	type,
}: {
	isChecked: boolean;
	onPress: () => void;
	type: string;
}) => {
	return (
		<View
			style={{
				alignItems: "center",
			}}>
			<Text style={styles.checkBoxText}>{type}</Text>
			<BouncyCheckbox
				size={80}
				fillColor='#F1E789'
				unfillColor='#fcfae8'
				isChecked={isChecked}
				textComponent={null}
				disableText={true}
				iconStyle={
					{
						// borderColor: "#fcfae8",
						// width: 80,
						// height: 80,
						// borderRadius: 50,
					}
				}
				innerIconStyle={
					{
						// 	borderWidth: 2,
						// borderColor: "#fcfae8",
					}
				}
				onPress={onPress}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	checkBoxText: {
		fontSize: 12,
		fontWeight: "bold",
	},
});
