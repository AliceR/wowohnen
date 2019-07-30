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
      populationMax: 250000,
      sunshineHoursMin: 1600,
      sunshineHoursMax: 2000
    }
  }

  onSliderChange = (type, value) => {
    this.setState({
      [`${type}Min`]: value[0],
      [`${type}Max`]: value[1]
    })
  }

  render() {
    const { classes } = this.props

    const populationMinLabel = this.state.populationMin.toLocaleString()
    const maxThreshold = 500000
    const populationMaxLabel =
      this.state.populationMax > 500000
        ? maxThreshold.toLocaleString() + ' +'
        : this.state.populationMax.toLocaleString()

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              WoWohnen
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" classes={{ paper: classes.drawerPaper }}>
          <div className={classes.range}>
            <Typography
              variant="body1"
              color="inherit"
              className={classes.label}
            >
              <span role="img" aria-label="rural">
                👩‍🌾
              </span>{' '}
              {populationMinLabel} - {populationMaxLabel}{' '}
              <span role="img" aria-label="urban">
                👩‍⚕️👩‍💻👨‍🎨🤵👩‍🚀
              </span>
            </Typography>
            <Range
              defaultValue={[
                this.state.populationMin,
                this.state.populationMax
              ]}
              min={0}
              max={501000}
              step={1000}
              onChange={value => this.onSliderChange('population', value)}
              trackStyle={[{ backgroundColor: 'teal' }]}
              handleStyle={[{ borderColor: 'teal' }, { borderColor: 'teal' }]}
            />
          </div>
          <div className={classes.range}>
            <Typography
              variant="body1"
              color="inherit"
              className={classes.label}
            >
              <span role="img" aria-label="cloudy">
                🌥
              </span>{' '}
              {this.state.sunshineHoursMin.toLocaleString()} -{' '}
              {this.state.sunshineHoursMax.toLocaleString()}{' '}
              <span role="img" aria-label="sunny">
                ☀️
              </span>
            </Typography>
            <Range
              defaultValue={[
                this.state.sunshineHoursMin,
                this.state.sunshineHoursMax
              ]}
              min={0}
              max={2000}
              step={100}
              onChange={value => this.onSliderChange('sunshineHours', value)}
              trackStyle={[{ backgroundColor: 'teal' }]}
              handleStyle={[{ borderColor: 'teal' }, { borderColor: 'teal' }]}
            />
          </div>
        </Drawer>
        <main className={classes.content}>
          <Map
            populationMin={this.state.populationMin}
            populationMax={this.state.populationMax}
            sunshineHoursMin={this.state.sunshineHoursMin}
            sunshineHoursMax={this.state.sunshineHoursMax}
          />
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(App)
