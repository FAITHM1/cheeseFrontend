import { useState } from "react";
import { Link } from "react-router-dom";

function Index(props) {
  const [newForm, setnewForm] = useState({
    name: "",
    countryOfOrigin: "",
    image: "",
  });
  const handleChange = (event) => {
    const newState = { ...newForm };
    newState[event.target.name] = event.target.value;
    setnewForm(newState);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.createCheese(newForm);
    setnewForm({
      name: "",
      countryOfOrigin: "",
      image: "",
    });
  };
  const form = (
    <form onSubmit={handleSubmit} className="form">
      <label htmlFor="name">
        <input
          type="text"
          value={newForm.name}
          name="name"
          placeholder="name of cheese"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="countryOfOrigin">
        <input
          type="text"
          value={newForm.countryOfOrigin}
          name="countryOfOrigin"
          placeholder="country od origin"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="image">
        <input
          type="text"
          value={newForm.image}
          name="image"
          placeholder="imageofcheese"
          onChange={handleChange}
        />
      </label>
      <input type="submit" value="add cheese" />
    </form>
  );
  const loaded = () => {
    return props.allCheese.map((cheese) => (
      <div key={cheese._id} className="cheese">
        <Link to={`/cheese/${cheese._id}`}>{cheese.name}</Link>
        <img
          style={{ width: "150px" }}
          src={cheese.image}
          alt="{cheese.name}"
        />
        <h3>{cheese.countryOfOrigin}</h3>
      </div>
    ));
  };
  if (props.allCheese) {
    return (
      <>
        <section>{form}</section>
        <section className="allCheese">{loaded()}</section>
      </>
    );
  } else {
    return (
      <section>
        {form}
        <h1>loading</h1>
      </section>
    );
  }
}
export default Index;
