import { useLocation } from "react-router-dom";

function Confirmation() {
  const eventInfo = useLocation();

  return (
    <main>
      <article>
        <section>
          <p>what</p>
          <h1>{eventInfo.state.event.artist}</h1>
        </section>
        <section>
          <p>Where</p>
          <h2>{eventInfo.state.event.arena}</h2>
        </section>
        <section>
          <p>When</p>
          <h2>{eventInfo.state.event.date}</h2>
        </section>
        <section>
          <p>{eventInfo.state.ticketNumber}</p>
        </section>
      </article>
    </main>
  );
}

export default Confirmation;
