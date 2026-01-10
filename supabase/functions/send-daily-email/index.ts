import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Word definitions matching the app's vocabulary
const wordDefinitions: Record<string, {
  pronunciation: string;
  partOfSpeech: string;
  definition: string;
  example: string;
  etymology: string;
  type: string;
}> = {
  // GENERAL VOCABULARY
  "Serendipity": {
    pronunciation: "/ˌserənˈdɪpɪti/",
    partOfSpeech: "noun",
    definition: "The occurrence of events by chance in a happy or beneficial way; a fortunate accident that leads to unexpected discovery.",
    example: "It was pure serendipity that she found her dream job while getting coffee at a café.",
    etymology: "Coined by Horace Walpole in 1754, from the Persian fairy tale 'The Three Princes of Serendip' whose heroes made discoveries by accident.",
    type: "general"
  },
  "Resilient": {
    pronunciation: "/rɪˈzɪliənt/",
    partOfSpeech: "adjective",
    definition: "Able to recover quickly from difficulties; having the capacity to spring back into shape after being bent or stretched.",
    example: "Despite facing numerous setbacks, she remained resilient and eventually achieved her goals.",
    etymology: "From Latin resilire, meaning 'to leap back,' from re- (back) + salire (to jump).",
    type: "general"
  },
  "Nostalgia": {
    pronunciation: "/nɒˈstældʒə/",
    partOfSpeech: "noun",
    definition: "A sentimental longing for the past; a bittersweet affection for a period, place, or experience from one's memory.",
    example: "The smell of cinnamon cookies filled him with nostalgia for childhood holidays.",
    etymology: "From Greek nostos (homecoming) + algos (pain), originally coined as a medical term for homesickness in 1688.",
    type: "general"
  },
  "Wanderlust": {
    pronunciation: "/ˈwɒndərlʌst/",
    partOfSpeech: "noun",
    definition: "A strong, innate desire to travel and explore the world; an irresistible urge to wander.",
    example: "Her wanderlust led her to quit her office job and backpack through South America.",
    etymology: "From German Wanderlust, combining wandern (to wander) + Lust (desire), adopted into English in the early 20th century.",
    type: "general"
  },
  "Enigma": {
    pronunciation: "/ɪˈnɪɡmə/",
    partOfSpeech: "noun",
    definition: "A person or thing that is mysterious, puzzling, or difficult to understand.",
    example: "Despite years of friendship, he remained an enigma—always surprising and never predictable.",
    etymology: "From Greek ainigma, from ainissesthai (to speak in riddles), from ainos (fable).",
    type: "general"
  },
  "Eloquent": {
    pronunciation: "/ˈeləkwənt/",
    partOfSpeech: "adjective",
    definition: "Fluent, persuasive, and expressive in speaking or writing; able to convey meaning beautifully.",
    example: "Her eloquent speech moved the audience to tears and standing ovations.",
    etymology: "From Latin eloquens, from eloqui (to speak out), combining e- (out) + loqui (to speak).",
    type: "general"
  },
  // ACADEMIC VOCABULARY
  "Paradigm": {
    pronunciation: "/ˈpærəˌdaɪm/",
    partOfSpeech: "noun",
    definition: "A typical example or pattern of something; a model or framework for understanding.",
    example: "The discovery led to a paradigm shift in how scientists understood cellular biology.",
    etymology: "From Greek paradeigma, from paradeiknynai (to show side by side), from para- (beside) + deiknynai (to show).",
    type: "academic"
  },
  "Empirical": {
    pronunciation: "/ɪmˈpɪrɪkəl/",
    partOfSpeech: "adjective",
    definition: "Based on observation or experience rather than theory or pure logic; verifiable by observation.",
    example: "The researchers gathered empirical evidence through controlled laboratory experiments.",
    etymology: "From Greek empeirikos (experienced), from empeiria (experience), from en- (in) + peira (trial).",
    type: "academic"
  },
  "Synthesis": {
    pronunciation: "/ˈsɪnθəsɪs/",
    partOfSpeech: "noun",
    definition: "The combination of ideas to form a theory or system; the production of a substance from simpler materials.",
    example: "Her thesis presented a synthesis of Eastern and Western philosophical traditions.",
    etymology: "From Greek synthesis, from syntithenai (to put together), from syn- (together) + tithenai (to place).",
    type: "academic"
  },
  "Juxtaposition": {
    pronunciation: "/ˌdʒʌkstəpəˈzɪʃən/",
    partOfSpeech: "noun",
    definition: "The act of placing two things close together for contrasting effect; side-by-side comparison.",
    example: "The artist's juxtaposition of wealth and poverty made a powerful social statement.",
    etymology: "From Latin juxta (near) + French position, coined in the mid-17th century.",
    type: "academic"
  },
  "Axiom": {
    pronunciation: "/ˈæksiəm/",
    partOfSpeech: "noun",
    definition: "A statement or proposition regarded as self-evidently true; a fundamental principle.",
    example: "The axiom that parallel lines never meet forms the basis of Euclidean geometry.",
    etymology: "From Greek axioma (that which is thought worthy), from axios (worthy).",
    type: "academic"
  },
  "Dichotomy": {
    pronunciation: "/daɪˈkɒtəmi/",
    partOfSpeech: "noun",
    definition: "A division into two mutually exclusive or contradictory groups or entities.",
    example: "The study explored the dichotomy between nature and nurture in child development.",
    etymology: "From Greek dikhotomia, from dikho- (in two) + -tomia (cutting).",
    type: "academic"
  },
  // CREATIVE WRITING
  "Ephemeral": {
    pronunciation: "/ɪˈfemərəl/",
    partOfSpeech: "adjective",
    definition: "Lasting for only a short time; fleeting and transitory, like cherry blossoms or morning dew.",
    example: "The ephemeral beauty of the sunset reminded her to appreciate life's passing moments.",
    etymology: "From Greek ephēmeros, meaning 'lasting only a day,' from epi (on) + hēmera (day).",
    type: "creative"
  },
  "Mellifluous": {
    pronunciation: "/meˈlɪfluəs/",
    partOfSpeech: "adjective",
    definition: "Sweet-sounding; pleasingly smooth and musical to the ear, often describing a voice or melody.",
    example: "His mellifluous voice made even the most mundane announcements sound like poetry.",
    etymology: "From Latin mellifluus, from mel (honey) + fluere (to flow), literally 'flowing with honey.'",
    type: "creative"
  },
  "Ethereal": {
    pronunciation: "/ɪˈθɪəriəl/",
    partOfSpeech: "adjective",
    definition: "Extremely delicate and light; seeming too perfect for this world; heavenly or celestial.",
    example: "The dancer moved with an ethereal grace that made her seem to float above the stage.",
    etymology: "From Latin aethereus, from Greek aitherios (of the upper air), from aithēr (the pure upper air).",
    type: "creative"
  },
  "Luminous": {
    pronunciation: "/ˈluːmɪnəs/",
    partOfSpeech: "adjective",
    definition: "Full of or shedding light; bright, radiant, or glowing; also describing something intellectually brilliant.",
    example: "The luminous full moon cast silver shadows across the sleeping garden.",
    etymology: "From Latin luminosus, from lumen (light), related to lucere (to shine).",
    type: "creative"
  },
  "Ineffable": {
    pronunciation: "/ɪnˈefəbl/",
    partOfSpeech: "adjective",
    definition: "Too great or extreme to be expressed or described in words; beyond verbal expression.",
    example: "The view from the mountaintop filled her with an ineffable sense of peace.",
    etymology: "From Latin ineffabilis, from in- (not) + effabilis (utterable), from effari (to speak out).",
    type: "creative"
  },
  "Resplendent": {
    pronunciation: "/rɪˈsplendənt/",
    partOfSpeech: "adjective",
    definition: "Shining brilliantly; dressed in rich, impressive attire; dazzling in appearance.",
    example: "The bride looked resplendent in her grandmother's vintage lace wedding gown.",
    etymology: "From Latin resplendere, from re- (intensive) + splendere (to shine, glitter).",
    type: "creative"
  },
  "Petrichor": {
    pronunciation: "/ˈpetrɪkɔːr/",
    partOfSpeech: "noun",
    definition: "The pleasant, earthy smell produced when rain falls on dry soil.",
    example: "After months of drought, the petrichor that followed the first rain was intoxicating.",
    etymology: "Coined in 1964 from Greek petra (stone) + ichor (the fluid flowing in the veins of the gods).",
    type: "creative"
  },
  // BUSINESS VOCABULARY
  "Synergy": {
    pronunciation: "/ˈsɪnərdʒi/",
    partOfSpeech: "noun",
    definition: "The interaction of elements that when combined produce a total effect greater than the sum of individual parts.",
    example: "The merger created synergy between the two companies' research departments.",
    etymology: "From Greek synergos (working together), from syn- (together) + ergon (work).",
    type: "business"
  },
  "Leverage": {
    pronunciation: "/ˈlevərɪdʒ/",
    partOfSpeech: "verb",
    definition: "To use something to maximum advantage; to strategically utilize resources or position.",
    example: "She leveraged her industry connections to secure the partnership deal.",
    etymology: "From Old French levier (to raise), from Latin levare (to lift), extended to business meaning in the 20th century.",
    type: "business"
  },
  "Scalable": {
    pronunciation: "/ˈskeɪləbl/",
    partOfSpeech: "adjective",
    definition: "Able to be changed in size or scale; capable of growing or expanding efficiently.",
    example: "Investors were impressed by the startup's scalable business model.",
    etymology: "From Latin scala (ladder) + -able, popularized in tech and business contexts in the late 20th century.",
    type: "business"
  },
  "Stakeholder": {
    pronunciation: "/ˈsteɪkˌhoʊldər/",
    partOfSpeech: "noun",
    definition: "A person or group with an interest or concern in a business or enterprise.",
    example: "The project manager scheduled meetings with all key stakeholders to gather requirements.",
    etymology: "From stake (a share or interest) + holder, first used in business context in the 1960s.",
    type: "business"
  },
  "Pivot": {
    pronunciation: "/ˈpɪvət/",
    partOfSpeech: "verb",
    definition: "To fundamentally change the direction or strategy of a business while maintaining core elements.",
    example: "When the market shifted, the company had to pivot from hardware to software services.",
    etymology: "From French pivot (hinge), extended to business strategy meaning in the startup era.",
    type: "business"
  },
  "Benchmark": {
    pronunciation: "/ˈbentʃˌmɑːrk/",
    partOfSpeech: "noun",
    definition: "A standard or point of reference against which things may be compared or assessed.",
    example: "The industry leader's performance became the benchmark for all competitors.",
    etymology: "Originally a surveyor's mark cut in rock, extended to business meaning in the 1970s.",
    type: "business"
  },
  // MOODS & MINDFULNESS
  "Equanimity": {
    pronunciation: "/ˌiːkwəˈnɪmɪti/",
    partOfSpeech: "noun",
    definition: "Mental calmness and composure, especially in difficult situations; evenness of temper.",
    example: "She faced the crisis with remarkable equanimity, never losing her composure.",
    etymology: "From Latin aequanimitas, from aequus (even) + animus (mind, spirit).",
    type: "mindfulness"
  },
  "Tranquil": {
    pronunciation: "/ˈtræŋkwɪl/",
    partOfSpeech: "adjective",
    definition: "Free from disturbance; calm, serene, and peaceful in quality or state.",
    example: "The tranquil lake reflected the mountains like a perfect mirror at dawn.",
    etymology: "From Latin tranquillus (calm, still), possibly related to trans- (across) + quies (rest).",
    type: "mindfulness"
  },
  "Satori": {
    pronunciation: "/səˈtɔːri/",
    partOfSpeech: "noun",
    definition: "A sudden moment of awakening or enlightenment in Zen Buddhism; profound insight.",
    example: "During meditation, she experienced a satori that transformed her understanding of self.",
    etymology: "From Japanese 悟り (satori), meaning 'understanding' or 'awakening,' from satoru (to know).",
    type: "mindfulness"
  },
  "Halcyon": {
    pronunciation: "/ˈhælsiən/",
    partOfSpeech: "adjective",
    definition: "Denoting a period of time in the past that was idyllically happy and peaceful.",
    example: "She often reminisced about the halcyon days of her childhood summers by the sea.",
    etymology: "From Greek halkyon (kingfisher), associated with calm seas during the bird's breeding season.",
    type: "mindfulness"
  },
  "Solace": {
    pronunciation: "/ˈsɒləs/",
    partOfSpeech: "noun",
    definition: "Comfort or consolation in a time of distress or sadness; a source of relief.",
    example: "She found solace in the garden, where the rhythm of nature soothed her troubled mind.",
    etymology: "From Latin solacium (comfort, consolation), from solari (to console).",
    type: "mindfulness"
  },
  "Serenity": {
    pronunciation: "/səˈrenɪti/",
    partOfSpeech: "noun",
    definition: "The state of being calm, peaceful, and untroubled; a disposition free from stress.",
    example: "The monastery radiated a serenity that immediately calmed every visitor who entered.",
    etymology: "From Latin serenitas (clearness, calmness), from serenus (clear, bright, serene).",
    type: "mindfulness"
  },
  "Contemplative": {
    pronunciation: "/kənˈtemplətɪv/",
    partOfSpeech: "adjective",
    definition: "Expressing or involving prolonged thought; given to deep reflection and meditation.",
    example: "His contemplative nature led him to spend hours in quiet introspection.",
    etymology: "From Latin contemplativus, from contemplari (to gaze attentively, observe).",
    type: "mindfulness"
  },
  "Melancholy": {
    pronunciation: "/ˈmelənkɒli/",
    partOfSpeech: "noun",
    definition: "A deep, pensive sadness; a thoughtful or gentle sorrow that can feel almost beautiful.",
    example: "There was a sweet melancholy in the autumn air as leaves drifted to the ground.",
    etymology: "From Greek melankholia (sadness), from melas (black) + kholē (bile), referring to ancient humoral theory.",
    type: "mindfulness"
  },
  "Euphoria": {
    pronunciation: "/juːˈfɔːriə/",
    partOfSpeech: "noun",
    definition: "An intense feeling of well-being, elation, and happiness; a state of overwhelming joy.",
    example: "Crossing the finish line filled her with euphoria she had never experienced before.",
    etymology: "From Greek euphoria (power of enduring easily), from eu- (well) + pherein (to bear).",
    type: "mindfulness"
  },
  "Wistful": {
    pronunciation: "/ˈwɪstfʊl/",
    partOfSpeech: "adjective",
    definition: "Having or showing a feeling of vague or regretful longing; pensively sad.",
    example: "He gave a wistful smile as he looked at the old photographs from his university days.",
    etymology: "Perhaps from obsolete wistly (intently), influenced by wishful; first recorded in the early 17th century.",
    type: "mindfulness"
  },
  "Elation": {
    pronunciation: "/ɪˈleɪʃən/",
    partOfSpeech: "noun",
    definition: "Great happiness and exhilaration; a feeling of pride and joy at an achievement.",
    example: "The team's elation was palpable as they celebrated their championship victory.",
    etymology: "From Latin elatio (a lifting up), from efferre (to carry out, raise up).",
    type: "mindfulness"
  },
  "Ennui": {
    pronunciation: "/ɒnˈwiː/",
    partOfSpeech: "noun",
    definition: "A feeling of listlessness and dissatisfaction arising from a lack of excitement or purpose.",
    example: "The endless gray winter days filled him with a deep sense of ennui.",
    etymology: "From French ennui (boredom), from Old French enui (annoyance), from enuier (to annoy).",
    type: "mindfulness"
  },
  "Catharsis": {
    pronunciation: "/kəˈθɑːsɪs/",
    partOfSpeech: "noun",
    definition: "The process of releasing strong emotions through art or expression; emotional purification.",
    example: "Writing in her journal provided a catharsis that helped her process the difficult year.",
    etymology: "From Greek katharsis (purification, cleansing), from kathairein (to purify).",
    type: "mindfulness"
  },
  "Placid": {
    pronunciation: "/ˈplæsɪd/",
    partOfSpeech: "adjective",
    definition: "Not easily upset or excited; calm and peaceful with little movement or activity.",
    example: "The placid waters of the lake perfectly mirrored the surrounding mountains.",
    etymology: "From Latin placidus (gentle, quiet), from placere (to please).",
    type: "mindfulness"
  },
  "Ebullient": {
    pronunciation: "/ɪˈbʌliənt/",
    partOfSpeech: "adjective",
    definition: "Overflowing with enthusiasm, excitement, or cheerfulness; exuberantly lively.",
    example: "Her ebullient personality made every gathering feel like a celebration.",
    etymology: "From Latin ebullire (to bubble up), from e- (out) + bullire (to boil).",
    type: "mindfulness"
  },
  "Pensive": {
    pronunciation: "/ˈpensɪv/",
    partOfSpeech: "adjective",
    definition: "Engaged in deep or serious thought, often with a tinge of sadness or dreaminess.",
    example: "She sat by the window in a pensive mood, watching the rain fall.",
    etymology: "From Old French pensif, from penser (to think), from Latin pensare (to weigh, consider).",
    type: "mindfulness"
  },
};

