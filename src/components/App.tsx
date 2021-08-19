import React, { useState } from 'react';  
import { AiFillHeart, AiOutlineSearch } from "react-icons/ai"
import Picture from './Picture';

function App() {

  interface Types {
    dogs: string[],
    data: {
      message: string[],
      status: string
    }
  }

  let [dogs, setDogs] = useState<Types["dogs"]>([])
  let [dogBreed, setDogBreed] = useState("")
  let [favorites, setFavorites] = useState<Types["dogs"]>([])

  const getDogs = async (): Promise<Types["dogs"]> => {
    const response = await fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random/10`)
    const data: Types["data"] = await response.json()
    if (data.status === "success") {
      setDogs(data.message)
    }
    else {
      setDogs([])
    }
    setDogBreed("")
    return data.message
  }

  const toggleFavorite = (url: string) => {
    if (favorites.includes(url)) {
      const filtered = favorites.filter(el => el !== url)
      setFavorites(filtered)
    }
    else {
      setFavorites([...favorites, url])
    }
  }

  return (
    <div className="App">
      <div className="header">
        <h1>Dog Breeds</h1>
        <div className="red-heart heart">
          <AiFillHeart />
        </div>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="e.g. bulldog, husky" onChange={(e) => setDogBreed(e.target.value)}/>
        <button onClick={getDogs}>
          <div className="search-icon">
            <AiOutlineSearch />
          </div>
          Search
        </button>
      </div>
      {dogs.length === 0 &&
        <div className="empty-dogs">
          There are no dogs here
        </div>
      }
      <div className="picture-grid">
        {dogs.map(url => <Picture toggleFavorite={toggleFavorite} favorite={favorites.includes(url)} url={url} />)}
      </div>
      <hr />
      <div className="favorites-section">
        <div className="favorites-title">
          <div className="red-heart heart">
            <AiFillHeart />
          </div>
          <h2>Favorites</h2>
        </div>
        <div className="favorites-grid">
            {favorites.map(url => <Picture toggleFavorite={toggleFavorite} favorite={favorites.includes(url)} url={url} />)}
        </div>
      </div>
    </div>
  );
}

export default App;
