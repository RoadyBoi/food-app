import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, SafeAreaView, ScrollView, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Cell, Section, TableView} from 'react-native-tableview-simple';
import React from 'react';

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
                action={() => navigation.navigate("Menu", { title: restaurant.title })}
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
        <View style={{width: "100%",paddingTop: 10}}>
          <View style={{flexDirection:'row', justifyContent:"space-between"}}>
          <View style={styles.menuText}>
            <Text style={styles.menuTitle}>{props.title}</Text>
              <Text style={styles.menuCalories}>Calories: {props.calories}</Text>
               <Text style={styles.menuPrice}>{props.price} £</Text>
          </View>
          <Image source={props.image} style={[styles.menuImage, {opacity: props.price === '3.95' ? 0.2 : 1}]} />
        </View>
        </View>
      }
      onPress={props.action}
    />
  )
}

function MenuScreen({route,navigation}){
  const {title} = route.params
  const menus = {
    "Joe's Gelato": [
    {"title": "Gelato Cups", "contents":[
    {"title":"Original","price":"3.95","image":require('./assets/original.jpg'),"calories":"400", 
    "description":"The Original Gelato flavor is a timeless delight, boasting a velvety smooth texture and a rich, creamy taste. Made with the finest ingredients, this classic treat offers a luscious blend of milk, cream, and natural flavors, creating a heavenly indulgence that captures the essence of authentic Italian gelato."},
    {"title":"Chocolate Hazelnut","price":"4.15","image":require('./assets/chocolate-hazelnut.jpg'),"calories":"425", 
    "description": "The Original Chocolate Hazelnut flavor is a delectable blend of rich chocolate and creamy hazelnut. This delightful combination offers a smooth and indulgent taste experience. Whether enjoyed in a beverage or as a spread, the harmonious marriage of chocolate and hazelnut creates a heavenly treat that satisfies any sweet tooth. "},
    {"title":"Salted Caramel","price":"4.00","image":require('./assets/salted-caramel.jpg'),"calories":"416",
    "description": "Salted Caramel Gelato is a luscious frozen dessert that tantalizes the taste buds with a perfect balance of sweet and savory. The smooth and creamy gelato is infused with a hint of sea salt, enhancing the rich caramel flavor. Each spoonful delivers a luxurious and indulgent experience that leaves you craving for more. "},
    {"title":"Mango & Passion Fruit","price":"4.5","image":require('./assets/mango-passion.jpg'),"calories":"376",
    "description": "Mango & Passion Fruit Gelato is a tropical delight that transports your taste buds to a sun-soaked paradise. This creamy and refreshing gelato combines the sweet and juicy essence of ripe mangoes with the tangy and vibrant flavors of passion fruit. Each spoonful is a burst of tropical bliss, offering a truly refreshing and exotic treat."},
    {"title":"Mixed Berries","price":"4.25","image":require('./assets/mixed-berries.jpg'),"calories":"358",
    "description": "Mixed Berry Gelato is a fruity sensation that captures the essence of ripe berries in a creamy frozen delight. This luscious gelato combines a medley of sweet strawberries, tangy raspberries, and succulent blueberries. Each spoonful bursts with the natural flavors of the berries, creating a refreshing and irresistible treat that is sure to satisfy any berry lover."}
    ]},
    {"title": "Extra Toppings", "contents":[
    {"title":"Strawberries","price":"1.15","image":require('./assets/strawberries.jpg'),"calories":"60",
    "description":"The strawberry topping is a vibrant and sweet addition that enhances any dessert with its irresistible flavor. Made from ripe, juicy strawberries, this topping is a perfect balance of tartness and sweetness. Whether drizzled over ice cream, pancakes, or cheesecake, it adds a burst of freshness and a delightful touch to every bite."},
    {"title":"Chocolate Chips","price":"1.25","image":require('./assets/chocolate-chips.jpg'),"calories":"90",
    "description":"The chocolate chips topping is a classic indulgence that brings a rich and decadent touch to any dessert. These small morsels of chocolate add a delightful crunch and intense burst of cocoa flavor. Whether sprinkled over ice cream, baked goods, or blended into milkshakes, the chocolate chips topping is a surefire way to satisfy your chocolate cravings and elevate your sweet treats."},
    {"title":"Mango","price":"1.5","image":require('./assets/mango.jpg'),"calories":"130",
    "description":"The mango topping is a tropical delight that adds a burst of sunshine to any dessert. Made from ripe and juicy mangoes, this topping brings a sweet and tangy flavor to your treats. Whether drizzled over ice cream, yogurt, or cakes, the mango topping infuses each bite with the exotic taste of tropical paradise, leaving you craving for more."},
    {"title":"Hazelnut Sauce","price":"1.85","image":require('./assets/hazelnut-sauce.jpg'),"calories":"170",
    "description":"The hazelnut sauce topping is a heavenly addition that brings a nutty and indulgent flavor to your desserts. Made from creamy and aromatic hazelnuts, this sauce adds a luxurious touch to ice cream, waffles, and pastries. Its rich and velvety texture, combined with the irresistible taste of hazelnuts, creates a truly delectable experience for your taste buds."},
    ]},
    {"title": "Milk Shakes", "contents":[
    {"title":"Tiramisu","price":"8.00","image":require('./assets/tiramisu.jpg'),"calories":"600",
    "description":"The Tiramisu Shake is a decadent and creamy treat that combines the flavors of the classic Italian dessert with the indulgence of a milkshake. This irresistible blend features layers of rich espresso, velvety mascarpone, and delicate ladyfinger cookies, creating a harmonious balance of sweetness and coffee. Sip and savor the lusciousness of Tiramisu in every refreshing sip."},
    {"title":"Mango Sorbet","price":"6.5","image":require('./assets/mango-sorbet.jpg'),"calories":"480",
    "description":"The Mango Sorbet Milkshake is a tropical delight that combines the refreshing flavors of ripe mangoes with the creamy indulgence of a milkshake. This icy treat features smooth and creamy mango sorbet blended with milk, creating a luscious and fruity shake. Each sip delivers a burst of mango sweetness, making it a perfect summertime indulgence."},
    ]}
    ],
    "Joe's Diner": [
    {"title": "Burgers", "contents":[
    {"title":"Veggie Burger","price":"5.99","image":require('./assets/veggie-burger.jpg'),"calories":"590",
    "description":"The Veggie Burger is a delicious and wholesome plant-based alternative to traditional meat burgers. Packed with flavorful ingredients such as vegetables, legumes, grains, and spices, it offers a satisfying and nutritious meal option. Whether grilled, baked, or pan-fried, the Veggie Burger provides a tasty and protein-rich choice for vegans and vegetarians alike."},
    {"title":"Cheese Burger","price":"4.99","image":require('./assets/cheese-burger.jpg'),"calories":"670",
     "description":"The Cheese Burger is a classic and mouthwatering delight that satisfies cravings with its irresistible combination of juicy beef patty and melted cheese. Nestled in a soft bun, this iconic burger is topped with fresh lettuce, ripe tomatoes, onions, and a savory sauce, creating a perfect balance of flavors. Indulge in the timeless pleasure of a cheeseburger today."},
    {"title":"Little Cheese Burger","price":"4.99","image":require('./assets/little-cheese-burger.jpg'),"calories":"520", 
    "description":"The Little Cheese Burger is a compact version of the classic favorite, perfect for those seeking a smaller, yet equally delicious, option. It features a juicy beef patty topped with melted cheese, complemented by crisp lettuce, ripe tomatoes, onions, and a savory sauce. Enjoy all the mouthwatering flavors of a cheeseburger in a perfectly portioned size."},
    ]},
    {"title": "Hot Dogs", "contents":[
    {"title":"Classic","price":"4.99","image":require('./assets/classic.jpg'),"calories":"520", 
    "description": "The Classic Hot Dog is an American staple that satisfies with its simple yet satisfying combination of a grilled or steamed sausage nestled in a soft bun. Topped with mustard, ketchup, onions, and relish, it offers a perfect blend of flavors and textures. Enjoy this timeless favorite at barbecues, sporting events, or as a quick and tasty snack."},
    {"title":"Cheese Dog","price":"1.25","image":require('./assets/cheese-dog.jpg'),"calories":"600", 
    "description":"The Cheese Dog puts a cheesy twist on the classic hot dog, adding an extra layer of indulgence to this beloved treat. It features a grilled or steamed sausage enveloped in a soft bun, generously topped with melted cheese. The combination of savory sausage and gooey cheese creates a flavorful and comforting experience that hot dog lovers will relish."},
    ]},
    {"title": "Milk Shakes", "contents":[
    {"title":"Chocolate Milkshake","price":"2.99","image":require('./assets/chocolate-milkshake.jpg'),"calories":"40", 
    "description": "The Chocolate Milkshake is a decadent and creamy delight that satisfies chocolate cravings with every sip. Made with rich chocolate syrup or powder blended with cold milk and a scoop of creamy vanilla ice cream, it creates a luscious and indulgent beverage. Topped with whipped cream and chocolate shavings, it's a heavenly treat for chocolate lovers."},
    {"title":"Strawberry Milkshake","price":"2.99","image":require('./assets/strawberry-milkshake.jpg'),"calories":"40", 
    "description": "The Strawberry Milkshake is a refreshing and fruity treat that captures the essence of ripe strawberries in a creamy concoction. Made with fresh or frozen strawberries blended with cold milk and a scoop of velvety vanilla ice cream, it offers a delightful balance of sweetness and tanginess. Topped with whipped cream and a strawberry garnish, it's a perfect summertime indulgence."},
    ]}
    ],
    "Joe's Café": [
    {"title": "Beverages", "contents":[
    {"title":"Chocolate Java Mint Frappuccino Blended Beverage","price":"4.99","image":require('./assets/java-mint.jpg'),"calories":"490",
    "description":"The Chocolate Java Mint Frappuccino is a refreshing blended beverage that combines the rich flavors of chocolate, robust java, and refreshing mint. This indulgent treat is made with a creamy base, blended with ice, and topped with whipped cream for a delightful combination of sweetness, coffee, and minty freshness."},
    {"title":"Espresso Frappuccino Blended Beverage","price":"3.99","image":require('./assets/espresso-frapp.jpg'),"calories":"210",
    "description":"The Espresso Frappuccino is a delightful blended beverage that combines the bold and robust flavors of espresso with a creamy and icy texture. Made with a blend of chilled espresso, milk, ice, and a touch of sweetness, it offers a refreshing and energizing pick-me-up. Topped with whipped cream, it's a perfect treat for coffee lovers on-the-go."},
    {"title":"Caffè Americano","price":"2.99","image":require('./assets/americano.jpg'),"calories":"416",
    "description":"The Caffè Americano is a classic coffee beverage that showcases the pure essence of espresso. It is made by diluting a shot of espresso with hot water, resulting in a smooth and robust cup of coffee. The Caffè Americano offers a rich flavor profile, making it a popular choice for those who enjoy a strong and flavorful brew."},
    {"title":"Earl Grey Tea","price":"2.59","image":require('./assets/earl.jpg'),"calories":"376",
    "description":"Earl Grey Tea is a timeless and aromatic beverage renowned for its distinct flavor. Made by infusing black tea leaves with the citrusy essence of bergamot, it offers a fragrant and soothing experience. The combination of robust black tea and floral notes of bergamot creates a harmonious cup of tea enjoyed both hot and iced."},
    {"title":"Matcha Tea Latte","price":"4.25","image":require('./assets/matcha-img.jpg'),"calories":"358",
    "description":"The Matcha Tea Latte is a vibrant and velvety beverage that combines the earthy flavors of matcha green tea with the creamy indulgence of a latte. Made by whisking powdered matcha with steamed milk and a touch of sweetness, it offers a unique and energizing drink with a beautiful green hue. Sip and savor the distinct taste of matcha in every sip."},
    ]},
    {"title": "Breakfast", "contents":[
    {"title":"Butter Croissant","price":"1.99","image":require('./assets/croissant.jpg'),"calories":"250",
    "description":"The Butter Croissant is a flaky and buttery pastry that delights with its golden, crescent-shaped layers. Made with a rich butter dough, it boasts a delicate texture and a melt-in-your-mouth experience. Whether enjoyed plain or filled with sweet or savory fillings, the butter croissant is a classic treat that brings joy to breakfasts and coffee breaks."},
    {"title":"Cheese Danish","price":"2.59","image":require('./assets/cheese-danish.jpg'),"calories":"290",
    "description":"The Cheese Danish is a delectable pastry that combines the sweetness of a Danish dough with a rich and creamy cheese filling. This indulgent treat features a buttery and flaky pastry base, filled with a velvety mixture of cream cheese, sugar, and sometimes fruit preserves. Each bite offers a delightful blend of textures and flavors, making it a beloved choice for breakfast or brunch."},
    {"title":"Mexican Fiesta Omelet","price":"11.5","image":require('./assets/mexican.jpg'),"calories":"420",
    "description":"The Mexican Fiesta Omelet is a flavorful breakfast dish that captures the vibrant and spicy essence of Mexican cuisine. This savory omelet is filled with ingredients like diced tomatoes, onions, bell peppers, jalapenos, and shredded cheese. Topped with zesty salsa and fresh cilantro, it offers a fiesta of flavors that wake up your taste buds with each bite."},
    ]},
    {"title": "Salads", "contents":[
    {"title":"Ceaser's Salads","price":"8.00","image":require('./assets/ceaser.jpg'),"calories":"200",
    "description":"The Caesar Salad is a classic and timeless dish that combines crisp romaine lettuce, Parmesan cheese, croutons, and a creamy Caesar dressing. Tossed together, it creates a refreshing and savory salad that pleases the palate. The combination of tangy dressing, crunchy croutons, and the freshness of lettuce makes the Caesar Salad a popular choice for a light and satisfying meal."},
    {"title":"Chef Salad","price":"6.5","image":require('./assets/chef.jpg'),"calories":"180",
    "description":"The Chef Salad is a hearty and satisfying salad that features a medley of fresh ingredients. It typically includes mixed greens, sliced ham, turkey or chicken, hard-boiled eggs, cheese, tomatoes, cucumbers, and sometimes bacon. Tossed with a flavorful dressing, the Chef Salad offers a delicious combination of flavors, textures, and protein-packed ingredients."},
    ]}
    ],
  

  }
  return(
    <SafeAreaView>
      <ScrollView style={{ height: "100%" }}>
      <TableView>
          {menus[title].map((menu,i) =>(
            <Section header={menu.title} key={i} headerTextStyle={{fontSize:27, color:'#D70F64'}} hideSeparator={true}>
              {menu.contents.map((content,i)=>(
                <MenuScreenCell key={i}
                {...content}
                action={() => navigation.navigate("Description", {details: content})}
                />
              ))}
            </Section>
          ))}
        </TableView>
      </ScrollView>
    </SafeAreaView>
  );}

  function DescriptionScreenCell(props){
    const [text, onChangetext] = React.useState('');
    return (
      <Cell
        highlightUnderlayColor="#ccc"
        backgroundColor="transparent"
        cellContentView={
          <SafeAreaView style={{paddingTop: 10}}>
            <Image source={props.image} style={styles.image} />
            <View style={styles.menuText}>
            <View style={{flexDirection:'row', justifyContent:"space-between"}}>
              <Text style={styles.DescriptionTitle}>{props.title}</Text>
                <Text style={styles.DescriptionCalories}>Calories: {props.calories}</Text>
                </View>
                 <Text style={styles.Description}>{props.description}</Text>
                 <TextInput
                 style={styles.descriptionreview}
            onChangeText={onChangetext}
            value={text}
            placeholder="Add Your Review"
          />
            </View>
          </SafeAreaView>
        }
        onPress={props.action}
      />
    )
  }

  function DescriptionScreen({route}){
    const content = route.params.details
    return(
      <SafeAreaView>
      <ScrollView style={{ height: "100%" }}>
      <TableView>
            <Section>
              <DescriptionScreenCell
              title= {content.title}
              image= {content.image}
              description= {content.description}
              calories={content.calories}
              price={content.price}
              />
            </Section>
        </TableView>
      </ScrollView>
    </SafeAreaView>
    )
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
            <Stack.Screen name="Menu" component={MenuScreen}  options={{headerTitleAlign:'center', headerTintColor:'#fff'}} />
            <Stack.Screen name="Description" component={DescriptionScreen}  options={{headerTitleAlign:'center', headerTintColor:'#fff'}} />
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
    
  },
  menuImage: {
    width: "30%",
    height: "90%",
    borderRadius: 10,
    right:120
  },
  menuText: {
    padding: 10,
    width: "100%",
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  menuPrice: {
   fontSize:16,
   paddingVertical:7
  },
  menuCalories:{
    fontSize: 15,
    color: "grey",
  },
  DescriptionTitle:{
    fontSize: 30,
    fontWeight: 800,
  },
  DescriptionCalories:{
    fontSize: 20,
    color: "grey",
    paddingVertical:8,
    fontWeight:600
  },
  Description:{
    fontSize:20,
    fontWeight:300,
    borderRadius:30,
    letterSpacing:1,
    fontWeight:300,
    padding:5
  },
  descriptionreview:{
    textAlign:"center",
    padding:5,
    borderRadius:40,
    fontSize:15,
    color:'white',
    borderWidth:3,
    borderColor:'#D70F64',
    width: 200,
    left:80
  }

});
