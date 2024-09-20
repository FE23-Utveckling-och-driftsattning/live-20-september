import { useLocation, useNavigate } from "react-router-dom";

function Buy() {
  const eventInfo = useLocation();
  const navigate = useNavigate();

  async function buy() {
    const response = await fetch(
      "https://juxtj7m96k.execute-api.eu-north-1.amazonaws.com/order",
      {
        method: "POST",
        body: JSON.stringify({ eventId: eventInfo.state.event.eventId }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data.ticketId;
  }

  async function handleClick() {
    const ticketNumber = await buy();

    navigate("/confirmation", {
      state: { event: eventInfo.state.event, ticketNumber },
    });
  }

  return (
    <main>
      <section>
        <p>You are about to score some sweet tickets to</p>
        <h1>{eventInfo.state.event.artist}</h1>
        <p>{eventInfo.state.event.date}</p>
        <p>@ {eventInfo.state.event.arena}</p>
        <section>
          <article>{eventInfo.state.event.price} sek</article>
        </section>
        <button onClick={handleClick}>Take my money!</button>
      </section>
    </main>
  );
}

export default Buy;
