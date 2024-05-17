import { useState } from "react";
import SpinnerCard from "../SpinnerCard/SpinnerCard.component";

interface IProps {
  src: string;
  id: number;
  className: string;
}

function CardImage({ src, id, className }: IProps) {
  const [loaded, setLoaded] = useState<boolean>(false);
  return (
    <>
      <img
        className={className}
        style={{ display: loaded ? "block" : "none", objectFit: "contain"}}
        src={src}
        onLoad={() => {
          setLoaded(true);
        }}
      ></img>
      <div
        className="flex flex-col justify-center items-center w-full h-full"
        style={{ display: loaded ? "none" : "flex" }}
      >
        <SpinnerCard id={id} />
      </div>
    </>
  );
}

export default CardImage;
