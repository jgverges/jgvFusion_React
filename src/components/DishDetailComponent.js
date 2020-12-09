import React from 'react';
import { Button,Card, CardImg, CardText, CardBody, CardTitle,Col, Breadcrumb, BreadcrumbItem,  Nav,  NavItem, 
     Modal, ModalHeader, ModalBody, Label, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


const RenderDish = ({dish})=> {
    return(
        <Card>
            <CardImg top src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle tag ='h4' >{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}
 
const RenderComments = ({comments, postComment, dishId}) => {
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
            
            <CommentForm
                    postComment = {postComment}
                    dishId = {dishId}
                />
            </div>
    }
    else {
        return <div></div>
    }
}    



const  DishDetail = (props) => {
    console.warn(props);
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) 
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

                <RenderComments comments={props.comments} 
                    postComment = {props.postComment}
                    dishId = {props.dish.id}
                />
                
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
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends React.Component{
    constructor(props) {
        super(props);
                    
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
        }
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
       
      handleSubmit(values) {
          this.toggleModal();
          this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
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
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Label htmlFor="rating">Rating</Label>  
                        <Col md={10}>
                            <Control.select model=".rating" id="rating" 
                                name="rating"
                                className="form-control">
                                <option >1</option> 
                                <option >2</option>
                                <option >3</option>
                                <option >4</option>
                                <option >5</option>
                            </Control.select>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="author">Your Name</Label>
                        <Col md={10}>
                            <Control.text model=".author" id="author" name="author"                                       
                                placeholder="author"
                                className="form-control"
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                                />
                            <Errors
                                className="text-danger"
                                model=".author"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                                />                             
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="comment">Comment</Label>
                        <Col md={10}>
                            <Control.textarea model=".comment" id="comment" name="comment"
                                className="form-control" 
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                                rows="6" />
                            <Errors
                                className="text-danger"
                                model=".comment"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    minLength: 'Must be greater than 2 characters',
                                    maxLength: 'Must be 15 characters or less'
                                }}
                            />                              
                        </Col>
                    </Row>
                    <Row className="form-group">
                    <Col md={10}>
                        <Button type="submit" value="submit" color="primary">
                            Submit
                        </Button>
                    </Col>
                    </Row>
                </LocalForm>


                </ModalBody>
            </Modal>

        </React.Fragment>
        )
    }
}

