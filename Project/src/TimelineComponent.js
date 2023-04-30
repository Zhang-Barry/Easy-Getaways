import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';


const TimelinePlaceComponent = ( {item, index} ) => {
  return (
    <View style={styles.placeContainer}>
      <View style={styles.placeIndexContainer}><Text style={{fontSize: 30, fontWeight: 800, color:"dimgray"}}>{++index}</Text></View>
      <View>
        <Text style={{fontSize: 25}}>{item?.place_json?.name}</Text>
        <Text style={styles.subText}>{item?.place_json?.type}</Text>
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
    backgroundColor: 'gainsboro',
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom:5,
  },
  subText: {
    // marginTop: 5,
    color: 'gray',
    // fontSize: 14,
    // textAlign: 'center',
    // fontStyle: 'italic',
    // fontWeight: 'bold',
  },
  placeContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "lightgray",
    marginTop: 5,
    padding: 5,
    borderRadius: 10,
  },
  placeIndexContainer: {
    backgroundColor: "silver",
    borderRadius: 10,
    height: 50,
    width: 50,
    marginRight: 5,
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