import {Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import TopRated from './components/TopRated'
import MovieItemDetails from './components/MovieItemDetails'
import UpComing from './components/UpComing'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/top-rated" component={TopRated} />
    <Route exact path="/movie/:id" component={MovieItemDetails} />
    <Route exact path="/upcoming" component={UpComing} />
  </Switch>
)

export default App
