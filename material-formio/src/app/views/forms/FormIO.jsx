import React from 'react';
import { Form } from 'react-formio';
import {Breadcrumb, RichTextEditor} from "../../../matx";


const FormIO = props => {

    const onSubmitHandler = (data) => {
        alert("Check your console log!");
        console.log(data);
    }

    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "Forms", path: "/forms" },
                        { name: "Editor" }
                    ]}
                />
            </div>
            <Form src="https://example.form.io/example" onSubmit={onSubmitHandler} />
        </div>

    );
}

export default FormIO;
