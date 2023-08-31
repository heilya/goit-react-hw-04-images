import { useState, useEffect } from "react";
import axios from "axios";
import Searchbar from "./searchbar/searchbar";
import { ImageGallery } from "./imageGallery/imagegallery";
import { Loader } from "./loader/loader";
import { Button } from "./loadMore/button";
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const API_KEY = '38219577-d029f76c48d8fd975b70c05f3';
    const BASE_URL = 'https://pixabay.com/api/';
    
    if (query.trim() === '') return; 

    setLoading(true);
    const searchImages = async (query, page) => {
      const newQuery = query.split("/")[1];
      try {
        const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${newQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&page=${page}`);
        return response.data.hits;
      } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
      }
    };

    searchImages(query, page)
      .then((newImages) => {
        if (newImages.length === 0) {
          toast.error('Nothing found, try something else');
        }
        setImages(prevImages => [...prevImages, ...newImages]);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching images:", error);
        toast.error("Oops! Our image server is currently unavailable. Please try again later.")
      });
  }, [query, page]);

  const handleSubmitForm = (newQuery) => {
    setQuery(`${Date.now()}/${newQuery}`);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSubmitForm} />
      <ImageGallery images={images} />
      {images.length !== 0 && <Button onClick={handleLoadMore} />}
      {loading && <Loader />}
      <Toaster />
    </div>
  );
};

export default App;




