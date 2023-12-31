import {Link} from 'react-router-dom'

const MovieCard = props => {
  const {movieData} = props
  const {posterPath, title, voteAverage, id} = movieData
  return (
    <li>
      <img src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title} />
      <p>{title}</p>
      <p>{voteAverage}</p>
      <Link to={`/movie/${id}`}>
        <button type="button">View Details</button>
      </Link>
    </li>
  )
}
export default MovieCard
