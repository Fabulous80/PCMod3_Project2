import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  useWindowDimensions,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BlockRGB from "./components/BlockRGB";
import { FlatList } from "react-native-gesture-handler";
import { set } from "react-native-reanimated";

const NUM_COLUMNS = 5;

function HomeScreen({ navigation }) {
  const [colorArray, setColorArray] = useState([
    { red: 255, green: 0, blue: 0, id: "0" },
    { red: 0, green: 255, blue: 0, id: "1" },
    { red: 0, green: 0, blue: 255, id: "2" },
  ]);
  const BLOCK_SIZE = useWindowDimensions().width / NUM_COLUMNS;

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button onPress={addColor} title="Add Color" />,
      headerLeft: () => <Button onPress={clearColor} title="Reset" />,
    });
  });

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("DetailsScreen", { ...item })}
      >
        <BlockRGB
          style={{ height: BLOCK_SIZE, width: BLOCK_SIZE }}
          red={item.red}
          green={item.green}
          blue={item.blue}
        />
      </TouchableOpacity>
    );
  }

  function addColor() {
    setColorArray([
      ...colorArray,
      {
        red: Math.floor(Math.random() * 256),
        green: Math.floor(Math.random() * 256),
        blue: Math.floor(Math.random() * 256),
        id: `${colorArray.length}`,
      },
    ]);
  }

  function clearColor() {
    setColorArray([]);
  }

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
       style={{ height: 40, justifyContent: "center" }}
       onPress={addColor}
     >
       <Text style={{ color: "blue" }}>Add Colour</Text>
     </TouchableOpacity>

     <TouchableOpacity
       style={{ height: 40, justifyContent: "center" }}
       onPress={clearColor}
     >
       <Text style={{ color: "red" }}>Reset Colour</Text>
     </TouchableOpacity> */}

      <FlatList
        style={styles.list}
        data={colorArray}
        renderItem={renderItem}
        numColumns={NUM_COLUMNS}
      />
    </View>
  );
}

function DetailsScreen({ route }) {
  const { red, green, blue } = route.params;

  const textRed = red > 125 ? 255 - red - 20 : 255 + red + 20;
  const textGreen = green > 125 ? 255 - green - 20 : 255 + green + 20;
  const textBlue = blue > 125 ? 255 - blue - 20 : 255 + blue + 20;

  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: "center",
          backgroundColor: `rgb(${red}, ${green}, ${blue})`,
        },
      ]}
    >
      <Text
        style={[
          { color: `rgb(${textRed}, ${textGreen}, ${textBlue})` },
          styles.detailsText,
        ]}
      >
        Red: {red}
      </Text>
      <Text
        style={[
          { color: `rgb(${textRed}, ${textGreen}, ${textBlue})` },
          styles.detailsText,
        ]}
      >
        Green: {green}
      </Text>
      <Text
        style={[
          { color: `rgb(${textRed}, ${textGreen}, ${textBlue})` },
          styles.detailsText,
        ]}
      >
        Blue: {blue}
      </Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Colorful Kueh Lapis" component={HomeScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  list: {
    width: "100%",
  },

  detailsText: {
    fontSize: 36,
    marginBottom: 12,
  },
});
