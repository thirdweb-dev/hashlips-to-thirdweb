import data from "./_metadata.json";
import { createObjectCsvWriter } from "csv-writer";

const formatJson = (json: any) => {
  return json.map((dolphin: any) => ({
    name: dolphin.name,
    description: dolphin.description,
    dna: dolphin.dna,
    edition: dolphin.edition,
    date: dolphin.date,
    Background: dolphin.attributes[0].value === "None" ? "" : dolphin.attributes[0].value,
    Flipper: dolphin.attributes[1].value === "None" ? "" : dolphin.attributes[1].value,
    Color: dolphin.attributes[2].value === "None" ? "" : dolphin.attributes[2].value,
    Eyes: dolphin.attributes[3].value === "None" ? "" : dolphin.attributes[3].value,
    Hat: dolphin.attributes[4].value === "None" ? "" : dolphin.attributes[4].value,
  }));
};

const dolphins = formatJson(data);

createObjectCsvWriter({
  path: "./dolphins.csv",
  header: [
    { id: 'name', title: 'name' },
    { id: 'description', title: 'description' },
    { id: 'dna', title: 'dna' },
    { id: 'edition', title: 'edition' },
    { id: 'date', title: 'date' },
    { id: 'Background', title: 'Background' },
    { id: 'Flipper', title: 'Flipper' },
    { id: 'Color', title: 'Color' },
    { id: 'Eyes', title: 'Eyes' },
    { id: 'Hat', title: 'Hat' },
  ]
}).writeRecords(dolphins).then(() => console.log('The CSV file was written successfully'));