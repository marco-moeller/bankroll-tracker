import { CategoryScale } from "chart.js";
import "./App.css";
import Footer from "./components/Footer";
import Graph from "./components/Graph";
import Header from "./components/Header";
import DataList from "./components/DataList";
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { convertToLocaleDate } from "./util/date";
import Calendar from "react-calendar";
import { onSnapshot } from "firebase/firestore";
import {
  addBankrollToDB,
  bankrollsRef,
  removeBankrollFromDB
} from "./util/firebase";

Chart.register(CategoryScale);

function App() {
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    date: convertToLocaleDate(new Date()),
    amount: ""
  });

  const [showCalendar, setShowCalendar] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (showCalendar) {
      return;
    }
    if (value < 0) return;
    if (value.match(/^([0-9]{1,})?(\.)?([0-9]{1,2})?$/)) {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value
      }));
      return;
    }
    if (!value.match(/^([0-9]{1,})?(\.)?([0-9]{1,2})?$/)) {
      return;
    }
  };

  const handleSubmit = () => {
    if (showCalendar) {
      return;
    }
    if (formData.amount === "") return;

    addBankrollToDB({ [formData.date]: formData.amount });
    setFormData({
      date: convertToLocaleDate(new Date()),
      amount: ""
    });
  };

  const handleAmountBlur = () => {
    setFormData((prevState) => ({
      ...prevState,
      amount: Number.parseFloat(prevState.amount).toFixed(2)
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      date: convertToLocaleDate(date)
    }));
  };

  const handleDelete = async (data) => {
    await removeBankrollFromDB(data.date);
  };

  useEffect(() => {
    onSnapshot(bankrollsRef, (snapshot) => {
      let bankrolls = [];
      snapshot.docs.forEach((doc) => bankrolls.push(doc.data()));
      setData(
        bankrolls.reduce((acc, obj) => {
          for (const key in obj) {
            acc[key] = obj[key];
          }
          return acc;
        }, {})
      );
    });
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="form">
          <div className="inputs">
            <label htmlFor="amount">Bankroll</label>
            <input
              name="amount"
              id="amount"
              className="no-spinners"
              min="0"
              placeholder="0.00"
              onChange={handleChange}
              onBlur={handleAmountBlur}
              value={formData.amount}
            />
          </div>
          <div className="inputs">
            <label htmlFor="date">Date</label>
            <input
              onClick={() => setShowCalendar(true)}
              onFocus={() => setShowCalendar(true)}
              type="text"
              name="date"
              id="date"
              placeholder={convertToLocaleDate(new Date())}
              onChange={handleChange}
              value={formData.date}
            />
            {showCalendar && (
              <>
                <div
                  className="calendar-wrapper"
                  onClick={() => setShowCalendar(false)}
                ></div>
                <Calendar onChange={handleDateChange} value={formData.date} />
              </>
            )}
          </div>
          <button onClick={handleSubmit}>submit</button>
        </section>
        <Graph graphData={data} />
        <DataList data={data} handleDelete={handleDelete} />
      </main>
      <Footer />
    </>
  );
}

export default App;
