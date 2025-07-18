import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../../../services/AuthContext";
import type { UserMenuProps } from "../../../types/userMenu";
import "./UserMenu.css";

function UserMenu({ showPopover, setShowPopover }: UserMenuProps) {
  const { isLogged, setIsLogged, user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("http://localhost:3310/api/logout", {
      credentials: "include",
    }).then((res) => {
      if (res.ok) {
        setIsLogged(false);
        setShowPopover(false);
        setUser(null);
        toast.info("Vous allez être redirigé·e");
        toast.success("À très bientôt ! 🎵🎊");
        setTimeout(() => {
          navigate("/app/login");
        }, 1500);
      }
    });
  };

  return (
    <>
      {showPopover && (
        <div className="popover">
          {isLogged ? (
            <>
              <Link
                to="/app/account"
                onClick={() => setShowPopover(false)}
                className="popover-link"
              >
                Mon compte
              </Link>

              {user?.status === "artist" && (
                <Link
                  to="/app/artist-profile"
                  onClick={() => setShowPopover(false)}
                  className="popover-link"
                >
                  Mon profil artiste
                </Link>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="popover-button"
              >
                Se déconnecter
              </button>
            </>
          ) : (
            <>
              <Link
                to="/app/login"
                onClick={() => setShowPopover(false)}
                className="popover-link"
              >
                Se connecter
              </Link>
              <Link
                to="/app/signin"
                onClick={() => setShowPopover(false)}
                className="popover-link"
              >
                Créer un compte
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default UserMenu;
