import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, SafeAreaView, FlatList, Dimensions, Button } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import {users, User, Name} from './users'
import SearchBar from './SearchBar';


// these are not used so far
const Person = ({name}:{name: string}) => {
        return (
          <Text style={styles.myStyle}>
            My name is {name}
          </Text>)
    }

const Greeting = ({who}:{who: string}) => {
  return (
    <Text style={styles.myFirstStyle}>
        Hello {who}!!!
    </Text>
  )
}

const GreetPersons = ({names}:{names: string[]}) => {
  return (
  <View style={styles.myViewStyle}>
    <Greeting who="everyone" />
    {names.map(name => <Person name={name} /> )}
  </View>
  )
} 

// A component rendering a user's name, as a column of items
// Task 1: Make last name bold
const UserName = ({name}:{name: Name}) => {
  return (
    <View>
      <Text>{name.title}</Text>
      <Text>{name.first} <Text style={{fontWeight: "bold"}}>{name.last}</Text></Text>
    </View>
  )
}

// Task 3: Create helper method to retrieve the background color for each nationality
const getBackgroundColor = (nationality : String): string => {
  switch (nationality) {
    case "NL":
      return "lightgray";
    case "IR":
      return "red";
    case "NO":
      return "purple";
    case "CH":
      return "green";
    case "DK":
      return "lightyellow";
    case "IE":
      return "teal";
    case "GB":
      return "beige";
    case "ES":
      return "blanchedalmond";
    case "TR":
      return "darkgrey";
    case "FR":
      return "darkseagreen";
    case "FI":
      return "khaki";
    case "DE":
      return "lavender";
    case "NZ":
      return "lightcyan";
    case "US":
      return "navajowhite";
    case "CA":
      return "palevioletred";
    case "AU":
      return "salmon";
    case "BR":
      return "tan";
  }
  return "greenyellow";
}

// A component rendering a single user, with two columns: a picture and a name
// Task 1: Create margin right for spacing between profile pic and text
// Task 2: Displaying user´s phone numbers and email using a flexbox
const UserComp = ({user, enlargedView}:{user: User, enlargedView: boolean}) => {
  const backgroundColor = getBackgroundColor(user.nationality);


  // Task 4: Highlight users whose passwords length is less than 8 characters
  const highligtStyle = StyleSheet.create({
    highlighted: {
      backgroundColor: user.login.password.length < 8 ? "yellow" : "",
    },
  });

  return (
    <View style={[styles.paddedRow, {backgroundColor: backgroundColor}]}>
      <View style={{height: 'auto', justifyContent: "center"}}>
        <Image style={{width: enlargedView ? 100 : 50, height: enlargedView ? 100 : 50, marginRight: 10}} source={{uri: user.picture.thumbnail}} />
      </View>
      <View style={[highligtStyle.highlighted, { flexDirection: 'column'}]}>
        <UserName name={user.name} />
        {enlargedView && (
          <>
            <View>
              <Text>Phone number: {user.phone}</Text>
              <Text>Cell number: {user.cell}</Text>
              <Text>Email: {user.email}</Text>
              <Text>City: {user.location.city}</Text>
              <Text>Country: {user.location.country}</Text>
            </View>
          </>
        )}
      </View>
    </View>
  )
}

const FullScreenUserComp = ({user}:{user: User}) => {

  return (
    <View>
      <View>
        <Image style={{width: 150, height: 150, marginRight: 10, marginTop: 20}} source={{uri: user.picture.thumbnail}} />
      </View>
      <View>
        <Text style={{fontWeight: 'bold'}}>Main Informations</Text>
        <Text>Title: {user.name.title}</Text>
        <Text>Name : {user.name.first} {user.name.last}</Text>
        <Text>Gender: {user.gender}</Text>
        <Text>Age: {user.birthdate.age}</Text>
        <Text style={{fontWeight: 'bold'}}>Location</Text>
        <Text>City: {user.location.city}</Text>
        <Text>Country : {user.location.country}</Text>
        <Text>Street: {user.location.street.name}  {user.location.street.number}</Text>
        <Text style={{fontWeight: 'bold'}}>Contact</Text>
        <Text>Phone number: {user.phone}</Text>
        <Text>Cell number: {user.cell}</Text>
        <Text>Email: {user.email}</Text>
      </View>
    </View>
  )
};




const App = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [focusSearchBar, setFocusSearchBar] = useState(false);
  const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);
  const [currentSelectedUser, setCurrentSelectedUser] = useState(undefined);
  const myusers = users.filter((user : User) => user.name.first.toUpperCase().includes(searchPhrase.toUpperCase()) || user.name.last.toUpperCase().includes(searchPhrase.toUpperCase()));

  const openUserDetail = (user : User) => {
    setCurrentSelectedUser(user);
    setFocusSearchBar(false);
    setIsUserDetailOpen(true);
  }

  if (myusers.length == 1 && !isUserDetailOpen) {
    openUserDetail(myusers[0]);
  }

  return (
    <SafeAreaView style={styles.container}>
      {
        isUserDetailOpen ? (
            <View>
              <FullScreenUserComp user= {currentSelectedUser}/>
              <Button title='Return to list' onPress={() => { 
                setCurrentSelectedUser(undefined);
                setSearchPhrase("");
                setIsUserDetailOpen(!openUserDetail);
              }} />
            </View>
        ) : (
        <>
          <SearchBar
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              focusSearchBar={focusSearchBar}
              setFocusSearchBar={setFocusSearchBar}
            />
          <FlatList
            data={myusers}
            keyExtractor={(item, index) => String(index)}
            renderItem={({ item }: { item: User }) => (
              <TouchableOpacity key={item.phone} onPress={() => {
                openUserDetail(item);
              }}>
                <UserComp user={item} enlargedView={myusers.length <= 5}/>
              </TouchableOpacity>
            )}
          />
        </>
        )
      }
   </SafeAreaView>
  )
}

export default App


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8
  },
  paddedRow: {
    // Task 1: Adjust padding
    padding: 10,
    flexDirection: 'row',
    width: Dimensions.get('window').width
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  myStyle: {
      backgroundColor: '#fff0f1', 
      margin: 10, 
      padding: 10
    },
  myFirstStyle: {
      fontFamily: "bold",
      fontSize: 12
    },
  myViewStyle: {
      backgroundColor: '#ecf0f1',
      paddingTop: Constants.statusBarHeight
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  }
});
