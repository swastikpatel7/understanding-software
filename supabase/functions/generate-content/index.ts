import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';

const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { topicId, topicTitle, chapterTitle } = await req.json();
    
    console.log(`Generating content for topic: ${topicTitle} in chapter: ${chapterTitle}`);

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const systemPrompt = `You are an expert technical writer creating educational content for a computer science learning platform called "How Computers Really Work". Your content should be:
- Deeply technical but accessible
- Rich with real-world examples and analogies
- Include time/space complexity analysis where relevant
- Cover practical applications and use cases
- Written in an engaging, educational tone
- Comprehensive (aim for 800-1500 words per topic)

Format your response in markdown with proper headings, code examples (use \`\`\`typescript blocks), and bullet points where appropriate.`;

    const userPrompt = `Write comprehensive educational content for the topic "${topicTitle}" which is part of the "${chapterTitle}" chapter.

Include:
1. A clear introduction explaining the concept
2. How it works internally (with diagrams described in text if helpful)
3. Time and space complexity analysis (Big O notation)
4. Real-world applications and examples
5. Common implementations with code examples (use TypeScript/JavaScript)
6. Best practices and common pitfalls
7. Comparison with related concepts where relevant

Make the content engaging, technical, and educational. Use analogies to help explain complex concepts.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`Lovable AI API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    console.log(`Generated ${generatedContent.length} characters of content`);

    // Update the topic with the generated content
    const { error: updateError } = await supabase
      .from('topics')
      .update({ content: generatedContent })
      .eq('id', topicId);

    if (updateError) {
      console.error('Database update error:', updateError);
      throw updateError;
    }

    console.log(`Successfully updated topic ${topicId}`);

    return new Response(JSON.stringify({ 
      success: true, 
      content: generatedContent,
      topicId 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-content function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
