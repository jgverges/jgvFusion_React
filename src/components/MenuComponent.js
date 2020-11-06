import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

const MenuRender = ({dish, onClick})=> {
    return  <Card onClick={() => onClick(dish.id)}>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle tag="h5">{dish.name}</CardTitle>
                </CardImgOverlay>
            </Card>
}

const Menu = (props) =>{
    const menu = props.dishes.map((dish) => {
        return (
          <div  className="col-12 col-md-5 m-1" key={dish.id}>
           <MenuRender onClick={props.onClick} dish ={dish}/>
          </div>
        );
    });

    return (
        <div className="container">
            <div className="row">
                {menu}
            </div>
        </div>
        );

}

export default Menu;