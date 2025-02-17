export async function POST(req: Request) {
   {
    const { pins } = await req.json();
    return Response.json({ 
      success: true, 
      pins: pins 
    });
  } 
}