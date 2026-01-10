import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Word list matching the application's vocabulary
const words = [
  // GENERAL VOCABULARY
  { word: "Serendipity", type: "general" },
  { word: "Resilient", type: "general" },
  { word: "Nostalgia", type: "general" },
  { word: "Wanderlust", type: "general" },
  { word: "Enigma", type: "general" },
  { word: "Eloquent", type: "general" },
  // ACADEMIC VOCABULARY
  { word: "Paradigm", type: "academic" },
  { word: "Empirical", type: "academic" },
  { word: "Synthesis", type: "academic" },
  { word: "Juxtaposition", type: "academic" },
  { word: "Axiom", type: "academic" },
  { word: "Dichotomy", type: "academic" },
  // CREATIVE WRITING
  { word: "Ephemeral", type: "creative" },
  { word: "Mellifluous", type: "creative" },
  { word: "Ethereal", type: "creative" },
  { word: "Luminous", type: "creative" },
  { word: "Ineffable", type: "creative" },
  { word: "Resplendent", type: "creative" },
  { word: "Petrichor", type: "creative" },
  // BUSINESS VOCABULARY
  { word: "Synergy", type: "business" },
  { word: "Leverage", type: "business" },
  { word: "Scalable", type: "business" },
  { word: "Stakeholder", type: "business" },
  { word: "Pivot", type: "business" },
  { word: "Benchmark", type: "business" },
  // MOODS & MINDFULNESS
  { word: "Equanimity", type: "mindfulness" },
  { word: "Tranquil", type: "mindfulness" },
  { word: "Satori", type: "mindfulness" },
  { word: "Halcyon", type: "mindfulness" },
  { word: "Solace", type: "mindfulness" },
  { word: "Serenity", type: "mindfulness" },
  { word: "Contemplative", type: "mindfulness" },
  { word: "Melancholy", type: "mindfulness" },
  { word: "Euphoria", type: "mindfulness" },
  { word: "Wistful", type: "mindfulness" },
  { word: "Elation", type: "mindfulness" },
  { word: "Ennui", type: "mindfulness" },
  { word: "Catharsis", type: "mindfulness" },
  { word: "Placid", type: "mindfulness" },
  { word: "Ebullient", type: "mindfulness" },
  { word: "Pensive", type: "mindfulness" },
];

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // Check if we already have a word for today
    const { data: existingWord, error: checkError } = await supabase
      .from("word_of_the_day")
      .select("*")
      .eq("date", today)
      .maybeSingle();

    if (checkError) {
      throw new Error(`Error checking existing word: ${checkError.message}`);
    }

    if (existingWord) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "Word of the day already exists for today",
          data: existingWord,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Use the day of the year to deterministically pick a word
    // This ensures consistency if the function is called multiple times
    const startOfYear = new Date(new Date().getFullYear(), 0, 0);
    const diff = new Date().getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const wordIndex = dayOfYear % words.length;
    const selectedWord = words[wordIndex];

    // Insert the word of the day
    const { data: insertedWord, error: insertError } = await supabase
      .from("word_of_the_day")
      .insert({
        word: selectedWord.word,
        word_type: selectedWord.type,
        date: today,
      })
      .select()
      .single();

    if (insertError) {
      throw new Error(`Error inserting word: ${insertError.message}`);
    }

    console.log(`Word of the day for ${today}: ${selectedWord.word} (${selectedWord.type})`);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Word of the day recorded successfully",
        data: insertedWord,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in pick-word-of-the-day:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
