import { useEffect, useState } from "react";
import FlipIcon from "../../svg/FlipIcon.svg";
import CardImage from "../CardImage/CardImage.component";
import SpinnerCard from "../SpinnerCard/SpinnerCard.component";

interface IProps {
  item: any;
  id: number;
  onClick?: any;
  flip?: any;
  isImageLoaded?: any;
}

function Card({ item, id, onClick, flip, isImageLoaded }: IProps) {
  const [face, setFace] = useState<0 | 1>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [loading1, setLoading1] = useState<boolean>(true);
  const [loading2, setLoading2] = useState<boolean>(true);

  function isLoaded(loaded: boolean) {
    if (isImageLoaded) isImageLoaded(loaded);
    setLoading(!loaded);
  }

  function isLoaded1(loaded: boolean) {
    setLoading1(!loaded);
  }

  function isLoaded2(loaded: boolean) {
    setLoading2(!loaded);
  }

  useEffect(() => {
    if (!loading1 && !loading2) setLoading(false);
    if (isImageLoaded) isImageLoaded(!loading);
  }, [loading1, loading2]);

  useEffect(() => {
    if (flip) flip(face);
  }, [face]);

  useEffect(() => {
    setLoading(true);
  }, [item]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {item.card_faces ? (
        item.image_uris ? ( // case split cards
          <div onClick={onClick} className="w-full h-full">
            <CardImage
              className="w-full h-full"
              id={id}
              src={item.image_uris.png}
              isLoaded={isLoaded}
            />
            <div
              className="flex flex-col justify-center items-center w-full h-full"
              style={{ display: !loading ? "none" : "flex" }}
            >
              <SpinnerCard id={id} />
            </div>
          </div>
        ) : (
          // case flip cards
          <div className="relative w-full h-full">
            {!loading && (
              <button
                className="btn btn-base-100 absolute text-neutral p-2 h-[48px] w-[48px]"
                style={{
                  borderRadius: "50%",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%,-50%)",
                  opacity: ".5",
                }}
                onClick={(e) => {
                  face === 0 ? setFace(1) : setFace(0);
                }}
              >
                <FlipIcon className="h-full w-full" />
              </button>
            )}
            <div
              onClick={onClick}
              className={`w-full h-full ${
                !loading && face === 0 ? "flex" : "hidden"
              }`}
            >
              <CardImage
                className="w-full h-full"
                id={id}
                src={item.card_faces[0].image_uris.png}
                isLoaded={isLoaded1}
              />
            </div>
            <div
              onClick={onClick}
              className={`w-full h-full ${
                !loading && face === 1 ? "flex" : "hidden"
              }`}
            >
              <CardImage
                className="w-full h-full"
                id={id}
                src={item.card_faces[1].image_uris.png}
                isLoaded={isLoaded2}
              />
            </div>
            <div
              className="flex flex-col justify-center items-center w-full h-full"
              style={{ display: !loading ? "none" : "flex" }}
            >
              <SpinnerCard id={id}/>
            </div>
          </div>
        )
      ) : (
        // case normal card
        <div onClick={onClick} className="w-full h-full">
          <CardImage
            className="w-full h-full"
            id={id}
            src={item.image_uris.png}
            isLoaded={isLoaded}
          />
          <div
            className="flex flex-col justify-center items-center w-full h-full"
            style={{ display: !loading ? "none" : "flex" }}
          >
            <SpinnerCard id={id} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
