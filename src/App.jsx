import "./App.css";
import { Auth } from "./components/Auth";
import { db } from "./config/firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [movieNewTitle, setmovieNewTitle] = useState("");
  const [movieNewDateReleased, setmovieNewDateReleased] = useState(0);
  const [movieNewReceivedAnOscar, setmovieNewReceivedAnOscar] = useState(false);
  const [refreshMovies, setRefreshMovies] = useState(0); // Variável para forçar atualização
  const moviesRef = collection(db, "movies");

  useEffect(() => {
    const getMoviesList = async () => {
      const data = await getDocs(moviesRef);

      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setMovieList(filteredData);
    };
    getMoviesList();
  }, [refreshMovies]); // Agora o useEffect roda quando refreshMovies muda

  const send = async () => {
    try {
      await addDoc(moviesRef, {
        Title: movieNewTitle,
        ReleaseDate: movieNewDateReleased,
        ReceivedAnOscar: movieNewReceivedAnOscar,
      });

      // Força o useEffect a rodar novamente incrementando refreshMovies
      setRefreshMovies((prev) => prev + 1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Auth />
      {movieList.map((movie, key) => (
        <div key={key}>
          <h1 style={{ color: movie.ReceivedAnOscar ? "green" : "red" }}>
            {movie.Title}
          </h1>
          <br></br>
          <p>{movie.ReleaseDate}</p>
        </div>
      ))}
      <div>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setmovieNewTitle(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="2001"
          onChange={(e) => setmovieNewDateReleased(e.target.value)}
        />
        <input
          type="checkbox"
          checked={movieNewReceivedAnOscar}
          onChange={(e) => setmovieNewReceivedAnOscar(e.target.checked)}
        ></input>
        <br />
        <button onClick={send}> Send</button>
      </div>
    </>
  );
}

export default App;
