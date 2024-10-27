import { useTitle } from './hooks/ts/useTitle';

const App = () => {
  const { title, changeTitle } = useTitle();

  const toggleTitle = () => {
    if (title === "Title 1") {
      changeTitle("Title 2");
    } else {
      changeTitle("Title 1");
    }
  };

  return <button onClick={toggleTitle}>Toggle title</button>;
};

export default App;
