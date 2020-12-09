import React, { Component } from 'react'
import {Line} from 'react-chartjs-2'

const buildChart = (dataForChart) =>{
  const {open, close, labelsX, low,volume,high} = dataForChart 
  const chart = {
    labels: labelsX,
    datasets: [
      {
        label: 'Open',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(255,0,0,1)',
        borderColor: 'rgba(255,0,0,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255,0,0,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255,0,0,1)',
        pointHoverBorderColor: 'rgba(255,0,0,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: open
      },
      {
        label: 'High',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(0,0,255,1)',
        borderColor: 'rgba(0,0,255,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(0,0,255,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(0,0,255,1)',
        pointHoverBorderColor: 'rgba(0,0,255,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: high
      },
      {
        label: 'low',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(0,255,0,1)',
        borderColor: 'rgba(0,255,0,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(0,255,0,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(0,255,0,1)',
        pointHoverBorderColor: 'rgba(0,255,0,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: low
      },
      {
        label: 'Close',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(0,0,0,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(0,0,0,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(0,0,0,1)',
        pointHoverBorderColor: 'rgba(0,0,0,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: close
      },
      {
        label: 'Volume',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(255,255,0,1)',
        borderColor: 'rgba(255,255,0,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255,255,0,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255,255,0,1)',
        pointHoverBorderColor: 'rgba(255,255,0,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: volume
      }
    ],
    options: {
        scales: {
            xAxes: [{
                ticks: {
                    callback: function(tick, index, labels) {
                        return (index % 3) ? "" : tick;
                    }
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: false
                }
            }]
        }
    }
  };
  return chart
}
export default class FetchAndChart extends Component {
    state = {
        loading : true,
        person: null,
        case : '',
        chart : null
    }
    async componentDidMount(){
      let open = []
      let high = []
      let low = []
      let close = []
      let volume = []
      let labelsX = []
      const splittedString = this.props.timeStamps.split(" ")
      var url = 'https://www.fxempire.com/api/v1/en/stocks/chart/candles?Identifier=AAPL.XNAS&IdentifierType=Symbol&AdjustmentMethod=All&IncludeExtended=False&period=' + splittedString[0] + '&Precision=' + splittedString[1] + '&StartTime=8/28/2020%2016:0&EndTime=9/4/2020%2023:59&_fields=ChartBars.StartDate,ChartBars.High,ChartBars.Low,ChartBars.StartTime,ChartBars.Open,ChartBars.Close,ChartBars.Volume'
      const response = await fetch(url)
      const data = await response.json()
      console.log(open.length)
      data.forEach(function (arrayItem) {
        open.push(arrayItem.Open)
        close.push(arrayItem.Close)
        low.push(arrayItem.Low)
        high.push(arrayItem.High)
        volume.push(arrayItem.Volume)
        labelsX.push(arrayItem.Date)
      });
      this.setState({
        chart : buildChart({open,close,low,high,volume,labelsX}),
        loading : false,
      })
    }
    render(){
        return (
            <div>
                {this.state.loading ? 
                <div>loading...</div> :
                <div>
                 <Line    
                    data={this.state.chart}               
                    width={1000}
                    height={500}
                    options={{ maintainAspectRatio: false }}
                />
                </div>}
            </div>
        )
    }
}