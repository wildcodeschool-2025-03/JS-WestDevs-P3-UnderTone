import "./ArtistSearchResult.css";

function ArtistSearchResult({
  artistList,
}: { artistList: FilteredArtistList[] }) {
  return (
    <section className="result">
      <ul>
        {artistList.length ? (
          artistList.map((artist) => (
            <li key={artist.id}>
              <img src={artist.profile_picture} alt={artist.name} />
              <div className="artist-info">
                <h2>{artist.name}</h2>
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
    </section>
  );
}

export default ArtistSearchResult;
