export default () => {
  let counter = 0;
  self.onmessage = (e) => {
    postMessage(++counter);
  };
};
