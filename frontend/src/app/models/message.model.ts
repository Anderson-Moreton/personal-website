// This interface represennts the structure of a page
export interface Message {
    firstName: string;
    lastNName: string;
    email: string;
    hobby: string;
    topic: string;
    message: string;
    image?: string; // Optional
}