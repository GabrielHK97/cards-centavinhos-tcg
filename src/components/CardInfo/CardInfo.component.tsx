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
  const [data, setData] = useState<any>({ data: [] });
  const [face, setFace] = useState<0 | 1>(0);
  const [image, setImage] = useState<any>(item);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);

  async function getData() {
    setLoading(true);
    let more = true;
    let page = 1;
    while (more) {
      await scryfallAPI
        .get(
          `/cards/search?order=released&unique=prints&page=${page}&q=!"${item.name}"+game%3Apaper`
        )
        .then((res) => {
          setData((previous: any) => {
            return { ...res.data, data: [...previous.data, ...res.data.data] };
          });
          more = res.data.has_more;
          page++;
          setLoading(false);
        })
        .catch(() => {
          more = false;
          setData(null);
        });
    }
  }

  function getItem(id: string) {
    setLoadingImage(true);
    scryfallAPI
      .get(`/cards/${id}`)
      .then((res) => {
        setImage(res.data);
        setLoadingImage(false);
      })
      .catch(() => {
        setImage(null);
      });
  }

  function flip(face: 0 | 1) {
    setFace(face);
  }

  useEffect(() => {
    console.log(item);
    getData();
  }, []);

  return (
    <div className="w-full h-full flex flex-row justify-center items-center gap-2">
      <div className="w-1/2 h-full">
        {image ? (
          !loadingImage ? (
            <Card id={id} item={image} flip={flip} />
          ) : (
            <SpinnerCard id={0} />
          )
        ) : (
          <div className="flex-1 text-neutral flex flex-col justify-center items-center">
            Erro!
          </div>
        )}
      </div>
      <div className="w-1/2 h-full flex flex-col gap-2">
        <div className="w-full h-1/2 flex flex-col gap-2 bg-accent text-base-100 text-bold p-2 rounded-lg justify-start items-center">
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
        {data ? (
          !loading && (
            <div className="w-full h-1/2 bg-accent rounded-lg text-base-100 text-bold p-2 flex flex-col gap-2">
              {`Printings: (${data.total_cards})`}
              <div className="cardInfo flex-1 min-h-0 overflow-auto flex flex-col">
                {data.data.map((i: any) => {
                  return (
                    <button
                      className="p-1 flex justify-start items-center"
                      onClick={() => getItem(i.id)}
                    >
                      - {i.set_name}
                    </button>
                  );
                })}
              </div>
            </div>
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

export default CardInfo;
