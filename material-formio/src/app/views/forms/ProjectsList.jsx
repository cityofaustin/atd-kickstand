import React from 'react';
import { useQuery } from 'urql';

import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    CircularProgress
} from "@material-ui/core";
import {Breadcrumb} from "../../../matx";
import SimpleCard from "../../../matx/components/cards/SimpleCard";


const ProjectsList = props => {

    const getProjectsQuery = `
        query getProjects {
          moped_project(limit: 10) {
            current_status
            eCapris_id
            project_id
            project_name
            project_length
            project_priority
          }
        }
    `

    const [result, reexecuteQuery] = useQuery({
        query: getProjectsQuery,
    });
    const { data, fetching, error } = result;

    const handleChangePage = () => {
        console.log("Not implemented yet");
    }

    const handleChangeRowsPerPage = () => {
        console.log("Not implemented yet");
    }

    return (
        <div className="m-sm-30">
            <div className="mb-sm-30">
                <Breadcrumb
                    routeSegments={[
                        { name: "Projects", path: "/forms" },
                        { name: "List" }
                    ]}
                />
            </div>
            <SimpleCard>
                <div className="w-full overflow-auto">
                    <h1>Projects</h1>
                    &nbsp;
                </div>
                <div className="w-full overflow-auto">
                    {error && <p>Oh no... {error.message}</p> }
                    {fetching &&
                    <div>
                        <CircularProgress />
                        <h2>Loading...</h2>
                    </div>
                    }
                    {data && <>
                        <Table className="whitespace-pre">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="px-0">project_id</TableCell>
                                    <TableCell className="px-0">eCapris_id</TableCell>
                                    <TableCell className="px-0">project_name</TableCell>
                                    <TableCell className="px-0">project_length</TableCell>
                                    <TableCell className="px-0">project_priority</TableCell>
                                    <TableCell className="px-0">current_status</TableCell>
                                    <TableCell className="px-0">action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.moped_project.map((item, index) => {
                                    return <TableRow key={index}>
                                        <TableCell className="px-0 capitalize" align="left">
                                            <a href={`/projects/${item.project_id}`}>{item.project_id}</a>
                                        </TableCell>
                                        <TableCell className="px-0 capitalize" align="left">
                                            {item.eCapris_id}
                                        </TableCell>
                                        <TableCell className="px-0 capitalize" align="left">
                                            {item.project_name}
                                        </TableCell>
                                        <TableCell className="px-0 capitalize">
                                            {item.project_length}
                                        </TableCell>
                                        <TableCell className="px-0 capitalize">
                                            {item.project_priority}
                                        </TableCell>
                                        <TableCell className="px-0 capitalize">
                                            {item.current_status}
                                        </TableCell>
                                        <TableCell className="px-0">
                                            <IconButton>
                                                <Icon color="error">close</Icon>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                })}

                            </TableBody>
                        </Table>

                        <TablePagination
                            className="px-4"
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={300}
                            rowsPerPage={50}
                            page={1}
                            backIconButtonProps={{
                                "aria-label": "Previous Page"
                            }}
                            nextIconButtonProps={{
                                "aria-label": "Next Page"
                            }}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </>}
                </div>
            </SimpleCard>
        </div>


    );
}

export default ProjectsList;
