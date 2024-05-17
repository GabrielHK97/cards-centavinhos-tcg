import CardImage from "../CardImage/CardImage.component";
import Spinner from "../Spinner/Spinner.component";

interface IProps {
  item: any;
}

function Card({ item }: IProps) {
  return (
    <div>
      {item.card_faces ? (
        item.image_uris ? (
          <CardImage src={item.image_uris.png} />
        ) : (
          <CardImage src={item.card_faces[0].image_uris.png} />
        )
      ) : (
        <CardImage src={item.image_uris.png} />
      )}
    </div>
  );
}

export default Card;
