import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
// import { CloudMusicUpload } from "./pages/cloud-music-upload"
import { MantineProvider } from "@mantine/core"

import "./index.css"
import "@mantine/core/styles.css"
import "@mantine/dropzone/styles.css"

import { PageGuide } from "./pages/page-guide/guide"
import { CloudMusicUpload } from "./pages/cloud-music-upload/cloud-music-upload"

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageGuide />,
  },
  {
    path: "/cloud-music-upload",
    element: <CloudMusicUpload />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
)
