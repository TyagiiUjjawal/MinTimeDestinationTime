import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Canvas from "react-native-canvas";

const vertices = [
  { name: "Library", x: 170, y: 200 },
  { name: "SportsC", x: 320, y: 200 },
  { name: "Market", x: 280, y: 430 },
  { name: "Moxi", x: 120, y: 430 },
  { name: "h3,h1,h2", x: 120, y: 485 },
  { name: "h7,h10,h8,h9", x: 30, y: 485 },
  { name: "GirlsHostel", x: 100, y: 80 },
  { name: "Comp. Dept", x: 230, y: 200 },
];

const edges = [
  //   { start: "Library", end: "SportsC", distance: 5 },
  //   { start: "Market", end: "Moxi", distance: 1 },
  //   { start: "h3,h1,h2", end: "h7,h10,h8,h9", distance: 101 },
  //   { start: "GirlsHostel", end: "Comp. Dept", distance: 3 },
  //   { start: "Library", end: "h7,h10,h8,h9", distance: 1 },
  //   { start: "GirlsHostel", end: "Library", distance: 2 },
  //   { start: "Market", end: "Library", distance: 6 },
];

const MapPage = ({ navigation }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const renderCanvas = (ctx) => {
      // Clear the canvas

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
        ctx.font = "10px sans-serif";
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
