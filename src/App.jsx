import { useState } from "react";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  course: ""
};

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: "", message: "" });
    setLoading(true);

    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Registration failed.");

      setStatus({
        type: "success",
        message: `Registration successful! Student ID: ${data.student._id}`
      });
      setForm(initialForm);
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Something went wrong." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="intro">
        <div className="brand-mark">SR</div>
        <p className="eyebrow">STUDENT PORTAL</p>
        <h1>Start your learning journey.</h1>
        <p className="intro-copy">
          Complete the registration form to submit your student details.
        </p>
        <div className="feature-list">
          <span>✓ Simple registration</span>
          <span>✓ Secure database storage</span>
          <span>✓ Online access</span>
        </div>
        <p className="intro-footer">STUDENT REGISTRATION SYSTEM</p>
      </section>

      <section className="form-section">
        <div className="form-card">
          <div className="form-heading">
            <p className="eyebrow">NEW ADMISSION</p>
            <h2>Student Registration</h2>
            <p>Enter your information below.</p>
          </div>

          {status.message && (
            <div className={`alert ${status.type}`} role="status">
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={handleChange}
              minLength="2"
              maxLength="80"
              required
            />

            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="student@example.com"
              value={form.email}
              onChange={handleChange}
              maxLength="120"
              required
            />

            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="03XXXXXXXXX"
              value={form.phone}
              onChange={handleChange}
              minLength="7"
              maxLength="20"
              required
            />

            <label htmlFor="course">Select Course</label>
            <select
              id="course"
              name="course"
              value={form.course}
              onChange={handleChange}
              required
            >
              <option value="">Choose a course</option>
              <option value="Web Development">Web Development</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Data Science">Data Science</option>
              <option value="Graphic Design">Graphic Design</option>
            </select>

            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Registration"}
              {!loading && <span aria-hidden="true">→</span>}
            </button>
          </form>
          <p className="privacy-note">Your information will be stored in the student database.</p>
        </div>
      </section>
    </main>
  );
}