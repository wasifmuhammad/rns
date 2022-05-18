import React, { useState } from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { useUserContext } from "../context/userContext";

interface Props {
  name: string;
  setName: (e: any) => void;
  handleSubmit: () => void;
}

const FindCountryForUser: React.FC<Props> = ({
  name,
  setName,
  handleSubmit,
}) => {
  const { userHistory, setUserHistory } = useUserContext();

  return (
    <div className="container" data-test-id="container">
      <div className="search-container">
        <TextField
          id="standard-basic"
          value={name}
          onChange={(e: any) => setName(e.target.value)}
          label="Search Name"
          variant="standard"
        />

        <Button onClick={handleSubmit}>Search </Button>
      </div>
      {/* <div className="list">
        <ul>
          {userHistory.map((value: any, index: number) => {
            return (
              <li key={index}>
                <span className="name">{value.name}</span> is from{" "}
                <span className="country">{value.country} </span>
                <button onClick={() => onOpenModal(value.name)}>
                  Remove Person
                </button>
                <button onClick={() => updatePerson(value.name)}>
                  Update Person
                </button>
              </li>
            );
          })}
        </ul>
      </div> */}
    </div>
  );
};

export default FindCountryForUser;
