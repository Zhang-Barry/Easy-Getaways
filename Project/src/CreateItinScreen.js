import React, { useState, useRef } from 'react';
import { Text, View, TextInput, Button, StyleSheet, ScrollView, Alert, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import SelectDropdown from 'react-native-select-dropdown'
import { Country, State, City }  from 'country-state-city';
import { getMyItinsFromServer, insertNewItin } from './actions/itin';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CreateItinScreen = ( {route, navigation} ) => {

  const dispatch = useDispatch();
  const stateRef = useRef({});
  const cityRef = useRef({});
  const itin = route.params.itin;

  const [loading, setLoading] = useState(false);

  const authState = useSelector(state => state.auth);
  const jwt = authState["access"]
  const uid = authState["user"]["pk"]

  // itinerary attributes
  const tid = itin.tid;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [itinerary, setItinerary] = useState([]);


  let countryToISO = {}
  Country.getAllCountries().map( a => (countryToISO[a.name] = a.isoCode))

  const [countryMapISO, setCountryMapISO] = useState( countryToISO );
  const [countryList, setCountryList] = useState(Object.keys(countryMapISO));

  const [stateMapId, setStateMapId] = useState( {} );
  const [stateList, setStateList] = useState( [] );

  const [cityList, setCityList] = useState( [] );



  

  const myPlaces = useSelector(state => state.places);


  // const [stateDropDownDisabled, setStateDropDownDisabled] = useState(false);
  // const [cityDropDownDisabled, setCityDropDownDisabled] = useState(false);

  // country change should change list of countries.
  const handleCountryOnChange = (selectedCountry) => {
    stateRef.current.reset()
    cityRef.current.reset()
    setState(null)
    setCity(null)
    // setStateDropDownDisabled(false);

    setCountry(selectedCountry);

    const countryISO = countryMapISO[selectedCountry];
    let newStateMapID = {};
    State.getStatesOfCountry(countryISO).map( a => (newStateMapID[a.name] = a.isoCode) );
    setStateMapId( newStateMapID );
    setStateList( Object.keys(newStateMapID) )

    // if (stateList.length == 0) {
    //   setState(null);
    //   setStateDropDownDisabled(true);
    // }
  }

  // state/province change should change list of cities.
  const handleStateOnChange = (selectedState) => {
    cityRef.current.reset()
    setCity(null)
    // setCityDropDownDisabled(false);
    setState(selectedState);

    const stateCode = stateMapId[selectedState];
    const countryCode = countryMapISO[country];

    let newCityList = [];
    City.getCitiesOfState(countryCode, stateCode).forEach( (obj) => (newCityList.push(obj.name)) )
    setCityList(newCityList);
    // if (cityList.length == 0) {
    //   setCityDropDownDisabled(true);
    // }  
  }


  const handleSubmit = async () => {
    setLoading(true);
    // jwt, uid, title, city, state, country, description, itinerary
    await insertNewItin(jwt, uid, title, city, state, country, description, itinerary)(dispatch);
    await getMyItinsFromServer(jwt, uid)(dispatch);
    setLoading(false);
    navigation.goBack();
  }

  const deleteDestination = (index) => {
    let newItin = [...itinerary];
    newItin.splice(index, 1); // 2nd parameter means remove one item only

    setItinerary(newItin);
  }

  const addDestination = (destinationObj) => {
    // const newObj = {
    //   "extra_info": {},
    //   "place_json": destinationObj
    // }
    let newItin = [...itinerary, destinationObj];
    setItinerary(newItin);
  }


  const handleAddDestinationPress = () => {
    addDestination()
  }

  const DestinationEditableComponent = ( {item, index, type} ) => {
    return (
      <TouchableOpacity style={styles.placeContainer} onPress={ () => handlePlacePress(index, type, item) }>
        <Text style={{fontSize:25}}>{item.place_json.name}</Text>
        <Text>{item.place_json.address}</Text>
      </TouchableOpacity>
    )
  }
  
  const handlePlacePress = (index, type, item) => {
    if (type == "delete") {
        Alert.alert('Delete Destination', 'Delete Destination from your itinerary?', [
          {
            text: 'Delete',
            onPress: () => deleteDestination(index),
            style: 'destructive',
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]);
    }
    else {
      addDestination(item)
    }

  }

  return (
    <View style={styles.container}>

        <Spinner
          visible={loading}
          textContent={''}
          textStyle={styles.spinnerTextStyle}
        />

      <ScrollView>
        {/* <Text>{JSON.stringify(route.params.itin)}</Text> */}
        
        {/* <Spinner
          visible={loading}
          textContent={''}
          textStyle={styles.spinnerTextStyle}
        /> */}
        <Text style={styles.inputTitle}>Title</Text>
        <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
        />
        <Text style={styles.inputTitle}>Description</Text>
        <TextInput
            editable
            multiline
            maxLength={256}
            numberOfLines={4}
            style={ {...styles.input, height: 100} }
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
        />

      <Text style={styles.inputTitle}>Country</Text>
      <SelectDropdown
        data={countryList}
        value={country}
        onSelect={(selectedItem, index) => {
          handleCountryOnChange(selectedItem)
        }}
      />
      <Text style={styles.inputTitle}>State/Province</Text>
      <SelectDropdown
        data={stateList}
        ref={stateRef}
        // disabled={stateDropDownDisabled}
        onSelect={(selectedItem, index) => {
          handleStateOnChange(selectedItem)
        }}
      />
      <Text style={styles.inputTitle}>City</Text>
      <SelectDropdown
        data={cityList}
        ref={cityRef}
        // disabled={cityDropDownDisabled}
        onSelect={(selectedItem, index) => {
          setCity(selectedItem);
        }}
      />


      <Text style={styles.titleTextSecondary}>Destinations</Text>
      {
        (itinerary && itinerary.map) ?
        (itinerary.map( (item, index) => <DestinationEditableComponent item={item} index={index} type={"delete"}/> )):
        <Text>Invalid.</Text>
      }
      <Text>● END OF ITINERARY</Text>
      <Text style={{fontSize:21, fontWeight: "bold", marginTop: 5}}>Add a Saved Destination</Text>
      {
        (myPlaces && myPlaces.map) ?
        (myPlaces.map( (item, index) => <DestinationEditableComponent item={item} index={index} type={"add"}/> )):
        <Text>Invalid.</Text>
      }
        {/* <Button title="+ Add Destination" onPress={handleAddDestinationPress}/> */}
      {/* <Text>{JSON.stringify(itinerary)}</Text> */}


        <TextInput>{"\n\n"}</TextInput>

        <Button title="Submit" onPress={handleSubmit}/>

        <View style={{height: 50}}></View>
      </ScrollView>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'left',
    justifyContent: 'center',
    paddingLeft: 18,
    paddingRight: 18,
  },
  input: {
    width: '100%',
    // height: '10%',
    marginVertical: 4,
    padding: 15,
    backgroundColor:"gainsboro",
    // borderWidth: 1,
    borderRadius: 10,
  },
  inputTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
  },
  titleTextSecondary: {
    fontSize: 30,
    fontWeight: 700,
    marginTop: 30,
  },  
  placeContainer: {
    display: "flex",
    backgroundColor: "lightgray",
    marginTop: 5,
    padding: 10,
    borderRadius: 10,
  },
});

export default CreateItinScreen;