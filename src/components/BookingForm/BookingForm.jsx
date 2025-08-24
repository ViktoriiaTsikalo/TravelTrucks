import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import s from "./BookingForm.module.css";

const BookingForm = () => {
  const [startDate, setStartDate] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      comment: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      comment: Yup.string(),
    }),
    onSubmit: (values, { resetForm }) => {
      const data = { ...values, bookingDate: startDate };
      console.log("Booking data:", data);
      toast.success("Booking successful!");
      resetForm();
      setStartDate(null);
    },
  });

  return (
    <section className={s.bookingSection}>
      <h4 className={s.title}>Book your campervan now</h4>
      <p className={s.text}>Stay connected! We are always ready to help you.</p>
      <form onSubmit={formik.handleSubmit} className={s.form}>
        <label className={s.label}>
          <input
            placeholder="Name*"
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className={s.input}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className={s.error}>{formik.errors.name}</div>
          ) : null}
        </label>

        <label className={s.label}>
          <input
            placeholder="Email*"
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className={s.input}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className={s.error}>{formik.errors.email}</div>
          ) : null}
        </label>

        <label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Booking date*"
            minDate={new Date()}
          />
        </label>

        <label>
          <textarea
            name="comment"
            onChange={formik.handleChange}
            value={formik.values.comment}
            className={s.textarea}
            placeholder="Comment"
          />
        </label>

        <button type="submit" className={s.submitBtn}>
          Book Now
        </button>
      </form>
    </section>
  );
};

export default BookingForm;
