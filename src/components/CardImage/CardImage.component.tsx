import { useState } from "react";
import Spinner from "../Spinner/Spinner.component";

interface IProps {
  src: string;
}

function CardImage({ src }: IProps) {
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
      <div className="flex flex-col justify-center items-center w-full h-full" style={{ display: loaded ? "none" : "flex" }}>
        <Spinner className="w-24 h-24" />
      </div>
    </>
  );
}

export default CardImage;
