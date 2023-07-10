import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Cell, Section, TableView} from 'react-native-tableview-simple';

const Stack = createStackNavigator();

function HomeScreenCell(props) {
  return (
    <Cell
      highlightUnderlayColor="#ccc"
      backgroundColor="transparent"
      cellContentView={
        <View style={{width: "100%"}}>
            <Image source={props.imgUri} style={styles.image} />
          <View style={styles.restaurantText}>
            <Text style={styles.Title}>{props.title}</Text>
            <View style={{flexDirection:'row', justifyContent:"space-between"}}>
              <Text style={styles.Tagline}>{props.tagline}</Text>
               <Text style={styles.ratings}>{props.rating}</Text>
            </View>
            <Text style={{fontSize:14, color: props.delivery === 'Free Delivery' ? '#D70F64' : 'grey'}}>Delivery: {props.delivery}</Text>
            <View style={styles.eta}>
            <Text style={{textAlign:"center"}}>{props.eta}{"\n"}mins</Text>
            </View>
          </View>
        </View>
      }
      onPress={props.action}
    />
  )
}

function RestaurantsScreen({ navigation }) {
  const restaurants = [
    { title: "Joe's Gelato", tagline: "Dessert, Ice cream, £££", eta: "10-30", imgUri: require('./assets/gelato-img.jpg'), rating:"⭐ 4.1 (400+)", delivery: "Free Delivery" },
    { title: "Joe's Diner", tagline: "American, burgers, ££", eta: "50+", imgUri: require('./assets/diner-img.jpeg'), rating:"⭐ 4.4 (1000+)", delivery: "4 £ " },
    { title: "Joe's Café", tagline: "Beverages, Coffee, £", eta: "5-10", imgUri: require('./assets/cafe-img.jpg'), rating:"⭐ 4.7 (100+)", delivery: "Free Delivery" },
  ];
  return (
    <SafeAreaView>
      <ScrollView style={{ height: "100%" }}>
        <TableView>
          <Section hideSeparator={true}>
            {restaurants.map(restaurant => (
              <HomeScreenCell
                {...restaurant}
                // action={() => navigation.navigate("Menu", { title })}
              />
            ))}
          </Section>
        </TableView>
      </ScrollView>
    </SafeAreaView>
  ); 
}
export default function App() {
  return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: {backgroundColor: '#D70F64'},
            headerTitleStyle: {fontSize: 26, color: 'aliceblue', letterSpacing: 0.25, fontWeight: 400},
            }}>
            <Stack.Screen name="Restaurants" component={RestaurantsScreen}  options={{headerTitleAlign:'center'}} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="light" />
      </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 225,
    borderRadius: 10,
    paddingLeft:5,
    paddingRight: 5
  },
  restaurantText: {
    padding: 10,
    width: "100%",
  },
  eta: {
    position: "absolute",
    textAlign: "center",
    borderRadius: 40,
    backgroundColor: "#fff",
    zIndex:9,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    right: 20,
    top: -30,
  },
  Title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  Tagline: {
    fontSize: 15,
    color: "grey",
  },
  ratings:{
    paddingRight: 5,
    top: -2,
    fontSize: 14,
    
  }
});
