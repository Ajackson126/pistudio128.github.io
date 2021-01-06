
// Define data file
const file = "Data/samples.json";

// Define function to build charts
function buildCharts(samplechoice) {

    d3.json(file).then((data) => {


        var sample = data.samples.filter(a => a.id==samplechoice);
        var sampleotuids = sample[0].otu_ids;
        //console.log(sampleotuids);

        // Get data; define y ticks; put the otu_ids in descending order via reverse function
        var samplevalues = sample[0].sample_values;
        var yticks = sampleotuids.slice(0,10).reverse().map(item => `OTU ${item}`);

        // Define trace for bar chart 
        var trace = [{
            type: 'bar',
            y: yticks,
            x: samplevalues.slice(0, 10).reverse(),
            orientation: 'h'
          }];
        
          // Define layout for bar chart
          var layout2 = {
            title: 'Top 10 Bacteria per Sample'
        
            };

        Plotly.newPlot('bar', trace, layout2);


        // Define bubble plot layout
        var bubbleLayout = {
          title: "Bacteria Cultures Per Sample",
          margin: { t: 0 },
          hovermode: "closest",
          xaxis: { title: "OTU ID" },
          margin: { t: 30},
          height: 600,
          width: 1000

        };

        var otu_labels = sample[0].otu_labels;

        // Define bubble plot data
        var bubbleData = [
          {
            x: sampleotuids,
            y: samplevalues,
            text: otu_labels,
            mode: "markers",
            marker: {
              size: samplevalues,
              color: sampleotuids,
              colorscale: "Earth"
            }
          }
        ];

          
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);

          // Define pie chart data
          var pieData = [{
              type: 'pie',
              values: samplevalues.slice(0, 10),
              labels: sampleotuids,
              textinfo: "labels+percent",
              insidetextorientation: "horizontal"
          }];

          //var otu_labels = sample[0].otu_labels;

          // define pie chart layout
          var pie_layout = [{
            height: 600,
            width: 600,
            //margin: {"t" : 0, "b" : 0, "l" : 0, "r" : 0},
            showlegend: true
          }]

        Plotly.newPlot('pie', pieData, pie_layout)
  
        // Define gauge chart data - Bonus   
        
        // Get the data; define the y ticks; put the otu_ids in descending order via reverse function
      
            // d3.json(file).then((data) => {
  //       var samplevalues = sample[0].sample_values;
  //       var washFreq = metadata.slice(0,10).reverse().map(item => `OTU ${item}`);
        
        var data = [
    {
      type: "scatter",
      x: [0],
      y: [0],
      marker: { size: 12, color: "850000" },
      showlegend: false,
      name: "Freq",
      text: level,
      hoverinfo: "text+name"
    },
    {
      values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
      rotation: 90,
      text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
      textinfo: "text",
      textposition: "inside",
      marker: {
        colors: [
          "rgba(0, 105, 11, .5)",
          "rgba(10, 120, 22, .5)",
          "rgba(14, 127, 0, .5)",
          "rgba(110, 154, 22, .5)",
          "rgba(170, 202, 42, .5)",
          "rgba(202, 209, 95, .5)",
          "rgba(210, 206, 145, .5)",
          "rgba(232, 226, 202, .5)",
          "rgba(240, 230, 215, .5)",
          "rgba(255, 255, 255, 0)"
        ]
      },
      labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
      hoverinfo: "label",
      hole: 0.5,
      type: "pie",
      showlegend: false
    }
  ];
 white_check_mark
 eyes
 raised_hands
 
 
 
 
 
 
 var layout = {
    shapes: [
      {
        type: "path",
        path: path,
        fillcolor: "850000",
        line: {
          color: "850000"
        }
      }
    ],
    title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
    height: 500,
    width: 500,
    xaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    },
    yaxis: {
      zeroline: false,
      showticklabels: false,
      showgrid: false,
      range: [-1, 1]
    }
  };
  var GAUGE = document.getElementById("gauge");
  Plotly.newPlot(GAUGE, data, layout);
 })
 
 

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