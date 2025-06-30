import "./StylesTypes.css";

function StylesTypes({ stylesTypes }: StyleTypeProps) {
  return (
    <ul className="music-styles">
      {stylesTypes.map((el) => (
        <li key={el.id}>{el.name}</li>
      ))}
    </ul>
  );
}

export default StylesTypes;
