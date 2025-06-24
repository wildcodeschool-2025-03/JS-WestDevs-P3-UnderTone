import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { Photo } from "../artistPhoto/artistPhotoRepository";

type Artist = {
  user_id: number;
  name: string;
  description: string;
  demo: string;
  web_site: string;
  profile_picture: string;
  facebook_link: string;
  instagram_link: string;
  x_link: string;
  deezer_link: string;
  spotify_link: string;
  youtube_link: string;
  artistPhoto?: Photo[];
};

class artistRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT * FROM artist WHERE user_id= ?",
      [id],
    );

    return rows[0] as Artist;
  }
}

export default new artistRepository();
