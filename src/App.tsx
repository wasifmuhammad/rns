import React, { useMemo, useState, createContext, useEffect } from "react";
import useCustomApi from "./api/useCustomApi";
import { userContext, Provider } from "./context/userContext";

import FindCountryForUser from "./component/FindCountryForUser";
import SearchList from "./component/SearchList";
import { Modal } from "react-responsive-modal";
import TextField from "@material-ui/core/TextField";

import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [userHistory, setUserHistory] = React.useState<Provider[]>([]);
  const { fetchCountry, loading, data, error, setData } = useCustomApi();
  const [isFetching, setIsFetching] = useState(false);
  const [editing, setEditing] = useState(false);

  const [open, setOpen] = useState(false);
  const [holdPerson, setHoldPerson] = useState("");

  const handleSubmit = () => {
    fetchCountry(`${name}`);
    setIsFetching(true);
  };
  const onOpenModal = (person: string) => {
    setHoldPerson(person);
    setOpen(true);
  };

  const onCloseModal = () => {
    setHoldPerson("");
    setOpen(false);
    setEditing(false);
  };

  const updatePerson = (person: any) => {
    setEditing(true);
    setOpen(true);
    setName(person);
    setHoldPerson(person);
  };

  const update = () => {
    removePerson();
    handleSubmit();
  };

  const removePerson = () => {
    const updatedHistory = userHistory.filter(
      (value: any) => value.name != holdPerson
    );
    setUserHistory(updatedHistory);
    onCloseModal();
  };

  useEffect(() => {
    if (isFetching) {
      let newUser: any = [];
      newUser = [...userHistory];
      newUser.push({
        name: name.toString(),
        country: data?.toString(),
      });
      setUserHistory((prev) => newUser);
      setIsFetching(false);
      setData("");
      setName("");
    }
  }, [data]);

  return (
    <div className="App">
      <Modal open={open} onClose={onCloseModal} center>
        {editing ? (
          <>
            <h1>Do you really want to Update ?</h1>

            <TextField
              id="standard-basic"
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              label="Search Name"
              variant="standard"
            />
            <br />
            <button className="modal-btn" onClick={update}>
              Update
            </button>
            <button className="modal-btn" onClick={onCloseModal}>
              Close
            </button>
          </>
        ) : (
          <>
            <h1>Do you really want to delete ?</h1>
            <button className="modal-btn" onClick={removePerson}>
              Delete
            </button>
            <button className="modal-btn" onClick={onCloseModal}>
              Close
            </button>
          </>
        )}
      </Modal>

      <userContext.Provider value={{ userHistory, setUserHistory }}>
        <FindCountryForUser
          name={name}
          setName={setName}
          handleSubmit={handleSubmit}
        />

        {userHistory.length > 0 ? (
          <SearchList onOpenModal={onOpenModal} updatePerson={updatePerson} />
        ) : null}
      </userContext.Provider>
    </div>
  );
}

export default App;
