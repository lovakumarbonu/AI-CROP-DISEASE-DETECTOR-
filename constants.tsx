import { Type } from "@google/genai";

// FIX: Rewrote as a standard function declaration. The arrow function syntax was causing a cryptic "not callable" error, likely due to a toolchain issue.
export function getGeminiPrompt(language: string, symptoms?: string): string {
    let prompt = `You are a world-class expert agricultural botanist and plant pathologist AI. Your goal is to provide a comprehensive, multi-faceted analysis of crop images.

Analyze the provided image which may contain one or more crop leaves or plants. For EACH distinct plant or significant symptom you identify, perform the following analysis:

1.  **Plant Identification**: Identify the species of the plant (e.g., "Tomato Plant", "Oak Tree").
2.  **Disease Identification**: Identify any visible diseases. Provide a machine-readable key (e.g., 'APHIDS', 'HEALTHY', 'POWDERY_MILDEW') and a display name. If none, classify as healthy and use the key 'HEALTHY'.
3.  **Bounding Box**: Provide the location of the primary symptom as a normalized bounding box ('x', 'y', 'width', 'height'). If healthy or location is ambiguous, omit this.
4.  **Early Stress Detection**: Look for subtle signs of stress that may not be full-blown diseases yet (e.g., slight discoloration indicating nutrient deficiency, wilting from water stress). List any detected signs.
5.  **Treatment Plans**: Provide TWO distinct treatment plans:
    *   A plan using standard chemical pesticides/fungicides.
    *   A plan using organic, pesticide-free, or home-remedy solutions (e.g., neem oil, compost tea, biological controls).
6.  **Climate-Aware Predictions**: Based on the identified issue, provide a brief advisory about potential future risks related to common climate conditions (e.g., "High humidity may worsen this fungal infection. Ensure good air circulation.").
7.  **Information URL**: Provide a valid, full URL to a reputable source (like Wikipedia or a university agricultural extension website) for more detailed information about the identified disease. If healthy, omit this field.`;

    if (symptoms) {
        prompt += `\n\n**Additional Context from User**: In addition to the image, consider these symptoms described by the user: "${symptoms}". Integrate this information into your analysis for higher accuracy.`;
    }

    prompt += `\n\n**RESPONSE REQUIREMENTS:**

*   Respond ONLY with a single JSON object that is an array of results, even if only one plant is analyzed.
*   Provide all textual fields ('disease_name', 'description', etc.) in the **${language}** language.
*   If the image is not a plant, is unclear, or shows no identifiable crop, return an empty array \`[]\`.
*   Do not include any text, markdown, or "json" specifiers outside of the JSON array.
`;
    return prompt;
}

export const GEMINI_SCHEMA = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      plant_name: {
        type: Type.STRING,
        description: "The common name or species of the identified plant (e.g., 'Tomato Plant', 'Oak Tree').",
      },
      is_healthy: {
        type: Type.BOOLEAN,
        description: "True if the plant is healthy, false otherwise.",
      },
      disease_key: {
        type: Type.STRING,
        description: "A machine-readable key for the disease (e.g., 'APHIDS', 'HEALTHY', 'POWDERY_MILDEW'). Use 'HEALTHY' for healthy plants.",
      },
      disease_name: {
        type: Type.STRING,
        description: "The common name of the detected disease, or 'N/A' if healthy.",
      },
      description: {
        type: Type.STRING,
        description: "A brief, easy-to-understand overview of the disease or the plant's healthy state.",
      },
      treatment_plan_chemical: {
        type: Type.ARRAY,
        description: "A list of actionable steps using chemical treatments.",
        items: { type: Type.STRING },
      },
      treatment_plan_organic: {
          type: Type.ARRAY,
          description: "A list of actionable steps using organic or pesticide-free remedies.",
          items: { type: Type.STRING },
      },
      early_stress_signs: {
          type: Type.ARRAY,
          description: "A list of detected pre-symptomatic stress indicators (e.g., nutrient deficiency).",
          items: { type: Type.STRING },
      },
      climate_advisory: {
          type: Type.STRING,
          description: "A forward-looking advisory based on the detected condition and typical climate factors.",
      },
      disease_info_url: {
        type: Type.STRING,
        description: "Optional. A URL to a reputable source for more information about the disease."
      },
      disease_location: {
          type: Type.OBJECT,
          description: "Optional. Bounding box of the primary disease location, with normalized coordinates (0-1).",
          properties: {
              x: { type: Type.NUMBER },
              y: { type: Type.NUMBER },
              width: { type: Type.NUMBER },
              height: { type: Type.NUMBER },
          },
      },
    },
    required: ['plant_name', 'is_healthy', 'disease_key', 'disease_name', 'description', 'treatment_plan_chemical', 'treatment_plan_organic', 'early_stress_signs', 'climate_advisory'],
  }
};

interface PreventionParams {
    crop: string;
    season: string;
    soil: string;
    region: string;
    language: string;
}

export function getPreventionCalendarPrompt({ crop, season, soil, region, language }: PreventionParams): string {
    return `You are an expert agronomist AI. Create a personalized disease prevention calendar based on the following user inputs. The calendar should be a chronological list of actionable tasks for a farmer.

Inputs:
- Crop Type: ${crop}
- Season: ${season}
- Soil Type: ${soil}
- Region/Climate: ${region}

For each task, provide:
1.  **Timing**: When the task should be performed (e.g., "Early ${season}", "Week 3-4 of ${season}", "Monthly").
2.  **Task Title**: A concise name for the task.
3.  **Task Description**: A brief explanation of how to perform the task.
4.  **Reason**: The specific risk this task mitigates (e.g., "High humidity increases risk of fungal blight").
5.  **Task Type**: Classify the task as 'Organic', 'Chemical', or 'Cultural Practice'.

**RESPONSE REQUIREMENTS:**
*   Respond ONLY with a single JSON object that is an array of tasks.
*   Provide all textual fields in the **${language}** language.
*   If the inputs are nonsensical, return an empty array \`[]\`.
*   Do not include any text, markdown, or "json" specifiers outside of the JSON array.
`;
}

export const PREVENTION_CALENDAR_SCHEMA = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            timing: { 
                type: Type.STRING, 
                description: 'When to perform the task (e.g., "Early Spring", "Monthly").' 
            },
            task_title: { 
                type: Type.STRING, 
                description: 'The title of the prevention task.' 
            },
            task_description: { 
                type: Type.STRING, 
                description: 'A brief, clear description of how to perform the task.' 
            },
            reason: { 
                type: Type.STRING, 
                description: 'The specific risk or reason for performing this task at this time.' 
            },
            task_type: { 
                type: Type.STRING, 
                description: "The category of the task: 'Organic', 'Chemical', or 'Cultural Practice'." 
            },
        },
        required: ['timing', 'task_title', 'task_description', 'reason', 'task_type'],
    },
};