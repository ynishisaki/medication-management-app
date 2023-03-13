import {
	ImageBackground,
	Text,
	TouchableHighlight,
	StyleSheet,
	View,
} from "react-native";

export const WeeklyRecordDetails = ({ navigation }: { navigation: any }) => {
	return (
		<View style={styles.container}>
			<ImageBackground
				source={require("../../assets/bgimage.png")}
				resizeMode='cover'
				style={styles.bgimage}>
				<View>details</View>
				<TouchableHighlight
					onPress={() => navigation.goBack()}
					// onPress={() => {
					// 	console.log("test: pressed");
					// }}
				>
					<View>
						<Text>back</Text>
					</View>
				</TouchableHighlight>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bgimage: {
		flex: 1,
	},
	header: {
		height: 47,
		width: 47,
		alignSelf: "flex-start",
		// backgroundColor: "gray",
		marginTop: 25,
		marginHorizontal: 16,
	},
});
