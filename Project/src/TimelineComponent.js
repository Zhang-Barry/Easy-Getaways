import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';

const TimelinePlaceComponent = ( {item, index} ) => {
  return (
    <View style={styles.placeContainer}>
      <View style={styles.placeIndexContainer}><Text style={{fontSize: 30, fontWeight: 800, color:"lightgray"}}>{++index}</Text></View>
      <View>
        <Text style={{fontSize: 25, fontWeight:500}}>{item?.place_json?.name}</Text>
        <Text style={styles.subText}>{item?.place_json?.type}</Text>
        <Text>{item?.place_json?.location}</Text>
      </View>
    </View>
  )
}

export default function TimelineComponent({ navigation, itin }) {
  return (
    <View style={styles.container}>
          {
            (itin.length == 0)
              ? <Text>This Itinerary is empty.</Text>
              :
              <>
                {
                  itin?.itinerary.map( (item, index) => <TimelinePlaceComponent item={item} index={index}/> )
                }
                <Text style={styles.endText}> ● END OF ITINERARY</Text>
              </>
          }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#E8E8E8',
    // borderRadius: 10,
    // paddingLeft: 10,
    // paddingTop: 5,
    // paddingRight: 10,
    // paddingBottom:10,
  },
  subText: {
    // marginTop: 5,
    color: 'dimgray',
    // fontSize: 14,
    // textAlign: 'center',
    // fontStyle: 'italic',
    fontWeight: 'bold',
  },
  placeContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "lightgray",
    marginTop: 5,
    padding: 10,
    borderRadius: 10,
  },
  placeIndexContainer: {
    backgroundColor: "dimgray",
    borderRadius: 10,
    height: 50,
    width: 50,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  endText: {
    marginTop: 5,
    color: 'gray',
    fontSize: 14,
    // textAlign: 'center',
    // fontStyle: 'italic',
    fontWeight: 'bold',
  },
});