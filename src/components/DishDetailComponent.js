import React from 'react';
import { Button,Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Nav,  NavItem, 
     Modal, ModalHeader, ModalBody,Form, FormGroup, Input, Label } from 'reactstrap';
import { Link } from 'react-router-dom';


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



const  DishDetail = (props) => {
      if (props.dish != null)
      return (
        <div className="container">
        <div className="row">
            <Breadcrumb>

                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{props.dish.name}</h3>
                <hr />
            </div>                
        </div>
        <div className="row">
            <div className="col-12 col-md-5 m-1">

                <RenderDish dish={props.dish} />

            </div>
            <div className="col-12 col-md-5 m-1">

                <RenderComments comments={props.comments} />

                <CommentForm/>

            </div>
        </div>
        </div>
    );
else
        return(
            <div></div>
        );
    } 

export default  DishDetail;



class CommentForm extends React.Component{
    constructor(props) {
        super(props);
    
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleComments = this.handleComments.bind(this);
        
        this.state = {
            isNavOpen: false,
            isModalOpen: false
        };
      }

      toggleNav() {
        this.setState({
          isNavOpen: !this.state.isNavOpen
        });
      }

      toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
      
      handleComments(event) {
        this.toggleModal();
        alert("Rating: " + this.rating.value + " Name: " + this.name.value
            );
        event.preventDefault();

    }
    render(){
        return(
          <React.Fragment>

            <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Button outline onClick={this.toggleModal}>
                            <span className="fa fa-sign-in fa-lg"></span>
                             Submit Comments
                        </Button>
                    </NavItem>
            </Nav>

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                <Form onSubmit={this.handleComments}>
                        <FormGroup>
                            <Label htmlFor="rating">Rating</Label>
                            <Input type="number" id="rating" name="rating"
                                innerRef={(input) => this.rating = input} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="name">Your Name</Label>
                            <Input type="name" id="name" name="name"
                                innerRef={(input) => this.name = input}  />
                        </FormGroup>
                       
                        <Button type="submit" value="submit" color="primary">Submit</Button>
                    </Form>
                </ModalBody>
            </Modal>

        </React.Fragment>
        )
    }
}

