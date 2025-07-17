// import { useState } from "react";
// import { Link } from "react-router";
// import "./UserProfile.css";

// function UserProfile() {
//   const [upcommingEvents, setUpcommingEvents] = useState([]);
//   const [pastEvents, setPastEvents] = useState([]);
//   const [areUpcommingEventsVisible, setAreUpcommingEventsVisible] =
//     useState(true);
//   const [arePastEventsVisible, setArePastEventsVisible] = useState(
//     !areUpcommingEventsVisible,
//   );

//   return (
//     <main className="user-profile">
//       <section>
//         <h1>{user.name}</h1>
//         <figure>
//           <img src="" alt="" />
//           <figcaption>
//             <p>Age : {user.age}</p>
//             <p>Inscrit⸱e depuis :</p>
//             <p>{user.signup_date}</p>
//             <Link to="/app/mon-profil/update">
//               <img src="" alt="" /> Modifier le profil
//             </Link>
//           </figcaption>
//         </figure>
//       </section>
//       <section>
//         <h2>
//           Évènements à venir <img src="" alt="arrow" />
//         </h2>
//       </section>
//       <section>
//         <h2>
//           Évènements passés <img src="" alt="arrow" />
//         </h2>
//       </section>
//       <section>
//         <h2>
//           Artistes <img src="" alt="arrow" />
//         </h2>
//       </section>
//       <section>
//         <h2>
//           Lieux <img src="" alt="arrow" />
//         </h2>
//       </section>
//     </main>
//   );
// }

// export default UserProfile;
