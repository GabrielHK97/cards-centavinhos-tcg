import { useState } from "react";
import Spinner from "../Spinner/Spinner.component";
import SpinnerCard from "../SpinnerCard/SpinnerCard.component";

interface IProps {
  src: string;
  id: number;
}

function CardImage({ src, id }: IProps) {
  const [loaded, setLoaded] = useState<boolean>(false);
  return (
    <>
      <img
        style={{ display: loaded ? "block" : "none" }}
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
