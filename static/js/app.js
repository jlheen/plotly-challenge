function init(index = "940") {

// Use the d3 library to read in samples.json
    d3.json("../../samples.json").then((importedData) => {
        var data = importedData;
        console.log(data.names.indexOf(index));
        index = data.names.indexOf(index);

        // var results = data.filter("samples.json")

        // var names = data.names;
        // var dm = data.metadata;
        // var sample_ids = data.samples[index].id;
        var OTUs = data.samples[index].otu_ids;
        var otuValues = data.samples[index].sample_values;


        // ****************************
        // OFFICE HOURS QUESTION 1
        // ****************************


        // Populate the Demographic Info
        // Initiate variables for the demographic info
        // var ids = dm[0].id;
        // var ethnicity = dm.ethnicity;
        // var gender = dm.gender;
        // var age = dm.age;
        // var location = dm.location;
        // var bbtype = dm.bbtype;
        // var wfreq = dm.wfreq;

        // // Append the information into the Demographic Info object
        // function buildTable(ids, ethnicity, gender, age, location, bbtype, wfreq) {
        //     var table = d3.select(".panel");
        //     var pbody = table.select(".panel-body");
        //     var prow;
        //     for (var i = 0; i < 12; i++) {
        //       prow = pbody.append("tr");
        //       prow.append("td").text(`id: ${ids}[i]`);
        //       prow.append("td").text(ethnicity[i]);
        //       prow.append("td").text(gender[i]);
        //       prow.append("td").text(age[i]);
        //       prow.append("td").text(location[i]);
        //       prow.append("td").text(bbtype[i]);
        //       prow.append("td").text(wfreq[i]);
        //     }
        // });

        //   buildTable();


        // Create a horizontal bar chart with the top ten OTU values
        slicedOTUs = OTUs.slice(0, 10);
        slicedSampleValues = otuValues.slice(0, 10);
        reversedOTUs = slicedOTUs.reverse();

        reversedSamples = slicedSampleValues.reverse();

        var yticks = OTUs.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

        // Create the trace
        var trace1 = {
            x: reversedSamples,
            // .map(object => object.OTUs),
            y: yticks,
            // y: reversedSamples.map(object => object.otuValues),
            // text: reversedData.map(object => object.OTUs),
            type: "bar",
            orientation: "h"
        };

        // data
        var data = [trace1];

        // Apply the group bar mode to the layout
        var layout = {
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", data);

        // ****************************
        // OFFICE HOURS QUESTION 2
        // ****************************


        // Populate the sample info into a bubble chart
        var trace2 = {
            x: OTUs,
            y: otuValues,
            mode: 'markers',
            marker: {
            //   size: [40, 60, 80, 100],
              color: [    '#1f77b4',  // muted blue
              '#ff7f0e',  // safety orange
              '#2ca02c',  // cooked asparagus green
              '#d62728',  // brick red
              '#9467bd',  // muted purple
              '#8c564b',  // chestnut brown
              '#e377c2',  // raspberry yogurt pink
              '#7f7f7f',  // middle gray
              '#bcbd22',  // curry yellow-green
              '#17becf']
            }
          };
          
          var data = [trace2];
          
          var layout = {
            title: 'OTU Values',
            showlegend: false,
            height: 600,
            width: 600
          };
          
          Plotly.newPlot("bubble", data, layout);


    });

};

init(); 


function getData() {
   
    var dropdownMenu = d3.select("#selDataset");
    
    // Assign the value of the dropdown menu option to a variable


    d3.json("../../samples.json").then((importedData) => {
        console.log(importedData);
        var dropdownData = importedData.names;
        // var results = data.filter("samples.json")

        dropdownData.forEach((name) => {
            dropdownMenu.append("option").text(name).property("value", name)
        });

    });

};

getData();

function optionChanged(selected) {
    init(selected);
    console.log(selected);
};