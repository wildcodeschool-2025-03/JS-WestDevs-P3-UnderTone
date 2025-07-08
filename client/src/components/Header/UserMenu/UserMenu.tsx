import { Link } from "react-router";
import { useAuth } from "../../../services/AuthContext";
import type { UserMenuProps } from "../../../types/userMenu";
import "./UserMenu.css";

function UserMenu({ showPopover, setShowPopover }: UserMenuProps) {
  const { isLogged, setIsLogged, user } = useAuth();

  const handleLogout = () => {
    setIsLogged(false);
    setShowPopover(false);
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
