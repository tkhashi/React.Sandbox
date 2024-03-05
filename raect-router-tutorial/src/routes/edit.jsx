import {Form, useLoaderData} from 'react-router-dom';

export default function EditContact() {
    const {contact} = useLoaderData();

    return(
    <Form method='post' id='contact-form'>
        <p>
            <span>Name</span>
            <input
                type="text" 
                placeholder='first'
                aria-label='Last name'
                name='last'
                defaultValue={contact.last}
            />
        </p>
        <label>
            <span>Avatar URL</span>
            <input
                type="text" 
                placeholder='https://example.com/avatar.jpg'
                aria-label='Avatar URL'
                name='avatar'
                defaultValue={contact.avatar}
            />
        </label>
        <p>
            <button type='submit'>Save</button>
            <button type='button'>Cancel</button>
        </p>
    </Form>
    )
}