self.onmessage = function (event) {
  const { number } = event.data;

  // Heavy computation
  let result = 0;
  for (let i = 0; i < number * 10000; i++) {
    result += i;
    console.log({result})
  }

  postMessage(result);
};