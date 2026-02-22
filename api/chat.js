// api/chat.js
export const config = {
    runtime: 'edge' // Yeh Vercel ko batata hai ki isko superfast Edge network par chalana hai
};

export default async function handler(req) {
    // Sirf POST request allow karenge
    if (req.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
    }

    try {
        const body = await req.json();

        // OpenRouter ko backend se request bhej rahe hain
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                // Vercel Environment Variable se aapki key aayegi (Frontend par kisi ko nahi dikhegi)
                "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "https://realchat-ai.vercel.app" // Baad mein yahan apni Vercel link daal dijiyega
            },
            body: JSON.stringify(body)
        });

        // OpenRouter ka Live Stream direct user (frontend) ko bhej do
        return new Response(response.body, {
            headers: {
                "Content-Type": "text/event-stream",
                "Access-Control-Allow-Origin": "*"
            }
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
