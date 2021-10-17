import { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'

class ErrorBoundary extends Component {
    state = { hasError: false, redirect: false }
    static getDerivedStateFromError() {
        return { hasError: true }
    }
    componentDidCatch(error, info){
        //log this to new relic, azure onitor error catching services
        console.error("ErrorBoundary caught an error", error, info)
        setTimeout(()=> this.setState({redirect: true}), 5000)
    }

    
    render () {
        if(this.state.redirect){
            return <Redirect to="/" />;
        } else if (this.state.hasError){
            return(
                <h1>
                    This listing has an error. <Link to="/">Click here</Link> to go back to the home page
                    or wait 5 seconds.
                </h1>
            )
            
        }
        return this.props.children;

    }
}

<ErrorBoundary>
    <h1>Hi there</h1>
</ErrorBoundary>

export default ErrorBoundary