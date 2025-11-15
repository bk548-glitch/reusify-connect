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
    const { type, text, imageBase64 } = await req.json();

    console.log('Generate content request:', { type, hasText: !!text, hasImage: !!imageBase64 });

    let messages;

    if (type === 'image' && imageBase64) {
      // Image analysis using Claude's vision capabilities
      messages = [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: imageBase64,
              },
            },
            {
              type: 'text',
              text: `You are analyzing an item image for a material reuse exchange platform. 

Please analyze this image and provide:
1. A detailed, professional description of the item(s) visible (2-3 sentences)
2. A list of 3-5 relevant tags/categories (e.g., "furniture", "wood", "laboratory equipment", etc.)
3. Estimated quantity if multiple items are visible

Return your response in this exact JSON format:
{
  "description": "detailed description here",
  "tags": ["tag1", "tag2", "tag3"],
  "quantity": number
}`
            }
          ]
        }
      ];
    } else if (type === 'text' && text) {
      // Text enhancement
      messages = [
        {
          role: 'user',
          content: `You are helping write item descriptions for a material reuse exchange platform.

The user has provided this initial description or tags: "${text}"

Please create:
1. A polished, professional description (2-3 sentences) that would help someone understand what the item is and its potential uses
2. A list of 3-5 relevant tags/categories for easier searching

Return your response in this exact JSON format:
{
  "description": "polished description here",
  "tags": ["tag1", "tag2", "tag3"]
}`
        }
      ];
    } else {
      throw new Error('Invalid request: must provide either text or imageBase64');
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': anthropicApiKey!,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages,
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

    // Parse the JSON response from Claude
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from Claude response');
    }
    
    const result = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-content function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
