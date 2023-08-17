import './App.css';
import { UserData } from "./App";
import { useContext } from 'react';
function About() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="headingwriting">
          Name: Kairavee Rajyaguru <br/>
          Book Store: Book Store is a website where you can buy books online.<br/>
          Blogs: Blogs is a website where you can read blogs.
        </div>
      </header>
    </div>
  );
}

export default About;