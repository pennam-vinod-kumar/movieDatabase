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

class UpComing extends Component {
  state = {
    popularMovieDetails: [],
    apiStatus: apiStatusConstants.initial,
    currentPage: 1,
  }

  componentDidMount() {
    this.getMovieData()
  }

  getMovieData = async () => {
    const {currentPage} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const movieDetailsApiUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=c3ed7286c96027970168a020abe0241b&language=en-US&page=${currentPage}`
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

  handlePageChange = newPage => {
    this.setState(
      {
        currentPage: newPage,
      },
      () => {
        this.getMovieData()
      },
    )
  }

  renderMovieDetailsSuccessView = () => {
    const {popularMovieDetails, currentPage} = this.state
    return (
      <>
        <div>
          <input type="search" />
          <ul>
            {popularMovieDetails.map(eachItem => (
              <MovieCard key={eachItem.id} movieData={eachItem} />
            ))}
          </ul>
          <div className="pagination">
            <button
              type="button"
              onClick={() => this.handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => this.handlePageChange(currentPage + 1)}
            >
              Next
            </button>
            <p1>{currentPage}</p1>
          </div>
        </div>
      </>
    )
  }

  onRetryMovieDetailsAgain = () => {
    this.getJobData()
  }

  renderMovieFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>we cannot seem to find the page you are looking for.</p>
      <div>
        <button type="button" onClick={this.onRetryJobDetailsAgain}>
          retry
        </button>
      </div>
    </div>
  )

  renderMovieLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderMovieDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderMovieDetailsSuccessView()
      case apiStatusConstants.failure:
        return this.renderMovieFailureView()
      case apiStatusConstants.inProgress:
        return this.renderMovieLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.renderMovieDetails()}</div>
      </>
    )
  }
}

export default UpComing
