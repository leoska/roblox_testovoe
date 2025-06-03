import { Agent as HttpAgent } from 'http';

const TOTAL_REQUESTS = 10_000;
const AMOUNT_PER_REQUEST = 2;
const AGENT_COUNT = 100;
const USER_ID = 1;

interface CustomRequestInit extends RequestInit {
  agent?: HttpAgent;
}

const sendRequest = async (agent: HttpAgent) => {
  try {
    const res = await fetch(
      `http://localhost:8080/user/${USER_ID}/balance/decrease`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: AMOUNT_PER_REQUEST }),
        agent,
      } as CustomRequestInit,
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

  const agents = Array.from(
    { length: TOTAL_REQUESTS },
    () => new HttpAgent({ keepAlive: true }),
  );

  const promises = [];

  for (let i = 0; i < TOTAL_REQUESTS; i += 1) {
    const agent = agents[i % AGENT_COUNT];
    promises.push(sendRequest(agent));
  }

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
