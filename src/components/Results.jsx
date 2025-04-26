// const calculateResult = (userTraits, resultsData) => {
//   let bestMatch = null;
//   let bestMatchScore = 0;
//   console.log('hitting calculateresults');

//   resultsData.forEach((pizza) => {
//     let score = 0;
//     pizza.traits.forEach((trait) => {
//       score += userTraits.filter((t) => t === trait).length; // count occurrences
//     });

//     if (score > bestMatchScore) {
//       bestMatchScore = score;
//       bestMatch = pizza;
//     }
//   });

//   return bestMatch;
// };

// export default calculateResult;

const calculateResult = (userTraits, resultsData) => {
  let bestMatch = null;
  let bestMatchScore = 0;

  // Loop through each pizza in resultsData
  resultsData.forEach((pizza) => {
    let score = 0;

    // Compare each trait in the pizza's traits
    pizza.traits.forEach((trait) => {
      // Count how many times each trait appears in the user's traits list
      const traitMatchCount = userTraits.filter((t) => t === trait).length;

      // Add the number of matches to the score
      score += traitMatchCount;
    });

    // If the score for this pizza is higher than the previous best match, update it
    if (score > bestMatchScore) {
      bestMatchScore = score;
      bestMatch = pizza;
    }
  });

  // Return the best matched pizza
  return bestMatch;
};

export default calculateResult;
