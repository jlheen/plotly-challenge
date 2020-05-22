function init(index = "940") {

// Use the d3 library to read in samples.json
    d3.json("../../samples.json").then((importedData) => {
        var data = importedData;
        console.log(data.names.indexOf(index));
        index = data.names.indexOf(index);

        // var results = data.filter("samples.json")

        var names = data.names;
        var dm = data.metadata;
        // var sample_ids = data.samples[index].id;
        var OTUs = data.samples[index].otu_ids;
        var otuValues = data.samples[index].sample_values;

        // filter the metadata using a function matching the sample_ids with the metadata id
        var metadataResults = dm.filter(subjectID => subjectID.id == data.names[index]);
        console.log(metadataResults[0])

        // Populate the Demographic Info
        // Initiate variables for the demographic info
        var ids = metadataResults[0].id;
        var ethnicity = metadataResults[0].ethnicity;
        var gender = metadataResults[0].gender;
        var age = metadataResults[0].age;
        var location = metadataResults[0].location;
        var bbtype = metadataResults[0].bbtype;
        var wfreq = metadataResults[0].wfreq;

        // Append the information into the Demographic Info object
        function buildTable(ids, ethnicity, gender, age, location, bbtype, wfreq) {
            var table = d3.select(".panel");
            var pbody = table.select("#sample-metadata");
            pbody.html("")
            var prow;
              prow = pbody.append("tr");
              prow.append("td").text(`id: ${ids}`);
              prow = pbody.append("tr");
              prow.append("td").text(ethnicity);
              prow = pbody.append("tr");
              prow.append("td").text(gender);
              prow = pbody.append("tr");
              prow.append("td").text(age);
              prow = pbody.append("tr");
              prow.append("td").text(location);
              prow = pbody.append("tr");
              prow.append("td").text(bbtype);
              prow = pbody.append("tr");
              prow.append("td").text(wfreq);
        };

        buildTable(ids, ethnicity, gender, age, location, bbtype, wfreq);


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

        // Populate the sample info into a bubble chart
        var trace2 = {
            x: OTUs,
            y: otuValues,
            mode: 'markers',
            marker: {
              size: otuValues,
              color: OTUs
            }
          };
          
          var data = [trace2];
          
          var layout = {
            title: 'OTU Values',
            showlegend: false,
            height: 600,
            width: 1000
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