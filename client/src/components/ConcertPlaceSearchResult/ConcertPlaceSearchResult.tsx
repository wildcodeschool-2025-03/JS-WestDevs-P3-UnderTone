import { Link } from "react-router";
import "./ConcertPlaceSearchResult.css";

function ConcertPlaceSearchResult({
  concertPlaceList,
}: { concertPlaceList: FilteredConcertPlaceList[] }) {
  return (
    <ul className="result">
      {concertPlaceList.length ? (
        concertPlaceList.map((concert_place) => (
          <li key={concert_place.id}>
            <Link to={`/app/concert-place/${concert_place.id}`}>
              <img
                src={concert_place.profile_picture}
                alt={concert_place.name}
              />
              <div className="concert-place-info">
                <h3>{concert_place.name}</h3>
              </div>
            </Link>
          </li>
        ))
      ) : (
        <li>Aucun lieu ne correspond à la recherche</li>
      )}
    </ul>
  );
}

export default ConcertPlaceSearchResult;
