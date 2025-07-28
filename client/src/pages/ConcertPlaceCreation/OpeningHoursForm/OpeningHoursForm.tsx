import React, { useRef, useState } from "react";
import "./OpeningHoursForm.css";
import OpeningHoursList from "./OpeningHoursList/OpeningHoursList";

const weekDays = [
  {
    id: "monday",
    value: "Lundi",
    label: "L",
  },
  {
    id: "tuesday",
    value: "Mardi",
    label: "M",
  },
  {
    id: "wednesday",
    value: "Mercredi",
    label: "M",
  },
  {
    id: "thursday",
    value: "Jeudi",
    label: "J",
  },
  {
    id: "friday",
    value: "Vendredi",
    label: "V",
  },
  {
    id: "saturday",
    value: "Samedi",
    label: "S",
  },
  {
    id: "sunday",
    value: "Dimanche",
    label: "D",
  },
];

function createSingleDayOpeningHours(
  weekDay: string,
  openingHourNoonRef: React.RefObject<HTMLInputElement>,
  closingHourNoonRef: React.RefObject<HTMLInputElement>,
  openingHourEveningRef: React.RefObject<HTMLInputElement>,
  closingHourEveningRef: React.RefObject<HTMLInputElement>,
): SingleDayOpeningHours {
  return {
    weekDay,
    openingHourNoon: openingHourNoonRef.current?.value || "",
    closingHourNoon: closingHourNoonRef.current?.value || "",
    openingHourEvening: openingHourEveningRef.current?.value || "",
    closingHourEvening: closingHourEveningRef.current?.value || "",
  };
}

function OpeningHoursForm({
  openingHours,
  setOpeningHours,
}: {
  openingHours: SingleDayOpeningHours[];
  setOpeningHours: React.Dispatch<
    React.SetStateAction<SingleDayOpeningHours[]>
  >;
}) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOptions([...selectedOptions, e.target.value]);
    } else {
      setSelectedOptions(
        selectedOptions.filter((option) => option !== e.target.value),
      );
    }
  };

  const openingHourNoonRef = useRef<HTMLInputElement>(
    null,
  ) as React.RefObject<HTMLInputElement>;
  const closingHourNoonRef = useRef<HTMLInputElement>(
    null,
  ) as React.RefObject<HTMLInputElement>;
  const openingHourEveningRef = useRef<HTMLInputElement>(
    null,
  ) as React.RefObject<HTMLInputElement>;
  const closingHourEveningRef = useRef<HTMLInputElement>(
    null,
  ) as React.RefObject<HTMLInputElement>;

  const handleOpeningHoursValidation = () => {
    const newDays = [] as SingleDayOpeningHours[];
    if (
      !openingHourNoonRef.current?.value ||
      !closingHourNoonRef.current?.value
    ) {
      alert("Veuillez saisir les horaires d'ouverture et de fermeture.");
      return;
    }
    if (
      (openingHourEveningRef.current?.value &&
        !closingHourEveningRef.current?.value) ||
      (!openingHourEveningRef.current?.value &&
        closingHourEveningRef.current?.value)
    ) {
      alert(
        "Veuillez saisir les horaires du soir (ouverture et fermeture) ou laissez les deux champs vides.",
      );
      return;
    }
    selectedOptions.map((day) => {
      newDays.push(
        createSingleDayOpeningHours(
          day,
          openingHourNoonRef,
          closingHourNoonRef,
          openingHourEveningRef,
          closingHourEveningRef,
        ),
      );
    });

    const weekDayOrder = [
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
      "Dimanche",
    ];

    const filteredOpeningHours = openingHours.filter(
      (day) => !newDays.some((newDay) => newDay.weekDay === day.weekDay),
    );
    const sortedOpeningHours = [...filteredOpeningHours, ...newDays].sort(
      (a, b) =>
        weekDayOrder.indexOf(a.weekDay) - weekDayOrder.indexOf(b.weekDay),
    );
    setOpeningHours(sortedOpeningHours);
    setSelectedOptions([]);
    openingHourNoonRef.current.value = "";
    closingHourNoonRef.current.value = "";
    openingHourEveningRef.current.value = "";
    closingHourEveningRef.current.value = "";
  };

  const [showList, setShowList] = useState(false);

  const handleShowOpeningHours = () => {
    setShowList(!showList);
  };

  return (
    <section className="opening-hours-form">
      <h2>Horaires</h2>
      <section>
        <div className="input-group">
          <input
            type="time"
            name="opening-hour-noon"
            id="opening-hour-noon"
            ref={openingHourNoonRef}
          />
          <label htmlFor="opening-hour-noon">Ouverture</label>
        </div>

        <div className="input-group">
          <input
            type="time"
            name="closing-hour-noon"
            id="closing-hour-noon"
            ref={closingHourNoonRef}
          />
          <label htmlFor="closing-hour-noon">Fermeture</label>
        </div>

        <div className="input-group">
          <input
            type="time"
            name="opening-hour-evening"
            id="opening-hour-evening"
            aria-label="Deuxième Ouverture"
            ref={openingHourEveningRef}
          />
        </div>

        <div className="input-group">
          <input
            type="time"
            name="closing-hour-evening"
            id="closing-hour-evening"
            aria-label="Deuxième Fermeture"
            ref={closingHourEveningRef}
          />
        </div>
      </section>
      <div className="checkbox-holder">
        {weekDays.map((wd) => (
          <React.Fragment key={wd.id}>
            <input
              type="checkbox"
              name="week_day"
              id={wd.id}
              value={wd.value}
              checked={selectedOptions.includes(wd.value)}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={wd.id}>{wd.label}</label>
          </React.Fragment>
        ))}
      </div>
      <button
        type="button"
        disabled={selectedOptions.length === 0}
        onClick={handleOpeningHoursValidation}
      >
        Valider
      </button>
      <button
        type="button"
        onClick={handleShowOpeningHours}
        className={!showList ? "close" : undefined}
      >
        Horaires validés <img src="/images/arrow.svg" alt="arrow" />
      </button>
      <OpeningHoursList
        list={openingHours}
        showList={showList}
        openingHours={openingHours}
        setOpeningHours={setOpeningHours}
      />
    </section>
  );
}

export default OpeningHoursForm;
