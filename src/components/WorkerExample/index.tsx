'use client'

import { useState, useEffect } from 'react';

function WorkerExample() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const startWorker = () => {
    setLoading(true);
    const worker = new Worker(
      new URL('../../lib/shared-worker.ts', import.meta.url),
      { type: 'module'}
    );

    worker.onmessage = (e) => {
      setResult(e.data);
      setLoading(false);
      worker.terminate(); // clean up
    };

    worker.postMessage({ number: 5 }); // send data
  };

  return (
    <div>
      <button onClick={startWorker}>Start Calculation</button>
      {loading && <p>Calculating...</p>}
      {result !== null && <p>Result: {result}</p>}
    </div>
  )
}

export default WorkerExample