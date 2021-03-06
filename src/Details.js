import {Component} from'react';
import {withRouter} from 'react-router-dom'
import Carousel from './Carousel'
import ErrorBoundary from './ErrorBoundary'
import ThemeContext from './ThemeContext'
import Modal from './Modal'

class Details extends Component {
    //class components have state refering to a state object
    //have to user super to call the class constructor

   state = {loading: true, showModal: false};

//called once when the comonents mount
    async componentDidMount () {
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?id=${this.props.match.params.id}`
        )
        const json = await res.json()
        this.setState(Object.assign(
            {
                loading: false,
            },
           json.pets[0]
        ))
        // this.setState({loading: false, name: json.pets[0].name})
        //Object.assign() method copies all enumerable own properties(attributes)
        //from one or more source objects to a target object. 
    }

toggleModal = () => this.setState({showModal: !this.state.showModal })
adopt = () => (window.location = 'http://bit.ly/pet-adopt')
    render(){
        if(this.state.loading){
            return <h2>Loading</h2>
        }
        //I think destructuring means taking all the attributes of an object,
       // and making it easier to work with
        const {animal, breed, city, state, description, name, images, showModal} = this.state;
        
        return(
            <div className="details">
                <Carousel images ={images}/>
                <div>
                    <h1>{name}</h1>
                    <h2>{`${animal} - ${breed} - ${state} - ${city}`}</h2> 
                    <ThemeContext.Consumer>
                        {([themeHook]) => (
                            <button onClick={this.toggleModal}
                            style={{backgroundColor: themeHook}}>Adopt {name}</button>
                        )
                        }
                    </ThemeContext.Consumer>
                    <p>{description}</p>
                    {showModal ? (
                            <Modal>
                                <div>
                                    <h1>Would you like to adopt {name}?</h1>
                                    <div className="buttons">
                                        <button onClick={this.adopt}>Yes</button>
                                        <button onClick={this.toggleModal}>No</button>
                                    </div>
                                </div>
                            </Modal>
                        ) : null
                    }
                </div>
            </div>
           
        )
    }
}

//higher order component means things that don't display

const DetailsWithRouter = withRouter(Details)

export default function DetailsWithErrorBoundary(){
    return(
        <ErrorBoundary>
            <DetailsWithRouter />
        </ErrorBoundary>
    )
};
