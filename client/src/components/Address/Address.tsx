import "./Address.css";

function Address(props: { address: ConcertPlace["address"] }) {
  return (
    <section className="concert-address">
      <h3>Adresse</h3>
      <p>{props.address}</p>
    </section>
  );
}

export default Address;
