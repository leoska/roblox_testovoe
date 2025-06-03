const TOTAL_REQUESTS = 10_000;
const AMOUNT_PER_REQUEST = 2;
const USER_ID = 1;

const sendRequest = async () => {
  try {
    const res = await fetch(
      `http://localhost:8080/user/${USER_ID}/balance/decrease`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: AMOUNT_PER_REQUEST }),
      },
    );

    const data = await res.json();

    return {
      success: res.ok,
      status: res.status,
      message: data?.error || '',
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      status: 0,
      message: 'Fetch failed',
    };
  }
};

(async () => {
  const start = Date.now();
  console.log(`Sending ${TOTAL_REQUESTS} parallel requests using fetch...`);

  const promises = Array.from({ length: TOTAL_REQUESTS }, sendRequest);
  const results = await Promise.all(promises);

  const successCount = results.filter(r => r.success).length;
  const insufficientFunds = results.filter(r =>
    r.message?.includes('Insufficient'),
  ).length;

  console.log('--- TEST RESULT ---');
  console.log(`Success (200):        ${successCount}`);
  console.log(`Insufficient funds:   ${insufficientFunds}`);
  console.log(
    `Other errors:         ${results.length - successCount - insufficientFunds}`,
  );
  console.log(`Duration:             ${Date.now() - start}ms`);
})();
