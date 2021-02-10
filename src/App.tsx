import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Authentication from 'src/components/Authentication'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'

interface IApp {}

const App: React.FC<IApp> = ({}) => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow">
          <Switch>
            <Route exact path="/" component={Authentication} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

export default App
