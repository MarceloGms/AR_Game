import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";

const Block = ({ index, guess, word, guessed, isIncomplete }) => {
  const letter = guess[index];
  const wordLetter = word[index];

  const blockStyles = [
    "border-2 border-zinc-800 w-12 h-12 items-center justify-center rounded-lg m-1",
  ];
  const textStyles = ["text-xl font-bold text-zinc-800"];

  if (isIncomplete && !letter) {
    blockStyles.push("bg-red-500 border-red-500");
    textStyles.push("text-white");
  } else if (letter === wordLetter && guessed) {
    blockStyles.push("bg-green-600 border-green-600");
    textStyles.push("text-white");
  } else if (word.includes(letter) && guessed) {
    blockStyles.push("bg-yellow-600 border-yellow-600");
    textStyles.push("text-white");
  } else if (guessed) {
    blockStyles.push("bg-gray-600 border-gray-600");
    textStyles.push("text-white");
  }

  return (
    <View className={blockStyles.join(" ")}>
      <Text className={textStyles.join(" ")}>{letter}</Text>
    </View>
  );
};

const GuessRow = ({ guess, word, guessed, isIncomplete }) => {
  return (
    <View className="flex-row justify-center mt-4">
      {Array.from({ length: word.length }).map((_, index) => (
        <Block
          key={`${guess}-${index}-${word[index]}`}
          index={index}
          guess={guess}
          word={word}
          guessed={guessed}
          isIncomplete={isIncomplete}
        />
      ))}
    </View>
  );
};

const KeyboardRow = ({ letters, onKeyPress }) => (
  <View className="flex-row justify-center mb-2">
    {letters.map((letter) => (
      <TouchableOpacity onPress={() => onKeyPress(letter)} key={letter}>
        <View className="bg-zinc-100 p-2 px-4 mx-1 rounded-md">
          <Text className="font-bold text-xl">{letter}</Text>
        </View>
      </TouchableOpacity>
    ))}
  </View>
);

const Keyboard = ({ onKeyPress, letters }) => {
  const row = letters.slice(0, 10);
  row.push("⌫");

  return (
    <View className="flex-col">
      <KeyboardRow letters={row} onKeyPress={onKeyPress} />
      <View className="flex-row justify-center">
        <TouchableOpacity onPress={() => onKeyPress("ENTER")}>
          <View className="bg-zinc-100 p-2 px-3 mx-1 rounded-md">
            <Text className="font-bold text-xl ">ENTER</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function FindWordScreen({ route }) {
  const navigation = useNavigation();
  const [guesses, setGuesses] = useState([""]); // Start with one empty guess row
  const [gameComplete, setGameComplete] = useState(false);
  const [letters, setLetters] = useState([]);
  const [word, setWord] = useState("");
  const [showMissingLetters, setShowMissingLetters] = useState(false); // Track incomplete guesses

  const completedCheckpoints = route.params.checkpoints;

  useEffect(() => {
    // Set letters and word based on the parameters
    const letters = completedCheckpoints.map((checkpoint) => checkpoint.label);
    // set letters to uppercase
    letters.map((letter, index) => {
      letters[index] = letter.toUpperCase();
    });
    setLetters(letters);
    setWord(route.params.monumentName.toUpperCase());
  }, [completedCheckpoints, route.params.monumentName]);

  const handleKeyPress = (letter) => {
    if (gameComplete) return;

    const currentGuess = guesses[guesses.length - 1];

    // Clear the "Missing Letters" state when starting a new attempt
    if (showMissingLetters && letter !== "ENTER") {
      setShowMissingLetters(false);
    }

    // Handle Enter key to submit guess
    if (letter === "ENTER") {
      if (currentGuess.length !== word.length) {
        setShowMissingLetters(true); // Show missing letters indication
        setTimeout(() => setShowMissingLetters(false), 2000); // Hide after 2 seconds
        return;
      }

      // Check if guess is correct
      if (currentGuess === word) {
        setGameComplete(true);
        navigation.navigate("EndScreen", {
          name: route.params.monumentName,
          guesses: guesses.length,
        });
      }

      // Add a new empty guess row for the next attempt
      setGuesses([...guesses, ""]);
      return;
    }

    // Handle Backspace key to delete last letter
    if (letter === "⌫") {
      setGuesses((prevGuesses) => {
        const updatedGuesses = [...prevGuesses];
        updatedGuesses[updatedGuesses.length - 1] = currentGuess.slice(0, -1);
        return updatedGuesses;
      });
      return;
    }

    // Limit guess length to word length
    if (currentGuess.length >= word.length) return;

    // Add the letter to the current guess
    setGuesses((prevGuesses) => {
      const updatedGuesses = [...prevGuesses];
      updatedGuesses[updatedGuesses.length - 1] = currentGuess + letter;
      return updatedGuesses;
    });
  };

  const resetGame = () => {
    setGuesses([""]); // Reset to one empty guess row
    setGameComplete(false);
  };

  return (
    <SafeAreaView className="flex-1 justify-between bg-yellow-500/80">
      {/* Try Counter */}
      <View className="pt-8 px-4">
        <Text className="text-xl font-bold text-center">
          Attempts: {guesses.length-1}
        </Text>
      </View>

      {/* Missing Letters Label */}
      {showMissingLetters && (
          <View className="items-center">
            <Text className="text-red-600 font-bold text-lg">
              Missing letters! Fill all spaces.
            </Text>
          </View>
      )}

      {/* Guesses */}
      <View className="pt-8">
        {guesses.map((guess, index) => (
          <GuessRow
            key={`${guess}-${index}-${new Date().getTime()}`}
            guess={guess}
            word={word}
            guessed={index < guesses.length - 1 || gameComplete}
            isIncomplete={showMissingLetters && index === guesses.length - 1}
          />
        ))}
      </View>
      <View className="pb-8">
        <Keyboard onKeyPress={handleKeyPress} letters={letters} />
      </View>
    </SafeAreaView>
  );
}
