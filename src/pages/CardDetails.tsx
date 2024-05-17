import { useEffect, useState } from "react";
import SearchIcon from "../svg/SearchIcon.svg";
import { useSearchParams } from "react-router-dom";
import { scryfallAPI } from "../api/scryfall.api";
import SpinnerCard from "../components/SpinnerCard/SpinnerCard.component";
import CardInfo from "../components/CardInfo/CardInfo.component";

function CardDetails() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>("");
  const [id, setId] = useState<string>(searchParams.get("id") ?? "");
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  function getCard() {
    setLoading(true);
    setId(searchParams.get("id") ?? "");
    scryfallAPI
      .get(`/cards/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setData(null);
      });
  }

  useEffect(() => {
    getCard();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-scren h-screen font-bold">
      <div className="bg-primary w-full flex flex-row p-2 justify-center items-center">
        <div className="w-full max-w-lg flex flex-row justify-center items-center gap-2">
          <input
            className="input text-neutral w-full h-8"
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
            className="btn btn-sm btn-accent text-base-100 h-8 w-8 p-0"
            onClick={() => (window.location.href = `/search?q=${search}`)}
          >
            <SearchIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex min-h-0 w-full flex-1 flex-col p-2 box-border">
        {data ? (
          !loading ? (
            <div className="text-neutral flex flex-col justify-center items-center w-full h-full">
              <CardInfo item={data} id={data.id + 1} />
            </div>
          ) : (
            <SpinnerCard id={0} />
          )
        ) : (
          <div className="flex-1 text-neutral flex flex-col justify-center items-center">
            Erro!
          </div>
        )}
      </div>
    </div>
  );
}

export default CardDetails;
