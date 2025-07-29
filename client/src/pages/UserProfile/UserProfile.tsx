import { useEffect, useState } from "react";
import { Link } from "react-router";
import CarouselFavorites from "../../components/CarouselFavorites/CarouselFavorites";
import "./UserProfile.css";

function UserProfile() {
  const [user, setUser] = useState<UserProfileDatas | null>();
  const [upcommingEvents, setUpcommingEvents] = useState<
    UserProfileFavoriteEvent[]
  >([]);
  const [pastEvents, setPastEvents] = useState<UserProfileFavoriteEvent[]>([]);
  const [areUpcommingEventsVisible, setAreUpcommingEventsVisible] =
    useState(true);
  const [arePastEventsVisible, setArePastEventsVisible] = useState(
    !areUpcommingEventsVisible,
  );
  const [favoritesArtists, setFavoritesArtists] = useState<FavoritesDatas>([]);
  const [favoritesConcertPlaces, setFavoritesConcertPlaces] =
    useState<FavoritesDatas>([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/user/profile", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        data.signup_date = new Date(data.signup_date);
        setUser(data);
      });

    fetch("http://localhost:3310/api/favorites-upcomming-events", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 204) {
          throw new Error("Aucun évènement favoris à venir");
        }
      })
      .then((data) => {
        for (const event of data) {
          event.date = new Date(event.date);
        }
        setUpcommingEvents(data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("http://localhost:3310/api/favorites-past-events", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 204) {
          throw new Error("Aucun évènement favoris passés");
        }
      })
      .then((data) => {
        for (const event of data) {
          event.date = new Date(event.date);
        }
        setPastEvents(data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("http://localhost:3310/api/favoritesByType/artist", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setFavoritesArtists(data));

    fetch("http://localhost:3310/api/favoritesByType/concert_place", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setFavoritesConcertPlaces(data));
  }, []);

  const handleUpcommingEventsVisible = () => {
    setAreUpcommingEventsVisible(true);
    setArePastEventsVisible(false);
  };
  const handlePastEventsVisible = () => {
    setAreUpcommingEventsVisible(false);
    setArePastEventsVisible(true);
  };

  return (
    <main className="user-profile">
      {user && (
        <section>
          <h1>{user.name}</h1>
          <figure>
            <img
              src={
                user.profile_picture !== null
                  ? user.profile_picture
                  : "/images/noProfilePictureUser.png"
              }
              alt={user.name}
            />
            <figcaption>
              {user.age && <p>Age : {user.age} ans</p>}
              <p>Inscrit⸱e depuis le :</p>
              <p>{user.signup_date.toLocaleDateString()}</p>
              <Link to="/app/user/update">
                <img src="/images/modify-icon.svg" alt="modify icon" /> Modifier
                le profil
              </Link>
            </figcaption>
          </figure>
        </section>
      )}
      {upcommingEvents.length || pastEvents.length ? (
        <section className="favorites-events">
          <button type="button" onClick={handleUpcommingEventsVisible}>
            <h2 className={areUpcommingEventsVisible ? "open" : "close"}>
              Évènements à venir <img src="/images/arrow.svg" alt="arrow" />
            </h2>
          </button>

          <ul>
            {upcommingEvents.length && areUpcommingEventsVisible ? (
              upcommingEvents.map((event) => (
                <li key={event.id}>
                  <Link to={`/app/event/${event.id}`}>
                    <img src={event.image} alt={event.name} />
                    <ul>
                      <li>{event.name}</li>
                      <li>{event.concert_place}</li>
                      <li>
                        {event.artistList
                          .map((artist) => artist.name)
                          .join(" - ")}
                      </li>
                      <li>{event.date.toLocaleDateString()}</li>
                      <li>{event.hour}</li>
                    </ul>
                  </Link>
                </li>
              ))
            ) : (
              <li style={{ paddingLeft: "16px" }}>
                Aucun évènement à afficher
              </li>
            )}
          </ul>

          <button type="button" onClick={handlePastEventsVisible}>
            <h2 className={arePastEventsVisible ? "open" : "close"}>
              Évènements passés <img src="/images/arrow.svg" alt="arrow" />
            </h2>
          </button>

          <ul>
            {pastEvents.length && arePastEventsVisible ? (
              pastEvents.map((event) => (
                <li key={event.id}>
                  <Link to={`/app/event/${event.id}`}>
                    <img src={event.image} alt={event.name} />
                    <ul>
                      <li>{event.name}</li>
                      <li>{event.concert_place}</li>
                      <li>
                        {event.artistList
                          .map((artist) => artist.name)
                          .join(" - ")}
                      </li>
                    </ul>
                  </Link>
                </li>
              ))
            ) : (
              <li style={{ paddingLeft: "16px" }}>
                Aucun évènement à afficher
              </li>
            )}
          </ul>
        </section>
      ) : (
        <></>
      )}
      {favoritesArtists.length ? (
        <section className="favorites-concert-places">
          <h2>
            Artistes <img src="/images/arrow.svg" alt="arrow" />
          </h2>
          <CarouselFavorites
            variant="artist"
            favoritesDatas={favoritesArtists}
          />
        </section>
      ) : (
        <></>
      )}
      {favoritesConcertPlaces.length ? (
        <section className="favorites-artists">
          <h2>
            Lieux <img src="/images/arrow.svg" alt="arrow" />
          </h2>
          <CarouselFavorites
            variant="concert_place"
            favoritesDatas={favoritesConcertPlaces}
          />
        </section>
      ) : (
        <></>
      )}
    </main>
  );
}

export default UserProfile;
