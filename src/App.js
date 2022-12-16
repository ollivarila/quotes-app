import { useState, useEffect } from "react";
import axios from "axios";

const Quote = ({ text, author }) => {
  return (
    <div>
      <h2>Author: {author}</h2>
      <h2>Quote: {text}</h2>
    </div>
  );
};

const App = () => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(null);
  const [quotes, setQuotes] = useState(null);

  useEffect(() => {
    const url = "https://type.fit/api/quotes";
    axios
      .get(url)
      .then((res) => {
        setQuotes(res.data);
        setVotes(Array(res.data.length).fill(0));
      })
      .catch((err) => {
        console.error(err.message);
        setQuotes(null);
      });
  }, []);

  const handleRandomClick = () => {
    const min = 0;
    const max = quotes.length;
    const num = Math.floor(Math.random() * (max - min) + min);
    setSelected(num);
  };

  const handleVoteClick = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  if (!quotes) {
    return <h1>Loading...</h1>;
  }

  const votesCp = [...votes];
  const mostVotes = votesCp.sort((a, b) => a - b).pop();

  let index = 0;

  votes.forEach((vote, i) => {
    if (vote === mostVotes) {
      index = i;
    }
  });

  return (
    <div>
      <div>
        <h1>Quote with most votes:</h1>
        <Quote {...quotes[index]} />
      </div>
      <h1>
        <Quote {...quotes[selected]} />
        Votes: {votes[selected]}
        <button onClick={handleVoteClick}>Vote quote</button>
      </h1>
      <button onClick={handleRandomClick}>Random quote</button>
    </div>
  );
};

export default App;
