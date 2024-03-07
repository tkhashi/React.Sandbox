import { 
    Form,
    useLoaderData,
    useFetcher,
} from "react-router-dom";
import { getContact, updateContact } from "../contacts";

export async function action({request, params}) {
    let formData = await request.formData();
    return updateContact(params.contactId, {
        favorite: formData.get("favorite") === "true"
    })
}

export async function loader({params}) {
    const contact = await getContact(params.contactId);

    // main.jsxでエラーハンドリングしているが、予期されるエラーに対して適切なハンドリングを実行
    if(!contact){
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }
    return {contact}
}

export default function Contact() {
    const { contact } = useLoaderData();

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

function Favorite({ contact }) {
    const fetcher = useFetcher();
    let favorite = contact.favorite;
    // 楽観的なUI(Optimistic UI)
    if(fetcher.formData){
        favorite = fetcher.formData.get("favorite") === "true"
    }

    return(
        <fetcher.Form method="post">
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
        </fetcher.Form>
    )
}