import React from 'react';
import {Breadcrumb} from "../../../matx";
import { FormBuilder } from 'react-formio';

const FormIOBuilder = props => {
    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "Forms", path: "/forms" },
                        { name: "FormBuilder" }
                    ]}
                />
            </div>
            <FormBuilder form={{display: 'form'}} onChange={(schema) => console.log(schema)} />
        </div>

    );
}

export default FormIOBuilder;
