import { useCallback, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { birdSightings } from "@/components/data";
import { BirdCard } from "@/components/uiElements";
import { router } from "expo-router";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import {
  getAllBirdsData,
  getBirdDataWithDate,
  getLatestBirdData,
} from "@/components/helperMethods";

export default function App() {
  const [birdData, setBirdData] = useState(birdSightings);
  const [filter, setFilter] = useState(1);
  const [date, setDate] = useState(dayjs());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const filters = [
    {
      id: 1,
      title: "All",
    },
    {
      id: 2,
      title: "Latest",
    },
    {
      id: 3,
      title: "Date",
    },
  ];
  const handleFilterChange = (filter: number) => {
    setFilter(filter);
    if (filter === 1) {
      setLoading(true);
      getAllBirdsData((res) => {
        console.log("response of all bird data api :", res);
      }).finally(() => setLoading(false));
    } else if (filter === 2) {
      setLoading(true);
      getLatestBirdData((res) => {
        console.log("response of latest bird data api :", res);
      }).finally(() => setLoading(false));
    } else {
      {
        setShowDatePicker(true);
      }
    }
  };
  const FilterButtons = () => {
    return (
      <View style={styles.filterBox}>
        {filters.map((x, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={[
                styles.filterButton,
                { backgroundColor: x.id === filter ? "#4A90E2" : "#D5D5D5" },
              ]}
              onPress={() => handleFilterChange(x.id)}
            >
              <Text>{x.title}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={{ paddingTop: "12%" }} />
      <FilterButtons />
      {showDatePicker ? (
        <DateTimePicker
          mode="single"
          date={date}
          onChange={(params) => {
            setDate(params.date);
            setShowDatePicker(false);
            setLoading(true);
            getBirdDataWithDate(params.date, (res) => {
              console.log("response of date sorted bird data api :", res);
            }).finally(() => setLoading(false));
          }}
        />
      ) : loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} color={"#4A90E2"} />
        </View>
      ) : (
        <FlatList
          data={birdData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <BirdCard
              date={item.date}
              time={item.time}
              birdName={item.birdName}
              latitude={item.latitude}
              longitude={item.longitude}
              onDetailsPress={() =>
                router.push({
                  pathname: "/screens/birdDetails",
                  params: { birdName: item.birdName },
                })
              }
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  filterBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignSelf: "center",
  },
  filterButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 30,
    borderWidth: 1,
  },
});
