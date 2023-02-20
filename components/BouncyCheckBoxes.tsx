import React from "react";
import { View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export type CheckBoxProps = {
	onPressTookMedicine: () => void;
	onPressHaveBleeding: () => void;
	isTookMedicine: boolean;
};

// 薬飲んだかと、出血したかチェックボックス
export const BouncyCheckBoxes = (props: CheckBoxProps) => {
	return (
		<View
			style={{
				flexDirection: "row",
				justifyContent: "space-around",
				alignItems: "center",
			}}>
			<BouncyCheckbox
				size={50}
				fillColor='#f18690'
				unfillColor='#F7CCBF'
				text='take medicine'
				iconStyle={{ borderColor: "red" }}
				innerIconStyle={{ borderWidth: 2 }}
				textStyle={{ fontFamily: "JosefinSans-Regular" }}
				onPress={props.onPressTookMedicine}
			/>

			<BouncyCheckbox
				size={50}
				fillColor='#f18690'
				unfillColor='#F7CCBF'
				text='have bleeding'
				iconStyle={{ borderColor: "red" }}
				innerIconStyle={{ borderWidth: 2 }}
				textStyle={{ fontFamily: "JosefinSans-Regular" }}
				onPress={props.onPressHaveBleeding}
			/>
		</View>
	);
};
