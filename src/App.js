import Body from './components/Body';
import Header from './components/Header'

function App() {

  const year = new Date().getFullYear()

  return (
    <div className="App">
      <Header />

      <div className="body">
        <Body />
      </div>

      <div className="footer">
        Copyright MJ Clifford {year}.
      </div>

    </div>
  );
}

export default App;
