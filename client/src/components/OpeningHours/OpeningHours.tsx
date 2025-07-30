import { useState } from "react";
import "./OpeningHours.css";

type OpeningHoursProps = { hours: SingleDayOpeningHours[] };

function OpeningHours({ hours }: OpeningHoursProps) {
  const [showAll, setShowAll] = useState(false);

  const currentDay = new Date()
    .toLocaleDateString("fr-FR", { weekday: "long" })
    .replace(/^\w/, (c) => c.toUpperCase());
  const today = hours.find((h) => h.weekDay === currentDay);
  const others = hours.filter((h) => h.weekDay !== currentDay);

  const isClosed = (time: string | null) => {
    if (!time) return true;
    const clean = time.trim().replace(/\.?\d*Z?$/, "");
    return /^0+$/.test(clean.replace(/:/g, ""));
  };

  const formatHour = (hour: string | null) =>
    hour && !isClosed(hour) ? hour.slice(0, 5) : null;

  const formatRange = (start: string | null, end: string | null) =>
    !isClosed(start) && !isClosed(end)
      ? `${formatHour(start)} - ${formatHour(end)}`
      : null;

  const renderDay = (d: SingleDayOpeningHours, isToday = false) => {
    const midi = formatRange(d.openingHourNoon, d.closingHourNoon);
    const soir = formatRange(d.openingHourEvening, d.closingHourEvening);
    const bothClosed = !midi && !soir;

    return (
      <li key={d.weekDay} className="day">
        <strong>{isToday ? `Aujourd’hui (${d.weekDay})` : d.weekDay}</strong>
        {bothClosed ? (
          <div>Fermé</div>
        ) : (
          <>
            {midi ? <div>{midi}</div> : <div>Fermé le midi</div>}
            {soir ? <div>{soir}</div> : <div>Fermé le soir</div>}
          </>
        )}
      </li>
    );
  };

  return (
    <section className="opening-hours">
      <h2>Horaires d'ouverture</h2>
      <ul>
        {today && renderDay(today, true)}
        {showAll && others.map((d) => renderDay(d))}
      </ul>
      <button type="button" onClick={() => setShowAll(!showAll)}>
        {showAll ? "Voir moins ▲" : "Voir plus ▼"}
      </button>
    </section>
  );
}

export default OpeningHours;
