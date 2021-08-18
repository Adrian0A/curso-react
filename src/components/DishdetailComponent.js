import React, { Component, Fragment } from 'react';
import { Card, CardImg, CardText, CardBody,
        CardTitle, CardImgOverlay, ListGroup, 
        ListGroupItem, Breadcrumb, BreadcrumbItem, 
        Button, Modal, ModalBody, ModalHeader, 
        Input, FormGroup, Form, Label, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Errors, LocalForm}  from 'react-redux-form';
import { Loading } from './LoadingComponent';





    function RenderDish({dish, isLoading, errMess}){

        if (isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (dish != null)
            return(
                <Fragment>
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardImgOverlay>
                                <CardTitle>{dish.title}</CardTitle>
                            </CardImgOverlay>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </Fragment>
            ); 

    }

    function RenderComments({comments, addComment, dishId}){
        if (comments != null){
            return(
                <Fragment>
                    <h4>Comments</h4>
                    <ListGroup>
                        { comments.map((comment)=>{
                            return(
                                <Fragment>
                                    <ListGroupItem>
                                        {comment.comment}<br/>
                                        --{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                    </ListGroupItem>
                                </Fragment>
                            );
                        })}
                    </ListGroup>
                    <CommentForm dishId={dishId} addComment={addComment}/>
                </Fragment>
            );
        }
        else{
            return(
                <Fragment>

                </Fragment>
            );
        }
    }


    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);
    class CommentForm extends Component{
        constructor(props){
            super(props);

            this.state = {
                isModelOpen: false
            };
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
            
        }


        handleSubmit(values) {
            console.log('Current State is: ' + JSON.stringify(values));
            alert('Current State is: ' + JSON.stringify(values));
            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
            // event.preventDefault();
        }

        toggleModal(){
            this.setState({
                isModelOpen: !(this.state.isModelOpen)
            })
        }

        render(){
            return(
                <Fragment>
                    <Button outline onClick={this.toggleModal}><span className="fa fa-pencil"></span> Submit Comment</Button>
                    <Modal isOpen={this.state.isModelOpen} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal} > Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={2}>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={2}>Your Name</Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
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
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="12"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
                </Fragment>

            );
        }

    }
    
    const DishDetail = (props)=>{
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
                    <RenderDish dish={props.dish}
                    isLoading={this.props.isLoading}
                    errMess={this.props.errMess} />
                </div>
                <div className="col-12 col-md-5 m-1">
                   <RenderComments comments={props.comments}
                    addComment={props.addComment}
                    dishId={props.dish.id}
                    />
                    
                </div>
            </div>
            </div>
        );
    };



export default DishDetail;