import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'

const Menu = () => {
  const style = {
    backgroundColor: '#f9cdcd',
    margin: '10px',
    padding: '10px'
  }

  const linkStyle = {
    padding: '10px'
  }

  const active = {
    backgroundColor: '#ff8d00'
  }
  return (
    <div style={style}>
      <NavLink to='/home' style={linkStyle} activeStyle={active}>anecdotes</NavLink>&nbsp;
    <NavLink to='/create' style={linkStyle} activeStyle={active}>create new</NavLink>&nbsp;
    <NavLink to='/about' style={linkStyle} activeStyle={active}>about</NavLink>&nbsp;
  </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content} </Link></li>)}
    </ul>
  </div>
)

const Notification = ({ notification }) => {
  const style = { display: notification === "" ? 'none' : '', padding: '5px', border: '2px solid green', borderRadius: '4px', color: 'grey', marginTop: '10px', backgroundColor: 'lightgreen' }
  return (<div style={style}>{notification}</div>)
}

const DetailedAnecdote = ({ anec }) => (
  <div>
    <h4>{anec.content}</h4>
    <div>-{anec.author}</div>
    <div>{anec.votes} votes</div>
    <div><a href={anec.info}>See more about this anecdote</a></div>
  </div>
)


const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push("/home")
  }


  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              content
              <input name='content' value={this.state.content} onChange={this.handleChange} />
            </div>
            <div>
              author
              <input name='author' value={this.state.author} onChange={this.handleChange} />
            </div>
            <div>
              url for more info
              <input name='info' value={this.state.info} onChange={this.handleChange} />
            </div>
            <button>create</button>
          </form>
        </div>
      </div>
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote), notification: `New anecdote "${anecdote.content}" created.` }, () => {
      setTimeout(() => this.setState({ notification: "" }), 10000)
    })
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div>
        <h1>Software anecdotes</h1>
        <Router>
          <div>


            <Menu />

            <Route exact path="/home" render={() => {
              return (
                <div>
                  <Notification notification={this.state.notification} />
                  <AnecdoteList anecdotes={this.state.anecdotes} />
                </div>)
            }} />
            <Route exact path="/about" render={() => <About />} />
            <Route exact path="/create" render={({ history }) => <CreateNew addNew={this.addNew} history={history} />} />
            <Route exact path="/anecdotes/:id" render={({ match }) => <DetailedAnecdote anec={this.anecdoteById(match.params.id)} />} />

            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

/*
            <Link to='/'>Home  </Link>
            <Link to='/create'>Create Anecdote  </Link> */

export default App;
