import "./SocialNetworks.css";

function SocialNetworks(profileDatas: SocialNetworks) {
  const {
    facebook_link,
    instagram_link,
    x_link,
    deezer_link,
    spotify_link,
    youtube_link,
  } = profileDatas.artist;

  return (
    <ul className="social-networks">
      {facebook_link && (
        <li>
          <a href={facebook_link} target="_blank" rel="noreferrer">
            <img
              src="/images/social-networks/facebook.png"
              alt="Logo facebook"
            />
          </a>
        </li>
      )}
      {instagram_link && (
        <li>
          <a href={instagram_link} target="_blank" rel="noreferrer">
            <img
              src="/images/social-networks/instagram.png"
              alt="Logo instagram"
            />
          </a>
        </li>
      )}
      {x_link && (
        <li>
          <a href={x_link} target="_blank" rel="noreferrer">
            <img src="/images/social-networks/x.png" alt="Logo x" />
          </a>
        </li>
      )}
      {deezer_link && (
        <li>
          <a href={deezer_link} target="_blank" rel="noreferrer">
            <img src="/images/social-networks/deezer.png" alt="Logo deezer" />
          </a>
        </li>
      )}
      {spotify_link && (
        <li>
          <a href={spotify_link} target="_blank" rel="noreferrer">
            <img src="/images/social-networks/spotify.png" alt="Logo spotify" />
          </a>
        </li>
      )}
      {youtube_link && (
        <li>
          <a href={youtube_link} target="_blank" rel="noreferrer">
            <img src="/images/social-networks/youtube.png" alt="Logo youtube" />
          </a>
        </li>
      )}
    </ul>
  );
}

export default SocialNetworks;
