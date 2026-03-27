import { ConfigProvider } from "antd";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router } from "./router/Routes";

createRoot(document.getElementById("root")).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#FF0099",
      },
    }}
  >
    <RouterProvider router={router} />
  </ConfigProvider>
);
