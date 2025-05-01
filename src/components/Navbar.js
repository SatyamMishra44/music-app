import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { MusicContext } from "../Context";
import PinnedMusic from "./PinnedMusic";
import LikedMusic from "./LikedMusic";

// ...imports remain the same

const Navbar = ({ keyword, handleKeyPress, setKeyword, fetchMusicData }) => {
  const musicContext = useContext(MusicContext);
  const likedMusic = musicContext.likedMusic;
  const pinnedMusic = musicContext.pinnedMusic;
  const setResultOffset = musicContext.setResultOffset;
  const { user, loginWithRedirect, isAuthenticated } = useAuth0();
  const { logout } = useAuth0();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-gradient shadow sticky-top" style={{ background: "linear-gradient(to right, #1f1f1f, #2c2c2c)" }}>
        <div className="container-fluid">
          <Link className="navbar-brand text-info fw-bold" to="/">
            <i className="bi bi-music-note-beamed mx-2"></i>Spotify_Clone
          </Link>

          <div className="d-flex align-items-center">
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              className="btn btn-outline-warning btn-sm mx-1"
            >
              <i className="bi bi-pin-angle"></i> {pinnedMusic.length}
            </button>
            <button
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#likedMusicModal"
              className="btn btn-outline-danger btn-sm mx-1"
            >
              <i className="bi bi-heart"></i> {likedMusic.length}
            </button>
          </div>

          <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              onKeyDown={handleKeyPress}
              className="form-control me-2 w-75 rounded-pill shadow-sm border-0 px-4"
              type="search"
              placeholder="Search for music..."
              aria-label="Search"
            />
            <button
              onClick={() => {
                setResultOffset(0);
                fetchMusicData();
              }}
              className="btn btn-info text-white rounded-pill px-4"
            >
              Search
            </button>

            {isAuthenticated ? (
              <div className="d-flex align-items-center mx-3">
                {user?.picture ? (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="rounded-circle border border-2 border-success shadow-sm"
                    style={{ width: "40px", height: "40px", objectFit: "cover", marginRight: "10px" }}
                  />
                ) : (
                  <div
                    className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center shadow-sm"
                    style={{ width: "40px", height: "40px", marginRight: "10px", fontSize: "1.1rem" }}
                  >
                    {user?.email?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}
                <button
                    className="btn btn-outline-light btn-sm"
                      onClick={() =>
                      logout({
                      logoutParams: {
                      returnTo: 'https://dev-avispqusww8yi5aw.us.auth0.com/login',
                },
            })
          }
        >
  Log Out
</button>

              </div>
            ) : (
              <button
                className="btn btn-outline-light m-2"
                onClick={() => loginWithRedirect()}
              >
                Log In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Pinned Music Modal */}
      <div
        className="modal fade modal-xl"
        id="exampleModal"
        tabIndex={1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content bg-dark text-white border-secondary">
            <div className="modal-header border-bottom border-secondary">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Pinned Music</h1>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <PinnedMusic />
            </div>
          </div>
        </div>
      </div>

      {/* Liked Music Modal */}
      <div
        className="modal fade modal-xl"
        id="likedMusicModal"
        tabIndex={1}
        aria-labelledby="likedMusicModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content bg-dark text-white border-danger">
            <div className="modal-header border-bottom border-danger">
              <h1 className="modal-title fs-5" id="likedMusicModalLabel">Liked Music</h1>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <LikedMusic />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

