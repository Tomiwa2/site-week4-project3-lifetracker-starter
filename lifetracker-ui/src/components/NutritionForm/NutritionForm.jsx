import * as React from "react";
import "./NutritionForm.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiClient from "../../Services/apiClient";

export default function NutritionForm({ appState, setAppState }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    quantity: 1,
    calories: 0,
    imageUrl: "",
  });
console.log(formData)
  //function handleOnSubmit

  // instead of doing it in the in onchange part, 
  // you could have made it a function and then called 
  //it in onChange, check student store 

  // const handleOnChange = () => {};
  
  const Navigate = useNavigate();
                                    
const handleOnSubmit = async (e) => {
    e.preventDefault();

    try{

      const {data, error, message} = await apiClient.nutrition({
        name:  formData.name,
            category: formData.category,
            quantity: formData.quantity,
            calories: formData.calories,
            image_url: formData.imageUrl,
            id: appState.user.id,
      })
      console.log(data)
      
      if (data) {
        setAppState((prevState) => ({
          ...prevState,
                nutrition: [data.nutrition, ...prevState.nutrition],
              }));
      }
    const token = localStorage.getItem("Lifetracker_Token" )
      
      apiClient.setToken(token);
      Navigate("/nutrition");
    }catch(err){
      console.log(err);
      const message = err?.response?.data?.error?.message;
      setErrors((e) => ({
        ...e,
        form: message ? String(message) : String(err),
      }));
      console.log(prevState)

    }

    // try {
    //   const res = await axios.post(`http://localhost:3001/auth/nutrition/create`, {
    //     name:  formData.name,
    //     category: formData.category,
    //     quantity: formData.quantity,
    //     calories: formData.calories,
    //     image_url: formData.imageUrl,
    //     id: appState.user.id,
    //   });

    //   console.log(res);
    
    //     setAppState((prevState) => ({
    //       ...prevState,
    //       nutrition: [res.data.nutrition, ...prevState.nutrition],
          
    //     }));
        
    //     Navigate("/nutrition");
      
    // } catch(err) {
    //   console.log(err);
    //   const message = err?.response?.data?.error?.message;
      
    // }
  };



  return (
    <>
      <div className="NutritionPage css-1bpnzr3">
        <div className="css-1ef7k5z">
          <div className="chakra-stack css-1cgbrw5">
            <h2 className="chakra-heading css-b5coes">Nutrition</h2>
          </div>
        </div>
        <div className="css-vpbd2d">
          <div className="css-0">
            <div className="css-pwgvc2">
              <div className="chakra-stack css-1jtnem3">
                <div className="css-1hv8zgx">
                  <div></div>
                  <div className="css-mlsaez">
                    <div className="chakra-stack css-13ra036">
                      <h2 className="chakra-heading css-15a3bhq">
                        Record Nutrition
                      </h2>
                      <div className="css-ebzegt">
                        <form>
                          <div className="chakra-stack css-1db3zf7">
                            <div
                              role="group"
                              className="chakra-form-control css-1kxonj9"
                            >
                              <div
                                className="chakra-input__group css-bx0blc"
                                data-group="true"
                              >
                                <input
                                  name="name"
                                  type="text"
                                  placeholder="Name"
                                  id="field-:r2c:"
                                  required=""
                                  aria-required="true"
                                  className="chakra-input css-p20xy6"
                                  value={formData.name}
                                  onChange={(e) =>
                                    setFormData((previousState) => ({
                                      ...previousState,
                                      name: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                            </div>
                            <div
                              role="group"
                              className="chakra-form-control css-1kxonj9"
                            >
                              <label
                                id="field-:r2d:-label"
                                for="field-:r2d:"
                                className="chakra-form__label css-g6pte"
                              >
                                Category
                                <span
                                  role="presentation"
                                  aria-hidden="true"
                                  className="chakra-form__required-indicator css-1tfjd1n"
                                >
                                  *
                                </span>
                              </label>
                              <div className="chakra-select__wrapper css-42b2qy">
                                <select
                                  name="category"
                                  id="field-:r2d:"
                                  required=""
                                  aria-required="true"
                                  className="chakra-select css-1gpsbw3"
                                  value={formData.category}
                                  onChange={(e) =>
                                    setFormData((previousState) => ({
                                      ...previousState,
                                      category: e.target.value,
                                    }))
                                  }
                                >
                                  <option value="">Select a category</option>
                                  <option value="snack">Snack</option>
                                  <option value="beverage">Beverage</option>
                                  <option value="food">Food</option>
                                </select>
                                <div className="chakra-select__icon-wrapper css-iohxn1">
                                  <svg
                                    viewBox="0 0 24 24"
                                    role="presentation"
                                    className="chakra-select__icon"
                                    focusable="false"
                                    aria-hidden="true"
                                    style={{
                                      width:
                                        "1em; height: 1em; color: currentcolor;",
                                    }}
                                  >
                                    <path
                                      fill="currentColor"
                                      d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
                                    ></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <div className="css-9jay18">
                              <div
                                role="group"
                                className="chakra-form-control css-1kxonj9"
                              >
                                <label
                                  id="field-:r2e:-label"
                                  for="field-:r2e:"
                                  className="chakra-form__label css-g6pte"
                                >
                                  Quantity
                                  <span
                                    role="presentation"
                                    aria-hidden="true"
                                    className="chakra-form__required-indicator css-1tfjd1n"
                                  >
                                    *
                                  </span>
                                </label>
                                <div
                                  value="1"
                                  className="chakra-numberinput css-3e5t3k"
                                >
                                  <input
                                    name="quantity"
                                    inputmode="decimal"
                                    type="text"
                                    pattern="[0-9]*(.[0-9]+)?"
                                    id="field-:r2e:"
                                    aria-readonly="false"
                                    aria-required="true"
                                    required=""
                                    role="spinbutton"
                                    aria-valuemin="1"
                                    aria-valuemax="100"
                                    aria-valuenow="1"
                                    aria-valuetext="1"
                                    autocomplete="off"
                                    autocorrect="off"
                                    className="chakra-numberinput__field css-1551roq"
                                    value={formData.quantity}
                                  onChange={(e) =>
                                    setFormData((previousState) => ({
                                      ...previousState,
                                      quantity: e.target.value,
                                    }))
                                  }
                                  />
                                  <div
                                    aria-hidden="true"
                                    className="css-1jj9yua"
                                  >
                                    <div
                                      role="button"
                                      tabindex="-1"
                                      className="css-1m5jnul"
                                    >
                                      <svg
                                        viewBox="0 0 24 24"
                                        focusable="false"
                                        className="chakra-icon css-onkibi"
                                      >
                                        <path
                                          fill="currentColor"
                                          d="M12.8,5.4c-0.377-0.504-1.223-0.504-1.6,0l-9,12c-0.228,0.303-0.264,0.708-0.095,1.047 C2.275,18.786,2.621,19,3,19h18c0.379,0,0.725-0.214,0.895-0.553c0.169-0.339,0.133-0.744-0.095-1.047L12.8,5.4z"
                                        ></path>
                                      </svg>
                                    </div>
                                    <div
                                      role="button"
                                      tabindex="-1"
                                      disabled=""
                                      aria-disabled="true"
                                      className="css-1m5jnul"
                                    >
                                      <svg
                                        viewBox="0 0 24 24"
                                        focusable="false"
                                        className="chakra-icon css-onkibi"
                                      >
                                        <path
                                          fill="currentColor"
                                          d="M21,5H3C2.621,5,2.275,5.214,2.105,5.553C1.937,5.892,1.973,6.297,2.2,6.6l9,12 c0.188,0.252,0.485,0.4,0.8,0.4s0.611-0.148,0.8-0.4l9-12c0.228-0.303,0.264-0.708,0.095-1.047C21.725,5.214,21.379,5,21,5z"
                                        ></path>
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              &nbsp;
                              <div
                                role="group"
                                className="chakra-form-control css-1kxonj9"
                              >
                                <label
                                  id="field-:r2f:-label"
                                  for="field-:r2f:"
                                  className="chakra-form__label css-g6pte"
                                >
                                  Calories
                                  <span
                                    role="presentation"
                                    aria-hidden="true"
                                    className="chakra-form__required-indicator css-1tfjd1n"
                                  >
                                    *
                                  </span>
                                </label>
                                <div
                                  value=""
                                  className="chakra-numberinput css-3e5t3k"
                                >
                                  <input
                                    name="calories"
                                    inputmode="decimal"
                                    type="text"
                                    pattern="[0-9]*(.[0-9]+)?"
                                    id="field-:r2f:"
                                    aria-readonly="false"
                                    aria-required="true"
                                    required=""
                                    role="spinbutton"
                                    aria-valuemin="0"
                                    aria-valuemax="100000"
                                    autocomplete="off"
                                    autocorrect="off"
                                    className="chakra-numberinput__field css-1551roq"
                                    value={formData.calories}
                                  onChange={(e) =>
                                    setFormData((previousState) => ({
                                      ...previousState,
                                      calories: e.target.value,
                                    }))
                                  }
                                  />
                                  <div
                                    aria-hidden="true"
                                    className="css-1jj9yua"
                                  >
                                    <div
                                      role="button"
                                      tabindex="-1"
                                      className="css-1m5jnul"
                                    >
                                      <svg
                                        viewBox="0 0 24 24"
                                        focusable="false"
                                        className="chakra-icon css-onkibi"
                                      >
                                        <path
                                          fill="currentColor"
                                          d="M12.8,5.4c-0.377-0.504-1.223-0.504-1.6,0l-9,12c-0.228,0.303-0.264,0.708-0.095,1.047 C2.275,18.786,2.621,19,3,19h18c0.379,0,0.725-0.214,0.895-0.553c0.169-0.339,0.133-0.744-0.095-1.047L12.8,5.4z"
                                        ></path>
                                      </svg>
                                    </div>
                                    <div
                                      role="button"
                                      tabindex="-1"
                                      className="css-1m5jnul"
                                    >
                                      <svg
                                        viewBox="0 0 24 24"
                                        focusable="false"
                                        className="chakra-icon css-onkibi"
                                      >
                                        <path
                                          fill="currentColor"
                                          d="M21,5H3C2.621,5,2.275,5.214,2.105,5.553C1.937,5.892,1.973,6.297,2.2,6.6l9,12 c0.188,0.252,0.485,0.4,0.8,0.4s0.611-0.148,0.8-0.4l9-12c0.228-0.303,0.264-0.708,0.095-1.047C21.725,5.214,21.379,5,21,5z"
                                        ></path>
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              role="group"
                              className="chakra-form-control css-1kxonj9"
                            >
                              <div
                                className="chakra-input__group css-bx0blc"
                                data-group="true"
                              >
                                <input
                                  name="imageUrl"
                                  type="text"
                                  placeholder="url for image"
                                  id="field-:r2g:"
                                  className="chakra-input css-p20xy6"
                                  value={formData.imageUrl}
                                  onChange={(e) =>
                                    setFormData((previousState) => ({
                                      ...previousState,
                                      imageUrl: e.target.value,
                                    }))
                                  }
                                />
                              </div>
                            </div>
                            <button onClick={handleOnSubmit}
                              type="submit"
                              className="chakra-button css-1nrq84c"
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
