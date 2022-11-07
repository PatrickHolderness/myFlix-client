# myFlix Client

##### Using React to build the client-side for an application called myFlix, based on its existing server-side code (REST API and MongoDB). The application is a single-page application (SPA) and uses state routing to navigate between views and sharing URLs.[movie_api](https://github.com/patrickholderness/movie_api)

A React project using hooks, react-redux for state management, react-bootstrap for styling and react-router for routing.

![myflix-screenshot](https://user-images.githubusercontent.com/104070642/200290239-d68d11e5-028f-4e3a-8afc-88f8235afb06.png)


## Project dependencies 
- React
- Parcel-Bundler
- React-Bootstrap
- Axios
- React-Router
- React-Redux

## Key Features:
#### Main view
  - Returns a list of ALL movies (each displayed with an image, title, and description)
  - Sorting and filtering
  - Ability to select a movie for more details
#### Single movie view
  - Returns data (description, genre, director, image) about a single movie
  - Allows users to add a movie to their list of favorites
#### Login view
  - Allows users to log in with a username and password
  - Registration view
  - Allows new users to register (username, password, email, birthday)
#### Genre view
  - Returns data about a genre, with a name and description
#### Director view
  - Returns data about a director (name, biography, year of birth, year of death (if applicable)
#### Profile view
  - Allows users to update their user info (username, password, email, date of birth)
  - Allows existing users to delete their account
  - Displays favorite movies
  - Allows users to remove a movie from their list of favorites
  
  # Getting started
  
  To install myFLix, follow these steps.
  
  - Clone the repo 
  `git clone https://github.com/patrickholderness/myflix-client.git`
  
  - Install NPM packages
  `npm install`
  
  - Start the app 
  `"npm start" in CLI`
  
  # Usage
  
  Once the app opens, you will see a login page and a registration link. Register, then log in with your credentials.
  
  
