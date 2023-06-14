import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Canvas from "react-native-canvas";

const vertices = [
  { name: "A", x: 10, y: 50 },
  { name: "B", x: 10, y: 100 },
  { name: "C", x: 60, y: 50 },
  { name: "D", x: 60, y: 100 },
  { name: "E", x: 30, y: 150 },
];

const edges = [
  { start: "A", end: "B", distance: 5 },
  { start: "E", end: "A", distance: 1 },
  { start: "A", end: "C", distance: 101 },
  { start: "B", end: "D", distance: 3 },
  { start: "C", end: "D", distance: 1 },
  { start: "C", end: "E", distance: 2 },
  { start: "D", end: "E", distance: 6 },
];

const MapPage = ({ navigation }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const renderCanvas = (ctx) => {
      // Clear the canvas
      ctx.canvas.width = 100; // Set the desired width
      ctx.canvas.height = 800; // Set the desired height
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // Render edges
      edges.forEach((edge) => {
        const startX = vertices.find((v) => v.name === edge.start).x;
        const startY = vertices.find((v) => v.name === edge.start).y;
        const endX = vertices.find((v) => v.name === edge.end).x;
        const endY = vertices.find((v) => v.name === edge.end).y;
        const labelX = (startX + endX) / 2;
        const labelY = (startY + endY) / 2;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = "black";
        ctx.stroke();

        // Render label
        ctx.font = "12px sans-serif";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(edge.distance.toString(), labelX, labelY);
      });

      // Render vertices
      vertices.forEach((vertex) => {
        ctx.beginPath();
        ctx.arc(vertex.x, vertex.y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = "blue";

        ctx.fill();

        // Render label
        ctx.font = "50px sans-serif";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(vertex.name, vertex.x, vertex.y + 25);
      });
    };

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    renderCanvas(ctx);
  }, []);

  const handleVertexPress = (vertex) => {
    navigation.navigate("ShortestDistancePage", { source: vertex });
  };

  return (
    <View style={styles.container}>
      <Canvas ref={canvasRef} style={styles.canvas} />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ShortestDistancePage")}
      >
        <Text style={styles.buttonText}>Calculate Shortest Distance</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  canvas: {
    height: 190,
    width: 100,
    alignSelf: "stretch",
    aspectRatio: 1,
    flex: 9,
  },
  button: {
    flex: 1,
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default MapPage;
