import React from 'react';
import { Card, CardImg,  CardText, CardBody,CardTitle } from 'reactstrap';

export default class DishDetail extends React.Component {
    constructor(props){
        super(props);
        console.log('DishDetail * constructor');
    }

    componentDidMount(){
        console.log('DishDetail * componentDidmount');
    }
    componentDidUpdate(){
        console.log('DishDetail * componentDidUpdate')
    }

    renderDish(dish) {
        console.log('DishDetail * render')
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
 
    renderComments(){
        if (this.props.selectedDish.comments != null)
            return (
                this.props.selectedDish.comments.map(
                    comment =><div key={comment.id}>
                                <li>{comment.comment}</li> 
                                <li>
                                    -- {comment.author}, 
                                     {
                                    new Intl.DateTimeFormat('en-US',
                                    { year: 'numeric', month: 'short', day: '2-digit'}).format(
                                        new Date(Date.parse(comment.date)))
                                    }
                                </li>
                            </div>)
            )
        else    
            return <div></div>
    }    

    render(){
      if (this.props.selectedDish != null)
        return (
            <div className="container">
                <div className="row">
                    <div  className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.selectedDish)}
                    </div>
                    <div  className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <ul className='list-unstyled'>
                            {this.renderComments()}
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

}