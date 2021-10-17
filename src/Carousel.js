import {Component} from 'react';

class Carousel extends Component {
    state = {
        active: 0
    }

    //if you don't get props for images, just fall onto the default props defined here
    static defaultProps = {
        images: ['http://pets-images.dev-apis.com/pets/none.jpg']
    }

    handleIndexClick = (event) => {
        console.log(this, "this")
        this.setState({
            //plus sign makes something a number if it is a number string
            active: +event.target.dataset.index,
        })
    }  

    render() {
        const {active} =this.state;
        //state is mutable, it is self contatined
        const {images} =this.props;

        //props comes from parents
        return(
            <div className="carousel">
                <img src={images[active]} alt="animal" />
                <div className="carousel-smaller">
                    {/* {console.log(images, "images")} */}
                    {images.map((photo, index)=>(
                        // <div> {console.log(index, "index")}</div>,
                        //eslint-disable-next-line
                        <img 
                            key={photo}
                            src={photo}
                            data-index={index}
                            //We got an error here where this was undefined,
                            //to fix this you can do this.handleIndexClick.bind(this)
                            //to get it to think that this is the Carousel component
                            //or you can do an arrow function; an arrow function will
                            //make "this" refer to which component the function was created
                            //originally "this" doesn't have value because in the context of where
                            //it was called it didn't have value
                            onClick={this.handleIndexClick}
                            //if someone clicks on it it needs to be active
                            className={index===active ? "active" : ""}
                            alt="animal thumbnail"
                        />
                    ))}
                    
                </div>
            </div>
        )
    }
}

export default Carousel

