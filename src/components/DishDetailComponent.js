import React from 'react';
import { Button,Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Form, FormGroup, FormFeedback, Nav,  NavItem, 
     Modal, ModalHeader, ModalBody, Input, Label } from 'reactstrap';
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


/* ***************************************************** */
/**********  CommentForm ******************************* */
/* ***************************************************** */

class CommentForm extends React.Component{
    constructor(props) {
        super(props);
    
                
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            rating:'',
            name : '',
            comment:'',
            touched: {
                rating:false,
                name : false,
                comment:false
            }
        }

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

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
      
      handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate( name, comment) {
        const errors = {
            name: '',
            comment:''
        };
        if (this.state.touched.name && name.length < 3)
            errors.name = 'Name should be >= 3 characters';
        else if (this.state.touched.name && name.length >= 15)
            errors.name = 'Name should be <= 15 characters';

        if (this.state.touched.comment && comment.length <3) 
            errors.comment = 'Comment shoul be >=3 characters';

        return errors;
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'select' ? target.selected : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

      handleSubmit(event) {
        this.toggleModal();
        console.log("Rating: " + this.rating.value + 
                    " Name: " + this.name.value +
                    "Comment: "+ this.comment.value);
        alert("Rating: " + this.rating.value + 
              " Name: " + this.name.value +
              "Comment: "+ this.comment.value
            );
        event.preventDefault();

    }


    render(){
        const errors = this.validate(this.state.name, this.state.comment);
        return(
          <React.Fragment>

            <Nav className="ml-auto" navbar>
                    <NavItem>
                        <Button outline onClick={this.toggleModal}>
                            <span className="fa fa-pencil mr-2"></span>
                             Submit Comments
                        </Button>
                    </NavItem>
            </Nav>
           

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label htmlFor="rating">Rating</Label>                            
                            <Input type="select" id="rating" name="rating"
                                innerRef={(input) => this.rating = input} >
                                <option value="1">1</option> 
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="name">Your Name</Label>
                            <Input type="text" id="name" name="name"                                       
                                        value={this.state.name}
                                        valid={errors.name === ''}
                                        invalid={errors.name !== ''}
                                        onBlur={this.handleBlur('name')}
                                        onChange={this.handleInputChange}
                                        innerRef={(input) => this.name = input}  />
                                    <FormFeedback>{errors.name}</FormFeedback>                              
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="comment">Comment</Label>
                            <Input type="textarea" id="comment" name="comment"
                                innerRef={(input) => this.comment = input}
                                value={this.state.comment}
                                valid={errors.comment === ''}
                                invalid={errors.comment !== ''}
                                onBlur={this.handleBlur('comment')}
                                onChange={this.handleInputChange} 
                                rows="6" />
                                 <FormFeedback>{errors.comment}</FormFeedback>    
                        </FormGroup>
                       
                        <Button type="submit" value="submit" color="primary">Submit</Button>
                    </Form>
                </ModalBody>
            </Modal>

        </React.Fragment>
        )
    }
}

