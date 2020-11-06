import React from 'react';
import { Card, CardImg,  CardText, CardBody,CardTitle } from 'reactstrap';



const RenderDish = ({dish})=> {
    return(
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle tag ='h4' >{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}
 
const RenderComments = ({comments}) => {
    if (comments != null) {
        const comment2 = comments.map(comment => {
            return   (
                <div key={comment.id}>
                    <li>{comment.comment}</li> 
                    <li>
                        -- {comment.author}, 
                            {
                        new Intl.DateTimeFormat('en-US',
                        { year: 'numeric', month: 'short', day: '2-digit'}).format(
                            new Date(Date.parse(comment.date)))
                        }
                    </li>
                </div>
            )
        })
        return <div>
            {comment2}
            </div>
    }
    else {
        return <div></div>
    }
}    

const  DishDetail = ({selectedDish}) => {
      if (selectedDish != null)
        return (
            <div className="container">
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        <RenderDish dish = {selectedDish}/>
                    </div>
                    <div  className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <ul className='list-unstyled'>
                            <RenderComments comments = {selectedDish.comments}/>
                        </ul>
                    </div>
                </div>
            </div>
        )
     else
        return(
            <div></div>
        );
    } 

export default  DishDetail;