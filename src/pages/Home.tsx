import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center w-scren h-screen text-base-100 font-bold">
      <div className="bg-primary w-full">teste</div>
      <div className="flex-grow flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-2 bg-accent rounded-lg p-5">
          <div className="flex flex-row gap-2">
            <input
              className="input w-96 text-neutral"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="btn btn-primary font-bold"
              onClick={() => navigate(`/search?q=${search}`)}
            >
              Procurar
            </button>
          </div>
          <div>Dica: A sintaxe é a mesma do Scryfall</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
