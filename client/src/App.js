import './App.css';
import Nav from './components/Nav';
import Login from './login/Login';
import Signup from './login/Signup';
import {Switch, Route, Redirect} from 'react-router-dom';
import Food from './menu/Food';
import Home from './Home';
import React from 'react';
import Error from './components/Error';
import Axios from 'axios';
import {useEffect, useState} from 'react';
import {ThemeProvider} from 'styled-components';
import {useDarkMode} from './useDarkMode';
import {GlobalStyles} from './globalStyles';
import {lightTheme, darkTheme} from './Thems';
import Toggle from './Toggler';

function App() {
    const [foodBlog, setFoodBlog] = useState([]);
    useEffect(async () => {
        const response = await Axios.get('http://localhost:3001/foods/all', {});
        setFoodBlog(response.data);
    }, []);

    const time = new Date();
    const hour = time.getHours();
    const [theme, themeToggler, mountedComponent] = useDarkMode();
    const themeMode = theme === 'light' ? lightTheme : darkTheme;
    if (!mountedComponent) return <div />;

    return (
        <ThemeProvider theme={themeMode}>
            <GlobalStyles />
            <div className="App">
                <Nav />
                <Toggle theme={theme} toggleTheme={themeToggler} />
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    {foodBlog.map((food) => (
                        <Route key={food.food_id} path={'/' + food.food_name}>
                            <Food food={food}></Food>
                        </Route>
                    ))}
                    <Route path="/Error" component={Error} />
                    <Route exact={true} path="/" component={Home} />
                    <Redirect to="/Error" />
                </Switch>
            </div>
        </ThemeProvider>
    );
}

export default App;
