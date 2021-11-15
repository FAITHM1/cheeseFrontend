import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Show(props) {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const cheese = props.cheese;
  const allCheese = props.allCheese;
  const [editForm, setEditForm] = useState({});
  useEffect(() => {
    if (props.allCheese) {
      const cheese = allCheese.find((c) => c._id === id);
      setEditForm(cheese);
    }
  }, [props.allCheese]);

  if (props.allCheese) {
    const cheese = allCheese.find((c) => c._id === id);
    console.log(cheese);
    const handleChange = (event) => {
      const newState = { ...editForm };
      newState[event.target.name] = event.target.value;
      setEditForm(newState);
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      props.updateCheese(editForm, cheese._id);
      navigate("/");
    };

    const form = (
      <form onSubmit={handleSubmit} className="editForm">
        <label htmlFor="name">
          <input
            type="text"
            value={editForm.name}
            name="name"
            placeholder="name of cheese"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="countryOfOrigin">
          <input
            type="text"
            value={editForm.countryOfOrigin}
            name="countryOfOrigin"
            placeholder="country od origin"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="image">
          <input
            type="text"
            value={editForm.image}
            name="image"
            placeholder="imageofcheese"
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="edit cheese" />
      </form>
    );
    const removeCheese = () => {
      props.deleteCheese(cheese._id);
      navigate("/");
    };

    return (
      <div className="cheeseShow">
        <h1>{cheese.name}</h1>
        <img src={cheese.image} alt="{cheese.name}" />
        <h3>{cheese.countryOfOrigin}</h3>
        {form}
        <button onClick={removeCheese}>DELETE</button>
      </div>
    );
  }
  return <h1>hello</h1>;
}
export default Show;
