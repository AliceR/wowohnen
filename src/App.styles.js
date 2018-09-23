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

export default styles
