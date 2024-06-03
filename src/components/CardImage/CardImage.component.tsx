import { useState } from "react";
import SpinnerCard from "../SpinnerCard/SpinnerCard.component";

interface IProps {
  src: string;
  id: number;
  className: string;
  isLoaded: any;
}

function CardImage({ src, id, className, isLoaded }: IProps) {
  const [loaded, setLoaded] = useState<boolean>(false);
  return (
    <>
      <img
        className={className}
        style={{ display: loaded ? "block" : "none", objectFit: "contain" }}
        src={src}
        onLoad={() => {
          setLoaded(true);
          isLoaded(true);
        }}
      ></img>
    </>
  );
}

export default CardImage;
