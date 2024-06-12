import { nanoid } from "nanoid";
import { MdDeleteOutline } from "react-icons/md";

function DataList({ data, handleDelete }) {
  return (
    <section className="data-list">
      <ul>
        {Object.entries(data)
          .map(([date, amount]) => ({
            date,
            amount
          }))
          .map((dataPoint) => (
            <li key={nanoid()}>
              <p>{dataPoint.date}</p>
              <p className="amount">${dataPoint.amount}</p>
              <div
                className="delete-btn"
                onClick={() => handleDelete(dataPoint)}
              >
                <MdDeleteOutline />
              </div>
            </li>
          ))}
      </ul>
    </section>
  ).reverse();
}

export default DataList;
