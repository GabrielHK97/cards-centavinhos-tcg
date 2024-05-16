import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { scryfallAPI } from "../apis/scryfall.api";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get("q") ?? "");
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setSearch(searchParams.get("q") ?? "");
    scryfallAPI.get(`/cards/search?&q=f%3Apenny+${search}`).then((res) => {
      setData(res.data);
      console.log(res.data.data.length);
    });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-scren h-screen text-base-100 font-bold">
      <div className="bg-primary w-full">teste</div>
      <div className="flex min-h-0 w-full flex-1 flex-col p-5">
        <div
          className="w-full overflow-y-auto grid"
          style={{
            gridTemplateRows: "repeat(35, 1fr)",
            gridTemplateColumns: "repeat(5, 1fr)",
          }}
        >
          {data.data &&
            data.data.map((item: any) => {
              console.log(item.name, ",", item.layout);
              return (
                <div>
                  {item.card_faces ? (
                    item.image_uris ? (
                      <img src={item.image_uris.png}></img>
                    ) : (
                      <img src={item.card_faces[0].image_uris.png}></img>
                    )
                  ) : (
                    <img src={item.image_uris.png}></img>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Search;
