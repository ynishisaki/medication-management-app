import React from "react";
import {
    SafeAreaView,
    View,
    VirtualizedList,
    StyleSheet,
    Text,
    StatusBar,
} from "react-native";

type ItemData = {
    id: string;
    title: string;
};

const getItem = (_data: unknown, index: number): ItemData => ({
    id: Math.random().toString(12).substring(0),
    title: `12/${index + 1}\nFri`,
});

const getItemCount = (_data: unknown) => 50;

type ItemProps = {
    title: string;
};

const Item = ({ title }: ItemProps) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

export const DateList = () => {
    return (
        <View style={styles.container}>
            <VirtualizedList
                initialNumToRender={7}
                renderItem={({ item }) => <Item title={item.title} />}
                keyExtractor={(item) => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
                horizontal={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 0,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: "blue",
    },
    item: {
        backgroundColor: "#e7d2c3",
        borderRadius: 100,
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 50,
        marginHorizontal: 8,
        padding: 0,
    },
    title: {
        fontSize: 9,
    },
});
