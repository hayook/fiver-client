import '../css/header.css'; 
import { Link } from 'react-router-dom'
import NavBar from './Nav-Bar'; 

export default function Header() {
  return (
    <header>
      <div className="container">
        <Link to="/"><h2>Fiver</h2></Link>
        <NavBar />
      </div>
    </header>
  )
}