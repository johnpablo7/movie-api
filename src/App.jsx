import { useCallback, useEffect, useRef, useState } from "react";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import debounce from "just-debounce-it";

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
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movies, getMovies, loading } = useMovies({ search, sort });
  // const inputRef = useRef();
  // console.log("render");

  // console.log('En cada render ejecuto esto:');
  const debouncedGetMovies = useCallback(
    debounce((search) => {
      console.log("search", search);
      getMovies({ search });
    }, 300),
    [getMovies]
  );

  const handleSort = () => {
    setSort(!sort);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
    // console.log({ search });
    // const { query } = Object.fromEntries(new window.FormData(event.target)); // Un input
    // const fields = Object.fromEntries(new window.FormData(event.target)); // Un useRef para muchos inputs
    // console.log(fields);
    // const value = inputRef.current.value; // Un useRef para cada input
    // console.log(value);
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    updateSearch(newSearch);
    debouncedGetMovies(newSearch);
  };

  // useEffect(() => {
  //   console.log("new getMovies received");
  // }, [getMovies]);

  return (
    <div className="bg-slate-800">
      <div className="flex flex-col items-center justify-center px-4 xl:mx-container-side py-8 gap-8">
        <header>
          <h1 className="text-3xl xl:text-4xl text-center text-white font-semibold mb-6">
            Buscador de Películas
          </h1>
          <div className="flex flex-col gap-2">
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-4 mb-2"
            >
              <input
                onChange={handleChange}
                value={search}
                // ref={inputRef}
                name="query"
                type="text"
                placeholder="Avengers, Star Wars, The Matrix..."
                className="py-2 px-4 rounded-md border xl:w-72 outline-none xl:mb-1"
                style={{
                  borderColor: error ? "red" : "gray",
                }}
              />

              <button
                type="submit"
                className="py-2 px-8 rounded bg-red-600 text-white font-semibold"
              >
                Buscar
              </button>
            </form>
            <div className="flex items-center gap-2">
              <input type="checkbox" onChange={handleSort} checked={sort} />
              <p className="text-white">Listar por fecha de Lanzamiento</p>
            </div>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </header>

        <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
      </div>
    </div>
  );
}

export default App;
