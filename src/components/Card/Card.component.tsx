import CardImage from "../CardImage/CardImage.component";
import Spinner from "../Spinner/Spinner.component";

interface IProps {
  item: any;
  id: number;
}

function Card({ item, id }: IProps) {
  return (
    <div>
      {item.card_faces ? (
        item.image_uris ? (
          <CardImage id={id} src={item.image_uris.png} />
        ) : (
          <CardImage id={id} src={item.card_faces[0].image_uris.png} />
        )
      ) : (
        <CardImage id={id} src={item.image_uris.png} />
      )}
    </div>
  );
}

export default Card;
