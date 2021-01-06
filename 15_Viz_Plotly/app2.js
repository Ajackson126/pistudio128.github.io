
// Define data file
const file = "Data/samples.json";

// Define function to build charts
function buildCharts(samplechoice) {

    d3.json(file).then((data) => {


        var sample = data.samples.filter(a => a.id==samplechoice);
        var sampleotuids = sample[0].otu_ids;
        //console.log(sampleotuids);

        // Got the data; define the y ticks; put the otu_ids in descending order via reverse function
        var samplevalues = sample[0].sample_values;
        var yticks = sampleotuids.slice(0,10).reverse().map(item => `OTU ${item}`);

        // Define trace for bar chart 
        var trace = [{
            type: 'bar',
            y: yticks,
            x: samplevalues.slice(0, 10).reverse(),
            orientation: 'h'
          }];
          
        Plotly.newPlot('bar', trace);


        // Define bubble plot data
        var trace1 = [{
            x: sampleotuids/*array of OTU IDs for the sample chosen*/,
            y: samplevalues/*array of sample values for the sample chosen*/,
            mode: 'markers',
            marker: {
              size: samplevalues,
              color: sampleotuids,
              colorscale: "Earth"

            }
          }];
          
          // Define layout for bubble plot
          
          var layout = {
            title: 'OTU ID',
            showlegend: false,
            height: 600,
            width: 1000
          };
          
        Plotly.newPlot('bubble', trace1, layout);

  //    Define gauge chart data - Bonus   
        
        var trace_g = [{
          domain: {x: [0,1], y: [0, 1]},
          value: washFreq,
          title: {text: "<b>Belly Button Washing Frequency </b><br> (Scrubs per Week)"},
          type: "indicator",
          mode: "gauge+number+delta",
          gauge: {
            axis: {range: [null, 9]},
            steps: [
              {range: [0,1], color: "#e5d5d0"},
              {range: [1,2], color: "#dbc7c2"},
              {range: [2,3], color: "teal"},
              { range: [3, 4], color: "#c9ada7" },
              { range: [4, 5], color: "#ac9899" },
              { range: [5, 6], color: "#8a7e88" },
              { range: [6, 7], color: "#7d7482" },
              { range: [7, 8], color: "#706a7b" },
              { range: [8, 9], color: "#4a4e69" }
            ],
          threshold: {
            value: washFreq
          }
        }
      }
  ];

        var layout_g = {
          width: 600,
          height: 450,
          margin: { t: 0, b: 0},
          };
          Plotly.newPlot("gauge", trace-g, layout_g);
        });
      }


// Define function for collecting metadata information
function meta(samplechoice) {

    // Define selection of metadata
    var selector = d3.select("#sample-metadata");

    // Pull data from file
    d3.json(file).then((data) => {

      var sample = data.metadata.filter(a => a.id==samplechoice);
      
      selector.html("");

      // Append information to appropriate demographic information
      selector.append("h5").text("ID: " + sample[0].id);
      selector.append("h5").text("Ethnicity: " + sample[0].ethnicity);
      selector.append("h5").text("Gender: " + sample[0].gender);
      selector.append("h5").text("Age: " + sample[0].age);
      selector.append("h5").text("Location: " + sample[0].location);
      selector.append("h5").text("Bb Type: " + sample[0].bbtype);
      selector.append("h5").text("Wfreq: " + sample[0].wfreq);

      //console.log(sample[0]);
      //var metadata = d3.select("#sample-metadata");
        
    });

}


// Define function for selecting options
function optionChanged(samplechoice) {

    buildCharts(samplechoice);
    meta(samplechoice);

}

// Define initialize function
function init() {

    d3.json(file).then((data) => {

        var selector = d3.select("#selDataset");

        console.log(data.names);

        data.names.forEach(element => {

            selector.append("option").text(element).property("value", element);
            
        });
    })

    // Define default chart and metadata
    buildCharts(940);
    meta(940);


}

init();