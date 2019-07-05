import React, { Component } from 'react';
import { MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';


class AddRecipe extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            name: "",
            ingredients: "",
            

        };

        this.handleShow = this.handleShow.bind(this);
        this.handleRecipeNameChange = this.handleRecipeNameChange.bind(this);
        this.handleRecipeIngredientsChange = this.handleRecipeIngredientsChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        const onAddModal = this.props.onAddModal;
        this.setState({
            name: "",
            ingredients: "",
            modal: !this.state.modal
            
        });
        onAddModal();
    }

    handleShow() {
        this.setState({ modal: true });
    }

    handleRecipeNameChange(e) {
        this.setState({ name: e.target.value });
    }

    handleRecipeIngredientsChange(e) {
        this.setState({ ingredients: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const onAdd = this.props.onAdd;
        const regExp = /\s*,\s*/;
        let newName = this.state.name;
        let newIngredients = this.state.ingredients.split(regExp);
        let newRecipe = { name: newName, ingredients: newIngredients };
        onAdd(newRecipe);
        this.setState({ name: "", ingredients: "" });
    }

    


    render() {
        const onShow = this.props.onShow;
        let regex1 = /^\S/;
        let regex2 = /^[^,\s]/;
        let regex3 = /[^,\s]$/;
        const validRecipe = regex1.test(this.state.name) && regex2.test(this.state.ingredients) && regex3.test(this.state.ingredients);
        return ( 
            <>
            <MDBBtn color="default" onClick={this.handleShow}>Add Recipe</MDBBtn>
              <MDBModal isOpen={this.state.modal}  onHide={this.handleClose} size="lg" >
                <MDBModalHeader toggle={this.handleClose}>New Recipe</MDBModalHeader>
                <MDBModalBody>
                  <MDBInput    
                    label="Recipe Name" 
                    outline 
                    required onChange={this.handleRecipeNameChange} 
                    value={this.state.name}
                  />  
                  <MDBInput 
                    type="textarea"  
                    label="Enter Ingredients(separate by commas)" 
                    outline required onChange={this.handleRecipeIngredientsChange} 
                    value={this.state.ingredients} 
                  />
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn color="danger" onClick={this.handleClose}>Close</MDBBtn>
                  <MDBBtn color="success" onClick={this.handleSubmit} disabled={!validRecipe}>Save Recipe</MDBBtn>
                </MDBModalFooter>
              </MDBModal>
              <
            />
        );
    }
}

export default AddRecipe;