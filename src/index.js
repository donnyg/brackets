module.exports = function check(str, bracketsConfig) {
  const stack = [];

  const openPairs = new Map();
  const closePairs = new Map();
  const same = new Set();

  for (let i = 0; i < bracketsConfig.length; i += 1) {
    const [open, close] = bracketsConfig[i];
    openPairs.set(open, close);
    closePairs.set(close, open);
    if (open === close) same.add(open);
  }

  for (let i = 0; i < str.length; i += 1) {
    const char = str[i];
    const top = stack.at(-1);

    if (same.has(char)) {
      if (top === char) {
        stack.pop();
      } else {
        stack.push(char);
      }
    } else if (openPairs.has(char)) {
      stack.push(char);
    } else if (closePairs.has(char)) {
      if (top === closePairs.get(char)) {
        stack.pop();
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  return stack.length === 0;
};
