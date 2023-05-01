module.exports.getCoefficientFunction = function (i) {
  let coefficient = 1;

  if (i === 0) {
    coefficient = Math.random() * 0.1 + 0.9;
  } else if (i === 1) {
    coefficient = Math.random() * 0.05 + 0.87;
  } else if (i === 2) {
    coefficient = Math.random() * 0.05 + 0.84;
  } else if (i === 3) {
    coefficient = Math.random() * 0.05 + 0.81;
  } else if (i === 4) {
    coefficient = Math.random() * 0.05 + 0.78;
  } else {
    coefficient = Math.random() * 0.05 + 0.7;
  }

  return coefficient;
};
