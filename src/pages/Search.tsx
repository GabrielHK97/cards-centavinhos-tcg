import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { scryfallAPI } from "../api/scryfall.api";
import Card from "../components/Card/Card.component";
import SpinnerCard from "../components/SpinnerCard/SpinnerCard.component";
import SearchIcon from "../svg/SearchIcon.svg";
import FowardStep from "../svg/FowardStep.svg";
import FowardFast from "../svg/FowardFast.svg";
import BackwardStep from "../svg/BackwardStep.svg";
import BackwardFast from "../svg/BackwardFast.svg";

interface Size {
  height: number;
  width: number;
}

function getWindowSize(): Size {
  return { height: window.innerHeight, width: window.innerWidth };
}

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get("q") ?? "");
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const [effectivePage, setEffectivePage] = useState<number>(1);

  function getData() {
    setLoading(true);
    setSearch(searchParams.get("q") ?? "");
    console.log(searchParams.get("q"));
    scryfallAPI
      .get(`/cards/search?page=${page}&q=f%3Apenny+${search}`)
      .then((res) => {
        setData(res.data);
        setPages(
          res.data.total_cards <= 175
            ? 1
            : Math.ceil(res.data.total_cards / 175)
        );
        setLoading(false);
      })
      .catch(() => {
        setPage(0);
        setEffectivePage(0);
        setPages(0);
        setData(null);
      });
  }

  function resizeGrid() {
    const grid = document.getElementById("grid");
    const { height, width } = getWindowSize();
    const columns = Math.ceil(width / 280) > 5 ? 5 : Math.ceil(width / 280);
    const rows = data
      ? Math.ceil((data.total_cards < 175 ? data.total_cards : 175) / columns)
      : 0;
    if (grid) {
      grid!.style.setProperty("--rows", rows.toString());
      grid!.style.setProperty("--columns", columns.toString());
    }
  }

  function backwardFast() {
    setPage(1);
    setEffectivePage(1);
  }

  function backwardStep() {
    if (effectivePage - 1 > 0) {
      setPage(effectivePage - 1);
      setEffectivePage(effectivePage - 1);
    }
  }

  function fowardStep() {
    if (effectivePage + 1 < pages) {
      setPage(effectivePage + 1);
      setEffectivePage(effectivePage + 1);
    }
  }

  function fowardFast() {
    setPage(pages);
    setEffectivePage(pages);
  }

  window.addEventListener("resize", () => {
    resizeGrid();
  });

  window.addEventListener("keydown", (e: any) => {
    if (e.key === "Enter") {
      window.location.href = `/search?q=${search}`;
    }
  });

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [searchParams, effectivePage]);

  useEffect(() => {
    resizeGrid();
  }, [data]);

  return (
    <div className="flex flex-col justify-center items-center w-scren h-screen font-bold">
      <div className="bg-primary w-full flex flex-row p-2 justify-center items-center">
        <div className="w-full max-w-lg flex flex-row justify-center items-center gap-2">
          <input
            className="input text-neutral w-full h-8"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
            <div
              id="grid"
              className="w-full overflow-y-auto grid gap-2"
              style={{
                gridTemplateRows: "repeat(var(--rows), 1fr)",
                gridTemplateColumns: "repeat(var(--columns), 1fr)",
              }}
            >
              {data.data.map((item: any, index: number) => {
                return <Card item={item} id={index + 1} />;
              })}
            </div>
          ) : (
            <SpinnerCard id={0} />
          )
        ) : (
          <div className="flex-1 text-neutral flex flex-col justify-center items-center">
            Cards não encontrados!
          </div>
        )}
      </div>

      <div className="bg-primary w-full text-base-100 p-2 flex flex-row gap-2 justify-center items-center">
        <div className="hidden sm:hidden md:flex lg:flex xl:flex flex-row justify-center items-center">
          {data
            ? `${175 * (effectivePage - 1) + 1} to ${
                175 * (effectivePage - 1) + 1 + 175
              } of ${data.total_cards}`
            : "0 to 0 of 0"}
        </div>
        <div className="hidden sm:hidden md:flex lg:flex xl:flex flex-1"></div>
        <div className="flex flex-row justify-center items-center gap-2">
          <button
            className="btn btn-sm btn-accent text-base-100 h-8 w-8 p-0"
            onClick={backwardFast}
          >
            <BackwardFast className="w-4 h-4" />
          </button>
          <button
            className="btn btn-sm btn-accent text-base-100 h-8 w-8 p-0"
            onClick={backwardStep}
          >
            <BackwardStep className="w-4 h-4" />
          </button>
          <div>
            <input
              className="input h-8 w-16 text-neutral"
              type="number"
              min={1}
              step="1"
              max={pages}
              value={page}
              onChange={(e) => {
                const number = Number.parseInt(e.target.value);
                if ((number >= 1 && number <= pages) || Number.isNaN(number)) {
                  setPage(number);
                }
              }}
              onBlur={() => {
                setEffectivePage(page);
              }}
            />
            {` of ${pages}`}
          </div>
          <button
            className="btn btn-sm btn-accent text-base-100 h-8 w-8 p-0"
            onClick={fowardStep}
          >
            <FowardStep className="w-4 h-4" />
          </button>
          <button
            className="btn btn-sm btn-accent text-base-100 h-8 w-8 p-0"
            onClick={fowardFast}
          >
            <FowardFast className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
