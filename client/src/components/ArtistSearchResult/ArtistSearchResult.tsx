import { Link } from "react-router";
import "./ArtistSearchResult.css";

function ArtistSearchResult({
  artistList,
}: { artistList: FilteredArtistList[] }) {
  return (
    <ul className="result">
      {artistList.length ? (
        artistList.map((artist) => (
          <li key={artist.id}>
            <Link to={`/app/artist/${artist.id}`}>
              <img src={artist.profile_picture} alt={artist.name} />
              <div className="artist-info">
                <h3>{artist.name}</h3>
                <p>
                  {artist.musicStyles?.length
                    ? artist.musicStyles.map((style) => style.name).join(" - ")
                    : ""}
                </p>
              </div>
            </Link>
          </li>
        ))
      ) : (
        <li>Aucun artiste ne correspond à la recherche</li>
      )}
    </ul>
  );
}

export default ArtistSearchResult;
