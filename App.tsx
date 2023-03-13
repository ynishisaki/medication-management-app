import { View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { atom, RecoilRoot } from "recoil";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./src/pages/Home";
import { WeeklyRecordDetails } from "./src/pages/WeeklyRecordDetails";

export function getDateStrings(selectedDate: Date) {
	const offset = selectedDate.getTimezoneOffset();
	selectedDate = new Date(selectedDate.getTime() - offset * 60 * 1000);

	return selectedDate.toISOString().split("T")[0];
}

export const today = getDateStrings(new Date()); // YYYY-DD-MM

export const recordState = atom({
	key: "1", // unique ID (with respect to other atoms/selectors)
	default: {
		initialSheetSettings: {
			numOfPillsPerSheet: 24,
			beginSheetIndex: 0, // 0スタート
		},
		dailyRecord: [
			{
				date: today,
				tookMedicine: false, // 今日薬を飲んだか
				haveBleeding: false, // 今日出血があったか
			},
		],
		isAsyncStorageLoaded: false,
	},
});

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<RecoilRoot>
				<Stack.Navigator initialRouteName='Home'>
					<Stack.Screen
						name='Home'
						component={Home}
						// options={{ title: "Welcome" }}
					/>
					<Stack.Screen
						name='WeeklyRecordDetails'
						component={WeeklyRecordDetails}
					/>
				</Stack.Navigator>
			</RecoilRoot>
		</NavigationContainer>
	);
}
