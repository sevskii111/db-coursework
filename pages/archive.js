import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Table } from "reactstrap";

export default function Students() {
  const [themes, setThemes] = useState(null);

  useEffect(async () => {
    const result = await axios("/api/db/archive");
    setThemes(result.data);
  }, []);

  if (themes === null) {
    return (
      <div className="container">
        <main>Loading...</main>
      </div>
    );
  } else {
    return (
      <div className="container">
        <main>
          <a href="/" className="btn btn-secondary mb-2">
            Назад
          </a>
          <Table className="text-center">
            <thead>
              <tr>
                <th className="align-middle">Тема</th>
              </tr>
            </thead>
            <tbody>
              {themes.map((theme) => (
                <tr key={theme}>
                  <td className="align-middle">{theme}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </main>
      </div>
    );
  }
}
