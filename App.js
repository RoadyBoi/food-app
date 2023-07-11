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

function HomeScreen({ navigation }) {
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
              <HomeScreenCell key = {restaurant.title}
                {...restaurant}
                action={() => navigation.navigate("MenuScreen", { title: restaurant.title })}
              />
            ))}
          </Section>
        </TableView>
      </ScrollView>
    </SafeAreaView>
  ); 
}

function MenuScreenCell(props){
  return (
    <Cell
      highlightUnderlayColor="#ccc"
      backgroundColor="transparent"
      cellContentView={
        <View style={{width: "100%"}}>
            <Image source={props.image} style={styles.image} />
          <View style={styles.restaurantText}>
            <Text style={styles.Title}>{props.title}</Text>
            <View style={{flexDirection:'row', justifyContent:"space-between"}}>
              <Text style={styles.Tagline}>{props.price}</Text>
               <Text style={styles.ratings}>{props.calories}</Text>
            </View>
          </View>
        </View>
      }
      onPress={props.action}
    />
  )
}

function MenuScreen({props}){
  const title = props.route.params
  const menus = {
    "Joe's Gelato": [
    {"title": "Gelato Cups", "contents":[
    {"title":"Original","price":"3.95","image":require('./assets/gelato-img.jpg'),"calories":"400"},
    {"title":"Chocolate Hazelnut","price":"4.15","image":require('./assets/gelato-img.jpg'),"calories":"425"},
    {"title":"Salted Caramel","price":"4.00","image":require('./assets/gelato-img.jpg'),"calories":"416"},
    {"title":"Mango & Passion Fruit","price":"4.5","image":require('./assets/gelato-img.jpg'),"calories":"376"},
    {"title":"Mixed Berries","price":"4.25","image":require('./assets/gelato-img.jpg'),"calories":"358"},
    ]},
    {"title": "Extra Toppings", "contents":[
    {"title":"Strawberries","price":"1.15","image":require('./assets/gelato-img.jpg'),"calories":"60"},
    {"title":"Chocolate Chips","price":"1.25","image":require('./assets/gelato-img.jpg'),"calories":"90"},
    {"title":"Mango","price":"1.5","image":require('./assets/gelato-img.jpg'),"calories":"130"},
    {"title":"Hazelnut Sauce","price":"1.85","image":require('./assets/gelato-img.jpg'),"calories":"170"}
    ]},
    {"title": "Milk Shakes", "contents":[
    {"title":"Tiramisu","price":"8.00","image":require('./assets/gelato-img.jpg'),"calories":"600"},
    {"title":"Mango Sorbet","price":"6.5","image":require('./assets/gelato-img.jpg'),"calories":"480"},
    ]}
  ]
  }
  return(
    <SafeAreaView>
      <ScrollView>
        <TableView>
          {menus[title].map(menu =>(
            <Section header={menu.title}>
              {menu.contents.map(content=>(
                <MenuScreenCell
                {...content}
                />
              )
              )}
            </Section>
          )
          )
          }
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
            <Stack.Screen name="Restaurants" component={HomeScreen}  options={{headerTitleAlign:'center'}} />
            <Stack.Screen name="MenuScreen" component={MenuScreen}  options={{headerTitleAlign:'center'}} />
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
