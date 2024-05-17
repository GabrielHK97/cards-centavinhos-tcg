import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { scryfallAPI } from "../api/scryfall.api";
import Card from "../components/Card/Card.component";
import Spinner from "../components/Spinner/Spinner.component";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get("q") ?? "");
  const [data, setData] = useState<any>({});

  useEffect(() => {
    setSearch(searchParams.get("q") ?? "");
    scryfallAPI
      .get(`/cards/search?&q=f%3Apenny+${search}`)
      .then((res) => {
        setData(res);
      })
      .catch(() => {
        setData(null);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-scren h-screen font-bold">
      <div className="bg-primary w-full text-base-100">teste</div>
      <div className="flex min-h-0 w-full flex-1 flex-col p-5">
        {data ? (
          data.data ? (
            <div
              className="w-full overflow-y-auto grid"
              style={{
                gridTemplateRows: "repeat(35, 1fr)",
                gridTemplateColumns: "repeat(5, 1fr)",
              }}
            >
              {data.data.data.map((item: any) => {
                return <Card item={item} />;
              })}
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center">
              <Spinner className="w-56 h-56"/>
            </div>
          )
        ) : (
          <div className="flex-1 text-neutral flex flex-col justify-center items-center">
            Cards não encontrados!
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
