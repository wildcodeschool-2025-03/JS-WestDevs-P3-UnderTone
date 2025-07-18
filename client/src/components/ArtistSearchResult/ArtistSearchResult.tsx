import "./ArtistSearchResult.css";

function ArtistSearchResult({
  artistList,
}: { artistList: FilteredArtistList[] }) {
  return (
    <ul className="result">
      {artistList.length ? (
        artistList.map((artist) => (
          <li key={artist.id}>
            <img src={artist.profile_picture} alt={artist.name} />
            <div className="artist-info">
              <h3>{artist.name}</h3>
              <p>
                {artist.musicStyles && artist.musicStyles.length > 0
                  ? artist.musicStyles.map((style) => style.name).join(" - ")
                  : []}
              </p>
            </div>
          </li>
        ))
      ) : (
        <li>Aucun artiste ne correspond à la recherche</li>
      )}
    </ul>
  );
}

export default ArtistSearchResult;
