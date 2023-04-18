import React, { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import MembersForm from "./MembersForm";
import MembersList from "./MembersList";
import useIdleTimeout from "../../hooks/useIdleTimeOut";

const MembersHandler = () => {
  const { isLoading, error, sendRequest: request } = useHttp();
  const [token, setToken] = useState(null);
  const [members, setMembers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [ssn, setSSN] = useState("");
  const [reload, setReload] = useState(false);

  //#region reaload
  const handleIdle = () => {
    console.log("idle")
    setReload(true);
  };
  const { idleTimer } = useIdleTimeout({ onIdle: handleIdle, idleTime: 120 });  
  //#endregion

  //#region API request
  useEffect(() => {
    const processToken = async (tokenObj) => {
      console.log("tokenObj", tokenObj);
      setToken(tokenObj);
    };

    request(
      {
        endpoint: "/auth",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          username: "sarah",
          password: "connor",
        },
      },
      processToken
    );
  }, [request]);

  useEffect(() => {
    console.log("get members")
    if (token?.token) {
      const processMembers = async (membersObj) => {
        setMembers(membersObj);
        setReload(false)
      };

      request(
        {
          endpoint: "/api/members",
          method: "GET",
          token: token.token,
        },
        processMembers
      );
    }
  }, [request, token, reload]);

  const handleSubmit = () => {
    //check ssn
    var found = members.find(function (member) {
      return member.ssn === ssn;
    });
    if (found) {
      alert("SSN already exists");
      return;
    }

    const processNewMember = async (newNemberObj) => {
      members.push(newNemberObj);
      handleReset();
    };

    request(
      {
        endpoint: "/api/members",
        method: "POST",
        body: {
          firstName: firstName,
          lastName: lastName,
          address: address,
          ssn: ssn,
        },
        token: token.token,
        headers: {
          "Content-Type": "application/json",
        },
      },
      processNewMember
    );
  };

  //#endregion

  //#region handlers
  const handleChange = (value, id) => {
    setReload(false);
    idleTimer.reset();
    switch (id) {
      case "lastName":
        setLastName(value);
        break;
      case "firstName":
        setFirstName(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "ssn":
        setSSN(value);
        break;
      default:
        break;
    }
  };

  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setAddress("");
    setSSN("");
  };
  //#endregion

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }
  // if (error) {
  //   return <h1>{error}</h1>;
  // }

  if (members.length !== 0)
    return (
      <div>
        <MembersForm
          firstName={firstName}
          lastName={lastName}
          address={address}
          ssn={ssn}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onReset={handleReset}
          error={error}
        />

        <MembersList members={members} />
      </div>
    );
};

export default MembersHandler;
