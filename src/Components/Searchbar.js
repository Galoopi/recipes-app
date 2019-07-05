import React from "react";
import { MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBBtn, MDBListGroup, MDBListGroupItem } from "mdbreact";
import { RecipeList } from '.src/RecipeList';

class Searchbar extends React.Component {
  state = {
    recipes: RecipeList,
    filteredSet: RecipeList,
    searchValue: "",
    modalOpen: false
  }

  handleSearch = (event) => this.setState({
   searchValue: event.target.value 
	}, 
	() => this.searchForRecipes());

  searchForRecipes = () => {
    this.setState(prevState => {
      const filteredSet = prevState.recipes.filter(item => item.toLowerCase().includes(this.state.searchValue.toLowerCase()));
      return { filteredSet };
    });
  }

  toggleModal = () => this.setState({ modalOpen: !this.state.modalOpen });

  render() {
    return (
      <div>
        <MDBBtn onClick={this.toggleModal}>Click to open search modal</MDBBtn>

        <MDBModal isOpen={this.state.modalOpen} toggle={this.toggleModal} backdrop={false} size="sm" side position="top-right">
          <MDBModalHeader toggle={this.toggleModal}>Modal title</MDBModalHeader>
          <MDBModalBody>
            <MDBInput value={this.state.searchValue} onChange={this.handleSearch} hint="Search for recipes" type="text" containerClass="mt-0" />
            <MDBListGroup>
              {
                this.state.filteredSet.map((recipe,item) => (
                  <MDBListGroupItem key={item}name={recipe[item].name}>{item}</MDBListGroupItem>
                ))
              }
            </MDBListGroup>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggleModal}>Close</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </div>
    );
  }
}

export default Searchbar;