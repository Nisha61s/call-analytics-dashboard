export function getAnalytics(calls) {
  const safeCalls = Array.isArray(calls) ? calls : [];

  if (!safeCalls.length) {
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

  const totalCalls = safeCalls.length;

  const totalCost = safeCalls.reduce(
    (sum, call) => sum + Number(call.callCost ?? 0),
    0
  );

  const totalDuration = safeCalls.reduce(
    (sum, call) => sum + Number(call.callDuration ?? 0),
    0
  );

  const averageDuration = totalDuration / totalCalls;

  const successfulCalls = safeCalls.filter(
    (call) => call.callStatus !== false
  ).length;

  const failedCalls = totalCalls - successfulCalls;

  const durations = safeCalls.map((call) => Number(call.callDuration ?? 0));
  const longestCall = durations.length ? Math.max(...durations) : 0;
  const shortestCall = durations.length ? Math.min(...durations) : 0;

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