import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

import Map from './Map'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'teal'
  },
  drawerPaper: {
    position: 'relative',
    width: 300
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    minWidth: 0 // So the Typography noWrap works
  }
})

class App extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              WoWohnen
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }} />
        <main className={classes.content}>
          <Map />
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(App)
