import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import StepIndicator from "react-native-step-indicator";
import { recordType } from "../App";

const firstIndicatorStyles = {
	stepIndicatorSize: 30,
	currentStepIndicatorSize: 40,
	separatorStrokeWidth: 3,
	currentStepStrokeWidth: 5,
	separatorFinishedColor: "#4aae4f",
	separatorUnFinishedColor: "#a4d4a5",
	stepIndicatorFinishedColor: "#4aae4f",
	stepIndicatorUnFinishedColor: "#a4d4a5",
	stepIndicatorCurrentColor: "#ffffff",
	stepIndicatorLabelFontSize: 15,
	currentStepIndicatorLabelFontSize: 15,
	stepIndicatorLabelCurrentColor: "#000000",
	stepIndicatorLabelFinishedColor: "#ffffff",
	stepIndicatorLabelUnFinishedColor: "rgba(255,255,255,0.5)",
	labelColor: "#666666",
	labelSize: 12,
	currentStepLabelColor: "#4aae4f",
};

export const DateList = (props: recordType) => {
	const propsArr = Object.entries(props);
	const propsArrLength = propsArr.length;
	const keyArray = propsArr.map((item) => item[0]);

	const [currentPage, setCurrentPage] = React.useState<number>(4);

	const onStepPress = (position: number) => {
		setCurrentPage(position);
	};

	const renderLabel = ({
		position,
		label,
		currentPosition,
	}: {
		position: number;
		stepStatus: string;
		label: string;
		currentPosition: number;
	}) => {
		return (
			<Text
				style={
					position === currentPosition
						? styles.stepLabelSelected
						: styles.stepLabel
				}>
				{label}
			</Text>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.stepIndicator}>
				<StepIndicator
					customStyles={firstIndicatorStyles}
					currentPosition={currentPage}
					labels={["1(月)", "2(火)", "3(水)", "4(木)", "today"]}
					renderLabel={renderLabel}
					onPress={onStepPress}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ffffff",
	},
	stepIndicator: {
		marginVertical: 50,
	},
	page: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	stepLabel: {
		fontSize: 12,
		textAlign: "center",
		fontWeight: "500",
		color: "#999999",
	},
	stepLabelSelected: {
		fontSize: 12,
		textAlign: "center",
		fontWeight: "500",
		color: "#4aae4f",
	},
});
