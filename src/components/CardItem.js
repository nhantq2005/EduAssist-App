import React, { useRef, useState } from "react";
import { COLORS } from "../styles/theme";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

const CardItem = ({ question, answer }) => {
  const [flipped, setFlipped] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;

  const flipCard = () => {
    const toValue = flipped ? 0 : 180;

    Animated.timing(rotation, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setFlipped(!flipped);
  };

  const frontInterpolate = rotation.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = rotation.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  return (
    <Pressable onPress={flipCard} style={{ width: '100%' }}>
      <View style={styles.cardContainer}>
        <Animated.View
          style={[
            styles.card,
            {
              transform: [{ rotateY: frontInterpolate }],
            },
          ]}
        >
          <Text style={styles.label}>Câu hỏi</Text>
          <Text style={styles.text}>
            {question || "Chưa có câu hỏi"}
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.card,
            styles.cardBack,
            {
              transform: [{ rotateY: backInterpolate }],
            },
          ]}
        >
          <Text style={styles.label}>Đáp án</Text>
          <Text style={styles.text}>
            {answer || "Chưa có đáp án"}
          </Text>
        </Animated.View>

      </View>
    </Pressable>
  );
}

export default CardItem;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: 400,
  },

  card: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,

    backfaceVisibility: "hidden",

    elevation: 6,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    borderWidth: 1,
    borderColor: '#eee',
  },

  cardBack: {
    backgroundColor: "#fdfdfd",
  },

  label: {
    fontSize: 14,
    marginBottom: 12,
    color: "#777",
  },

  text: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
  },
});