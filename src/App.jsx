import { useEffect, useRef, useState } from "react";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";

function useSearch() {
  const [search, updateSearch] = useState("");
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ""; // true
      return;
    }

    if (search === "") {
      setError("No se puede buscar una película vacía");
      return;
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una película con un número");
      return;
    }

    if (search.length < 3) {
      setError("La búsqueda debe tener al menos 3 caracteres");
      return;
    }

    setError(null);
  }, [search]);

  return { search, updateSearch, error };
}

function App() {
  const { movies } = useMovies();
  const { search, updateSearch, error } = useSearch();
  // const inputRef = useRef();
  // console.log("render");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ search });
    // const { query } = Object.fromEntries(new window.FormData(event.target)); // Un input

    // const fields = Object.fromEntries(new window.FormData(event.target)); // Un useRef para muchos inputs
    // console.log(fields);
    // const value = inputRef.current.value; // Un useRef para cada input
    // console.log(value);
  };

  const handleChange = (event) => {
    updateSearch(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center xl:mx-container-side py-8 gap-8">
      <header>
        <h1 className="text-4xl text-center text-gray-800 font-semibold mb-6">
          Buscador de Películas
        </h1>
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <input
            onChange={handleChange}
            value={search}
            // ref={inputRef}
            name="query"
            type="text"
            placeholder="Avengers, Star Wars, The Matrix..."
            className="py-2 px-4 rounded-md border-1 border-blue-600 w-72"
            // style={{
            //   border: "1px solid transparent",
            //   borderColor: error ? "red" : "transparent",
            // }}
          />
          {/* <input
            ref={inputRef}
            name="name"
            type="text"
            placeholder="Avengers, Star Wars, The Matrix..."
            className="py-2 px-4 rounded-md border-2 border-gray-900 w-72"
          /> */}
          <button
            type="submit"
            className="py-2 px-8 rounded bg-red-600 text-white font-semibold"
          >
            Buscar
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  );
}

export default App;
