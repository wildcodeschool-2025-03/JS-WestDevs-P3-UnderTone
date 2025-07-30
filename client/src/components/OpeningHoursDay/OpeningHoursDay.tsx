type OpeningHoursProps = { hours: SingleDayOpeningHours[] };

function OpeningHoursDay({ hours }: OpeningHoursProps) {
  const currentDay = new Date()
    .toLocaleDateString("fr-FR", { weekday: "long" })
    .replace(/^\w/, (c) => c.toUpperCase());

  const isClosed = (hour: string | null) => {
    if (!hour) return true;
    // const clean = hour.trim().replace(/\.?\d*Z?$/, "");
    // return /^0+$/.test(clean.replace(/:/g, ""));
  };

  return (
    <section>
      {hours
        .filter((h) => h.weekDay === currentDay)
        .map((h) => {
          console.log(h);

          console.log("opening hours noon", h.openingHourNoon);
          const midi =
            !isClosed(h.openingHourNoon) &&
            !isClosed(h.closingHourNoon) &&
            h.openingHourNoon &&
            h.closingHourNoon
              ? `${h.openingHourNoon.slice(0, 5)} - ${h.closingHourNoon.slice(0, 5)}`
              : null;

          const soir =
            !isClosed(h.openingHourEvening) &&
            !isClosed(h.closingHourEvening) &&
            h.openingHourEvening &&
            h.closingHourEvening
              ? `${h.openingHourEvening.slice(0, 5)} - ${h.closingHourEvening.slice(0, 5)}`
              : null;
          console.log("horaires du jour", midi, soir);

          if (!midi && !soir) return <p key={h.weekDay}>Fermé</p>;

          return (
            <div key={h.weekDay}>
              {midi ? <p>Midi : {midi}</p> : <p>Fermé le midi</p>}
              {soir ? <p>Soir : {soir}</p> : <p>Fermé le soir</p>}
            </div>
          );
        })}
    </section>
  );
}

export default OpeningHoursDay;
