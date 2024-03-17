import { Line } from "react-chartjs-2";

function Graph({ graphData }) {
  return (
    <section className="graph">
      <Line
        data={{
          datasets: [
            {
              label: "Bankroll in USD",
              data: graphData
            }
          ]
        }}
      />
    </section>
  );
}

export default Graph;
