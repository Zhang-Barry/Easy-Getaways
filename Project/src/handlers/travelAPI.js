
import axios from "axios";
import {TRAVEL_ADVISOR_API_KEY} from '@env'

export const getPlacesData = async (bl_lat, bl_lng, tr_lat, tr_lng, type) => {
  try {

    let limit = "50";
    if (type == "attractions") {
      limit = "150";
    }

    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: bl_lat ? bl_lat : "",
          tr_latitude: tr_lat ? tr_lat : "",
          bl_longitude: bl_lng ? bl_lng : "",
          tr_longitude: tr_lng ? tr_lng : "",
          limit: limit,
          currency: "USD",
          lunit: "km",
          lang: "en_US",
        },
        headers: {
          // "X-RapidAPI-Key": TRAVEL_ADVISOR_API_KEY,
          "X-RapidAPI-Key": "be4aff0927msha8627866aaae26cp15f888jsnc5b5a02a7f60",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};