import React from "react";

const MembersList = (props) => {
  return (
    <table>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Address</th>
        <th>SSN</th>
      </tr>
      <tbody>
        {props.members.map((item, i) => {
          return (
            <tr key={i}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.address}</td>
              <td>{item.ssn}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MembersList;
