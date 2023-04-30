import * as React from 'react';
import {useEffect, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_PLACES_API_KEY} from '@env'
import { getPlacesData } from "../handlers/travelAPI";
import { useSelector, useDispatch } from 'react-redux';
import { getMyItinsFromServer, insertNewItin } from '../actions/itin';
import Spinner from 'react-native-loading-spinner-overlay/lib';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',
      paddingLeft: 18,
      paddingRight: 18,
    },
    input: {
      width: '80%',
      height: 40,
      marginVertical: 10,
      padding: 10,
      borderWidth: 1,
      borderRadius: 5,
    },
    titleText: {
      fontSize: 40,
      fontWeight: 700,
      marginTop: 30,
    },
    locationText: {
      fontWeight: 700,
      color: 'gray',
    },
    descriptionText: {
      marginTop: 5,
    },
    metadataText: {
      marginTop: 15,
      color: "gray",
    },
    titleTextSecondary: {
      fontSize: 30,
      fontWeight: 700,
      marginTop: 30,
    },
    button: {
      backgroundColor: 'dodgerblue',
      padding: 10,
      borderRadius: 0,
      marginTop: 10,
      alignSelf: 'stretch',
      borderRadius: 10,
    },
    buttonText: {
      alignSelf:"center",
      color: "white",
      fontSize: 20,
    }
   }
  );
  

export default function AutoGenerateItin({ navigation }) {
    const dispatch = useDispatch();
    const authInfo = useSelector(state => state.auth);

    const [type, setType] = useState("attractions");
    const [isLoading, setIsLoading] = useState(false);
    const [mainData, setMainData] = useState([]);

    const [bl_lat, setBl_lat] = useState(null);
    const [bl_lng, setBl_lng] = useState(null);
    const [tr_lat, setTr_lat] = useState(null);
    const [tr_lng, setTr_lng] = useState(null);

    const [spinnerLoading, setSpinnerLoading] = useState(false);

    const [itinerary, setItinerary] = useState([])

    useEffect(() => {
        setIsLoading(true);
        setSpinnerLoading(true);
        getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then((data) => {
            if (data) setMainData(data);
          setInterval(() => {
            setIsLoading(false);
            setSpinnerLoading(false);
          }, 2000);


          const itinFormatExample = [
            {
                "extra_info": {},
                "place_json": {
                    "name" : mainData ? mainData[0]?.name : "",
                    "type" : mainData ? mainData[0]?.category?.name : "",
                    "location" : mainData ? mainData[0]?.address : "",
                    "url" : mainData ? mainData[0]?.website : "",
                }
            }
          ]

          setItinerary(itinFormatExample)
        });

      }, [bl_lat, bl_lng, tr_lat, tr_lng, type]);

      const wrapPlacesData = (placesObj) => {
        return {
          "extra_info": {},
          "place_json": {
            "name" : placesObj ? placesObj?.name : "",
            "type" : placesObj ? placesObj?.category?.name : "",
            "location" : placesObj ? placesObj?.address : "",
            "url" : placesObj ? placesObj?.website : "",
          }
        }
      }



      const generateItinerary = () => {
        if (mainData.length == 0) {
          alert("Could not find any nearby destinations.")
          return;
        };
        let randomlySelected = [];
        // console.log(mainData);

        // randomlySelected.push(    wrapPlacesData(mainData[Math.floor((Math.random()*mainData.length))])  );
        let mainDataCopy = [...mainData];
        let count = 0;
        while (count < 5) {
          if (mainDataCopy.length == 0) break;
          count += 1;
          const index = Math.floor((Math.random()*mainData.length));
          if (!mainDataCopy[index]) continue;
          if (!mainDataCopy[index].name) continue;
          randomlySelected.push(  wrapPlacesData( mainDataCopy[index]) )
          mainDataCopy.splice(index, 1); 
        }

        return randomlySelected;
      }

      const handleSubmission = async () => {
        if (!authInfo.isAuthenticated) {
          alert("Please log in first.");
          return;
        }
        const autoItin = generateItinerary();
        if (autoItin.length == 0 || !autoItin) {
          alert("Could not find any attractions nearby.");
          return;
        }
        setSpinnerLoading(true);
        await insertNewItin(authInfo["access"], authInfo["user"]["pk"], "Auto-Generated Itinerary", null, null, null, "This is an auto-generated itinerary.", autoItin)(dispatch);
        await getMyItinsFromServer(authInfo["access"], authInfo["user"]["pk"])(dispatch);
        setSpinnerLoading(false);
      }

    return (
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{flex : 1}}>

        <Spinner
          visible={spinnerLoading}
          textContent={''}
          textStyle={styles.spinnerTextStyle}
        />

            <GooglePlacesAutocomplete
                GooglePlacesDetailsQuery={{fields: "geometry"}}
                placeholder='Search'
                fetchDetails={true}
                onPress={(data, details = null) => {
                    // console.log(details?.geometry?.viewport);
                    setBl_lat(details?.geometry?.viewport?.southwest?.lat);
                    setBl_lng(details?.geometry?.viewport?.southwest?.lng);
                    setTr_lat(details?.geometry?.viewport?.northeast?.lat);
                    setTr_lng(details?.geometry?.viewport?.northeast?.lng);
                }}
                query={{
                    key: GOOGLE_PLACES_API_KEY,
                    language: 'en',
                }}
            />

            <View>
                <View style={{margin: 10}}>
                    <Text style={{fontSize: 25, textAlign: "center"}}>Enter a travel location, we will auto-generate an Itinerary for you.</Text>
                    <TouchableOpacity title="Edit Itinerary" style={styles.button} onPress={() => handleSubmission()}>
                    <Text style={styles.buttonText} >Generate</Text>
                    </TouchableOpacity>
                </View>
              </View>
        </View>
    );
}