const formatWordType = (type: string): string => {
  const typeLabels: Record<string, string> = {
    general: "General",
    academic: "Academic",
    creative: "Creative",
    business: "Business",
    mindfulness: "Moods & Mindfulness",
  };
  return typeLabels[type] || type;
};

const generateEmailHtml = (word: string, wordData: typeof wordDefinitions[string], date: string): string => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Word of the Day: ${word}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Georgia, 'Times New Roman', serif; background-color: #faf9f7;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 32px;">
      <p style="color: #8b7355; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 8px 0;">
        ${date}
      </p>
      <h1 style="font-size: 14px; font-weight: 600; letter-spacing: 3px; color: #1a1a1a; margin: 0; text-transform: uppercase;">
        WORD OF THE DAY
      </h1>
    </div>

    <!-- Decorative Line -->
    <div style="width: 60px; height: 1px; background-color: #d4c4b0; margin: 0 auto 32px;"></div>

    <!-- Word Card -->
    <div style="background-color: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      <!-- Word -->
      <div style="text-align: center; margin-bottom: 24px;">
        <h2 style="font-size: 42px; font-weight: 600; color: #1a1a1a; margin: 0 0 12px 0; letter-spacing: -1px;">
          ${word}
        </h2>
        <p style="color: #666666; font-size: 16px; margin: 0 0 8px 0; font-style: italic;">
          ${wordData.pronunciation}
        </p>
        <span style="display: inline-block; background-color: #f5f0e8; color: #8b7355; padding: 4px 12px; border-radius: 20px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
          ${wordData.partOfSpeech}
        </span>
      </div>

      <!-- Decorative Line -->
      <div style="width: 100%; height: 1px; background: linear-gradient(90deg, transparent, #d4c4b0, transparent); margin: 24px 0;"></div>

      <!-- Definition -->
      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 11px; font-weight: 600; letter-spacing: 2px; color: #999999; margin: 0 0 12px 0; text-transform: uppercase;">
          DEFINITION
        </h3>
        <p style="font-size: 18px; line-height: 1.6; color: #333333; margin: 0;">
          ${wordData.definition}
        </p>
      </div>

      <!-- Example -->
      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 11px; font-weight: 600; letter-spacing: 2px; color: #999999; margin: 0 0 12px 0; text-transform: uppercase;">
          EXAMPLE
        </h3>
        <p style="font-size: 16px; line-height: 1.6; color: #666666; margin: 0; font-style: italic; padding-left: 16px; border-left: 2px solid #d4c4b0;">
          "${wordData.example}"
        </p>
      </div>

      <!-- Etymology -->
      <div style="margin-bottom: 24px;">
        <h3 style="font-size: 11px; font-weight: 600; letter-spacing: 2px; color: #999999; margin: 0 0 12px 0; text-transform: uppercase;">
          ORIGIN
        </h3>
        <p style="font-size: 14px; line-height: 1.6; color: #888888; margin: 0;">
          ${wordData.etymology}
        </p>
      </div>

      <!-- Category Badge -->
      <div style="text-align: center;">
        <span style="display: inline-block; background-color: #f0f0f0; color: #666666; padding: 6px 16px; border-radius: 20px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">
          ${formatWordType(wordData.type)}
        </span>
      </div>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 32px;">
      <p style="color: #999999; font-size: 12px; margin: 0 0 16px 0;">
        Expand your vocabulary, one word at a time
      </p>
      <a href="https://worddelight.lovable.app" style="display: inline-block; background-color: #1a1a1a; color: #ffffff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: 500;">
        Explore More Words
      </a>
      <p style="color: #cccccc; font-size: 11px; margin: 24px 0 0 0;">
        You're receiving this because you subscribed to daily word emails.<br>
        <a href="https://worddelight.lovable.app/preferences" style="color: #999999; text-decoration: underline;">Unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const resend = new Resend(resendApiKey);
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get today's date
    const today = new Date().toISOString().split("T")[0];
    const formattedDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Get today's word of the day
    const { data: wordOfTheDay, error: wordError } = await supabase
      .from("word_of_the_day")
      .select("word, word_type")
      .eq("date", today)
      .maybeSingle();

    if (wordError) {
      throw new Error(`Error fetching word of the day: ${wordError.message}`);
    }

    if (!wordOfTheDay) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No word of the day found for today",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 404,
        }
      );
    }

    const wordData = wordDefinitions[wordOfTheDay.word];
    if (!wordData) {
      console.log(`Word definition not found for: ${wordOfTheDay.word}`);
      return new Response(
        JSON.stringify({
          success: false,
          message: `Word definition not found for: ${wordOfTheDay.word}`,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 404,
        }
      );
    }

    // Get all users who want daily emails
    const { data: subscribedUsers, error: usersError } = await supabase
      .from("user_preferences")
      .select("user_id")
      .eq("send_daily_email", true);

    if (usersError) {
      throw new Error(`Error fetching subscribed users: ${usersError.message}`);
    }

    if (!subscribedUsers || subscribedUsers.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "No users subscribed to daily emails",
          emailsSent: 0,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Get email addresses from profiles
    const userIds = subscribedUsers.map(u => u.user_id);
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("user_id, email")
      .in("user_id", userIds);

    if (profilesError) {
      throw new Error(`Error fetching user profiles: ${profilesError.message}`);
    }

    // Filter to only users with valid emails
    const usersWithEmails = profiles?.filter(p => p.email) || [];

    if (usersWithEmails.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: "No users with email addresses found",
          emailsSent: 0,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }

    // Send emails
    const emailHtml = generateEmailHtml(wordOfTheDay.word, wordData, formattedDate);
    const results = [];
    const errors = [];

    const emailSubject = `📚 Word of the Day: ${wordOfTheDay.word}`;
    
    for (const user of usersWithEmails) {
      try {
        const emailResponse = await resend.emails.send({
          from: "Word Delight <onboarding@resend.dev>",
          to: [user.email!],
          subject: emailSubject,
          html: emailHtml,
        });
        results.push({ email: user.email, success: true, id: emailResponse.data?.id });
        console.log(`Email sent to ${user.email}:`, emailResponse);
        
        // Log successful email to database
        await supabase.from('emails_sent').insert({
          recipient_email: user.email,
          recipient_user_id: user.user_id,
          subject: emailSubject,
          email_type: 'daily_word',
          status: 'sent',
          resend_id: emailResponse.data?.id || null,
        });
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        errors.push({ email: user.email, error: errorMessage });
        console.error(`Failed to send email to ${user.email}:`, error);
        
        // Log failed email to database
        await supabase.from('emails_sent').insert({
          recipient_email: user.email!,
          recipient_user_id: user.user_id,
          subject: emailSubject,
          email_type: 'daily_word',
          status: 'failed',
          error_message: errorMessage,
        });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Emails sent successfully`,
        word: wordOfTheDay.word,
        totalSubscribers: usersWithEmails.length,
        emailsSent: results.length,
        errors: errors.length > 0 ? errors : undefined,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-daily-email:", error);
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
