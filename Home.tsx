import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  Button,
  Text,
  View,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { Launches } from "./types";
import { ROCKETS_QUERY } from "./queries";
import { useQuery } from "@apollo/client";
import { formatDate } from "./utils";
import DropDownPicker from "react-native-dropdown-picker";

let filterItems = [
  { label: "Rocket Name", value: "Rocket Name" },
  { label: "Launch Site", value: "Launch Site" },
];

const Home = () => {
  const { data, loading } = useQuery(ROCKETS_QUERY);
  console.log(data);
  const [openRocketName, setRocketNameOpen] = useState(false);
  const [openFilterBy, setFilterByOpen] = useState(false);
  const [openLaunchSite, setLaunchSiteOpen] = useState(false);
  const [launchSite, setLaunchSite] = useState(null);
  const [rocketName, setRocketName] = useState(null);
  const [filterType, setFilterType] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const reset = () => {
    setFilterType(null);
    setActiveIndex(-1);
  };

  const onRocketNameOpen = useCallback(() => {
    setLaunchSiteOpen(false);
  }, []);

  const onFilterByOpen = useCallback(() => {
    setLaunchSiteOpen(false);
    setRocketNameOpen(false);
    setActiveIndex(-1);
  }, []);

  const onLaunchSiteOpen = useCallback(() => {
    setRocketNameOpen(false);
  }, []);

  const calculateBottomMargin = () => {
    return data.launchesUpcoming.length * 40 + 10;
  };

  const filterList = () => {
    if (!filterType) {
      return data.launchesUpcoming;
    } else {
      return filterType === "Rocket Name"
        ? data.launchesUpcoming.filter(
            (l: Launches) => l.rocket.rocket_name === rocketName
          )
        : data.launchesUpcoming.filter(
            (l: Launches) => l.launch_site.site_name === launchSite
          );
    }
  };

  const renderItem = ({ item, index }: { item: Launches; index: number }) => (
    <View style={styles.flatlistContainer}>
      <Text>{`Misson name: ${item.mission_name}`}</Text>
      {activeIndex === index && (
        <>
          <Text>{`Launch Date: ${formatDate(item.launch_date_local)}`}</Text>
          <Text>{`Launch Site: ${item.launch_site.site_name}`}</Text>
          <Text>{`Mission ID: ${item.mission_id}`}</Text>
          <Text>{`Rocket Name: ${item.rocket.rocket_name}`}</Text>
          <Text>{`Rocket Company Name: ${item.rocket.rocket.company}`}</Text>
          <Text>{`Rocket Mass: ${item.rocket.rocket.mass.lb} lbs`}</Text>
        </>
      )}
      <Button title="details" onPress={() => setActiveIndex(index)} />
    </View>
  );

  if (loading) return <Text>Loading...</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 24, margin: 20 }}>Upcoming Rocket Launches</Text>
      <View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
          <Button onPress={() => reset()} title="reset filter" />
          <Button
            onPress={() =>
              Alert.alert(
                "Chris Banning\n302-750-8949\nchrisbanning510@gmail.com"
              )
            }
            title="about me"
          />
        </View>

        <Text style={{ margin: 10 }}>Filter by: </Text>
        <DropDownPicker
          open={openFilterBy}
          onOpen={onFilterByOpen}
          value={filterType}
          items={filterItems}
          setOpen={setFilterByOpen}
          style={{ marginBottom: openFilterBy ? calculateBottomMargin() : 0 }}
          placeholder="Select a filter"
          setValue={setFilterType}
          onSelectItem={(item) => {
            setLaunchSite(null);
            setRocketName(null);
          }}
        />
      </View>
      {filterType && (
        <View>
          <Text style={{ margin: 10 }}>{`Select ${filterType}`}</Text>
          {filterType === "Rocket Name" ? (
            <DropDownPicker
              style={{
                marginBottom: openRocketName ? calculateBottomMargin() : 0,
              }}
              open={openRocketName}
              onOpen={onRocketNameOpen}
              value={rocketName}
              items={data.launchesUpcoming.map((r: Launches) => ({
                label: r.rocket.rocket_name,
                value: r.rocket.rocket_name,
              }))}
              setOpen={setRocketNameOpen}
              setValue={setRocketName}
            />
          ) : (
            <DropDownPicker
              style={{
                marginBottom: openLaunchSite ? calculateBottomMargin() : 0,
              }}
              open={openLaunchSite}
              onOpen={onLaunchSiteOpen}
              value={launchSite}
              items={data.launchesUpcoming.map((r: Launches) => ({
                label: r.launch_site.site_name,
                value: r.launch_site.site_name,
              }))}
              setOpen={setLaunchSiteOpen}
              setValue={setLaunchSite}
            />
          )}
        </View>
      )}

      <FlatList
        data={filterList()}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.mission_name + index}
        contentContainerStyle={{
          marginTop: 30,
        }}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "#97dae6",
    alignItems: "center",
    justifyContent: "center",
  },
  flatlistContainer: {
    padding: 10,
    width: 300,
    margin: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "black",
  },
});
