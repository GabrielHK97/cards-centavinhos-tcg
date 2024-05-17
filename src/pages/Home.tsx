import { useState } from "react";
import SearchIcon from "../svg/SearchIcon.svg";

function Home() {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="flex flex-col justify-center items-center w-scren h-screen font-bold">
      <div className="h-12 bg-primary w-full flex flex-row p-2 justify-center items-center shadow">
        <div
          className="absolute left-0 p-2"
          onClick={() => {
            window.location.href = `/`;
          }}
        >
          CentavinhosTCG
        </div>
      </div>
      <div className="flex-grow flex flex-col justify-center items-center p-2 w-full">
        <div className="flex flex-col justify-center items-center gap-5 bg-text-neutral border-2 border-primary rounded-lg p-5 w-full max-w-lg shadow">
          <div className="flex flex-row w-full shadow">
            <input
              className="input focus:outline-none text-base-100 w-full h-12 bg-neutral rounded-none rounded-l-lg"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  window.location.href = `/search?q=${search}`;
                }
              }}
            />
            <button
              className="btn btn-primary text-base-100 h-12 w-12 p-0 rounded-none rounded-r-lg"
              onClick={() => (window.location.href = `/search?q=${search}`)}
            >
              <SearchIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="text-neutral">
            Dica: A sintaxe é a mesma do Scryfall
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
