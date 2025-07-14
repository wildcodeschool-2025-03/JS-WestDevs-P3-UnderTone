import InputProfilePicture from "../../components/FormInputs/InputProfilePicture/InputProfilePicture";
import "./UserCreation.css";

function UserCreation() {
  return (
    <main className="new-user">
      <section>
        <form action="submit">
          <InputProfilePicture />
        </form>
      </section>
    </main>
  );
}

export default UserCreation;
