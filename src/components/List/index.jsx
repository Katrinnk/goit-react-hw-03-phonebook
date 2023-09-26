export const ContactList = ({ contacts, handleDelete, filteredContacts }) => (
  <>
    <ul className="list-group">
      {(filteredContacts ?? contacts).map(el => (
        <li className="list-group-item ms-3 me-3" key={el.id}>
          {el.name}: {el.number}
          <button
            type="button"
            className="btn-close ms-5"
            aria-label="Close"
            onClick={() => handleDelete(el.id)}
          ></button>
        </li>
      ))}
    </ul>
  </>
);
