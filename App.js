import { useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Card from "./components/Card";
import ModalComponent from "./components/ModalComponent";
import { shuffle } from "./helpers/shuffle";

const cards = ["🐷", "👻", "⚽", "🔑", "🍩", "🥑"];

const HEIGHT = Dimensions.get("screen").height;

export default function App() {
  const [board, setBoard] = useState(() => shuffle([...cards, ...cards]));
  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [fail, setFail] = useState(0);

  useEffect(() => {
    if (selectedCards.length < 2) return;

    if (board[selectedCards[0]] === board[selectedCards[1]]) {
      setMatchedCards([...matchedCards, ...selectedCards]);
      setSelectedCards([]);
      setScore(score + 10);
    } else {
      setFail(fail + 1);
      const timeoutId = setTimeout(() => setSelectedCards([]), 800);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedCards]);

  const handleTapCard = (index) => {
    if (selectedCards.length >= 2 || selectedCards.includes(index)) return;
    setSelectedCards([...selectedCards, index]);
  };

  const didPlayerWin = () => matchedCards.length === board.length;

  const resetGame = () => {
    setMatchedCards([]);
    setSelectedCards([]);
    setScore(0);
    setFail(0);
    setBoard(() => shuffle([...cards, ...cards]));
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar backgroundColor="#1B2430" barStyle="light-content" />
      <Text style={styles.title}>Memory Game</Text>
      <View style={styles.containerScore}>
        <Text style={styles.score}>Score: {score}</Text>
      </View>
      {fail !== 0 && (
        <View style={styles.containerFail}>
          <Text style={styles.fail}>{fail} - 5 Fail</Text>
        </View>
      )}
      <ModalComponent
        fail={fail}
        didPlayerWin={didPlayerWin}
        resetGame={resetGame}
      />

      <View style={styles.contentCard}>
        {board.map((card, index) => {
          const isTurnedOver =
            selectedCards.includes(index) || matchedCards.includes(index);
          return (
            <Card
              key={index}
              card={card}
              onPress={() => handleTapCard(index)}
              isTurnedOver={isTurnedOver}
              fail={fail}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#1B2430",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: HEIGHT <= 640 ? 50 : 0,
  },
  title: {
    color: "#EDE4E0",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.5,
    top: -10,
  },
  contentCard: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  containerScore: {
    position: "absolute",
    top: 20,
    right: 40,
    backgroundColor: "#379237",
    height: 20,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 5,
  },
  score: {
    color: "#EDE4E0",
    fontSize: 12,
    letterSpacing: 0.5,
    fontWeight: "bold",
  },
  containerFail: {
    position: "absolute",
    top: 20,
    left: 40,
    height: 20,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 5,
    backgroundColor: "#DC3535",
  },
  fail: {
    color: "#EDE4E0",
    fontSize: 12,
    letterSpacing: 0.5,
    fontWeight: "bold",
  },
});
