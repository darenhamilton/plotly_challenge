d3.json("samples.json").then((importedData) => {
    console.log(importedData);
  });
  
  let data = importedData

  let samples = Object.values(data.samples)
  let metaData = Object.values(data.metadata)
  let names = Object.values(data.names)