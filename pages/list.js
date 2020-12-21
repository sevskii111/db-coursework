import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Table } from "reactstrap";

export default function Teachers() {
  const [people, setPeople] = useState(null);
  useEffect(async () => {
    const result = await axios("/api/db/list");
    setPeople(result.data);
  }, []);

  if (people === null) {
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
                <th className="align-middle">ФИО</th>
                <th className="align-middle">Роль</th>
              </tr>
            </thead>
            <tbody>
              {people.map((man, i) => (
                <tr key={i}>
                  <td className="align-middle">{`${man.surname} ${man.name} ${man.patronymic}`}</td>
                  <td className="align-middle">{man.role}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </main>
      </div>
    );
  }
}
