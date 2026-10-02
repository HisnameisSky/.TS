const { useState } = React;

export function EventRSVPForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendees: 1,
    dietary: '',
    hasGuests: false,
  });

  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Number of attendees:
          <input
            type="number"
            name="attendees"
            min="1"
            value={formData.attendees}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Dietary preferences:
          <input
            type="text"
            name="dietary"
            value={formData.dietary}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Bringing additional guests:
          <input
            type="checkbox"
            name="hasGuests"
            checked={formData.hasGuests}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      {submittedData && (
        <div id="confirmation-message">
          <h2>RSVP Submitted!</h2>
          <p>Name: {submittedData.name}</p>
          <p>Email: {submittedData.email}</p>
          <p>Number of attendees: {submittedData.attendees}</p>
          <p>Dietary preferences: {submittedData.dietary || 'None'}</p>
          <p>
            Bringing additional guests: {submittedData.hasGuests ? 'Yes' : 'No'}
          </p>
        </div>
      )}
    </div>
  );
}