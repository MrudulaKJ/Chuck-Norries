import React, { useState, useEffect } from 'react';
import './chuck.css';

const Chuck = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [jokes, setJokes] = useState([]);
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://api.chucknorris.io/jokes/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Cannot fetch', error);
      }
    };

    fetchCategories();
  }, []);

  const jokeByCategory = async (category) => {
    try {
      const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`);
      const data = await response.json();
      const joke = data.value;
      setJokes([joke]);
      setCurrentJokeIndex(0);
      setShowModal(true);
    } catch (error) {
      console.error('Cannot fetch joke', error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    jokeByCategory(category);
  };
  const handleNextJoke = () => {
    if (currentJokeIndex === jokes.length - 1) {
      jokeByCategory(selectedCategory);
    } else {
      setCurrentJokeIndex((prevIndex) => (prevIndex + 1) % jokes.length);
    }
  };
  

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h2 className="bounce">Chuck Norris</h2>
      <div className="box-container">
        {categories.map((category, index) => (
          <div className="box" key={index} onClick={() => handleCategoryClick(category)}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
            <div className="subtitle">{`Ultimate Jokes on ${category.charAt(0).toUpperCase() + category.slice(1)}`}</div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className='modal-overlay'>
        <div className="modal">
          <div className="modal-content">
          <h3>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h3>
            <p>{jokes[currentJokeIndex]}</p>
            <div className="modal-buttons">
              <button className="next-joke-button" onClick={handleNextJoke} >
                Next Joke
              </button>
              <button className="close-button" onClick={handleModalClose}>
                Close
              </button>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default Chuck;
