import { useEffect, useState } from "react";
import FlipIcon from "../../svg/FlipIcon.svg";
import CardImage from "../CardImage/CardImage.component";
import Spinner from "../Spinner/Spinner.component";

interface IProps {
  item: any;
  id: number;
  onClick?: any;
  flip?: any;
}

function Card({ item, id, onClick, flip }: IProps) {
  const [face, setFace] = useState<0 | 1>(0);

  useEffect(() => {
    flip(face);
  }, [face]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {item.card_faces ? (
        item.image_uris ? (
          <div onClick={onClick} className="w-full h-full">
            <CardImage
              className="w-full h-full"
              id={id}
              src={item.image_uris.png}
            />
          </div>
        ) : (
          <div className="relative w-full h-full">
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
            {face === 0 ? (
              <div onClick={onClick} className="w-full h-full">
                <CardImage
                  className="w-full h-full"
                  id={id}
                  src={item.card_faces[0].image_uris.png}
                />
              </div>
            ) : (
              <div onClick={onClick} className="w-full h-full">
                <CardImage
                  className="w-full h-full"
                  id={id}
                  src={item.card_faces[1].image_uris.png}
                />
              </div>
            )}
          </div>
        )
      ) : (
        <div onClick={onClick} className="w-full h-full">
          <CardImage
            className="w-full h-full"
            id={id}
            src={item.image_uris.png}
          />
        </div>
      )}
    </div>
  );
}

export default Card;
