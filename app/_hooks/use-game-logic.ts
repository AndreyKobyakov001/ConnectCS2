import { useEffect, useMemo, useRef, useState } from "react";
import { categories } from "../_examples";
import { Category, SubmitResult, Word } from "../_types";
import { delay, shuffleArray } from "../_utils";

export default function useGameLogic() {
  const [gameWords, setGameWords] = useState<Word[]>([]);
  const selectedWords = useMemo(
    () => gameWords.filter((item) => item.selected),
    [gameWords]
  );
  const [clearedCategories, setClearedCategories] = useState<Category[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [isLost, setIsLost] = useState(false);
  const [mistakesRemaining, setMistakesRemaning] = useState(4);
  const guessHistoryRef = useRef<Word[][]>([]);

  //NEW!
  useEffect(() => {
    // Step 1: Shuffle the categories
    const shuffledCategories = shuffleArray(categories);

    // Step 2: Select the first 4 categories
    const selectedCategories = shuffledCategories.slice(0, 4);

    // Step 3: From each selected category, shuffle the words and select 4
    const words: Word[] = selectedCategories
      .map((category) =>
        shuffleArray(category.items)
          .slice(0, 4)
          .map((word, index) => ({ word: word, level: index + 1 }))
      )
      .flat();

    // Step 4: Set the shuffled words as the game words
    setGameWords(shuffleArray(words));
  }, []);

  const selectWord = (word: Word): void => {
    const newGameWords = gameWords.map((item) => {
      // Only allow word to be selected if there are less than 4 selected words
      if (word.word === item.word) {
        return {
          ...item,
          selected: selectedWords.length < 4 ? !item.selected : false,
        };
      } else {
        return item;
      }
    });

    setGameWords(newGameWords);
  };

  const shuffleWords = () => {
    setGameWords([...shuffleArray(gameWords)]);
  };

  const deselectAllWords = () => {
    setGameWords(
      gameWords.map((item) => {
        return { ...item, selected: false };
      })
    );
  };

  const getSubmitResult = (): SubmitResult => {
    const sameGuess = guessHistoryRef.current.some((guess) =>
      guess.every((word) => selectedWords.includes(word))
    );

    if (sameGuess) {
      console.log("Same!");
      return { result: "same" };
    }

    guessHistoryRef.current.push(selectedWords);

    const likenessCounts = categories.map((category) => {
      return selectedWords.filter((item) => category.items.includes(item.word))
        .length;
    });

    const maxLikeness = Math.max(...likenessCounts);
    const maxIndex = likenessCounts.indexOf(maxLikeness);

    if (maxLikeness === 4) {
      return getCorrectResult(categories[maxIndex]);
    } else {
      return getIncorrectResult(maxLikeness);
    }
  };

  const getCorrectResult = (category: Category): SubmitResult => {
    setClearedCategories([...clearedCategories, category]);
    setGameWords(
      gameWords.filter((item) => !category.items.includes(item.word))
    );

    if (clearedCategories.length === 3) {
      return { result: "win" };
    } else {
      return { result: "correct" };
    }
  };

  const getIncorrectResult = (maxLikeness: number): SubmitResult => {
    setMistakesRemaning(mistakesRemaining - 1);

    if (mistakesRemaining === 1) {
      return { result: "loss" };
    } else if (maxLikeness === 3) {
      return { result: "one-away" };
    } else {
      return { result: "incorrect" };
    }
  };

  const handleLoss = async () => {
    // Filter to only include categories that were part of the current game
    const remainingCategories = categories.filter((category) =>
      gameWords.some((word) => category.items.includes(word.word))
    );

    deselectAllWords();

    // Show the correct groupings for only the categories currently in the game
    for (const category of remainingCategories) {
      await delay(1000);
      setClearedCategories((prevClearedCategories) => [
        ...prevClearedCategories,
        category,
      ]);
      setGameWords((prevGameWords) =>
        prevGameWords.filter((item) => !category.items.includes(item.word))
      );
    }

    await delay(1000);
    setIsLost(true);

    // Add some delay before resetting the game
    await delay(2000);
    resetGame(); // Reset the game
  };

  const handleWin = async () => {
    await delay(1000);
    setIsWon(true);
    //NEW!
    await delay(2000); // Add some delay before resetting the game
    resetGame(); // Reset the game
  };

  //NEW!

  const resetGame = () => {
    // Step 1: Shuffle the categories
    const shuffledCategories = shuffleArray(categories);

    // Step 2: Select the first 4 categories
    const selectedCategories = shuffledCategories.slice(0, 4);

    // Step 3: From each selected category, shuffle the words and select 4
    const words: Word[] = selectedCategories
      .map((category) =>
        shuffleArray(category.items)
          .slice(0, 4)
          .map((word) => ({
            word: word,
            level: category.level,
          }))
      )
      .flat();

    // Step 4: Set the shuffled words as the game words
    setGameWords(shuffleArray(words));

    // Resetting other game states
    setClearedCategories([]);
    setIsWon(false);
    setIsLost(false);
    setMistakesRemaning(4);
    guessHistoryRef.current = [];
  };

  return {
    gameWords,
    selectedWords,
    clearedCategories,
    mistakesRemaining,
    isWon,
    isLost,
    guessHistoryRef,
    selectWord,
    shuffleWords,
    deselectAllWords,
    getSubmitResult,
    handleLoss,
    handleWin,
    resetGame, //NEW!
  };
}

