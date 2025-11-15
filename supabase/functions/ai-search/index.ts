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
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2048,
        messages: [
          {
            role: 'user',
            content: `You are an intelligent search assistant for a material exchange platform. 

User query: "${query}"

Available items:
${items.map((item: any, idx: number) => `${idx + 1}. ${item.title} - ${item.description} (${item.category}, ${item.location})`).join('\n')}

Task: Analyze the user's query and return the IDs of items that best match their intent, ranked by relevance. Consider semantic meaning, not just keywords.

CRITICAL: Return ONLY a valid JSON array of item IDs in order of relevance, like: [3, 1, 5]
Do not include any explanatory text, markdown formatting, or backticks. Just the raw JSON array.
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

    // Extract JSON array from Claude's response (handle markdown formatting)
    let jsonText = aiResponse.trim();
    
    // Remove markdown code blocks if present
    if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```json?\n?/g, '').replace(/```\n?$/g, '');
    }
    
    // Extract array if there's explanatory text
    const arrayMatch = jsonText.match(/\[[^\]]*\]/);
    if (arrayMatch) {
      jsonText = arrayMatch[0];
    }
    
    const rankedIds = JSON.parse(jsonText);

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
