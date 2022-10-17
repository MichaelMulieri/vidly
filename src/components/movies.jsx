import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
    showMovies: false,
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };
  render() {
    const { showMovies, movies } = this.state;
    const { length: count } = movies;

    if (count === 0) return <p>There are no movies in the database.</p>;

    return (
      <React.Fragment>
        <button
          onClick={() =>
            this.setState((prevState) => {
              return { showMovies: !prevState.showMovies };
            })
          }
          className="movie-button btn btn-success btn-sm"
        >
          {showMovies ? "Hide Movie Info" : "Show Movie Info"}
        </button>
        <div className={showMovies ? "show" : "hide"}>
          {/* <div style={{ display: showMovies ? "block" : "none" }}> */}
          <p>Showing {count} movies in the database.</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
