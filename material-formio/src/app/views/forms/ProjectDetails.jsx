import React from 'react';
import { useQuery } from 'urql';

import {
    CircularProgress
} from "@material-ui/core";
import {Breadcrumb, SimpleCard} from "../../../matx";
import Grid from "@material-ui/core/Grid";



const ProjectDetails = props => {
    const getProjectsQuery = `
        query getProjects {
          moped_project(
            limit: 1,
            where: {
                project_id: {_eq: "${props.match.params.id}"}
            }
          ) {
                current_status
                eCapris_id
                project_id
                project_name
                project_length
                project_priority
                project_description
                project_description_public
                project_id_simple
                project_importance
                project_order
          }
        }
    `

    const [result, reexecuteQuery] = useQuery({
        query: getProjectsQuery,
    });
    const { data, fetching, error } = result;

    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "Projects", path: "/projects" },
                        { name: "List" }
                    ]}
                />
            </div>
            {error && <p>Oh no... {error.message}</p> }
            {fetching &&
            <div>
                <CircularProgress />
                <h2>Loading...</h2>
            </div>
            }
            {data && <>
                <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="baseline"
                    spacing={3}
                >
                    <Grid item xs={12} lg={6}>
                        <SimpleCard title="Project Details">
                            <p>Project name: {data.moped_project[0].project_name}</p>
                            <p>Project Length: {data.moped_project[0].project_length}</p>
                            <p>Project Priority: {data.moped_project[0].project_priority}</p>
                            <p>Project Importance: {data.moped_project[0].project_importance}</p>
                            <p>Project Order: {data.moped_project[0].project_order}</p>
                        </SimpleCard>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <SimpleCard title="Project Description">
                            <p>{data.moped_project[0].project_description}</p>
                            <p>{data.moped_project[0].project_description_public}</p>
                        </SimpleCard>
                    </Grid>
                </Grid>
            </>}

        </div>


    );
}

export default ProjectDetails;
