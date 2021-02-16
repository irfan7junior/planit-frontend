import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
import Home from './components/Home'
import Project from './components/Project'

interface IApp {}

const App: React.FC<IApp> = React.memo(({}) => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex justify-center items-start">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/projects/:id" component={Project} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  )
})

export default App
