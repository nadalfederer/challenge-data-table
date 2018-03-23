var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

var rows = require('./data.json')

var dimensions = [
  { value: 'date', title: 'Date' },
  { value: 'host', title: 'Host' }
]
var reduce = function (row, memo) {
  memo.count = (memo.count || 0) + 1
  memo.impressions = (memo.impressions || 0) + (row.type === 'impression' ? 1 : 0)
  memo.loads = (memo.loads || 0) + (row.type === 'load' ? 1 : 0)
  memo.displays = (memo.displays || 0) + (row.type === 'display' ? 1 : 0)
  memo.windows = (memo.windows || 0) + (row.uaOS === 'Windows' ? 1 : 0)
  memo.macos = (memo.macos || 0) + (row.uaOS === 'Mac OS' ? 1 : 0)
  memo.ubuntu = (memo.ubuntu || 0) + (row.uaOS === 'Ubuntu' ? 1 : 0)
  return memo
}
var calculations = [{
  title: 'impressions',
  value: 'impressions'
}, {
  title: 'loads',
  value: 'loads'
}, {
  title: 'displays',
  value: 'displays'
}, {
  title: 'Load Rate',
  value: function (memo) {
    return memo.loads / memo.impressions
  },
  template: function (val, row) {
    return getPercentage(val)
  }
}, {
  title: 'Display Rate',
  value: function (memo) {
    return memo.displays / memo.loads
  },
  template: function (val, row) {
    return getPercentage(val)
  }
}, {
  title: 'Windows Rate',
  value: function (memo) {
    return memo.windows / memo.count
  },
  template: function (val) {
    return getPercentage(val)
  }
}, {
  title: 'MacOs Rate',
  value: function (memo) {
    return memo.macos / memo.count
  },
  template: function (val) {
    return getPercentage(val)
  }
}, {
  title: 'Ubuntu Rate',
  value: function (memo) {
    return memo.ubuntu / memo.count
  },
  template: function (val) {
    return getPercentage(val)
  }
}
]

function getPercentage (value) {
  return (Math.round(value * 1000) / 10).toFixed(1) + '%'
}
module.exports = createReactClass({

  render () {
    return <ReactPivot rows={rows}
      dimensions={dimensions}
      reduce={reduce}
      calculations={calculations}
      nPaginateRows={25} />
  }
})
