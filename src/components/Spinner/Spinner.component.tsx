import "./Spinner.css";

interface IProps {
    className: string;
}

function Spinner(props: IProps) {
    return <div className={`spinner ${props.className}`}></div>;
}

export default Spinner;