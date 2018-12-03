var React = require('react')
var ReactPivot = require('react-pivot')
var createReactClass = require('create-react-class')

var rows = require('./data.json')
var dimensions = [
  {value: 'date', title: 'Date'},
  {value: 'hostname', title: 'Host'}
]
var reduce = function (row, memo) {
  switch (row.type) {
    case 'impression':
      memo.impressionsTotal = (memo.impressionsTotal || 0) + 1
      return memo
    case 'load':
      memo.loadsTotal = (memo.loadsTotal || 0) + 1
      return memo
    case 'display':
      memo.displaysTotal = (memo.displaysTotal || 0) + 1
      return memo
    default:
      return memo
  }
}
var calculations = [
  {
    title: 'Impressions',
    value: 'impressionsTotal'
  },
  {
    title: 'Loads',
    value: 'loadsTotal'
  },
  {
    title: 'Displays',
    value: 'displaysTotal'
  },
  {
    title: 'Load Rate',
    value: function(row) {
      return  isNaN(row.loadsTotal / row.impressionsTotal)? '0%' : (100 * row.loadsTotal / row.impressionsTotal).toFixed(1) + '%'
    }
  },
  {
    title: 'Display Rate',
    value: function(row) {
      return isNaN(row.displaysTotal / row.loadsTotal)? '0%' : (100 * row.displaysTotal / row.loadsTotal).toFixed(1) + '%'
    }
  }
]
module.exports = createReactClass({
  render () {
    return <div>
      <ReactPivot rows={rows}
                  dimensions={dimensions}
                  reduce={reduce}
                  calculations={calculations}
                  activeDimensions={['Date', 'Host']}
      />
    </div>
  }
})
