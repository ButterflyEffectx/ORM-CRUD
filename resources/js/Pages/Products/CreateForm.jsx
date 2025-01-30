import React from 'react'
import { useForm } from '@inertiajs/react'

function CreateForm() {

    const { data, setData, post, errors } = useForm({
        input1: '',
        input2: '',
        input3: '',
        input4: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/products')
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={data.input1}
                    onChange={(e) =>
                        setData('input1', e.target.value)
                    }
                />

                <input
                    type="text"
                    value={data.input2}
                    onChange={(e) =>
                        setData('input2', e.target.value)
                    }
                />
            </form>
        </>
    )
}

export default CreateForm
