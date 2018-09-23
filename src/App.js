import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'
import React, { Component } from 'react'

import Map from './Map'
import styles from './App.styles'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      populationMin: 50000,
      populationMax: 250000
    }
  }

  onSliderChange = value => {
    this.setState({
      populationMin: value[0],
      populationMax: value[1]
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
              👩‍🌾 {this.state.populationMin.toLocaleString()} -{' '}
              {this.state.populationMax.toLocaleString()} 👩‍⚕️👩‍💻👨‍🎨🤵👩‍🚀
            </Typography>
            <Range
              defaultValue={[
                this.state.populationMin,
                this.state.populationMax
              ]}
              min={0}
              max={500000}
              step={1000}
              onChange={this.onSliderChange}
              trackStyle={[{ backgroundColor: 'teal' }]}
              handleStyle={[{ borderColor: 'teal' }, { borderColor: 'teal' }]}
            />
          </div>
        </Drawer>
        <main className={classes.content}>
          <Map
            populationMin={this.state.populationMin}
            populationMax={this.state.populationMax}
          />
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(App)
