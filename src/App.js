import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
//give me the first one and I don't care about the rest of them
import Details from "./Details";
import SearchParams from "./SearchParams"
import {StrictMode, useState} from 'react';
//React Router provides a <Link> component to create links in your application
import ThemeContext from './ThemeContext'

const App = () => {
    const themeHook = useState("blue");
//everything inside of this can access this context from the ThemeContext component
    return(
        <ThemeContext.Provider value={themeHook}>
        <div>
            <Router> 
                <header>
                    <Link to="/">
                        <h1>Adopt Me!</h1>
                    </Link>
                </header>
                    <Switch>
                        <Route path="/details/:id">
                            {/* how you do variables in your routes is with a colon : */}
                            <Details />
                        </Route>
                        <Route path="/">
                            <SearchParams />
                        </Route>
                    </Switch>
            </Router>
        </div>
        </ThemeContext.Provider>
    )
}
ReactDOM.render(<StrictMode><App /></StrictMode>, document.getElementById("root"));
//React hooks is an API that came from 16.4
//Hooks are a way of managing state

//everytime something happens, a rerender cycle happens
//strict mode gives you extra warnings from React