import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const categories = [
  "Furniture",
  "Electronics",
  "Textiles",
  "Building Materials",
  "Art Supplies",
  "Kitchen Items",
  "Tools",
  "Books",
  "Toys",
  "Other"
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title, imageBase64 } = await req.json();

    if (!title && !imageBase64) {
      return new Response(
        JSON.stringify({ error: 'Either title or image is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Suggest category request:', { hasTitle: !!title, hasImage: !!imageBase64 });

    // Build the messages based on what's provided
    const messages: any[] = [];
    
    if (imageBase64 && title) {
      // Both image and title provided
      messages.push({
        role: 'user',
        content: [
          {
            type: 'text',
            text: `Analyze this item titled "${title}" and the provided image. Select the most appropriate category from this list: ${categories.join(', ')}. Return ONLY the category name, nothing else.`
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${imageBase64}`
            }
          }
        ]
      });
    } else if (imageBase64) {
      // Only image provided
      messages.push({
        role: 'user',
        content: [
          {
            type: 'text',
            text: `Analyze this item image and select the most appropriate category from this list: ${categories.join(', ')}. Return ONLY the category name, nothing else.`
          },
          {
            type: 'image_url',
            image_url: {
              url: `data:image/jpeg;base64,${imageBase64}`
            }
          }
        ]
      });
    } else if (title) {
      // Only title provided
      messages.push({
        role: 'user',
        content: `Analyze this item title: "${title}". Select the most appropriate category from this list: ${categories.join(', ')}. Return ONLY the category name, nothing else.`
      });
    }

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const suggestedCategory = data.choices[0].message.content.trim();
    
    console.log('AI suggested category:', suggestedCategory);

    // Validate that the suggested category is in our list
    const validCategory = categories.find(
      cat => cat.toLowerCase() === suggestedCategory.toLowerCase()
    );

    return new Response(
      JSON.stringify({ category: validCategory || 'Other' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in suggest-category function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
