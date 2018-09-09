import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'
import React, { Component } from 'react'

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
    width: 320
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    minWidth: 0 // So the Typography noWrap works
  },
  range: {
    margin: 20,
    top: 100,
    position: 'relative'
  }
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      min: 50000,
      max: 250000
    }
  }

  onSliderChange = value => {
    this.setState({
      min: value[0],
      max: value[1]
    })
  }

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
        <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
          <div className={classes.range}>
            <Typography variant="subheading" color="inherit" align="center">
              👩‍🌾 {this.state.min.toLocaleString()} -{' '}
              {this.state.max.toLocaleString()} 👩‍⚕️👩‍💻👨‍🎨🤵👩‍🚀
            </Typography>
            <Range
              defaultValue={[this.state.min, this.state.max]}
              min={0}
              max={500000}
              step={1000}
              onChange={this.onSliderChange}
            />
          </div>
        </Drawer>
        <main className={classes.content}>
          <Map min={this.state.min} max={this.state.max} />
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(App)
