function OpeningHoursList({
  list,
  showList,
  openingHours,
  setOpeningHours,
}: {
  list: SingleDayOpeningHours[];
  showList: boolean;
  openingHours: SingleDayOpeningHours[];
  setOpeningHours: React.Dispatch<
    React.SetStateAction<SingleDayOpeningHours[]>
  >;
}) {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const weekDayToDelete = (e.currentTarget as HTMLButtonElement).dataset.id;
    setOpeningHours(
      openingHours.filter((day) => day.weekDay !== weekDayToDelete),
    );
  };

  return (
    <ul className={`validated-opening-hours-list${showList ? " visible" : ""}`}>
      {list.map((sdoh) => (
        <li key={sdoh.weekDay}>
          <p>{sdoh.weekDay}</p>
          <p>
            {sdoh.openingHourNoon}-{sdoh.closingHourNoon}
            {sdoh.openingHourEvening && sdoh.closingHourEvening
              ? ` / ${sdoh.openingHourEvening}-${sdoh.closingHourEvening}`
              : ""}
          </p>
          <button type="button" onClick={handleDelete} data-id={sdoh.weekDay} />
        </li>
      ))}
    </ul>
  );
}

export default OpeningHoursList;
