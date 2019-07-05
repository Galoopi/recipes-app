import React from 'react';
import {  MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBInput } from 'mdbreact';

export class EditRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            ingredients: "",
            
        };

        this.handleRecipeNameChange = this.handleRecipeNameChange.bind(this);
        this.handleRecipeIngredientsChange = this.handleRecipeIngredientsChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleRecipeNameChange(e) {
        this.setState({ name: e.target.value });
    }

    handleRecipeIngredientsChange(e) {
        this.setState({ ingredients: e.target.value });
    }

    handleEdit(e) {
        e.preventDefault();
        const onEdit = this.props.onEdit;
        const currentlyEditing = this.props.currentlyEditing;
        const regExp = /\s*,\s*/;
        let name = this.state.name;
        let ingredients = this.state.ingredients.split(regExp);
        onEdit(name, ingredients, currentlyEditing);
    }
    handleClose() {
        const onEditModal = this.props.onEditModal;
        this.setState({ 
            name: this.props.recipe.name, 
            ingredients: this.props.recipe.ingredients.join(","),
            modal: !this.state.modal 

        });
        onEditModal();
    }

    static getDerivedStateFromProps(props, state) {
        const prevName = state.prevName;
        const prevIngredients = state.prevIngredients;
        const name = prevName !== props.recipe.name ? props.recipe.name : state.name;
        const ingredients = prevIngredients !== props.recipe.ingredients.join(",") ? props.recipe.ingredients.join(",") : state.ingredients;
        return {
            prevName: props.recipe.name,
            name,
            prevIngredients: props.recipe.ingredients.join(","),
            ingredients,
        }
    }

    

    render() {
        const onShow = this.props.onShow;
        let regex1 = /^\S/;
        let regex2 = /^[^,\s]/;
        let regex3 = /[^,\s]$/;
        const validRecipe = regex1.test(this.state.name) && regex2.test(this.state.ingredients) && regex3.test(this.state.ingredients);
        return ( 
            <>
            <MDBBtn color="default" onClick={this.handleClose} >Edit Recipe</MDBBtn>
              <MDBModal   isOpen={this.state.modal} onHide={this.handleClose} size="lg" >
                <MDBModalHeader toggle={this.handleClose}>Edit Recipe</MDBModalHeader>
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
                  <MDBBtn color="success" onClick={this.handleEdit} disabled={!validRecipe}>Save Recipe</MDBBtn>
                </MDBModalFooter>
              </MDBModal>
              <
            />
        );
    }
}

export default EditRecipe;