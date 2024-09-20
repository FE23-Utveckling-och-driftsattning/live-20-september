import { useNavigate } from "react-router-dom";

function Event(props) {
  const { event } = props;
  const navigate = useNavigate();

  function buyTicket() {
    navigate("/buy", { state: { event: event } });
  }

  return (
    <article>
      <h2>{event.artist}</h2>
      <p>{event.arena}</p>
      <p>{event.price} kr</p>
      <button onClick={buyTicket}>Köp biljett</button>
    </article>
  );
}

export default Event;
