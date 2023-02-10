import React from "react";
import { Button, View } from "react-native";

export type ButtonsProps = {
	onPressTookMedicine: () => void;
	onPressHaveBleeding: () => void;
	isTookMedicine: boolean;
};

// 薬飲んだかと、出血したかのボタン
export const Buttons = (props: ButtonsProps) => {
	return (
		<View>
			<Button
				onPress={props.onPressTookMedicine}
				title={props.isTookMedicine ? "took medicine" : "take medicine"}
				color={props.isTookMedicine ? "gray" : "#F7CCBF"} //#f49da5
				accessibilityLabel='if you took medicine today, push this button'
			/>

			<Button
				onPress={props.onPressHaveBleeding}
				title='have bleeding'
				color='#f18690'
				accessibilityLabel='if you have some bleeding or spotting, push this button'
			/>
		</View>
	);
};
