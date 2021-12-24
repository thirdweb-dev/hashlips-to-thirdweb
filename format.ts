import data from "./metadata.json";
import { createObjectCsvWriter } from "csv-writer";

const attributes = data[0].attributes.map((attribute: { trait_type: string, value: string; }) => attribute.trait_type);

const formatJson = (json: any) => {
  return json.map((nft: any) => {

    const formattedNft = {
      name: nft.name,
      description: nft.description,
      dna: nft.dna,
      edition: nft.edition,
      date: nft.date,
    };

    attributes.map(attribute => {
      const findAttribute = nft.attributes.find(({ trait_type }: { trait_type: string; }) => trait_type === attribute).value;
      formattedNft[attribute] = findAttribute.trim() === "None" ? "" : findAttribute;
    });
    return formattedNft;
  });
};

const metadata = formatJson(data);

const header = [
  { id: 'name', title: 'name' },
  { id: 'description', title: 'description' },
  { id: 'dna', title: 'dna' },
  { id: 'edition', title: 'edition' },
  { id: 'date', title: 'date' },
];

attributes.map((attribute: string) => header.push({ id: attribute, title: attribute }));

createObjectCsvWriter({ path: "./metadata.csv", header }).writeRecords(metadata).then(() => console.log('The CSV file was written successfully'));