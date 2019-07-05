import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCol, MDBRow, MDBContainer,MDBListGroup, MDBListGroupItem } from "mdbreact";

const Panels = props => {
return (
<MDBContainer>
  <MDBRow className="mb-4">
    <MDBCol sm="4">
      <MDBCard >
        <MDBCardBody>
          <MDBCardTitle>Special title treatment</MDBCardTitle>
          
            <MDBListGroup  >
              <MDBListGroupItem>Cras justo odio</MDBListGroupItem>
              
            </MDBListGroup>
          
          <MDBBtn color="default">Edit Recipe</MDBBtn>
          <MDBBtn color="warning">Delete Recipe</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>

    <MDBCol sm="4">
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle>Special title treatment</MDBCardTitle>
          <MDBCardText>
            With supporting text below as a natural lead-in to additional
            content.
          </MDBCardText>
          <MDBBtn color="primary">go somewhere</MDBBtn>
          <MDBBtn color="warning">Warning</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  </MDBRow>
</MDBContainer>
);
};

export default Panels;