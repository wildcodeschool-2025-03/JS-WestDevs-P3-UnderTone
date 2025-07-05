import { formatTime } from "../../utils/utils";
import "./OpeningHours.css";

function OpeningHours({ hours }: OpeningHoursProps) {
  return (
    <section>
      <h2>Horaires d'ouverture</h2>
      <ul>
        {hours.map((day) => {
          const {
            week_day,
            opening_hour_noon,
            closing_hour_noon,
            opening_hour_evening,
            closing_hour_evening,
          } = day;

          const isClosed =
            !opening_hour_noon &&
            !closing_hour_noon &&
            !opening_hour_evening &&
            !closing_hour_evening;

          const noon =
            opening_hour_noon && closing_hour_noon
              ? `${formatTime(opening_hour_noon)} - ${formatTime(closing_hour_noon)}`
              : null;

          const evening =
            opening_hour_evening && closing_hour_evening
              ? `${formatTime(opening_hour_evening)} - ${formatTime(closing_hour_evening)}`
              : null;

          return (
            <li key={week_day}>
              <span>{week_day} :</span>{" "}
              <span>
                {isClosed
                  ? "Fermé"
                  : [noon, evening].filter(Boolean).join(" / ")}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default OpeningHours;
