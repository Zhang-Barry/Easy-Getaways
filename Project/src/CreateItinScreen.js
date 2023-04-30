import React, { useState, useRef } from 'react';
import { Text, View, TextInput, Button, StyleSheet, ScrollView,  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import SelectDropdown from 'react-native-select-dropdown'
import { Country, State, City }  from 'country-state-city';
import { insertNewItin, getMyItinsFromServer } from './actions/itin';



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
  const [title, setTitle] = useState(itin.title);
  const [description, setDescription] = useState(itin.description);
  const [country, setCountry] = useState(itin.country);
  const [state, setState] = useState(itin.state);
  const [city, setCity] = useState(itin.city);
  const [itinerary, setItinerary] = useState(itin.itinerary);


  let countryToISO = {}
  Country.getAllCountries().map( a => (countryToISO[a.name] = a.isoCode))

  const [countryMapISO, setCountryMapISO] = useState( countryToISO );
  const [countryList, setCountryList] = useState(Object.keys(countryMapISO));

  const [stateMapId, setStateMapId] = useState( {} );
  const [stateList, setStateList] = useState( [] );

  const [cityList, setCityList] = useState( [] );


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
    
    const testItin = [
      {
        "extra_info": {},   // leave blank for now
        "place_json": {     // this is the JSON from the API response for this specific place.
          "name": "Wendy's",
          "type": "Restaurant",
          "location": "New York, NY",
          "url": "https://www.google.com/",
        }
      },
      {
        "extra_info": {},
        "place_json": {
          "name": "911",
          "type": "Attraction",
          "location": "New York, NY",
          "url": "https://www.google.com/",
        }
      },
    ]
    await insertNewItin(jwt, uid, title, city, state, country, description, testItin)(dispatch);


    // await insertNewItin(jwt, uid, title, city, state, country, description, itinerary)(dispatch);
    await (getMyItinsFromServer)(jwt, uid)(dispatch);
    setLoading(false);
    navigation.goBack()
  }

  return (
    <View style={styles.container}>

        <Spinner
          visible={loading}
          textContent={''}
          textStyle={styles.spinnerTextStyle}
        />

      <ScrollView>
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


      <Text style={styles.titleTextSecondary}>Timeline</Text>
      <Text>TODO</Text>


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
  }
});

export default CreateItinScreen;