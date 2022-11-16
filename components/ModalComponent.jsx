import React, { useRef } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

export default function ModalComponent({ fail, didPlayerWin, resetGame }) {
  const animation = useRef(null);

  return (
    <>
      {fail === 5 || didPlayerWin() ? (
        <View>
          <Modal transparent={true}>
            <View style={styles.containerModal}>
              <View style={styles.contentModal}>
                {fail === 5 && (
                  <>
                    <Text style={styles.gameOver}>¡Game Over!</Text>
                    <LottieView
                      autoPlay
                      ref={animation}
                      style={styles.animationLottie}
                      source={require("../assets/error.json")}
                    />
                  </>
                )}
                {didPlayerWin() && (
                  <>
                    <Text style={styles.title}>Congratulations 🎉</Text>
                    <LottieView
                      autoPlay
                      ref={animation}
                      style={styles.animationLottie}
                      source={require("../assets/congratulation-badge.json")}
                    />
                  </>
                )}
                {didPlayerWin() || fail === 5 ? (
                  <TouchableOpacity
                    onPress={resetGame}
                    style={styles.containerResetGame}
                  >
                    <Text style={styles.resetGame}>Reset game</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </Modal>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  containerModal: {
    backgroundColor: "rgba(0,0,0,0.8)",
    flex: 1,
    justifyContent: "center",
  },
  contentModal: {
    backgroundColor: "#1B2430",
    alignItems: "center",
    paddingVertical: 70,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 10,
  },
  gameOver: {
    color: "#DC3535",
    fontSize: 28,
    letterSpacing: 0.5,
    fontWeight: "bold",
    top: -20,
  },
  containerResetGame: {
    backgroundColor: "#379237",
    height: 30,
    justifyContent: "center",
    paddingHorizontal: 5,
    borderRadius: 4,
    elevation: 2,
    marginTop: 4,
    marginBottom: 15,
  },
  resetGame: {
    color: "#EDE4E0",
    fontSize: 14,
    letterSpacing: 0.5,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  title: {
    color: "#EDE4E0",
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 0.5,
    top: -20,
  },
  animationLottie: {
    width: 200,
    height: 200,
    backgroundColor: "#1B2430",
  },
});
