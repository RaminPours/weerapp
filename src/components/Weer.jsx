import { useState } from "react"
import "./Weer.css"

export default function Weer() {
  const [stad, setStad] = useState("")
  const [weer, setWeer] = useState("")
  const [fout, setFout] = useState("")

  async function zoekWeer() {
    if (!stad.trim()) return setFout("Typ een stad.")

    try {
      setFout("")

      // Zoek coördinaten
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(stad)}&count=1&language=nl&format=json`)
      const g = await geoRes.json()

      if (!g.results?.length) return setFout("Stad niet gevonden.")
      const { latitude, longitude, name, country } = g.results[0]

      // Haal huidig weer op
      const weerRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`)
      const w = await weerRes.json()

      const temp = Math.round(w.current.temperature_2m) + "°C"
      const code = w.current

      // wmo codes van open-meteo
      const omschrijving = {
        0: "Helder ",
        1: "Zonnig 🌞",
        2: "Deels bewolkt",
        3: "bewolkt ☁",
        61: "Regen 🌧",
        71: "Sneeuw 🌨",
        80: "Buien ☔",
        95: "Onweer ⚡",
      }[code] ?? "Onbekend"

      setWeer({ temp, omschrijving, locatie: `${name}, ${country}` })
    } catch (error) {
      console.error(error)
      setFout("Kon geen gegevens ophalen.")
    }
  }

  function toets(e) {
    if (e.key === "Enter") zoekWeer()
  }

  return (
    <div className="weer">
      <h1>Het weer</h1>
      <input
        placeholder="Typ een stad..."
        value={stad}
        onChange={(e) => setStad(e.target.value)}
        onKeyDown={toets}
        className="input"
      />
      <button 
      onClick={zoekWeer}
      className="search"
      >Zoek</button>

      {fout && <p style={{ color: "red", fontSize: "22px" }}>{fout}</p>}
      {weer && (
        <div className="info">
          <h2>{weer.locatie}</h2>
          <p>{weer.temp}</p>
          <p>{weer.omschrijving}</p>
        </div>
      )}
    </div>
  )
}
