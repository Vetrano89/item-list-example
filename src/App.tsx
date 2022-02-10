import './App.css';
import Input from './components/input';
import ListInputControl from './components/list-input-control';

function App() {
  return (
    <div className="App">
      <div>
        <ListInputControl
          label="Top 3 priorities"
          placeholder="Enter your priorities here"
          disabled={false}
        />
      </div>
    </div>
  );
}

export default App;
