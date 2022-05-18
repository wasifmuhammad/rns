import React from "react";
import { useUserContext } from "../context/userContext";
interface Props{
  onOpenModal: (Person: string) => void,
  updatePerson: (Person: any) => void,
}
const SearchList: React.FC<Props> = ({onOpenModal, updatePerson}) => {
  const { userHistory, setUserHistory } = useUserContext();

  return (
    <div className="list">
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
    </div>
  );
};

export default SearchList;
