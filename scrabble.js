
const addWordToDictionary = (dictionary, word) => {
  if (!word) {
    return { isWord: true, ...dictionary };
  }
  dictionary[word[0]] = dictionary[word[0]] || {};
  dictionary[word[0]] = addWordToDictionary(dictionary[word[0]], word.slice(1));
  return dictionary;
};

const findWordInDictionary = (word, dictionary) => {
  let currentDictionary = dictionary;
  if (!word) { return null; }
  for (const letter of word) {
    if (currentDictionary[letter]) {
      currentDictionary = currentDictionary[letter];
    } else {
      return null;
    }
  }
  return currentDictionary;
};

const getValidWords = (string, list) => {
  const dictionary = list.reduce(addWordToDictionary, {});
  const sortedString = string.split('').sort().join('');
  const foundWords = {};
  const testWord = (remString, currentString) => {
    const wordInDictionary = findWordInDictionary(currentString, dictionary);
    if (wordInDictionary && wordInDictionary.isWord) { foundWords[currentString] = true; }
    if (wordInDictionary || !currentString) {
      for (let i = 0; i < remString.length; i++) {
        const letter = remString[i];
        if (letter !== string[i - 1]) {
          testWord(remString.slice(0, i) + remString.slice(i + 1), currentString + letter);
        }
      }
    }
  };
  testWord(sortedString, '');
  return Object.keys(foundWords);
};

const time = new Date();
getValidWords('acbcdefg', ['abcd', 'abc', 'abcde', 'abcc']);
console.log('optimized solution:', time - new Date());


const _getValidWords = (string, list) => {
  const dictionary = list.reduce((accum, word) => {
    accum[word] = true;
    return accum;
  }, {});
  const foundWords = {};
  const testWord = (remString, currentString) => {
    if (dictionary[currentString]) { foundWords[currentString] = true; }
    for (let i = 0; i < remString.length; i++) {
      const letter = remString[i];
      testWord(remString.slice(0, i) + remString.slice(i + 1), currentString + letter);
    }
  };

  testWord(string, '');
  return Object.keys(foundWords);
};

const _time = new Date();
_getValidWords('acbcdefg', ['abcd', 'abc', 'abcde', 'abcc']);
console.log('neive solution: ', _time - new Date());
