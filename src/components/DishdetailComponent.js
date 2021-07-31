import React, { Fragment } from 'react';
import { Card, CardBody, CardImg, CardImgOverlay,
    CardText, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';


    function RenderDish({id,image, name, title, description}){
        
        if (id!=null){
            return(
                <Fragment>
                    <Card>
                        <CardImg top src={image} alt={name} />
                        <CardBody>
                            <CardImgOverlay>
                                <CardTitle>{title}</CardTitle>
                            </CardImgOverlay>
                            <CardText>{description}</CardText>
                        </CardBody>
                    </Card>
                </Fragment>
            ); 
        }

        else{
            return(
                <Fragment></Fragment>
            );
        }
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
        return(
            <div className="container">
                <div className="row"    >
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish {...props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments {...props.dish} />
                    </div>
                </div>
            </div>
            
        );
    }

export default DishDetail;