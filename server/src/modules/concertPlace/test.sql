SELECT
  cp.user_id,
  cp.name,
  cp.description,
  cp.web_site,
  cp.profile_picture,
  cp.facebook_link,
  cp.instagram_link,
  cp.x_link,
  cp.menu,
  (
    SELECT JSON_ARRAYAGG(
      JSON_OBJECT(
        'id', cpp.id,
        'image', cpp.image,
        'date', cpp.date
      )
    )
    FROM concert_place_photo AS cpp
    WHERE cp.user_id = cpp.concert_place_id
  ) AS concertPlacePhotos,
  (
    SELECT JSON_ARRAYAGG(
      JSON_OBJECT(
        'name', t.name,
        'id', t.id
      )
    )
    FROM type AS t
    JOIN concert_place_type AS cpt ON t.id = cpt.type_id
    WHERE cp.user_id = cpt.concert_place_id
  ) AS types,
    (
    SELECT JSON_ARRAYAGG(
      JSON_OBJECT(
        'id', cpoh.id,
        'weekDay', cpoh.week_day,
        'openingHourNoon', cpoh.opening_hour_noon,
        'closingHourNoon', cpoh.closing_hour_noon,
        'openingHourEvening', cpoh.opening_hour_evening,
        'closingHourEvening', cpoh.closing_hour_evening,
      )
    )
    FROM opening_hour AS cpoh
    WHERE cp.user_id = cpoh.concert_place_id
  ) AS OpeningHours,
FROM concert_place AS cp
WHERE cp.user_id = ?;