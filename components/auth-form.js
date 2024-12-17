"use client";
import { signup } from "@/actions/auth-action";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function AuthForm(){
    
    const [formState, formAction] = useFormState(signup, {});

    return(
        <form id="auth-form" action={formAction}>
            <div>
                <img src="/images/auth-icon.jpg" alt="A lock icon"/>
            </div>

            <p>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email"/>
            </p>
            <p>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password"/>
            </p>

            {formState.errors && ( //error varsa
                <ul id="form-errors">
                    {Object.keys(formState.errors).map((error) => (
                        <li key={error}>
                            {formState.errors[error]} 
                        </li>
                    ))}
                </ul>
            )}
            
            <p>
                <button type="submit">
                    Create Account
                </button>
            </p>
            <p>
                <Link href="/">Login with existing account.</Link>
            </p>
        </form>
    );
}