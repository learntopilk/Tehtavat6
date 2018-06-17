import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap";
import { ListGroup, ListGroupItem, Grid, Col, Row, FormGroup, FormControl, ControlLabel, Button, Alert, Navbar, NavItem, Nav } from 'react-bootstrap'

const Menu = () => {
  const style = {
    backgroundColor: '#f9cdcd',
  }

  return (
    <div>
      <Navbar style={style}>
      <Navbar.Header>
        <Navbar.Brand>
          Anecdote Application
        </Navbar.Brand>
        </Navbar.Header>
      <Nav>

            <LinkContainer to='/home' ><NavItem>anecdotes</NavItem></LinkContainer>&nbsp;

            <LinkContainer to='/create' ><NavItem>create new</NavItem></LinkContainer>&nbsp;
      
            <LinkContainer to='/about' ><NavItem>about</NavItem></LinkContainer>&nbsp;
       </Nav>
      </Navbar>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => <ListGroupItem key={anecdote.id} ><Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content} </Link></ListGroupItem>)}
    </ListGroup>
  </div>
)

const Notification = ({ notification }) => {
  const style = { display: notification === "" ? 'none' : '', marginTop: '10px', backgroundColor: 'lightgreen' }
  return (<Alert style={style}>{notification}</Alert>)
}

const DetailedAnecdote = ({ anec }) => {
  console.log(anec)

  const anecFont = {
    fontFamily: "'Slabo 27px', serif",
    fontSize: '40px'
  }

  return (
    <div style={{ marginTop: '20px', marginBottom: '20px', backgroundColor: '#fafafa' }}>
      <Grid>
        <Row xs={12} xm={12}>
          <Col xs={12}>
            <h4 style={anecFont}>{anec.content}</h4>
          </Col>
        </Row>
        <Row>
          <Col xs={2} xsOffset={1}>
            <em>-{anec.author}</em>
          </Col>
          <Col xs={1} xm={1}>
            <p>{anec.votes} votes</p>
          </Col>

        </Row>
        <Row>
          <Col xs={12} xm={12}>
            <p><a href={anec.info}>See more about this anecdote</a></p>
          </Col>
        </Row>
      </Grid>
    </div>
  )
}


const About = () => (
  <Grid>
    <Col xs={8}>
      <div>
        <h2>About anecdote app</h2>
        <Row>
          <p>According to Wikipedia:</p>
        </Row>
        <Row>
          <Col xs={12} md={8}>
            <em>An anecdote is a brief, revealing account of an individual person or an incident.
              Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
              such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>
          </Col>
          <Col xs={6} md={4}>
            <img alt="A drawing of Charles Babbage" style={{ width: '220px' }} src="https://upload.wikimedia.org/wikipedia/commons/6/67/Babbage40.png" />
          </Col>
        </Row>
        <Row>
          <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
        </Row>
      </div>
    </Col>
  </Grid>
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
            <FormGroup>
              <div>
                <ControlLabel>content</ControlLabel>
                <FormControl name='content' value={this.state.content} onChange={this.handleChange} />
              </div>
              <div>
                <ControlLabel>author</ControlLabel>
                <FormControl name='author' value={this.state.author} onChange={this.handleChange} />
              </div>
              <div>
                <ControlLabel>url for more info</ControlLabel>
                <FormControl name='info' value={this.state.info} onChange={this.handleChange} />
              </div>
              <Button type="submit">create</Button>
            </FormGroup>
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

  mainStyle = {
    fontFamily: '"Open Sans" ,sans-serif',
    backgroundColor: '#fcfcfc'
  }

  render() {
    return (
      <div style={this.mainStyle} className="container">
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

export default App;
