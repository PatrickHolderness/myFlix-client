import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
export class MainView extends React.Component {
    
  constructor() {
        super();
        this.state = {
            movies: [
                { 
                _id: 1, Title: 'The Shawshank Redemption', Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', Genre:"Drama", Director:"Frank Darabont",  ImagePath: 'https://m.media-amazon.com/images/I/51P9fL8JeTL._AC_.jpg'
                },
                {
                   _id: 2, Title: 'Inception', Description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.', Genre:"Action", Director:"Christopher Nolan", ImagePath: 'https://www.imdb.com/title/tt1375666/mediaviewer/rm3426651392/?ref_=tt_ov_i'},
                {
                    _id: 3, Title: '12 Angry Men', Description: 'The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.', ImagePath: 'https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_UX67_CR0,0,67,98_AL_.jpg',
                },
            ],
            selectedMovie: null
        }
    }
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }
    render() {
        const { movies, selectedMovie } = this.state;

        if (selectedMovie) return <MovieView movie={selectedMovie} />;

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
                {movies.map(movie => <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />)}
            </div>
        );
    } render() {
        const { movies, selectedMovie } = this.state;

        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                    ))
                }
            </div>
        );
    }
}

export default MainView;