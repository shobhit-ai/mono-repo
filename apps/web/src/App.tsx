import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [missingNumber, setMissingNumber] = useState<number>(0);

  useEffect(() => {
    let arr = [1, 4, 3, 5, 6, 7, 8, 9];
    let sum = 0;

    console.log('Starting loop...');

    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
      console.log(`i=${i}, arr[i]=${arr[i]}, sum=${sum}`);
    }

    console.log('Final sum:', sum);

    let expectedSum = 9 * 10 / 2;
    let missing = expectedSum - sum;

    console.log('Expected sum:', expectedSum);
    console.log('Missing number:', missing);

    setMissingNumber(missing);
  }, []);

  return (
    <>

      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
