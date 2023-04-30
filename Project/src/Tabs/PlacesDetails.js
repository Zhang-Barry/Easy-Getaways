import * as React from 'react';
import {useEffect, useState} from 'react';
import { View, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_PLACES_API_KEY} from '@env'
import { getPlacesData } from "../handlers/travelAPI";

import {ItemCarDontainer} from "../containers/ItemCarDontainer"
export default function PlacesDetails({ navigation }) {
    const [type, setType] = useState("attractions");
    const [isLoading, setIsLoading] = useState(false);
    const [mainData, setMainData] = useState([]);

    const [bl_lat, setBl_lat] = useState(null);
    const [bl_lng, setBl_lng] = useState(null);
    const [tr_lat, setTr_lat] = useState(null);
    const [tr_lng, setTr_lng] = useState(null);

    console.log(mainData);

    const [itinerary, setItinerary] = useState([])

    useEffect(() => {
        setIsLoading(true);
        getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then((data) => {
          setMainData(data);
          setInterval(() => {
            setIsLoading(false);
          }, 2000);

          const itinFormatExample = [
            {
                "extra_info": {},
                "place_json": {
                    "name" : mainData[0] ? mainData[0]?.name : "",
                    "type" : mainData[0] ? mainData[0]?.category?.name : "",
                    "location" : mainData[0] ? mainData[0]?.address : "",
                    "url" : mainData[0] ? mainData[0]?.website : "",
                }
            }
          ]
          setItinerary(itinFormatExample)

        });

      }, [bl_lat, bl_lng, tr_lat, tr_lng, type]);

    return (
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{flex : 1}}>
            <GooglePlacesAutocomplete
                GooglePlacesDetailsQuery={{fields: "geometry"}}
                placeholder='Search'
                fetchDetails={true}
                onPress={(data, details = null) => {
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
        </View>
    );
}