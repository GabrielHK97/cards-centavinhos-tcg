import { useEffect, useState } from "react";
import Card from "../Card/Card.component";
import { scryfallAPI } from "../../api/scryfall.api";
import "./CardInfo.css";
import SpinnerCard from "../SpinnerCard/SpinnerCard.component";

interface IProps {
  item: any;
  id: number;
}

function CardInfo({ item, id }: IProps) {
  const [printings, setPrintings] = useState<any>({ data: [] });
  const [face, setFace] = useState<0 | 1>(0);
  const [data, setData] = useState<any>(item);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [loadingPrintings, setLoadingPrintings] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  async function getPrintings() {
    setLoadingPrintings(true);
    let more = true;
    let page = 1;
    while (more) {
      await scryfallAPI
        .get(
          `/cards/search?order=released&unique=prints&page=${page}&q=!"${item.name}"+game%3Apaper`
        )
        .then((res) => {
          setPrintings((previous: any) => {
            return { ...res.data, data: [...previous.data, ...res.data.data] };
          });
          more = res.data.has_more;
          page++;
        })
        .catch(() => {
          more = false;
          setPrintings(null);
        });
    }
    if (!more) setLoadingPrintings(false);
  }

  function getItem(id: string) {
    setLoadingData(true);
    scryfallAPI
      .get(`/cards/${id}`)
      .then((res) => {
        setData(res.data);
        setLoadingData(false);
      })
      .catch(() => {
        setData(null);
      });
  }

  function flip(face: 0 | 1) {
    setFace(face);
  }

  function isImageLoaded(loaded: boolean) {
    setLoadingImage(false);
  }

  useEffect(() => {
    getPrintings();
  }, []);

  useEffect(() => {
    if (loadingData && loadingImage && loadingPrintings) setLoading(true);
  }, [loadingData, loadingImage, loadingPrintings]);

  return !loading ? (
    <div className="w-full flex-1 min-h-0 md:flex lg:flex xl:flex sm:flex-col md:flex-row lg:flex-row lg:flex-row justify-center items-center gap-2 overflow-auto">
      <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 md:h-full lg:h-full xl:h-full mb-2 sm:mb-2 md:mb-0 lg:mb-0 xl:mb-0">
        {data ? (
          !loadingData ? (
            <Card
              id={id}
              item={data}
              flip={flip}
              isImageLoaded={isImageLoaded}
            />
          ) : (
            <SpinnerCard id={0} />
          )
        ) : (
          <div className="flex-1 text-neutral flex flex-col justify-center items-center">
            Erro!
          </div>
        )}
      </div>
      <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 h-full flex flex-col gap-2">
        <div className="w-full h-1/2 flex flex-col gap-2 border-2 border-primary text-bold p-2 rounded-lg justify-start items-center shadow">
          {item.card_faces ? (
            item.layout === "split" ? (
              <div className="overflow-auto flex-1 min-h-0 flex-col justify-center items-center">
                <div className="flex flex-col justify-center items-center">
                  <div className="w-full flex flex-row justify-start items-center">
                    <div className="flex-grow">{item.card_faces[0].name}</div>
                    <div>{item.card_faces[0].mana_cost}</div>
                  </div>
                  <div className="w-full flex flex-row justify-start items-center">
                    {item.card_faces[0].type_line}
                  </div>
                  <div className="w-full flex flex-row justify-start items-center">
                    {item.card_faces[0].oracle_text}
                  </div>
                  <div className="w-full flex flex-row justify-start items-center">
                    <i>{item.card_faces[0].flavor_text}</i>
                  </div>
                  {item.card_faces[0].power && item.card_faces[0].toughness && (
                    <div className="w-full flex flex-row justify-start items-center">
                      {item.card_faces[0].power}/{item.card_faces[0].toughness}
                    </div>
                  )}
                </div>
                <div className="border border-base-100 w-full mt-2 mb-2"></div>
                <div className="flex flex-col justify-center items-center">
                  <div className="w-full flex flex-row justify-start items-center">
                    <div className="flex-grow">{item.card_faces[1].name}</div>
                    <div>{item.card_faces[1].mana_cost}</div>
                  </div>
                  <div className="w-full flex flex-row justify-start items-center">
                    {item.card_faces[1].type_line}
                  </div>
                  <div className="w-full flex flex-row justify-start items-center">
                    {item.card_faces[1].oracle_text}
                  </div>
                  <div className="w-full flex flex-row justify-start items-center">
                    <i>{item.card_faces[1].flavor_text}</i>
                  </div>
                  {item.card_faces[1].power && item.card_faces[1].toughness && (
                    <div className="w-full flex flex-row justify-start items-center">
                      {item.card_faces[1].power}/{item.card_faces[1].toughness}
                    </div>
                  )}
                </div>
              </div>
            ) : face === 0 ? (
              <>
                <div className="w-full flex flex-row justify-start items-center">
                  <div className="flex-grow">{item.card_faces[0].name}</div>
                  <div>{item.card_faces[0].mana_cost}</div>
                </div>
                <div className="w-full flex flex-row justify-start items-center">
                  {item.card_faces[0].type_line}
                </div>
                <div className="w-full flex flex-row justify-start items-center">
                  {item.card_faces[0].oracle_text}
                </div>
                <div className="w-full flex flex-row justify-start items-center">
                  <i>{item.card_faces[0].flavor_text}</i>
                </div>
                {item.card_faces[0].power && item.card_faces[0].toughness && (
                  <div className="w-full flex flex-row justify-start items-center">
                    {item.card_faces[0].power}/{item.card_faces[0].toughness}
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="w-full flex flex-row justify-start items-center">
                  <div className="flex-grow">{item.card_faces[1].name}</div>
                  <div>{item.card_faces[1].mana_cost}</div>
                </div>
                <div className="w-full flex flex-row justify-start items-center">
                  {item.card_faces[1].type_line}
                </div>
                <div className="w-full flex flex-row justify-start items-center">
                  {item.card_faces[1].oracle_text}
                </div>
                <div className="w-full flex flex-row justify-start items-center">
                  <i>{item.card_faces[1].flavor_text}</i>
                </div>
                {item.card_faces[1].power && item.card_faces[1].toughness && (
                  <div className="w-full flex flex-row justify-start items-center">
                    {item.card_faces[1].power}/{item.card_faces[1].toughness}
                  </div>
                )}
              </>
            )
          ) : (
            <>
              <div className="w-full flex flex-row justify-start items-center">
                <div className="flex-grow">{item.name}</div>
                <div>{item.mana_cost}</div>
              </div>
              <div className="w-full flex flex-row justify-start items-center">
                {item.type_line}
              </div>
              <div className="w-full flex flex-row justify-start items-center">
                {item.oracle_text}
              </div>
              <div className="w-full flex flex-row justify-start items-center">
                <i>{item.flavor_text}</i>
              </div>
              {item.power && item.toughness && (
                <div className="w-full flex flex-row justify-start items-center">
                  {item.power}/{item.toughness}
                </div>
              )}
            </>
          )}
        </div>
        {printings ? (
          !loadingPrintings ? (
            <div className="w-full h-1/2 border-2 border-primary rounded-lg text-bold p-2 flex flex-col gap-2 shadow">
              {`Printings: (${printings.total_cards})`}
              <div className="cardInfo flex-1 min-h-0 overflow-auto flex flex-col gap-2">
                {printings.data.map((i: any) => {
                  return (
                    <button
                      className="p-1 flex flex-row justify-start items-center rounded-lg relative"
                      onClick={() => getItem(i.id)}
                    >
                      <div>- {i.set_name}</div>
                      <div className="absolute right-2">{i.set}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <SpinnerCard id={1} />
          )
        ) : (
          <div className="flex-1 text-neutral flex flex-col justify-center items-center">
            Erro!
          </div>
        )}
      </div>
    </div>
  ) : (
    <SpinnerCard id={0} />
  );
}

export default CardInfo;
