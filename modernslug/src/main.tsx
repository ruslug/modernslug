import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

import "./index.css";
import Home from "./Pages/Home.tsx";
import Meetings from "./Pages/Meetings.tsx";
import Links from "./Pages/Links.tsx";
import Topics from "./Pages/Topics.tsx";
import Members from "./Pages/Members.tsx";

const root = document.getElementById("root");


/*
To add more pages, import the page component and add a new Route in the Routes component. For example, to add a Meetings page:
import Meetings from "./Pages/Meetings.tsx";

path is the URL path for the page, and element is the component to render for that path. For example:
path: /meetings
element: <Meetings />

Then add the new Route in the Routes component like this:
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/meetings" element={<Meetings />} />
</Routes>

*/

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/meetings" element={<Meetings />} />
      <Route path="/links" element={<Links />} />
      <Route path="/topics" element={<Topics />} />
      <Route path="/members" element={<Members />} />
    </Routes>
  </BrowserRouter>,
);
