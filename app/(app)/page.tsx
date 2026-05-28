"use client";
import { useEffect, useState } from "react";


export default function Home() {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    fetch("/data/routes.json")
      .then((res) => res.json())
      .then((data) => setRoutes(data));
  }, []);

  return (
    <div>
      <h1>Bus Routes</h1>

      {routes.slice(0, 10).map((route: any) => (
        <div key={route.route_id}>
          {route.route_long_name}
        </div>
      ))}
    </div>
  );
}