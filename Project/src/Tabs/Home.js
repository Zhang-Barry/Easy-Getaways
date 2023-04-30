import * as React from 'react';
import {useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_PLACES_API_KEY} from '@env'
import { getPlacesData } from "../handlers/travelAPI";

import {ItemCarDontainer} from "../containers/ItemCarDontainer"
export default function Home({ navigation }) {

    // fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=cruise&location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&key=AIzaSyD4Cu4c5naHu-ozNziPdbzQoxczaXnpEKQ')
    // .then(response => response.json())
    // .then(data => {
    //     const location = data.results[0].geometry.location;
    //     // console.log(`Latitude: ${location.lat}, Longitude: ${location.lng}`);
    // })
    // .catch(error => console.error(error));
    // const fetchResult = await fetchData(`${REACT_APP_API_URL}/dj-rest-auth/registration/`, 'POST', body);
    const [type, setType] = useState("attractions");
    const [isLoading, setIsLoading] = useState(false);
    const [mainData, setMainData] = useState([]);

    const [bl_lat, setBl_lat] = useState(null);
    const [bl_lng, setBl_lng] = useState(null);
    const [tr_lat, setTr_lat] = useState(null);
    const [tr_lng, setTr_lng] = useState(null);

    console.log(mainData)


    useEffect(() => {
        setIsLoading(true);
        getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then((data) => {
          setMainData(data);
          setInterval(() => {
            setIsLoading(false);
          }, 2000);
        });
      }, [bl_lat, bl_lng, tr_lat, tr_lng, type]);

    return (
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{flex : 1, justifyContent: "space-between", backgroundColor: "beige"}}>
            {/* <Text
                onPress={() => alert('This is the "Home" screen.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>Home Screen 
            </Text> */}
            <GooglePlacesAutocomplete
                GooglePlacesDetailsQuery={{fields: "geometry"}}
                placeholder='Search'
                fetchDetails={true}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(details?.geometry?.viewport);
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
            
            <TouchableOpacity onPress={() => alert("pressed")}>
              <Image style={{alignItems: "center", justifyContent: "center", height: 400, width: 400, resizeMode: "stretch"}} 
              source={require("../../assets/attractions_icon.png")} />
              <Text style={{textAlign: "center", alignContent: "center", justifyContent: "space-around"}}>Attractions</Text>
            </TouchableOpacity>
            {/* <Text>Restaurants: {mainData?.map((data,i)=> 
                data?.name
            )}</Text> */}

            {/* Code below is for components but not working */}
            {/* <View className="px-4 mt-8 flex-row items-center justify-evenly flex-wrap">
              {mainData?.length > 0 ? (
                <>
                  {mainData?.map((data, i) => (
                    <ItemCarDontainer
                      title={data?.name}
                      location={data?.location_string}
                    />
                  ))}
                </>
              ) : (
                <>
                  <View>
                    <Text>
                      Oops...No Data Found
                    </Text>
                  </View>
                </>
              )}
            </View> */}
        </View>
    );
}