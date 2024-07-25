export const generateCardPairs = (size) => {
    const numbers = Array.from({ length: size / 2 }, (_, i) => i + 1);
    const cards = [...numbers, ...numbers];
    return shuffleArray(cards.map((number, id) => ({ id, number })));
  };
  
  // Utility function to shuffle cards
  const shuffleArray = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };
  