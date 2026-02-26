import { NextResponse } from "next/server";
import dbConnect from "@/lib/db-connect";
import Event from "@/models/Event";
import { auth } from "@/lib/auth";
import { eventSchema } from "@/lib/validation";

// GET all events
export async function GET(request) {
  try {
    const session = await auth();
    const connected = await dbConnect();
    if (!connected) {
      return NextResponse.json({ events: [] }, { status: 200 });
    }

    let query = {};
    const userRole = session?.user?.role;
    const userId = session?.user?.id;

    if (userRole === "admin") {
      query = {};
    } else if (userRole === "organizer") {
      const { searchParams } = new URL(request.url);
      const view = searchParams.get("view");
      if (view === "mine") {
        query = { organizer: userId };
      } else {
        query = {
          $or: [
            { isPublic: true, status: { $in: ["upcoming", "ongoing"] } },
            { organizer: userId }
          ]
        };
      }
    } else if (userRole === "judge") {
      query = {
        $or: [
          { isPublic: true, status: { $in: ["upcoming", "ongoing"] } },
          { judges: userId }
        ]
      };
    } else if (userRole === "mentor") {
      query = {
        $or: [
          { isPublic: true, status: { $in: ["upcoming", "ongoing"] } },
          { mentors: userId }
        ]
      };
    } else {
      query = { isPublic: true, status: { $in: ["upcoming", "ongoing"] } };
    }

    // Optimization: Return only necessary fields for list views
    const events = await Event.find(query)
      .select("title description startDate endDate registrationDeadline location status isPublic maxTeamSize organizer")
      .populate("organizer", "name email")
      .sort({ startDate: 1 });

    return NextResponse.json({ events });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

// CREATE event
export async function POST(request) {
  try {
    const session = await auth();

    if (!session || (session.user.role !== "organizer" && session.user.role !== "admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();

 -import { NextResponse } from "next/server";                                               
      2 -import dbConnect from "@/lib/db-connect";                                                 
      3 -import Event from "@/models/Event";                                                       
      4 -import { auth } from "@/lib/auth";                                                        
      1 +import { NextResponse } from "next/server";                                               
      2 +import dbConnect from "@/lib/db-connect";                                                 
      3 +import Event from "@/models/Event";                                                       
      4 +import { auth } from "@/lib/auth";                                                        
      5 +import { z } from "zod";                                                                  
      6 +                                                                                          
      7 +const eventSchema = z.object({                                                            
      8 +  title: z.string().min(1, "Event title is required"),                                    
      9 +  description: z.string().min(1, "Description is required"),                              
     10 +  startDate: z.string().min(1, "Start date is required"),                                 
     11 +  endDate: z.string().min(1, "End date is required"),                                     
     12 +  registrationDeadline: z.string().min(1, "Registration deadline is required"),           
     13 +  location: z.string().optional(),                                                        
     14 +  minTeamSize: z.number().int().min(1).optional(),                                        
     15 +  maxTeamSize: z.number().int().min(1).optional(),                                        
     16 +  tracks: z.array(z.string()).optional(),                                                 
     17 +  rules: z.array(z.string()).optional(),                                                  
     18 +  judges: z.array(z.string()).optional(),                                                 
     19 +  mentors: z.array(z.string()).optional(),                                                
     20 +  isPublic: z.boolean().optional(),                                                       
     21 +  scoringWeights: z                                                                       
     22 +    .object({                                                                             
     23 +      innovation: z.number().min(0).max(100).optional(),                                  
     24 +      technicalDepth: z.number().min(0).max(100).optional(),                              
     25 +      impact: z.number().min(0).max(100).optional(),                                      
     26 +    })                                                                                    
     27 +    .optional(),                                                                          
     28 +});                                                                                       
     29                                                                                            
        ⋮                                                                                          
    106                                                                                            
     83 -    await dbConnect();                                                                    
     84 -    const body = await request.json();                                                    
     85 -                                                                                          
     86 -    // Destructure all possible fields                                                    
     87 -    const {                                                                               
     88 -      title,                                                                              
     89 -      description,                                                                        
     90 -      startDate,                                                                          
     91 -      endDate,                                                                            
     92 -      registrationDeadline,                                                               
    107 +    await dbConnect();                                                                    
    108 +    const body = await request.json();                                                    
    109 +                                                                                          
    110 +    // Automated Data Validation with Zod                                                 
    111 +    const validation = eventSchema.safeParse(body);                                       
    112 +    if (!validation.success) {                                                            
    113 +      return NextResponse.json({                                                          
    114 +        error: "Validation failed",                                                       
    115 +        details: validation.error.format()                                                
    116 +      }, { status: 400 });                                                                
    117 +    }                                                                                     
    118 +                                                                                          
    119 +    // Destructure all possible fields                                                    
    120 +    const {                                                                               
    121 +      title,                                                                              
    122 +      description,                                                                        
    123 +      startDate,                                                                          
    124 +      endDate,                                                                            
    125 +      registrationDeadline,                                                               
    126        location,                                                                           
        ⋮                                                                                          
    134        scoringWeights                                                                      
    102 -    } = body;                                                                             
    103 -                                                                                          
    104 -    // Basic validation                                                                   
    105 -    if (!title || !description || !startDate || !endDate || !registrationDeadline) {      
    106 -      return NextResponse.json({ error: "Missing required fields (title, description, star
         tDate, endDate, registrationDeadline)" }, { status: 400 });                               
    107 -    }                                                                                     
    135 +    } = validation.data;                                                                  
    136                          
    }

    const validatedData = validation.data;

    const event = await Event.create({
      ...validatedData,
      organizer: session.user.id,
 const event = await Event.create({                                                               
    title,                                                                                         
    description,                                                                                   
    startDate,                                                                                     
    endDate,                                                                                       
    registrationDeadline,                                                                          
    location: location || "Virtual",                                                               
    organizer: session.user.id,                                                                    
    minTeamSize: minTeamSize || 2,                                                                 
    maxTeamSize: maxTeamSize || 4,                                                                 
    tracks: tracks || [],                                                                          
    rules: rules || [],                                                                            
    judges: judges || [],                                                                          
    mentors: mentors || [],                                                                        
    isPublic: isPublic !== undefined ? isPublic : true,                                            
    status: "upcoming",                                                                            
    scoringWeights                                                                                 
  });  

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}

