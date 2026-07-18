export function getAnalytics(calls) {

  if (!calls.length) {
    return {
      totalCalls: 0,
      totalCost: 0,
      averageDuration: 0,
      successfulCalls: 0,
      failedCalls: 0,
      longestCall: 0,
      shortestCall: 0,
    };
  }

  const totalCalls = calls.length;

  const totalCost = calls.reduce(
    (sum, call) => sum + Number(call.callCost),
    0
  );

  const totalDuration = calls.reduce(
    (sum, call) => sum + call.callDuration,
    0
  );

  const averageDuration = totalDuration / totalCalls;

  const successfulCalls = calls.filter(
    call => call.callStatus
  ).length;

  const failedCalls = totalCalls - successfulCalls;

  const longestCall = Math.max(
    ...calls.map(call => call.callDuration)
  );

  const shortestCall = Math.min(
    ...calls.map(call => call.callDuration)
  );

  return {
    totalCalls,
    totalCost,
    averageDuration,
    successfulCalls,
    failedCalls,
    longestCall,
    shortestCall,
  };
}