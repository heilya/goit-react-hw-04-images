import React from "react";
import { Component } from "react";
import toast from 'react-hot-toast';
import {Header, Form, Input, Button} from './searchbar.styled'

export class Searchbar extends Component {
  

  handleSubmit = event => {
    event.preventDefault();
    if (event.target.elements.query.value.trim() === "") {
      toast.error('Please enter a search term!');
      return;
    }
    const newQuery = event.target.elements.query.value;
    this.props.onSumbit(newQuery)
    event.target.reset();
  };

render() {
  return(
    <Header>
<Form onSubmit={this.handleSubmit}>
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
};