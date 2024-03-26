import { useParams } from "react-router-dom";

export function Book(){
    const { id } = useParams();
    return (
        <div>
        <h1>Book {id}</h1>
        <p>This is the book page for book {id}</p>
        </div>
    );
}