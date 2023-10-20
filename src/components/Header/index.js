import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import MovieCard from '../MovieCard'

class Header extends Component {
  state = {searchInput: '', popularMovieDetails: []}

  onChangeSearch = e => {
    this.setState({searchInput: e.target.value})
  }

  getMovieData = async () => {
    const {searchInput} = this.state
    const movieDetailsApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=c3ed7286c96027970168a020abe0241b&language=en-US&query=${searchInput}&page=1`

    const responseMovieData = await fetch(movieDetailsApiUrl)
    if (responseMovieData.ok === true) {
      const fetchedMovieData = await responseMovieData.json()
      const updatedData = fetchedMovieData.results.map(eachItem => ({
        adult: eachItem.adult,
        backdropPath: eachItem.backdrop_path,
        genreIds: eachItem.genre_ids,
        id: eachItem.id,
        originalLanguage: eachItem.original_language,
        originalTitle: eachItem.original_title,
        overview: eachItem.overview,
        popularity: eachItem.popularity,
        posterPath: eachItem.poster_path,
        releaseDate: eachItem.release_date,
        title: eachItem.title,
        video: eachItem.video,
        voteAverage: eachItem.vote_average,
        voteCount: eachItem.vote_count,
      }))
      console.log(updatedData)
      this.setState({
        popularMovieDetails: updatedData,
      })
    }
  }

  onEnter = () => {
    this.getMovieData()
  }

  render() {
    const {searchInput, popularMovieDetails} = this.state
    return (
      <nav className="nav-container">
        <ul className="header-ul-container">
          <li className="logo-container">
            <Link className="link" to="/">
              <h1>movieDB</h1>
            </Link>
          </li>
          <li className="home-jobs-container">
            <Link className="link" to="/">
              <h1 className="nav-text">Popular</h1>
            </Link>
            <Link className="link" to="/top-rated">
              <h1 className="nav-text">Top Rated</h1>
            </Link>
            <Link className="link" to="/upcoming">
              <h1 className="nav-text">Upcoming</h1>
            </Link>
          </li>
        </ul>
        <input
          type="search"
          placeholder="search"
          value={searchInput}
          onChange={this.onChangeSearch}
        />
        <button type="button" onClick={this.onEnter}>
          Search
        </button>
        <div>
          <ul>
            {popularMovieDetails.map(eachItem => (
              <MovieCard key={eachItem.id} movieData={eachItem} />
            ))}
          </ul>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
