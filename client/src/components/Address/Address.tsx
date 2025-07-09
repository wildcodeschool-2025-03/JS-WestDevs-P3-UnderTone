import "./Address.css";

function Address(props: { address: ConcertPlace["address"] }) {
  return (
    <address className="concert-address">
      {props.address.split("\n").map((line) => (
        <div key={line}>{line}</div>
      ))}
    </address>
  );
}

export default Address;
