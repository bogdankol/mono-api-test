self.onmessage = function (event) {
  const { number } = event.data;

  // Heavy computation
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += i;
    console.log({result})
  }

  postMessage(result);
};