import { useEffect, useState } from "react";
import "./MusicStyles.css";

function MusicStyles({ params }: { params: string }) {
  const [styles, setStyles] = useState<null | ArtistStyle[]>();
  useEffect(() => {
    fetch(`http://localhost:3310/api/artist/${params}/styles`)
      .then((response) => response.json())
      .then((data) => setStyles(data));
  }, [params]);

  return (
    <ul className="music-styles">
      {styles?.map((el) => (
        <li key={el.id}>{el.name}</li>
      ))}
    </ul>
  );
}

export default MusicStyles;
