import React from 'react';

import './App.css';

const slides = [
  {text: 'This is a slide'},
  {text: 'This is another slide'},
  {text: 'This is a last slide'}
];

function Slides(props) {
  return(
    <section className={props.active ? 'slide active' : 'slide'}>
      {props.children}
    </section>
  )
}

class App extends React.Component {
  state = {
    activeSlideIndex: 0,
  }

  componentDidMount() {
    window.addEventListener('keydown', this.listener)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.listener)
  }

  listener = (event) => {

    if (event.keyCode === 39) {
      this.nextSlide();
    } else if (event.keyCode === 37) {
      this.prevSlide();
    }
  }

  nextSlide = () => {
    if (this.state.activeSlideIndex + 1 < slides.length) {
      this.setState({ activeSlideIndex: this.state.activeSlideIndex + 1 })
    }
  }

  prevSlide = () => {
    if (this.state.activeSlideIndex > 0) {
      this.setState({ activeSlideIndex: this.state.activeSlideIndex - 1 })
    }
  }


  render() {
    return(
      <main className='slides'>
        {slides.map((slide, index) => (
          <Slides 
            active={this.state.activeSlideIndex === index} 
            index={index}
          >
            <h1>{slide.text}</h1>
            {index === 0 && 
            <div>
              <ul>
                <li>First</li>
                <li>Second</li>
                <li>Third point</li>
              </ul>
            </div>}
          </Slides>
        ))};
        
        <footer className='buttons'>
          {slides.map((slide, index) => (
            <button 
              className={this.state.activeSlideIndex === index ? 'active' : ''}
              onClick={() => this.setState({ activeSlideIndex: index })}
            />
          ))}
        </footer>
      </main>
    )
  }
}
export default App;
