import React from 'react';
import ReactLoading from 'react-loading';
import {Doughnut} from 'react-chartjs-2';

class ShowStats extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   };
  // }

  render() {

    const resultsData = [];

    this.props.ResultsStats.forEach(item => {
      if (item.Platform !== "Total") {
        resultsData.push(item.Movies);
      }
      console.log(item.Platform, item.Movies);
    });

    let chartData = {
      labels: ["Netflix", "Hulu", "Prime Video", "Disney+"],
      datasets: [{
        label: "Movies per Platform",
        data: resultsData,
        backgroundColor: ["#E60E1B","#30B363", "#06A6E4", "#114495"]
      }]
    };

    if (!this.props.isLoadedResultsStats) {
      return (
        <div id="loading" className="d-flex justify-content-center">
          <ReactLoading type={"spin"} color={"black"} height={"5%"} width={"5%"} />
        </div>
      );
    }
    else {
      return (
        <div>
          {this.props.isSubmittedStats &&
            <div className="chart">
              <Doughnut
                data={chartData}
                options = {{
                  title: {
                    display: true,
                    text: "Total Movies Per Platform"
                  }
                }}
              />
            </div>
          }

        </div>

      );
    }
  }
}

export default ShowStats;
