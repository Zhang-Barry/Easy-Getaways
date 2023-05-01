import * as React from 'react';
import {useEffect, useState} from 'react';
import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_PLACES_API_KEY} from '@env'
import { getPlacesData } from "../handlers/travelAPI";

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
    const [isLoading, setIsLoading] = useState(false);
    const [mainData, setMainData] = useState([]);
    const [mainDataRest, setMainDataRest] = useState([]); // for restaurants


    const [bl_lat, setBl_lat] = useState(null);
    const [bl_lng, setBl_lng] = useState(null);
    const [tr_lat, setTr_lat] = useState(null);
    const [tr_lng, setTr_lng] = useState(null);

    console.log(mainData);

    useEffect(() => {
      if (bl_lat && bl_lng && tr_lat && tr_lng) {
        setIsLoading(true);
        Promise.all([
          getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, "attractions"),
          getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, "restaurants"),
        ]).then(([attractionsData, restaurantsData]) => {
          setMainData(attractionsData);
          setMainDataRest(restaurantsData);
          setIsLoading(false);
        }, 2000);
      }
    }, [bl_lat, bl_lng, tr_lat, tr_lng]);



    return (
        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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


          {isLoading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="gray"/>
            </View> 
            ) : ( 
            <>
              {(mainData?.length > 0 && mainDataRest?.length > 0) ? (
                <ScrollView>
                  <View>
                    <View className="flex-row items-center justify-between px-4 mt-8">
                      <Text className="text-[28px] font-bold">Attractions</Text>
                      {/* <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                        <Text className="text-[18px] text-gray-500 font-bold">Explore</Text>
                        <FontAwesome name="long-arrow-right" size={20} color="gray"/>
                        </TouchableOpacity> */}
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
                              "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                            } 
                            title={data?.name}
                            location={data?.location_string} 
                            json={data}
                            />
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
    
    
    
    
                  <View>
                    <View className="flex-row items-center justify-between px-4 mt-8">
                      <Text className="text-[28px] font-bold">Restaurants</Text>
                      {/* <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                        <Text className="text-[18px] text-gray-500 font-bold">Explore</Text>
                        <FontAwesome name="long-arrow-right" size={20} color="gray"/>
                        </TouchableOpacity> */}
                    </View>
    
                    <View className="px-2 mt-8 flex-row items-center justify-evenly flex-wrap">
                      {mainDataRest?.length > 0 ? (
                        <>
                          {mainDataRest?.map((data, i) => (
                            <ItemCardContainer 
                            key={i} 
                            imageSrc= {
                              data?.photo?.images?.medium?.url ?
                              data?.photo?.images?.medium?.url :
                              "https://pixabay.com/photos/architecture-building-skyscraper-7947727/"
                            } 
                            title={data?.name}
                            location={data?.location_string}
                            json={data}
                            />
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
    
                </ScrollView>
              ) : (
                <>
                  <View className="w-full h-[400px] items-center sapce-y-8 justify-center">
                    <Image source={notfound} className="w-32 h-32 object-cover"/>
                    <Text className="text-[16px] my-5 font-semibold"> Oops! No Data Found...</Text>
                  </View>
                </>)}
            </>
          )}
        </SafeAreaView>
    );
}