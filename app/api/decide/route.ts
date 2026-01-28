import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Validate env vars early
    const tavilyKey = process.env.TAVILY_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;
    const groqModel = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
    if (!tavilyKey || !groqKey) {
      return NextResponse.json(
        { error: 'Missing required environment variables', details: { TAVILY_API_KEY: !!tavilyKey, GROQ_API_KEY: !!groqKey } },
        { status: 500 }
      );
    }

    // Safe parse of request body
    let query = '';
    let context = '';
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ error: 'Content-Type must be application/json' }, { status: 400 });
    }

    try {
      const data = await req.json();
      query = data?.query ?? '';
      context = data?.context ?? '';
    } catch (e) {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'Field "query" is required as a non-empty string' }, { status: 400 });
    }

    // 1) Tavily search
    const searchResponse = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: tavilyKey,
        query: `${query} reviews reddit forum 2026`,
        search_depth: 'advanced'
      })
    });

    if (!searchResponse.ok) {
      const errText = await searchResponse.text().catch(() => '');
      return NextResponse.json(
        { error: 'Tavily API request failed', status: searchResponse.status, body: errText?.slice(0, 2000) },
        { status: 502 }
      );
    }

    let searchData: any;
    try {
      searchData = await searchResponse.json();
    } catch {
      const errText = await searchResponse.text().catch(() => '');
      return NextResponse.json(
        { error: 'Failed to parse Tavily JSON', body: errText?.slice(0, 2000) },
        { status: 502 }
      );
    }

    // 2) Groq completion
    const aiResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${groqKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: groqModel,
        messages: [
          {
            role: 'system',
            content:
              'You are a Practical Budget Consultant. Analyze search data and user context. ALWAYS prioritize the users maximum budget (LKR). If a search result exceeds the budget, DISCARD it. Provide ONE best choice that is actually affordable and available in Sri Lanka, with logical reasoning.  '
          },
          {
            role: 'user',
            content: `User Context: ${context}. Question: ${query}. Data: ${JSON.stringify(searchData?.results ?? [])}`
          }
        ]
      })
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text().catch(() => '');
      return NextResponse.json(
        { error: 'Groq API request failed', status: aiResponse.status, body: errText?.slice(0, 2000) },
        { status: 502 }
      );
    }

    let finalDecision: any;
    try {
      finalDecision = await aiResponse.json();
    } catch {
      const errText = await aiResponse.text().catch(() => '');
      return NextResponse.json(
        { error: 'Failed to parse Groq JSON', body: errText?.slice(0, 2000) },
        { status: 502 }
      );
    }

    const decisionText = finalDecision?.choices?.[0]?.message?.content ?? 'No decision produced';
    return NextResponse.json({ decision: decisionText });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Unexpected server error', message: err?.message ?? String(err) },
      { status: 500 }
    );
  }
}