import { Controller } from "stimulus"

export default class extends Controller {

  static get targets() 
  {
    return [ "canvas" ]
  }

  connect() {

    import("chart.js").then( Chartjs => {

      Chartjs.Chart.register(
        Chartjs.ArcElement,
        Chartjs.LineElement,
        Chartjs.BarElement,
        Chartjs.PointElement,
        Chartjs.BarController,
        Chartjs.BubbleController,
        Chartjs.DoughnutController,
        Chartjs.LineController,
        Chartjs.PieController,
        Chartjs.PolarAreaController,
        Chartjs.RadarController,
        Chartjs.ScatterController,
        Chartjs.CategoryScale,
        Chartjs.LinearScale,
        Chartjs.LogarithmicScale,
        Chartjs.RadialLinearScale,
        Chartjs.TimeScale,
        Chartjs.TimeSeriesScale,
        Chartjs.Decimation,
        Chartjs.Filler,
        Chartjs.Legend,
        Chartjs.Title,
        Chartjs.Tooltip
      );
      
      const element = this.hasCanvasTarget ? this.canvasTarget : this.element

      this.chart = new Chartjs.Chart( element.getContext('2d'), {
          type: 'bar',
          data: {
              labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              datasets: [{
                  label: '# of Votes',
                  data: [12, 19, 3, 5, 2, 3],
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)',
                      'rgba(255, 159, 64, 1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  y: {
                      beginAtZero: true
                  }
              }
          }
      });

    });

  }

  disconnect() {
    this.chart.destroy()
    this.chart = undefined
  }

}