import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner.component";

interface IProps {
  id: number;
}

function SpinnerCard({ id }: IProps) {
  const [resized, setResized] = useState<boolean>(false);

  function resizeSpinner() {
    const spinnerWrapper = document.getElementById(`spinnerWrapper${id}`);
    const spinner = document.getElementById(`spinner${id}`);
    if (spinnerWrapper && spinner) {
      const height = spinnerWrapper!.clientHeight;
      const width = spinnerWrapper!.clientWidth;
      spinner!.style.setProperty("--height", `${height / 8}px`);
      spinner!.style.setProperty("--width", `${width / 8}px`);
    }

    setResized(true);
  }

  window.addEventListener("resize", () => {
    resizeSpinner();
  });

  useEffect(() => {
    resizeSpinner();
  }, []);

  return (
    <div
      id={`spinnerWrapper${id}`}
      className="h-full w-full flex flex-col justify-center items-center"
    >
      <div
        id={`spinner${id}`}
        style={{
          width: "max(var(--width),var(--height))",
          height: "max(var(--width),var(--height))",
        }}
      >
        {resized && <Spinner className="w-full h-full" />}
      </div>
    </div>
  );
}

export default SpinnerCard;
