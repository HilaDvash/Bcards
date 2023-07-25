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

export default function NewCard() {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  const validate = (data) => {
    let errors = {};

    if (!data.title) {
      errors.title = "title is required.";
    }

    if (!data.subtitle) {
      errors.subtitle = "subtitle is required.";
    }

    if (!data.email) {
      errors.email = "Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors.email = "Invalid email address. E.g. example@email.com";
    }

    if (!data.description) {
      errors.description = "description is required.";
    }

    if (!data.phone) {
      errors.phone = "phone is required.";
    } else if (data.phone.length !== 10) {
      errors.phone = "Invalid email address. E.g. example@email.com";
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
  
        const result = await axios.post("http://localhost:8181/cards", options);
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
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      phone: data.phone,
      email: data.email,
      web: data.web,
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

  return (
    <div>
      <div className="flex justify-content-center">
        <div className="card">
          <h1 className="text-center">create new card</h1>
          <Form
            onSubmit={onSubmit}
            initialValues={{
              title: "",
              subtitle: "",
              description: "",
              email: "",
              phone: "",
              state: "",
              country: "",
              city: "",
              street: "",
              housenumber: "",
              zip: 0,
              web: "",
              imageurl: "",
              imagealt: "",
              accept: false,
            }}
            validate={validate}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="p-fluid">
                <div className="divinput">
                  <Field
                    name="title"
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
                            htmlFor="title"
                            className={classNames({
                              "p-error": isFormFieldValid(meta),
                            })}
                          >
                            Title*
                          </label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                  <Field
                    name="subtitle"
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
                            htmlFor="subtitle"
                            className={classNames({
                              "p-error": isFormFieldValid(meta),
                            })}
                          >
                            Subtitle*
                          </label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                </div>
                <div className="divinput">
                  <Field
                    name="description"
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
                            description*
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
                    name="phone"
                    render={({ input, meta }) => (
                      <div className="field">
                        <span className="p-float-label">
                          <InputText
                            id="password"
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
                            Phone*
                          </label>
                        </span>
                        {getFormErrorMessage(meta)}
                      </div>
                    )}
                  />
                  <Field
                    name="web"
                    render={({ input, meta }) => (
                      <div className="field">
                        <span className="p-float-label">
                          <InputText
                            id="web"
                            {...input}
                            className={classNames({
                              "p-invalid": isFormFieldValid(meta),
                            })}
                          />
                          <label
                            htmlFor="web"
                            className={classNames({
                              "p-error": isFormFieldValid(meta),
                            })}
                          >
                            web
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
