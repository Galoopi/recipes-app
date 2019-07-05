import React, { Component } from "react";
import {
    MDBNavbar,
    MDBNavbarBrand,
    MDBBtn,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBListGroup,
    MDBListGroupItem,
    MDBJumbotron,
    MDBCardGroup
    
} from "mdbreact";
import "./index.css";
//import Panels from './Components/Panels';
import { RecipeList } from './RecipeList';
import EditRecipe from './Components/EditRecipe';
import AddRecipe from './Components/AddRecipe';
//import Searchbar from './Components/Searchbar';



class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: RecipeList,
            showAdd: false,
            showEdit: false,
            currentlyEditing: 0,
            
        };

        this.showAddModal = this.showAddModal.bind(this);
        this.showEditModal = this.showEditModal.bind(this)
        this.addRecipe = this.addRecipe.bind(this);
        this.editRecipe = this.editRecipe.bind(this);
        this.deleteRecipe = this.deleteRecipe.bind(this);
    }

    showAddModal() {
        this.setState({ showAdd: !this.state.showAdd });
    }

    showEditModal(index) {
        this.setState({ currentlyEditing: index, showEdit: !this.state.showEdit });
    }

    componentDidMount() {
        let recipes = (typeof localStorage["recipes"] !== "undefined") ?
            JSON.parse(localStorage.getItem("recipes")) : RecipeList;
        this.setState({ recipes: recipes });
        localStorage.clear();
    }

    addRecipe(recipe) {
        let recipes = this.state.recipes;
        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        this.setState({ recipes: recipes });
        this.showAddModal();
    }

    editRecipe(newName, newIngredients, currentlyEditing) {
        let recipes = this.state.recipes;
        recipes[currentlyEditing] = { name: newName, ingredients: newIngredients };
        localStorage.setItem('recipes', JSON.stringify(recipes));
        this.setState({ recipes: recipes });
        this.showEditModal(currentlyEditing);

    }

    deleteRecipe(index) {
        let recipes = this.state.recipes.slice();
        recipes.splice(index, 1);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        this.setState({ recipes: recipes, currentlyEditing: 0 });
    }

    onSearch = (event) => {
    this.setState({
      searchfield: event.target.value
    })
  }


    render() {
        const recipes = this.state.recipes;
        let currentlyEditing = this.state.currentlyEditing;

       
        return (
      
          <MDBContainer>
            
            <MDBContainer>
              <MDBJumbotron className="text-center" >
                <h1 className="h1-responsive" >Recipe App</h1>
                <hr className="my-2" />
                <p >
                  Search for your favorite recipes or add some new ones.
                </p>
                
                <MDBRow >
                  <MDBCol >
                    <AddRecipe 
                    onShow={this.state.showAdd} 
                    onAdd={this.addRecipe} 
                    onAddModal={this.showAddModal} 
                  />
                  </MDBCol>
                  <MDBCol >
                    
                  </MDBCol>
                  
                </MDBRow>  
              </MDBJumbotron>
            </MDBContainer>
       
          <MDBContainer>
            <MDBCardGroup deck >

              {recipes.map((recipe, index) => (
                <MDBCol size="3">
                  <MDBCard eventKey={index} key={index} className="text-center"  border="light" >
                    <MDBCardBody >
                      <MDBCardTitle >{recipe.name}</MDBCardTitle>
                       <MDBCardText>
                        <MDBListGroup  >
                         {recipe.ingredients.map((ingredient, index) => (
                          <MDBListGroupItem key={index}>{ingredient}
                          </MDBListGroupItem>
                          ))}
                        </MDBListGroup>
                       </MDBCardText>
                      
                    <EditRecipe 
                      onShow={this.state.showEdit} 
                      onEdit={this.editRecipe} 
                      onEditModal={() => {this.showEditModal(currentlyEditing)}} 
                      currentlyEditing={currentlyEditing} 
                      recipe={recipes[currentlyEditing]} 
                    /> 
                     <MDBBtn color="danger" onClick={() => {this.deleteRecipe(index)}}>Delete Recipe</MDBBtn>
                     </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              ))}
            </MDBCardGroup>
          </MDBContainer>

      </MDBContainer>

        );
    }
}

export default App;