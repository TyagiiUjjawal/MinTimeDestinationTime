import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

// Function to find the vertex with the minimum distance value
function minDistance(distances, visited) {
  let min = Infinity;
  let minIndex = -1;

  for (let i = 0; i < distances.length; i++) {
    if (!visited[i] && distances[i] <= min) {
      min = distances[i];
      minIndex = i;
    }
  }

  return minIndex;
}

// Dijkstra's algorithm function
function dijkstra(graph, start) {
  const vertices = graph.length;
  const distances = new Array(vertices).fill(Infinity);
  const visited = new Array(vertices).fill(false);

  distances[start] = 0;

  for (let i = 0; i < vertices - 1; i++) {
    const u = minDistance(distances, visited);
    visited[u] = true;

    for (let v = 0; v < vertices; v++) {
      if (
        !visited[v] &&
        graph[u][v] !== 0 &&
        distances[u] !== Infinity &&
        distances[u] + graph[u][v] < distances[v]
      ) {
        distances[v] = distances[u] + graph[u][v];
      }
    }
  }

  return distances;
}

const ShortestDistance = () => {
  const graph = [
    [0, 5, 10, 0, 0], // A: [A->A, A->B, A->C, A->D, A->E]
    [5, 0, 0, 3, 0], // B: [B->A, B->B, B->C, B->D, B->E]
    [10, 0, 0, 1, 2], // C: [C->A, C->B, C->C, C->D, C->E]
    [0, 3, 1, 0, 6], // D: [D->A, D->B, D->C, D->D, D->E]
    [0, 0, 2, 6, 0], // E: [E->A, E->B, E->C, E->D, E->E]
  ];

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [shortestDistance, setShortestDistance] = useState(null);

  const handleCalculate = () => {
    if (source && destination) {
      const sourceIndex = source.charCodeAt(0) - 65; // Assuming the vertices are labeled A, B, C, ...
      const destinationIndex = destination.charCodeAt(0) - 65;

      const distances = dijkstra(graph, sourceIndex);
      const shortestDist = distances[destinationIndex];

      if (shortestDist === Infinity) {
        setShortestDistance("No path found.");
      } else {
        setShortestDistance(shortestDist);
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>
        Shortest Distance Finder
      </Text>

      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Source (A, B, C, ...)"
        onChangeText={(text) => setSource(text)}
      />

      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Destination (A, B, C, ...)"
        onChangeText={(text) => setDestination(text)}
      />

      <Button title="Calculate" onPress={handleCalculate} />

      {shortestDistance !== null && (
        <Text style={{ fontSize: 18, marginTop: 20 }}>
          Shortest distance from {source} to {destination}: {shortestDistance}
        </Text>
      )}

      <Text style={{ fontSize: 18, marginTop: 20 }}>
        Vertices/Stations: A, B, C, D, E
      </Text>
    </View>
  );
};

export default ShortestDistance;
