const axios = require("axios");

// (async () => {
//   while (true) {
//     const result = await axios.get("https://randomuser.me/api/");
//     const dob = new Date(
//       result.data.results[0]?.dob?.date,
//     ).toLocaleDateString();
//     console.log(dob);
//     if (dob) break;
//   }
// })();

const url = " https://httpdump.app/dumps/76e8c886-629e-4d78-b57a-3e8a49eaa2a9";
//POST Request
// (async () => {
//   axios.post(
//     url,
//     {
//       username: "Marcel",
//       password: "supersecret",
//     },
//     {
//       headers: {
//         Authorization: "Bearer YOUR_TOKEN_HERE",
//         "Custom-Header": "Hello-World",
//         "Content-Type": "application/json", // Optional
//       },
//     },
//   );
// })();

(async () => {
  axios.get(url + "?name=ABC", {
    headers: {
      Authorization: "Bearer YOUR_TOKEN_HERE",
      "Custom-Header": "Hello-World",
      "Content-Type": "application/json", // Optional
    },
  });
})();
