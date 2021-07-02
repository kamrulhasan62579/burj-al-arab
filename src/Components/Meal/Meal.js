import React from 'react';
import { useHistory } from 'react-router-dom';
import './Meal.css'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn, MDBRipple, MDBContainer } from 'mdb-react-ui-kit';

const Meal = (props) => {
    const history = useHistory()
    const meal = props.meal;
    const {strCategory, idCategory, strCategoryDescription, strCategoryThumb } = meal;
    const handleOrderNow =(strCategory)=> {
       history.push(`/book/${strCategory}`);
       console.log(strCategory);
    }
    
    return (
        <MDBContainer>
              <MDBCard style={{ maxWidth: '30rem' }}>
            `  <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                <MDBCardImage src={strCategoryThumb} fluid alt='...' />
                <a>
                  <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                </a>
              </MDBRipple>
              <MDBCardBody>
                <MDBCardTitle>{strCategory}</MDBCardTitle>
                <MDBCardText>
                  Some quick Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, odio! example text to build on the card title and make up the bulk of the card's content.
                </MDBCardText>
                <MDBBtn onClick={() =>handleOrderNow(strCategory)} >BUY NOW</MDBBtn>
              </MDBCardBody>
          </MDBCard>
        </MDBContainer>
    );
};

export default Meal;