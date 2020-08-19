import React from "react";

const formsRoutes = [
  {
    path: "/forms/basic",
    component: React.lazy(() => import("./BasicForm"))
  },
  {
    path: "/forms/editor",
    component: React.lazy(() => import("./EditorForm"))
  },
  {
    path: "/forms/formio",
    component: React.lazy(() => import("./FormIO"))
  },
  {
    path: "/forms/form-builder",
    component: React.lazy(() => import("./FormIOBuilder"))
  },
  {
    exact: true,
    path: "/projects",
    component: React.lazy(() => import("./ProjectsList"))
  },
  {
    exact: true,
    path: "/projects/:id",
    component: React.lazy(() => import("./ProjectDetails"))
  }
];

export default formsRoutes;
