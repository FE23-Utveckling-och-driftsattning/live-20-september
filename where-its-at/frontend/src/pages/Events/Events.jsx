import { useState, useEffect } from "react";

import Event from "../../components/Event";

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function getEvents() {
      const response = await fetch(
        "https://juxtj7m96k.execute-api.eu-north-1.amazonaws.com/events"
      );
      const data = await response.json();
      console.log(data);
      setEvents(data.events);
    }

    getEvents();
  }, []);

  const eventComponents = events.map((event) => {
    return <Event event={event} key={event.eventId} />;
  });

  return (
    <main>
      <h2>Events</h2>
      <section>{eventComponents}</section>
    </main>
  );
}

export default Events;
