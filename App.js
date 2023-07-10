import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Cell, Section, TableView} from 'react-native-tableview-simple';

const Stack = createStackNavigator();

// function HomeScreen({navigation}){
//   return(
//     <View style={styles.container}>
//       <Text> Home Screen !</Text>
//       <Button 
//         title = "Details"
//         onPress={()=>navigation.navigate("Details")}
//       />
//     </View>
//   )
// }

// function DetailsScreen(){
//   return(
//     <View style={styles.container}>
//       <Text> Details Screen !</Text>
//     </View>
//   )
// }

// export default function App() {
//   let tableData = [{"header":"Section 1","cells":[{"title":"Cell 1"}, {"title":"Cell 2"}]},
//   {"header":"Section 2","cells":[{"title":"Cell 1"}]}]

//   const CustomCell = (props) => (
//     <Cell
//       {...props}
//       cellContentView={
//         <View>
//           <Text>{props.customLabel}</Text>
//         </View>
//       }
//     />
//   )
//   return (
//   //  <NavigationContainer>
//   //   <Stack.Navigator>
//   //     <Stack.Screen name = "Home" component = {HomeScreen} options={{headerTitleAlign:'center'}}/>
//   //     <Stack.Screen name = "Details" component = {DetailsScreen} options={{headerTitleAlign:'center'}}/>
//   //   </Stack.Navigator>
//   //  </NavigationContainer>
//     <SafeAreaView>
//       <ScrollView style={{height:"100%"}}>
//         <TableView>
//            {tableData.map((section,i)=>(
//            <Section
//               header={section.header}
//            >
//             {section.cells.map((cell, i)=>(
//               <CustomCell
//                 customLabel={cell.title}
//                 onPress={() => alert(section.header)}
//               />
//             ))}
//            </Section>
//            ))}
//         </TableView>
//       </ScrollView>
//     </SafeAreaView>

//   );
// }

function HomeScreenCell(props) {
  const { title, tagline, time, img, action } = props;
  return (
    <Cell
      backgroundColor="transparent"
      highlightUnderlayColor="#CCC"
      cellContentView={
        <View style={styles.cellContentView}>
          <View style={styles.cellImageView}>
            <Image source={img} style={styles.cellImage} />
          </View>
          <View style={styles.cellTextView}>
            <Text style={styles.cellTitle}>{title}</Text>
            <Text style={styles.cellTagline}>{tagline}</Text>
            <View style={styles.cellEta}>
            <Text style={styles.cellEtaText}>{time}{"\n"}mins</Text>
            </View>
          </View>
        </View>
      }
      onPress={action}
    />
  )
}

function RestaurantsScreen({ navigation }) {
  const restaurants = [
    { title: "Joe's Gelato", tagline: "Dessert, Ice cream, £££", time: "10-30", img: require('./assets/gelato-img.jpg') },
    { title: "Joe's Diner", tagline: "American, burgers, ££", time: "50+", img: require('./assets/gelato-img.jpg') },
    { title: "Joe's Café", tagline: "Beverages, Coffee, £", time: "5-10", img: require('./assets/gelato-img.jpg') }
  ];

  return (
    <SafeAreaView>
      <ScrollView style={{ height: "100%" }}>
        <TableView>
          <Section hideSeparator={true}>
            {restaurants.map(restaurants => (
              <HomeScreenCell
                key={restaurants.title}
                {...restaurants}
                action={() => navigation.navigate("Menu", { title })}
              />
            ))}
          </Section>
        </TableView>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function App() {
  return(
    <SafeAreaView>
    <NavigationContainer>
     <Stack.Navigator screenOptions={{headerStyle:{backgroundColor: '#D70F64'}}}>
       <Stack.Screen name = "Restaurants" component = {RestaurantsScreen} options={{headerTitleAlign:'center'}}/>
       {/* <Stack.Screen name = "Menu" component = {MenuScreen} options={{headerTitleAlign:'center'}}/>
       <Stack.Screen name = "Details" component = {DetailsScreen} options={{headerTitleAlign:'center'}}/> */}
     </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cellContentView: {

    borderBottomColor: "#ccc",
    backgroundColor: "none",
    width: "100%",
  },
  cellImageView: {
    width: "100%",
    height: 290,
    justifyContent: "center",
    alignItems: "center",
  },
  cellImage: {
    width: "100%",
    height: "100%",
  },
  cellTextView: {
    padding: 10,
    width: "100%",
  },
  cellTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  cellTagline: {
    fontSize: 14,
    color: "#666",
  },
  cellEta: {
    position: "absolute",
    right: 10,
    top: -30,
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: "center",
    borderRadius: 100000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
  },
  cellEtaText: {
    fontSize: 14,
    textAlign: "center",
  }
});
