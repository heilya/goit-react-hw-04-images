import { Component } from "react";
import axios from "axios";
import {Searchbar} from "./searchbar/searchbar";
import {ImageGallery} from "./imageGallery/imagegallery";
import {Loader} from "./loader/loader";
import {Button} from "./loadMore/button";
import toast, { Toaster } from 'react-hot-toast';




export class App extends Component{
  state = {
    query:'',
    images:[],
    page:1,
    loading:false,
   };

 


  handleSubmitForm = (newQuery) =>{
    this.setState({query:`${Date.now()}/${newQuery}`,images:[],page:1});
  };

  async componentDidUpdate(prevProps, prevState) {
    const {query, page} = this.state
    const API_KEY = '38219577-d029f76c48d8fd975b70c05f3';
    const BASE_URL = 'https://pixabay.com/api/';
    
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ loading: true });
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
          this.setState(prevState => ({
            images: [...prevState.images, ...newImages],
            loading: false,
          }));
        })
        .catch((error) => {
          console.log("Error fetching images:", error);
          toast.error("Oops! Our image server is currently unavailable. Please try again later.")
        });
    }
  }

  

  handleLoadMore = () =>{
    const {page} = this.state;
    this.setState({page: page + 1});
  };


  render(){
    const {loading, images} = this.state;
    return(
      <div>
        <Searchbar onSumbit={this.handleSubmitForm}/>
        <ImageGallery images={this.state.images}/>
        {images.length !== 0 && (
          <Button onClick={this.handleLoadMore} />
          )}
          {loading && <Loader/>}
        <Toaster />
      </div>
    );
  };
};


