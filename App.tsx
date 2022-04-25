import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import Home from "./Home";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "https://api.spacex.land/graphql/",
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
}

AppRegistry.registerComponent("MyApplication", () => App);
