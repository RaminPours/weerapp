import { useState } from 'react'
import './Weer.css'
import searchIcon from '../assets/search.png'
import rain from '../assets/rain.png'
import cloudy from '../assets/cloudy.png'
import sunny from '../assets/sun.png'
import thunder from '../assets/thunder.png'
import weer from '../assets/weer.png'
import snow from '../assets/snow.png'
import { cities } from '../data/cities'

const Weer = () => {
  const [input, setInput] = useState('')
  const [stad, setStad] = useState(cities[0]) 
  const [error, setError] = useState('')

  // Functie om de input te updaten
  function changeCity(e) {
    setInput(e.target.value)
    setError('')
  }

  // Functie om de stad te zoeken
  function zoekStad() {
    const gevonden = cities.find((c) => c.locatie.toLowerCase() === input.trim().toLowerCase())
    if (gevonden) {
      setStad(gevonden)
    } else {
      setError(`Geen gegevens gevonden`)
    }
  }

  // Functie om het juiste icoon te krijgen
  function getIcon(icons) {
    const s = icons.toLowerCase()
    if (s.includes('regen')) return rain
    if (s.includes('sneeuw')) return snow
    if (s.includes('bliksem')) return thunder
    if (s.includes('zonnig')) return sunny
    return cloudy
  }

  return (
    <div className='weer'>
      <div className='searchbar'>
        <input
          type='text'
          placeholder='Zoek een stad...'
          value={input}
          onChange={changeCity}
          onKeyDown={zoekStad}
        />
        <img
          src={searchIcon}
          onClick={zoekStad}
          className='search-icon'
        />
      </div>

      {<p style={{ color: 'red', fontSize: '22px' }}>{error}</p>}

      <img src={getIcon(stad.weersomstandigheden)} className='weer-icon' />
      <p className='temp'>{stad.temperatuur}</p>
      <p className='location'>{stad.locatie}</p>

      
      <div className='details'>
        <img src={weer} className='detail-icon' />
        <p className='detail'>Weersomstandigheden: {stad.weersomstandigheden}</p>

        <img src={cloudy} className='detail-icon' />
        <p className='detail'>Bewolking: {stad.bewolking}</p>
        
        <img src={sunny} className='detail-icon' />
        <p className='detail'>Zon: {stad.zon}</p>
      </div>
    </div>
  )
}

export default Weer
