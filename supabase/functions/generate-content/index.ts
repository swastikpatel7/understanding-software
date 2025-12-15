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

    const systemPrompt = `You are an expert technical writer creating educational content for a visual learning platform called "Code Blueprint".

The product promise:
- Structured, conceptual learning (not tutorials)
- Minimal but high-signal writing
- A few strong diagrams (described in text) instead of walls of text

Writing requirements:
- Deeply technical but accessible
- Prefer mechanisms, invariants, and trade-offs over step-by-step “how to build X”
- Include time/space complexity analysis when relevant
- Include real-world applications and failure modes
- Keep code examples short and explanatory (use \`\`\`typescript blocks)
- Comprehensive (aim for 800–1500 words per topic)

Formatting requirements:
- Output valid Markdown only
- Do NOT include an H1 (the UI provides the title)
- Use this exact H2 section template (in this order):
  ## The Idea
  ## The Mechanics
  ## Trade-offs
  ## Failure Modes
  ## Where You’ll See It`;

    const userPrompt = `Write comprehensive educational content for the topic "${topicTitle}" which is part of the "${chapterTitle}" chapter.

Follow the required H2 template. In each section:
- Use concrete examples before abstractions
- Describe diagrams in text when helpful (e.g., “Imagine a box-and-arrow diagram…”)
- Add short TypeScript snippets only when they clarify mechanics
- Include Big-O analysis inside "Trade-offs" when applicable
- Mention common misconceptions and pitfalls inside "Failure Modes"

Avoid:
- Long tutorial-style walkthroughs
- Framework-specific advice
- Fluffy intros

Make it engaging, precise, and visual.`;

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
