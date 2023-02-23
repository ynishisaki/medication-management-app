import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export type CheckBoxProps = {
	onPressTookMedicine: () => void;
	onPressHaveBleeding: () => void;
	isTookMedicine: boolean;
};

// 薬飲んだかと、出血したかチェックボックス
export const CheckBox = ({
	// props,
	type,
}: {
	// props: CheckBoxProps;
	type: string;
}) => {
	return (
		<View
			style={{
				// flexDirection: "row",
				// justifyContent: "space-around",
				alignItems: "center",
			}}>
			<Text style={styles.checkBoxText}>{type}</Text>
			<BouncyCheckbox
				size={80}
				fillColor='#F1E789'
				unfillColor='#F6EFB5'
				// text='take medicine'
				// textComponent={<Text style={styles.checkBoxText}>{type}</Text>}
				textComponent={null}
				disableText={true}
				iconStyle={
					{
						// borderColor: "red",
						// width: 80,
						// height: 80,
						// borderRadius: 50,
					}
				}
				innerIconStyle={
					{
						// borderWidth: 2,
						// width: 80,
						// height: 80,
						// borderRadius: 50,
					}
				}
				// textStyle={{
				// 	textDecorationLine: "none",
				// 	backgroundColor: "black",
				// }}
				// textStyle={{ fontFamily: "JosefinSans-Regular" }}
				// onPress={props.onPressTookMedicine}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	checkBoxText: {
		fontSize: 12,
		fontWeight: "bold",
		// backgroundColor: "black",
		// alignItems: "center",
	},
});
