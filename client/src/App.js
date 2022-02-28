import './App.css';
import Nav from './components/Nav';
import Login from './login/Login';
import Signup from './login/Signup';
import { Switch, Route, Redirect } from 'react-router-dom';
import Food from './menu/Food';
import Home from './Home';
import React from 'react';
import Error from './components/Error';
import Axios from 'axios';
import { useEffect,useState } from 'react';

function App() {

    const [foodBlog, setFoodBlog] = useState([]);
    useEffect(async () => {
        const response = await Axios.get('http://localhost:3001/foods/all', {});
        setFoodBlog(response.data);
    }, []);

    return (
        <div className="App">
            <Nav />
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                {foodBlog.map((food) => <Route key={food.food_id} path={'/' + food.food_name}><Food food={food}></Food></Route>)}
                <Route path="/Error"   component={Error}   />
                <Route exact={true} path="/" component={Home} />
                <Redirect to="/Error" />
            </Switch>
        </div>
    );
}

export default App;
