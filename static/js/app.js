
// set up function for plotting
function getPlot(id) {
    // getting data from the json file
    d3.json("samples.json").then((data) => {

        // filter samples by id
        var samples = data.samples.filter(s => s.id.toString() === id)[0]

        //get top 10 
        var sampleValues = samples.sample_values.slice(0, 10).reverse();

        // get top 10 otu ids. 
        var otuTop = (samples.otu_ids.slice(0, 10)).reverse();
        
        // get otu and add label
        var otuId = otuTop.map(d => "OTU " + d)

        // get the top 10 labels
        var labels = samples.otu_labels.slice(0, 10);
        
        // create trace variable for the plot
        var trace = {
            x: sampleValues,
            y: otuId,
            text: labels,
            marker: {
                color: '#A9916D'
            },
            type: "bar",
            orientation: "h",
        };

        // create data variable
        var data = [trace];

        // create for layout
        var layout = {
            title: "Top 10 Operational Taxonomic Units",
            margin: {
                l: 100,
                r: 100,
                t: 75,
                b: 30
            }
        };

        // create the bar plot
        Plotly.newPlot("bar", data, layout);

        // variables for bubble chart
        var traceB = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels

        };

        // set the layout for the bubble plot
        var layoutB = {
            xaxis: {
                title: "Operational Taxonomic Unit ID"
            },
            height: 700,
            width: 1200
        };

        // creating data variable 
        var dataB = [traceB];

        // create the bubble plot
        Plotly.newPlot("bubble", dataB, layoutB);
       
    });
}
// create the function
function getInfo(id) {
    // read the json file to get data
    d3.json("samples.json").then((data) => {

        // get info for the demographic panel
        var metadata = data.metadata;

        // filter info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        // select panel
        var demographicInfo = d3.select("#sample-metadata");

        // empty the panel before getting newinfo
        demographicInfo.html("");

        //  get info and append to the panel
        Object.entries(result).forEach((key) => {
            demographicInfo.append("h5").text(key[0] + ": " + key[1] + "\n");
        });
    });
}

// create change event funcion
function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}

// create the initial function
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

    // read the data 
    d3.json("samples.json").then((data) => {
        
        // append the data to dropdown
        data.names.forEach(function (name) {
            dropdown.append("option").text(name).property("value");
        });

        // call the functions to display the data and the plots
        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();



