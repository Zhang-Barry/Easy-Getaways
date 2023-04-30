import * as React from 'react';
import {useEffect, useState} from 'react';
<<<<<<< Updated upstream
import { View, Text, Image, TouchableOpacity } from 'react-native';
=======
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
>>>>>>> Stashed changes
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_PLACES_API_KEY} from '@env'
import { getPlacesData } from "../handlers/travelAPI";
import { FontAwesome } from '@expo/vector-icons';

import ItemCardContainer from "../containers/ItemCardContainer"
import { notfound } from '../../assets';
export default function Home({ navigation }) {

    // fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=cruise&location=-33.8670522%2C151.1957362&radius=1500&type=restaurant&key=AIzaSyD4Cu4c5naHu-ozNziPdbzQoxczaXnpEKQ')
    // .then(response => response.json())
    // .then(data => {
    //     const location = data.results[0].geometry.location;
    //     // console.log(`Latitude: ${location.lat}, Longitude: ${location.lng}`);
    // })
    // .catch(error => console.error(error));
    // const fetchResult = await fetchData(`${REACT_APP_API_URL}/dj-rest-auth/registration/`, 'POST', body);
<<<<<<< Updated upstream
    const [type, setType] = useState("attractions");
    const [isLoading, setIsLoading] = useState(false);
=======
    const [type, setType] = useState("restaurants");
    const [isLoading, setIsLoading] = useState(true);
>>>>>>> Stashed changes
    const [mainData, setMainData] = useState([]);


    const [bl_lat, setBl_lat] = useState(null);
    const [bl_lng, setBl_lng] = useState(null);
    const [tr_lat, setTr_lat] = useState(null);
    const [tr_lng, setTr_lng] = useState(null);

<<<<<<< Updated upstream
    console.log(mainData)

=======
    console.log(mainData);
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
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
=======
        <SafeAreaView className="flex-1 relative">
          <View className="flex-row items-center mx-4 rounded-xl py-1 px-4 mt-4 shadow-lg">
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
              {/* <Text>Restaurants: {mainData?.map((data,i)=> 
                  data?.name
              )}</Text> */}

              
          </View>
          {/* Code below is for components but not working
          <View className="px-4 mt-8 flex-row items-center justify-evenly flex-wrap">
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
          {isLoading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="pink"/>
            </View> ) : ( 
          
            <ScrollView>
              <View>
                <View className="flex-row items-center justify-between px-4 mt-8">
                  <Text className="text-[28px] font-bold">Popular</Text>
                  <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                    <Text className="text-[18px] text-gray-500 font-bold">Explore</Text>
                    <FontAwesome name="long-arrow-right" size={20} color="gray"/>
                    </TouchableOpacity>
                </View>

                <View className="px-2 mt-8 flex-row items-center justify-evenly flex-wrap">
                  {mainData?.length > 0 ? (
                    <>
                      {mainData?.map((data, i) => (
                        <ItemCardContainer 
                        key={i} 
                        imageSrc= {
                          data?.photo?.images?.medium?.url ?
                          data?.photo?.images?.medium?.url :
                          "https://pixabay.com/photos/architecture-building-skyscraper-7947727/"
                        } 
                        title={data?.name}
                        location={data?.location_string} />
                      ))}
                    </>
                  ) : (
                    <>
                      <View className="w-full h-[400px] items-center sapce-y-8 justify-center">
                        <Image source={notfound} className="w-32 h-32 object-cover"/>
                        <Text className="text-[16px] my-5 font-semibold"> Oops! No Data Found...</Text>
                      </View>
                    </>
                  )}
                </View>

              </View>
            </ScrollView>)
          }
        </SafeAreaView>
>>>>>>> Stashed changes
    );
}