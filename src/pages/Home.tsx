import { useState } from "react";
import SearchIcon from "../svg/SearchIcon.svg";

function Home() {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="flex flex-col justify-center items-center w-scren h-screen font-bold">
      <div className="bg-primary w-full h-12  text-base-100">
        CentavinhosTCG
      </div>
      <div className="flex-grow flex flex-col justify-center items-center p-2 w-full">
        <div className="flex flex-col justify-center items-center gap-2 bg-accent rounded-lg p-5 w-full max-w-lg">
          <div className="flex flex-row gap-2 w-full">
            <input
              className="input text-neutral w-full h-12"
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
              className="btn btn-primary text-base-100 h-12 w-12 p-0"
              onClick={() => (window.location.href = `/search?q=${search}`)}
            >
              <SearchIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="text-base-100">
            Dica: A sintaxe é a mesma do Scryfall
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
