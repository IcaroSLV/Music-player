import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import SearchPage from './pages/SearchPage'
import ArtistPage from './pages/ArtistPage'

function App() {

  return(
    <Router>
      <Routes>
        <Route exact path='/' element={<SearchPage/>}/>
        <Route exact path='/ArtistPage/:id' element={<ArtistPage/>}/>
      </Routes>
    </Router>
  )

}



export default App;
