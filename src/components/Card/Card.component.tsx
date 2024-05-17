import { useState } from "react";
import FlipIcon from "../../svg/FlipIcon.svg";
import CardImage from "../CardImage/CardImage.component";
import Spinner from "../Spinner/Spinner.component";

interface IProps {
  item: any;
  id: number;
}

function Card({ item, id }: IProps) {
  const [face, setFace] = useState<0 | 1>(0);

  return (
    <div>
      {item.card_faces ? (
        item.image_uris ? (
          <CardImage id={id} src={item.image_uris.png} />
        ) : (
          <div className="relative">
            <button
              className="btn btn-base-100 absolute text-neutral p-2 h-[48px] w-[48px]"
              style={{ borderRadius: "50%", top: "50%", left: "50%", transform: "translate(-50%,-50%)", opacity: ".5" }}
              onClick={() => {
                face === 0 ? setFace(1) : setFace(0);
                console.log(face);
              }}
            >
              <FlipIcon className="h-full w-full" />
            </button>
            {face === 0 ? (
              <CardImage id={id} src={item.card_faces[0].image_uris.png} />
            ) : (
              <CardImage id={id} src={item.card_faces[1].image_uris.png} />
            )}
          </div>
        )
      ) : (
        <CardImage id={id} src={item.image_uris.png} />
      )}
    </div>
  );
}

export default Card;
