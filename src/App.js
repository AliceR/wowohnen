import AppBar from '@material-ui/core/AppBar'
import React, { Component } from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import Map from './Map'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              WoWohnen
            </Typography>
          </Toolbar>
        </AppBar>
        <Map />
      </div>
    )
  }
}

export default App
