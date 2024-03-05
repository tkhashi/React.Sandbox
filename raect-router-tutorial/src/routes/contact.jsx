import { Form, useLoaderData } from "react-router-dom";
import { getContact } from "../contacts";

export async function Loader({params}) {
    const contact = await getContact(params.contactId);
    return {contact}
}

export default function Contact() {
    const { contact } = useLoaderData();
    // const contact = {
    //     first: "Your",
    //     last: "Name",
    //     avatar: "https://placekitten.com/g/200/200",
    //     twitter:"your_handle",
    //     notes: "Some notes",
    //     favorite: true,
    // }

    return (
        <div>
            <div>
                <img 
                    src={contact.avatar || null} 
                    key={contact.avatar} />
            </div>

            <div>
                <h1>
                    {contact.first || contact.last ?(
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    <Favorite contact={contact}/>
                </h1>
            </div>

            {contact.twitter && (
                <p>
                    <a 
                        href={`https://twitter.com/${contact.twitter}`}
                        target="_blank"
                    >
                        {contact.twitter}
                    </a>
                </p>
            )}

            {contact.notes && <p>{contact.notes}</p>}

            <div>
                <Form action="edit">
                    <button type="submit">Edit</button>
                </Form>
                <Form 
                    method="post"
                    action="destroy"
                    onSubmit={(event) =>{
                        if (!confirm("Please confirm you want to delete this record.")) {
                            event.preventDefault();
                        }
                    }}
                >
                    <button type="submit">Delete</button>
                </Form>
            </div>
        </div>
    );
}

function Favorite(contact) {
    let favorite = contact.favorite;
    return(
        <Form method="post">
            <button
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label={
                    favorite
                        ? "Remove from favorite"
                        : "Add to favorite"
                }
                >
                {favorite ? "★" : "☆"}
            </button>
        </Form>
    )
}