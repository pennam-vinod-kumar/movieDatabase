import {Component} from 'react'

import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TopRated extends Component {
  state = {
    popularMovieDetails: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getMovieData()
  }

  getMovieData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const movieDetailsApiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=c3ed7286c96027970168a020abe0241b&language=en-US&page=1`
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
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobDetailsSuccessView = () => {
    const {popularMovieDetails} = this.state
    return (
      <>
        <div>
          <input type="search" />
          <ul>
            {popularMovieDetails.map(eachItem => (
              <MovieCard key={eachItem.id} movieData={eachItem} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  onRetryJobDetailsAgain = () => {
    this.getJobData()
  }

  renderJobFailureView = () => (
    <div className="job-details-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>we cannot seem to find the page you are looking for.</p>
      <div className="btn-container-failure">
        <button
          className="failure-jod-details-btn"
          type="button"
          onClick={this.onRetryJobDetailsAgain}
        >
          retry
        </button>
      </div>
    </div>
  )

  renderJobLoadingView = () => (
    <div className="job-details-loader" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobFailureView()
      case apiStatusConstants.inProgress:
        return this.renderJobLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-view-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default TopRated
