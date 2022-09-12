import { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import WebContext from "../context/web-context";
import useBreedList from "../custon hooks/useBreedList";
import Pet from "./Pet";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const { sampleData } = useContext(WebContext);
  const [loader, setLoader] = useState(false);
  const [location, updateLocation] = useState("");
  const [animal, updateAnimal] = useState("");
  const [breed, updateBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);
  const locationInputRef = useRef(null);

  useEffect(() => {
    requestPets();
    locationInputRef.current.focus();
  }, []);

  async function requestPets(e) {
    setLoader(true);
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
    setLoader(false);
  }

  const handleUpdateBreed = (e) => {
    updateBreed(e.target.value);
  };
  const handleAnimalSelect = (e) => {
    updateAnimal(e.target.value);
    updateBreed("");
  };

  const renderData = () => {
    if (loader) {
      return <div> loading </div>;
    } else if (!pets.length) {
      return <div> No Data Found </div>;
    } else {
      return pets.map((pet) => (
        <Pet
          name={pet.name}
          animal={pet.animal}
          breed={pet.breed}
          key={pet.id}
        />
      ));
    }
  };

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => updateLocation(e.target.value)}
            ref={locationInputRef}
          />
        </label>
        <br />
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={handleAnimalSelect}
            onBlur={handleAnimalSelect}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={handleUpdateBreed}
            onBlur={handleUpdateBreed}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button>Submit</button>
      </form>
      {renderData()}
    </div>
  );
};

export default SearchParams;
