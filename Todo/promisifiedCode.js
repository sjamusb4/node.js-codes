import fs from "fs";

export function readFileAsync(filename) {
  return new Promise((res, rej) => {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) rej("No previous data found, starting fresh.");
      else res(data);
    });
  });
}

export function writeFileAsync(filename, data) {
  return new Promise((res, rej) => {
    fs.writeFile(filename, data, (err) => {
      if (err) rej("Error saving data.");
      else res();
    });
  });
}
