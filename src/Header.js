import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {debounce} from 'lodash';
import {Row, Input, Icon, Col } from 'react-materialize';
import {Link } from 'react-router-dom';


export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies:[],
            title:''
        }
        this.searchByTitle = this.searchByTitle.bind(this);
        this.fetchMovies = debounce(this.fetchMovies, 100);
    }


    fetchMovies = () =>{
        const {title } = this.state;
        var url = `https://api.themoviedb.org/3/search/movie?api_key=dabd0229faca72dc1e2d5fd2bed9c0e9&language=en-US&query=${title}&page=1&include_adult=false`;
        axios.get(url)
            .then(response => {
                const data = response.data.results;
                this.setState({movies: data});
            })

            .catch(error => console.log(error))
    }

    searchByTitle(e){
        this.setState({ title: e.target.value })
        let myTitle = this.state.title;
        console.log(myTitle)
    }

    componentDidUpdate(prevProps, prevState){
        this.fetchMovies();
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log('Shold comp update');
        if (nextState.title !== this.state.title) {
            return true
        }
        if (nextState.title ==='')

            return true
        return false
    }

    render() {
        let {movies} = this.state;
        let myTitle = this.state.title;
        console.log(myTitle);

        return (
            <div className="container">
                <div className="content1">
                    <div className="content11">
                        <a href="http://localhost:3000/">
                            <img className="img1" src="https://www.themoviedb.org/static_cache/v4/logos/408x161-powered-by-rectangle-green-bb4301c10ddc749b4e79463811a68afebeae66ef43d17bcfd8ff0e60ded7ce99.png" alt="logo"/>
                        </a>
                    </div>
                    <div className="content12">
                        <Row>
                            <Col s={1.3}><Icon medium>search</Icon></Col>
                            <Input s={8} label="Enter movie name" value={this.state.title} onChange={e => this.searchByTitle(e)} />
                        </Row>
                        <div>
                            <Row className="myrow">
                                {myTitle.length > 1 && <ul className={myTitle.length > 0 ? "myMovies": null}>
                                    { movies.length > 0 && movies.map((eachMovie, i) =>
                                        <li key={i}><Link to={`movie-detail/${eachMovie.id}`}>{eachMovie.title}</Link></li>
                                    )}
                                </ul>}
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}