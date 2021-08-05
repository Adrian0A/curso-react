import React, { Fragment } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardImgOverlay, ListGroup, ListGroupItem, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';



    function RenderDish({dish}){
        
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

    function RenderComments({comments}){
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
                </Fragment>
            );
        }
        else{
            return(
                <Fragment></Fragment>
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
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                </div>
            </div>
            </div>
        );
    };

export default DishDetail;