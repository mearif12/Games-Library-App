import { useEffect, useState } from "react";
import axios from "axios";

export default function Game() {
  const [games, setGames] = useState([]);
  const [msg, setMsg] = useState("");

  const [nGame, setNGame] = useState({
    title: "",
    genre: "",
    played: false,
  });

  const [selectedGame, setSelectedGame] = useState({
    id: "",
    title: "",
    genre: "",
    played: false,
  });

  const getGames = () => {
    axios
      .get("https://games-library-app.onrender.com/game")
      .then((res) => setGames(res.data.Games))
      .catch((err) => console.log(err));
  };

  const addGame = () => {
    axios
      .post("https://games-library-app.onrender.com/games", nGame)
      .then((res) => {
        setGames([...games, res.data.game]);
        setNGame({ title: "", genre: "", played: false });

        setMsg("Game Added");
        setTimeout(() => setMsg(""), 4000);

        document.querySelector("#gameModal .btn-close").click();
      })
      .catch(() => alert("Failed to add new Game"));
  };

  const updateGame = () => {
    axios
      .put(
        `https://games-library-app.onrender.com/games/${selectedGame.id}`,
        selectedGame
      )
      .then(() => {
        getGames();
        setMsg("Game Updated");
        setTimeout(() => setMsg(""), 4000);
        document.querySelector("#updateModal .btn-close").click();
      })
      .catch(() => alert("Failed to update"));
  };

  const popGame = (id) => {
    axios
      .delete(`https://games-library-app.onrender.com/games/${id}`)
      .then(() => {
        getGames();
        setMsg("Game Deleted");
        setTimeout(() => setMsg(""), 4000);
      })
      .catch(() => alert("Failed to delete"));
  };

  useEffect(() => {
    getGames();
  }, []);

  return (
    <div className="container">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootswatch@4.5.2/dist/sketchy/bootstrap.min.css"
      />

      <p className="text-center" style={{ fontSize: "70px" }}>
        Games Library 🎮
      </p>
      <hr />

      <p className="text-success text-center">{msg}</p>

      {/* Add Game Button */}
      <button
        className="btn btn-success btn-sm"
        data-bs-toggle="modal"
        data-bs-target="#gameModal"
      >
        Add Game
      </button>

      {/* ADD GAME MODAL */}
      <div className="modal fade" id="gameModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <p className="modal-title">Add New Game</p>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <label>Title:</label>
              <input
                className="form-control"
                value={nGame.title}
                onChange={(e) =>
                  setNGame({ ...nGame, title: e.target.value })
                }
              />

              <label>Genre:</label>
              <input
                className="form-control"
                value={nGame.genre}
                onChange={(e) =>
                  setNGame({ ...nGame, genre: e.target.value })
                }
              />

              <label>
                <input
                  type="checkbox"
                  checked={nGame.played}
                  onChange={(e) =>
                    setNGame({ ...nGame, played: e.target.checked })
                  }
                />{" "}
                Played?
              </label>
            </div>

            <div className="modal-footer">
              <button className="btn btn-primary" onClick={addGame}>
                Add
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* UPDATE MODAL */}
      <div className="modal fade" id="updateModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <p className="modal-title">Update Game</p>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <label>Title:</label>
              <input
                className="form-control"
                value={selectedGame.title}
                onChange={(e) =>
                  setSelectedGame({ ...selectedGame, title: e.target.value })
                }
              />

              <label>Genre:</label>
              <input
                className="form-control"
                value={selectedGame.genre}
                onChange={(e) =>
                  setSelectedGame({ ...selectedGame, genre: e.target.value })
                }
              />

              <label>
                <input
                  type="checkbox"
                  checked={selectedGame.played}
                  onChange={(e) =>
                    setSelectedGame({
                      ...selectedGame,
                      played: e.target.checked,
                    })
                  }
                />{" "}
                Played?
              </label>
            </div>

            <div className="modal-footer">
              <button className="btn btn-primary" onClick={updateGame}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <table className="table table-hover mt-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Played?</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {games.map((g, index) => (
            <tr key={index}>
              <td>{g.title}</td>
              <td>{g.genre}</td>
              <td>{g.played ? "Yes" : "No"}</td>
              <td>
                <button
                  className="btn btn-info btn-sm me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#updateModal"
                  onClick={() => setSelectedGame({ ...g })}
                >
                  Update
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => popGame(g.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-center bg-secondary rounded-4 p-2">
        Copyright © ME Arifur Rahman
      </p>
    </div>
  );
}
