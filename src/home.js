import './App.css';
import ImageSlider from './imageSlider';
import { SliderData } from './SliderData';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="headingwriting">
          <center>Home Page Welcome to book store</center><br></br>
          <ImageSlider slides={SliderData} />
        </div>
      </header>
    </div>
  );
}

export default Home;
