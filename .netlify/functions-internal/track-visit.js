// netlify/functions/track-visit.js
const { createClient } = require('@supabase/supabase-js');

// Prevent creating a client on every invocation
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const ip = event.headers['x-forwarded-for'] || 'unknown';
    const { userAgent, page } = JSON.parse(event.body);

    const { error } = await supabase
      .from('visitor_logs')
      .insert([{ ip, user_agent: userAgent, page }]);

    if (error) {
      console.error('Supabase insert error:', error.message);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to log visitor' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (err) {
    console.error('Unexpected error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};
