module.exports.getTicketCostFunction = function (cost, coefficient) {
  const costTicket = Number((cost * coefficient).toFixed(2));

  function calculateTicketCost(ticketType, costTicket) {
    if (ticketType === 'adult') {
      return {
        totalCost: costTicket.toFixed(2),
        fare: (costTicket * 0.65).toFixed(2),
        tax: (costTicket * 0.35).toFixed(2),
      };
    } else if (ticketType === 'children') {
      const totalCost = costTicket * 0.78;
      const fare = totalCost * 0.55;
      const tax = totalCost - fare;
      return {
        totalCost: totalCost.toFixed(2),
        fare: fare.toFixed(2),
        tax: tax.toFixed(2),
      };
    } else if (ticketType === 'infant') {
      const totalCost = costTicket * 0.32;
      const fare = totalCost * 0.88;
      const tax = totalCost - fare;
      return {
        totalCost: totalCost.toFixed(2),
        fare: fare.toFixed(2),
        tax: tax.toFixed(2),
      };
    }
  }

  const adultTicketCost = calculateTicketCost('adult', costTicket);
  const childrenTicketCost = calculateTicketCost('children', costTicket);
  const infantTicketCost = calculateTicketCost('infant', costTicket);

  return {
    adult: adultTicketCost,
    children: childrenTicketCost,
    infant: infantTicketCost,
  };
};
