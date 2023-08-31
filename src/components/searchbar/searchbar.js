import React from "react";
import toast from 'react-hot-toast';
import {Header, Form, Input, Button} from './searchbar.styled'

const Searchbar = (props) =>{

  const handleSubmit = event => {
    event.preventDefault();
    if (event.target.elements.query.value.trim() === "") {
      toast.error('Please enter a search term!');
      return;
    }
    const newQuery = event.target.elements.query.value;
    props.onSubmit(newQuery)
    event.target.reset();
  };

  return (
    <Header>
<Form onSubmit={handleSubmit}>
<Button type="submit">Search
</Button>

<Input
  type="text"
  name="query"
  autoComplete="off"
  autoFocus
  placeholder="Search images and photos"
/>
</Form>
</Header>
  );
};


export default Searchbar;