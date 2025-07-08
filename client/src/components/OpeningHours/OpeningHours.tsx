import "./OpeningHours.css";

type OpeningHoursProps = {
  hours: {
    weekDay: string;
    openingHourNoon: string | null;
    closingHourNoon: string | null;
    openingHourEvening: string | null;
    closingHourEvening: string | null;
  }[];
};

function formatHour(time: string | null): string | null {
  if (!time) return null;
  const cleaned = time.split(":").slice(0, 2).join(":");
  return cleaned === "00:00" ? null : cleaned;
}

function OpeningHours({ hours }: OpeningHoursProps) {
  if (!hours || hours.length === 0) return null;

  return (
    <section className="opening-hours">
      <h2>Horaires d'ouverture</h2>
      <ul>
        {hours.map((day) => {
          const {
            weekDay,
            openingHourNoon,
            closingHourNoon,
            openingHourEvening,
            closingHourEvening,
          } = day;

          const noonStart = formatHour(openingHourNoon);
          const noonEnd = formatHour(closingHourNoon);
          const eveningStart = formatHour(openingHourEvening);
          const eveningEnd = formatHour(closingHourEvening);

          const hasNoon = noonStart && noonEnd;
          const hasEvening = eveningStart && eveningEnd;

          let displayText = "";

          if (!hasNoon && !hasEvening) {
            displayText = "Fermé";
          } else {
            const parts = [];
            if (hasNoon) {
              parts.push(`de ${noonStart} à ${noonEnd}`);
            }
            if (hasEvening) {
              parts.push(`de ${eveningStart} à ${eveningEnd}`);
            }
            displayText = parts.join(" et ");
          }

          return (
            <li key={weekDay} className="day-line">
              <strong>{weekDay}</strong> : {displayText}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default OpeningHours;
