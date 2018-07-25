
// Optimized Solution
// memoize basic tree of all words provided
// start recursively creating all permutations of string provided
//   find current permutation in word tree
//   if current permutation is not in dictionary, end recursive branch
//   if current permutation 'isWord', add to results

const addWordToDictionary = (dictionary, word) => {
  if (!word) {
    return { isWord: true, ...dictionary };
  }
  dictionary[word[0]] = dictionary[word[0]] || {};
  dictionary[word[0]] = addWordToDictionary(dictionary[word[0]], word.slice(1));
  return dictionary;
};

const memoizeDictionaryTree = (list) => {
  const dictionary = list.reduce(addWordToDictionary, {});
  return (string) => {
    const foundWords = {};
    const testWord = (remString, currentString, currentDictionary) => {
      if (currentDictionary) {
        if (currentDictionary.isWord) { foundWords[currentString] = true; }
        for (let i = 0; i < remString.length; i++) {
          const letter = remString[i];
          testWord(remString.slice(0, i) + remString.slice(i + 1), currentString + letter, currentDictionary[letter]);
        }
      }
    };
    testWord(string, '', dictionary);
    return Object.keys(foundWords);
  };
};


const time = new Date();
const getValidWords = memoizeDictionaryTree(['abcd', 'abc', 'abcde', 'abcc']);
console.log(getValidWords('acbcdefg'));
console.log(getValidWords('acbcddfg'));
console.log(getValidWords('acbcccfg'));

console.log('optimized solution:', time - new Date());


// Neive solution
// memoize dictinary of all words
// iterate through current letters, get all permutations of those letters
// add permutations found in dictionary to results
// return results

const _memoizeDictionary = (list) => {
  const dictionary = list.reduce((accum, word) => {
    accum[word] = true;
    return accum;
  }, {});
  return (string) => {
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
};

const _time = new Date();
const _getValidWords = _memoizeDictionary(['abcd', 'abc', 'abcde', 'abcc']);
console.log(_getValidWords('acbcdefg'));
console.log(_getValidWords('acbcddfg'));
console.log(_getValidWords('acbcccfg'));
console.log('neive solution: ', _time - new Date());
