import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, items } = await req.json();

    console.log('AI Search request:', { query, itemCount: items.length });

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': anthropicApiKey!,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 2048,
        messages: [
          {
            role: 'user',
            content: `You are an intelligent search assistant for a material exchange platform. 

User query: "${query}"

Available items:
${items.map((item: any, idx: number) => `${idx + 1}. ${item.title} - ${item.description} (${item.category}, ${item.location})`).join('\n')}

Task: Analyze the user's query and return the IDs of items that best match their intent, ranked by relevance. Consider semantic meaning, not just keywords.

Return ONLY a JSON array of item IDs in order of relevance, like: [3, 1, 5]
If no items match well, return an empty array: []`
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude API error:', response.status, errorText);
      throw new Error(`Claude API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.content[0].text;
    
    console.log('Claude response:', aiResponse);

    // Parse the JSON array from Claude's response
    const rankedIds = JSON.parse(aiResponse.trim());

    return new Response(JSON.stringify({ rankedIds }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-search function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      rankedIds: [] 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
