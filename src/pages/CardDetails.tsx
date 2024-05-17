import { useEffect, useState } from "react";
import SearchIcon from "../svg/SearchIcon.svg";
import { useSearchParams } from "react-router-dom";
import { scryfallAPI } from "../api/scryfall.api";
import SpinnerCard from "../components/SpinnerCard/SpinnerCard.component";
import CardInfo from "../components/CardInfo/CardInfo.component";

function CardDetails() {
  const [searchParams] = useSearchParams();
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
    <div className="flex flex-col justify-center items-center w-svw h-svw font-bold">
      <div className="h-12 bg-primary w-full flex flex-row p-2 justify-center items-center shadow">
        <div
          className="flex sm:flex md:absolute lg:absolute xl:absolute left-0 sm:left-0 p-2"
          onClick={() => {
            window.location.href = `/`;
          }}
        >
          CentavinhosTCG
        </div>
        <div className="w-full max-w-lg flex flex-row justify-center items-center rounded-lg shadow">
          <input
            className="input focus:outline-none text-base-100 bg-neutral w-full h-8 rounded-none rounded-l-lg"
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
            className="btn btn-sm btn-base-100 text-neutral h-8 w-8 p-0 rounded-none rounded-r-lg"
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
