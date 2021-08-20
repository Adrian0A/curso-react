import React, { Component, Fragment } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Contact from './ContactComponent';
import Home from './HomeComponents';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import About from './AboutComponent';
import { addComment, fecthDishes, fecthPromos,fecthComments } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';





const mapStateToProps = state => {
  return {
    dishes:state.dishes,
    comments:state.comments,
    promotions:state.promotions,
    leaders:state.leaders
  }
}

const mapDispathToProps = dispatch => ({
  addComment:(dishId,rating,author,comment) => dispatch(addComment(dishId,rating,author,comment)),
  fetchDishes: () => {dispatch(fecthDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  fecthComments: () => dispatch(fecthComments()),
  fecthPromos: () => dispatch(fecthPromos())
});


class Main extends Component {


  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }


  componentDidMount(){
    this.props.fetchDishes();
    this.props.fecthPromos();
    this.props.fecthComments();
  }

  render() {

    const HomePage = () => {
      return(
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promotion) => promotion.featured)[0]}
          promoLoading={this.props.promotions.isLoading}
          promoErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
          
          />

      );
    };

    const DishWithId = ({match}) => {
      return(
          <DishDetail 
            dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
            isLoading = {this.props.dishes.isLoading}
            errMess = {this.props.dishes.errMess} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
            commentsErrMess={this.props.comments.errMess} 
            addComment={this.props.addComment} />
      );
    };

    
    return (
      <Fragment>
        <Header/>
        <Switch>
            <Route path='/home' component={HomePage}/>
            <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} /> } />
            <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} /> } />
            <Route path='/menu/:dishId' component={DishWithId} />
            <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
            <Redirect to="/home" />
        </Switch>
        <Footer/>
      </Fragment>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispathToProps)(Main));