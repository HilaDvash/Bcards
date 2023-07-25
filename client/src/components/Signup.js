import React, { useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";
import "../Style/Signup.css";
import axios from "axios";

export default function Signup() {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  const validate = (data) => {
    let errors = {};

    if (!data.firstname) {
      errors.firstname = "first name is required.";
    }

    if (!data.lastname) {
      errors.lastname = "last name is required.";
    }

    if (!data.email) {
      errors.email = "Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors.email = "Invalid email address. E.g. example@email.com";
    }

    if (!data.password) {
      errors.password = "Password is required.";
    }

    if (!data.phone) {
      errors.phone = "phone is required.";
    } else if (data.phone.length !== 10) {
      errors.phone = "Invalid email address. E.g. example@email.com";
    }

    if (!data.phone) {
      errors.phone = "Phone is required.";
    }

    if (!data.country) {
      errors.country = "country is required.";
    }

    if (!data.city) {
      errors.city = "city is required.";
    }

    if (!data.street) {
      errors.street = "street is required.";
    }

    if (!data.housenumber) {
      errors.housenumber = "house number is required.";
    }

    // if (!data.accept) {
    //   errors.accept = "You need to agree to the terms and conditions.";
    // }

    return errors;
  };

  async function server(data) {
    try {
      const options = {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const result = await axios.post("http://localhost:8181/users", options);
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmit = (data, form) => {
    console.log(form);
    setFormData(data);
    setShowMessage(true);
    console.log(data);
    let newData = {
      name: {
        first: data.firstname,
        middle: data.middlename,
        last: data.lastname,
      },
      phone: data.phone,
      email: data.email,
      password: data.password,
      image: {
        url: data.Imageurl,
        alt: data.imagealt,
      },
      address: {
        state: data.state,
        country: data.country,
        city: data.city,
        street: data.street,
        houseNumber: data.housenumber,
        zip: data.zip,
      },
      isBusiness: data.accept,
    };
    server(newData);
    // form.restart();
  };

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return (
      isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>
    );
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: "1.5" }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  return (
    <div className="form-demo">
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ "960px": "80vw" }}
        style={{ width: "30vw" }}
      >
        <div className="flex align-items-center flex-column pt-6 px-3">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: "5rem", color: "var(--green-500)" }}
          ></i>
          <h5>Registration Successful!</h5>
          <p style={{ lineHeight: 1.5, textIndent: "1rem" }}>
            Your account is registered under name <b>{formData.name}</b> ; it'll
            be valid next 30 days without activation. Please check{" "}
            <b>{formData.email}</b> for activation instructions.
          </p>
        </div>
      </Dialog>

      <div className="flex justify-content-center">
        <div className="card">
          <h5 className="text-center">Register</h5>
          <Form
            onSubmit={onSubmit}
            initialValues={{
              firstname: "",
              middlename: "",
              lastname: "",
              email: "",
              password: "",
              phone: "",
              state: "",
              country: "",
              city: "",
              street: "",
              housenumber: "",
              zip: 0,
              imageurl: "",
              imagealt: "",
              accept: false,
            }}
            validate={validate}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="p-fluid">
                <div className="divinput">
                  <Field
                    name="firstname"
                    render={({ input, meta }) => (
                      <div className="field">
                        <span className="p-float-label">
                          <InputText
                            id="firstname"
                            {...input}
                            autoFocus
                            className={classNames({
                              "p-invalid": isFormFieldValid(meta),
                            })}
                          />
                          <label
                            htmlFor="name"
                            className={classNames({
                              "p-error": isFormFieldValid(meta),
                            })}
                          >
                            First name*
                          </label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                  <Field
                    name="middlename"
                    render={({ input, meta }) => (
                      <div className="field">
                        <span className="p-float-label">
                          <InputText
                            id="middlename"
                            {...input}
                            autoFocus
                            className={classNames({
                              "p-invalid": isFormFieldValid(meta),
                            })}
                          />
                          <label
                            htmlFor="name"
                            className={classNames({
                              "p-error": isFormFieldValid(meta),
                            })}
                          >
                            Middle name
                          </label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                </div>
                <div className="divinput">
                  <Field
                    name="lastname"
                    render={({ input, meta }) => (
                      <div className="field">
                        <span className="p-float-label">
                          <InputText
                            id="lastname"
                            {...input}
                            autoFocus
                            className={classNames({
                              "p-invalid": isFormFieldValid(meta),
                            })}
                          />
                          <label
                            htmlFor="lastname"
                            className={classNames({
                              "p-error": isFormFieldValid(meta),
                            })}
                          >
                            Last name*
                          </label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                  <Field
                    name="email"
                    render={({ input, meta }) => (
                      <div className="field">
                        <span className="p-float-label">
                          {/* <i className="pi pi-envelope" /> */}
                          <InputText
                            id="email"
                            {...input}
                            className={classNames({
                              "p-invalid": isFormFieldValid(meta),
                            })}
                          />
                          <label
                            htmlFor="email"
                            className={classNames({
                              "p-error": isFormFieldValid(meta),
                            })}
                          >
                            Email*
                          </label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                </div>
                <div className="divinput">
                  <Field
                    name="password"
                    render={({ input, meta }) => (
                      <div className="field">
                        <span className="p-float-label">
                          <Password
                            id="password"
                            {...input}
                            toggleMask
                            className={classNames({
                              "p-invalid": isFormFieldValid(meta),
                            })}
                            header={passwordHeader}
                            footer={passwordFooter}
                          />
                          <label
                            htmlFor="password"
                            className={classNames({
                              "p-error": isFormFieldValid(meta),
                            })}
                          >
                            Password*
                          </label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                  <Field
                    name="phone"
                    render={({ input, meta }) => (
                      <div className="field">
                        <span className="p-float-label">
                          <InputText
                            id="phone"
                            {...input}
                            className={classNames({
                              "p-invalid": isFormFieldValid(meta),
                            })}
                          />
                          <label
                            htmlFor="phone"
                            className={classNames({
                              "p-error": isFormFieldValid(meta),
                            })}
                          >
                            phone Number*
                          </label>
                        </span>
                      </div>
                    )}
                  />
                </div>
                <div className="divinput">
                  <Field
                    name="imageurl"
                    render={({ input, meta }) => (
                      <div className="field">
                        <span className="p-float-label">
                          <InputText id="imageurl" {...input} autoFocus />
                          <label htmlFor="imageurl">Image url</label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                  <Field
                    name="imagealt"
                    render={({ input, meta }) => (
                      <div className="field">
                        <span className="p-float-label">
                          <InputText id="imagealt" {...input} autoFocus />
                          <label
                            htmlFor="imagealt"
                            className={classNames({
                              "p-error": isFormFieldValid(meta),
                            })}
                          >
                            Image alt
                          </label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                </div>
                <div className="divinput">
                  <Field
                    name="state"
                    render={({ input, meta }) => (
                      <div className="field">
                        <span className="p-float-label">
                          <InputText id="state" {...input} autoFocus />
                          <label
                            htmlFor="state"
                            className={classNames({
                              "p-error": isFormFieldValid(meta),
                            })}
                          >
                            State
                          </label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                  <Field
                    name="country"
                    render={({ input, meta }) => (
                      <div className="field">
                        <span className="p-float-label">
                          <InputText
                            id="country"
                            {...input}
                            autoFocus
                            className={classNames({
                              "p-invalid": isFormFieldValid(meta),
                            })}
                          />
                          <label
                            htmlFor="country"
                            className={classNames({
                              "p-error": isFormFieldValid(meta),
                            })}
                          >
                            Country*
                          </label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                </div>
                <div className="divinput">
                  <Field
                    name="city"
                    render={({ input, meta }) => (
                      <div className="field">
                        <span className="p-float-label">
                          <InputText
                            id="city"
                            {...input}
                            autoFocus
                            className={classNames({
                              "p-invalid": isFormFieldValid(meta),
                            })}
                          />
                          <label
                            htmlFor="city"
                            className={classNames({
                              "p-error": isFormFieldValid(meta),
                            })}
                          >
                            City*
                          </label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                  <Field
                    name="street"
                    render={({ input, meta }) => (
                      <div className="field">
                        <span className="p-float-label">
                          <InputText
                            id="street"
                            {...input}
                            autoFocus
                            className={classNames({
                              "p-invalid": isFormFieldValid(meta),
                            })}
                          />
                          <label
                            htmlFor="street"
                            className={classNames({
                              "p-error": isFormFieldValid(meta),
                            })}
                          >
                            street*
                          </label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                </div>
                <div className="divinput">
                  <Field
                    name="housenumber"
                    render={({ input, meta }) => (
                      <div className="field">
                        <span className="p-float-label">
                          <InputText
                            id="housenumber"
                            {...input}
                            autoFocus
                            className={classNames({
                              "p-invalid": isFormFieldValid(meta),
                            })}
                          />
                          <label
                            htmlFor="housenumber"
                            className={classNames({
                              "p-error": isFormFieldValid(meta),
                            })}
                          >
                            House Number*
                          </label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                  <Field
                    name="zip"
                    render={({ input, meta }) => (
                      <div className="field">
                        <span className="p-float-label">
                          <InputText
                            id="zip"
                            {...input}
                            autoFocus
                            type="number"
                          />
                          <label htmlFor="zip">zip</label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                </div>
                <Field
                  name="accept"
                  type="checkbox"
                  render={({ input, meta }) => (
                    <div className="field-checkbox">
                      <Checkbox
                        inputId="accept"
                        {...input}
                        className={classNames({
                          "p-invalid": isFormFieldValid(meta),
                        })}
                      />
                      <label
                        htmlFor="accept"
                        className={classNames({
                          "p-error": isFormFieldValid(meta),
                        })}
                      >
                        Singup as business
                      </label>
                    </div>
                  )}
                />

                <Button type="submit" label="Submit" className="mt-2" />
                {/* <Button type="button" label="Submit" className="mt-2" onClick={onSubmit} /> */}
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
}
