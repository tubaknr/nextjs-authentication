import { Lucia } from "lucia";
import db from "./db";
import {BetterSqlite3Adapter} from '@lucia-auth/adapter-sqlite'; //connect lucia to sqlite
import { cookies } from "next/headers";

// Lucia creates cookie and adds the session to it.

const adapter = new BetterSqlite3Adapter(db, {
    user: 'users', // db tables
    session: 'sessions'
});


// Set up Lucia for authentication
const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false, // until the browser is closed
        attributes: {
            secure: process.env.NODE_ENV === "production" 
            // sadece HTTPS olduğunda çalış; local olarak development olduğunda değil; deploy edildikten sonra bu cookie sadece https olduğunda çalışsın
            // If you're in "production", the cookie is secure (HTTPS required).
            // If you're in "development", the cookie is not secure (works over HTTP for local testing).
        }
    }
});

// Create a new authentication session for the user
export async function createAuthSession(userId) {
    // generate session 
    const session = await lucia.createSession(userId, {});
    console.log("SESSION LUCIA AUTH.JS : ", session);

    // create a cookie (session.id ile); returns an obj contains name, value, attrbs
    const sessionCookie = lucia.createSessionCookie(session.id);

    console.log("SESSION COOKIE LUCIA AUTH.JS: ",sessionCookie);

    // save the session cookie in the browser; add the ccookie
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
}


// VERIFY THE SESSION
export async function verifyAuth() {
    console.log("SESSION COOKIE NAME: LIB/AUTH.JS : ",lucia.sessionCookieName);
    const sessionCookie = cookies().get(lucia.sessionCookieName);
    console.log("SESSION COOKIE : LIB/AUTH.JS : ",sessionCookie);

    if(!sessionCookie){
        return{
            user: null,
            session: null,
        }
    }

    // SESSION.ID = COOKIE.VALUE
    const sessionId = sessionCookie.value;
    console.log("SESSION ID: COOKIE VALUE: LIB/AUTH.JS: ", sessionId);

    if(!sessionId){
        return{
            user: null,
            session: null,
        }
    }

    // Session valid mi ve hala active mi?
    const result = await lucia.validateSession(sessionId);
    try{
        if (result.session && result.session.fresh){
            const sessionCookie = lucia.createSessionCookie(result.session.id);
            cookies().set(
                sessionCookie.name,
                sessionCookie.value,
                sessionCookie.attributes,
            );
        }
        // if session not found
        if(!result.session){
            // clear the existing cookie and create a blank one.
            const sessionCookie = lucia.createBlankSessionCookie();
            cookies().set(
                sessionCookie.name, 
                sessionCookie.value, 
                sessionCookie.attributes
            );
        }

    }catch{}

    return result;
}


