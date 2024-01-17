import React, { useState, useEffect, useMemo } from 'react';
import Hero from '../../components/hero';
import { getPets } from '../../api/petfinder';
import Pet from '../../components/pet';
import { useLocation } from 'react-router-dom';

// import useLocation here
const SearchPage = () => {
  
  // Get the search value from useLocation() here
  const { search } = useLocation();

  const queryParams = useMemo(() => { 
    return new URLSearchParams(search); // note that react returns an error unless you wrap 
    // url search params in use memo
    //Without this, every time the SearchPagerenders, the call to the URLSearchParams
    // constructor will create a new object and cause queryParams to change.
  }, [search]);

  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function getPetsData() {
      const petNameToFind = queryParams.get('name');
      const petsData = await getPets('', petNameToFind);

      setPets(petsData);
    }

    getPetsData();
  }, [queryParams]);

  return (
    <div className="page">
      <Hero displayText={`Results for ${queryParams.get('name')}`} />

      <h3>Pets available for adoption near you</h3>

      <main>
        <div className="grid">
          {pets.length > 0 ? pets.map((pet) => (
            <Pet animal={pet} key={pet.id} />
          )) : 'Sorry, no pets found by that name :('}
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
